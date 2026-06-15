import { 
  verifierConnexion, 
  creerUtilisateur, 
  getUtilisateurParEmail, 
  getUtilisateurParTelephone,
  getUtilisateurs
} from './api.js';

let _sessionCourante = null;


export async function connexion(email, motDePasse) {
  try {
    const utilisateur = await verifierConnexion(email.toLowerCase(), motDePasse);

    if (!utilisateur) {
      return { succes: false, message: 'Email ou mot de passe incorrect' };
    }

    _sessionCourante = {
      id:         utilisateur.id,
      nomComplet: utilisateur.nomComplet,
      email:      utilisateur.email,
      telephone:  utilisateur.telephone,
      role:       utilisateur.role
    };

    sessionStorage.setItem('utilisateurConnecte', JSON.stringify(_sessionCourante));

    return { succes: true, utilisateur: _sessionCourante };
  } catch (erreur) {
    console.error('[Auth] Erreur lors de la connexion:', erreur);
    return { succes: false, message: 'Erreur de connexion au serveur' };
  }
}


export async function inscription(nomComplet, email, telephone, motDePasse) {
  try {
    const emailExistant = await getUtilisateurParEmail(email.toLowerCase());
    if (emailExistant) {
      return { succes: false, message: 'Cet email est déjà utilisé' };
    }

    const telephoneExistant = await getUtilisateurParTelephone(telephone);
    if (telephoneExistant) {
      return { succes: false, message: 'Ce numéro de téléphone est déjà utilisé' };
    }

    const nouvelUtilisateur = {
      nomComplet:       nomComplet.trim(),
      email:            email.toLowerCase(),
      telephone,
      motDePasse,
      role:             'client',
      dateInscription:  new Date().toISOString()
    };

    await creerUtilisateur(nouvelUtilisateur);
    
    return { succes: true, message: 'Inscription réussie ! Connectez-vous.' };
  } catch (erreur) {
    console.error('[Auth] Erreur lors de l\'inscription:', erreur);
    return { succes: false, message: 'Erreur de connexion au serveur' };
  }
}

export function deconnexion() {
  _sessionCourante = null;
  sessionStorage.removeItem('utilisateurConnecte');
}

export function mettreAJourSession(utilisateur) {
  _sessionCourante = {
    id:         utilisateur.id,
    nomComplet: utilisateur.nomComplet,
    email:      utilisateur.email,
    telephone:  utilisateur.telephone,
    role:       utilisateur.role
  };
  sessionStorage.setItem('utilisateurConnecte', JSON.stringify(_sessionCourante));
  return _sessionCourante;
}


export function getUtilisateurConnecte() {
  if (_sessionCourante) return _sessionCourante;
  
  const stocke = sessionStorage.getItem('utilisateurConnecte');
  if (stocke) {
    try {
      _sessionCourante = JSON.parse(stocke);
      return _sessionCourante;
    } catch (e) {
      console.error('[Auth] Erreur de parsing sessionStorage:', e);
      sessionStorage.removeItem('utilisateurConnecte');
      return null;
    }
  }
  
  return null;
}


export function estConnecte() {
  return getUtilisateurConnecte() !== null;
}


export function getRole() {
  const utilisateur = getUtilisateurConnecte();
  return utilisateur?.role ?? null;
}
export async function getUtilisateurParId(id) {
  try {
    const utilisateurs = await getUtilisateurs();
    return utilisateurs.find(u => u.id === id) || null;
  } catch (erreur) {
    console.error('[Auth] Erreur lors de la récupération de l\'utilisateur:', erreur);
    return null;
  }
}

export function estResponsable() {
  const role = getRole();
  return role === 'responsable';
}

export function estClient() {
  const role = getRole();
  return role === 'client';
}