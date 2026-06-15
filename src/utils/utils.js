/**
 * src/utils/utils.js
 * ──────────────────────────────────────────────────────────────────
 * Fonctions utilitaires pures.
 * Aucune dépendance vers auth ou router — faciles à tester.
 * ──────────────────────────────────────────────────────────────────
 */

// ─── VALIDATION ───────────────────────────────────────────────────

export const validerEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validerTelephone = (tel) =>
  /^(77|78|70|76)[0-9]{7}$/.test(tel);

export const validerMotDePasse = (mdp) =>
  mdp?.length >= 6;

export const validerNomComplet = (nom) =>
  nom?.trim().length >= 3;

/**
 * validerConnexion(email, mdp, emailInput, mdpInput)
 * Valide le formulaire de connexion, affiche les erreurs.
 * Retourne true si tout est valide.
 */
export function validerConnexion(email, mdp, emailInput, mdpInput) {
  supprimerErreurChamp(emailInput);
  supprimerErreurChamp(mdpInput);
  let valide = true;

  if (!email) {
    afficherErreurChamp(emailInput, 'Un email est requis');
    valide = false;
  } else if (!validerEmail(email)) {
    afficherErreurChamp(emailInput, 'Email invalide');
    valide = false;
  }

  if (!mdp) {
    afficherErreurChamp(mdpInput, 'Un mot de passe est requis');
    valide = false;
  } else if (!validerMotDePasse(mdp)) {
    afficherErreurChamp(mdpInput, 'Le mot de passe doit contenir au moins 6 caractères');
    valide = false;
  }

  return valide;
}

/**
 * validerInscription(nom, email, tel, mdp, conditions, inputs)
 * Valide le formulaire d'inscription.
 */
export function validerInscription(nom, email, tel, mdp, conditions, inputs) {
  Object.values(inputs).forEach(input => input && supprimerErreurChamp(input));
  let valide = true;

  if (!validerNomComplet(nom)) {
    afficherErreurChamp(inputs.nom, nom ? 'Le nom doit contenir au moins 3 caractères' : 'Un nom complet est requis');
    valide = false;
  }

  if (!email) {
    afficherErreurChamp(inputs.email, 'Un email est requis');
    valide = false;
  } else if (!validerEmail(email)) {
    afficherErreurChamp(inputs.email, 'Email invalide');
    valide = false;
  }

  if (!tel) {
    afficherErreurChamp(inputs.tel, 'Un numéro de téléphone est requis');
    valide = false;
  } else if (!validerTelephone(tel)) {
    afficherErreurChamp(inputs.tel, 'Téléphone invalide (ex: 771234567)');
    valide = false;
  }

  if (!validerMotDePasse(mdp)) {
    afficherErreurChamp(inputs.mdp, mdp ? 'Le mot de passe doit contenir au moins 6 caractères' : 'Un mot de passe est requis');
    valide = false;
  }

  if (!conditions) {
    afficherErreurChamp(inputs.checkbox, "Vous devez accepter les conditions d'utilisation");
    valide = false;
  }

  return valide;
}


/**
 * afficherErreurChamp(input, message)
 * Affiche un message d'erreur sous un champ de formulaire.
 */
export function afficherErreurChamp(input, message) {
  if (!input) return;

  const champ = input.closest('.champ-formulaire, .groupe-champ');
  const erreur = champ?.querySelector('.message-erreur');

  if (erreur) erreur.textContent = message;

  const cible = champ?.querySelector('input, .enveloppe-telephone, .enveloppe-motdepasse, .boite-saisie');
  if (cible) cible.classList.add('input-erreur');
}



export function supprimerErreurChamp(input) {
  if (!input) return;
  input.classList.remove('input-erreur');
  input.style.borderColor = '';
  input.parentElement?.querySelector('.erreur-champ')?.remove();
}

/**
 * afficherNotification(message, type)
 * Affiche une notification en bas à droite.
 * type : 'succes' | 'erreur'
 */
export function afficherNotification(message, type = 'succes') {
  document.querySelector('.notification-samafood')?.remove();

  const couleur = type === 'succes' ? '#22c55e' : '#ef4444';
  const icone   = type === 'succes' ? 'fa-circle-check' : 'fa-circle-xmark';

  const notif = document.createElement('div');
  notif.className = 'notification-samafood';
  notif.innerHTML = `<i class="fa-solid ${icone}"></i><span>${message}</span>`;
  Object.assign(notif.style, {
    position:   'fixed',
    bottom:     '20px',
    right:      '20px',
    padding:    '12px 20px',
    borderRadius:'8px',
    background: couleur,
    color:      'white',
    fontFamily: 'Inter, sans-serif',
    fontSize:   '14px',
    zIndex:     '10000',
    display:    'flex',
    alignItems: 'center',
    gap:        '10px',
    boxShadow:  '0 4px 12px rgba(0,0,0,0.3)'
  });
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

/**
 * togglePasswordVisibility(button)
 * Bascule la visibilité d'un champ mot de passe.
 */
export function togglePasswordVisibility(button) {
  const input = button.previousElementSibling;
  const icon  = button.querySelector('i');
  if (!input) return;
  const estCaché = input.type === 'password';
  input.type = estCaché ? 'text' : 'password';
  icon.classList.toggle('fa-eye',       !estCaché);
  icon.classList.toggle('fa-eye-slash',  estCaché);
}

/**
 * formaterMontant(valeur)
 * Formate un nombre en chaîne FCFA. Ex: 4850000 → "4 850 000 FCFA"
 */
export function formaterMontant(valeur) {
  return `${valeur.toLocaleString('fr-FR')} FCFA`;
}

/**
 * formaterDate(dateString)
 * Formate une date ISO. Ex: "2026-06-04" → "4 juin 2026"
 */
export function formaterDate(dateString) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}
