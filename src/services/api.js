// src/services/api.js

const API_BASE_URL = 'http://localhost:3000';

async function requete(endpoint, options = {}) {
  try {
    const reponse = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!reponse.ok) {
      const erreur = await reponse.json().catch(() => ({}));
      throw new Error(erreur.message || `Erreur HTTP ${reponse.status}`);
    }

    if (options.method === 'DELETE') {
      return { succes: true };
    }

    return await reponse.json();
  } catch (erreur) {
    console.error(`[API] Erreur sur ${endpoint}:`, erreur);
    throw erreur;
  }
}

// ==================== UTILISATEURS ====================
export async function getUtilisateurs() {
  return await requete('/utilisateurs');
}

export async function getUtilisateurParId(id) {
  return await requete(`/utilisateurs/${id}`);
}

export async function getUtilisateurParEmail(email) {
  // Filtrage côté client : json-server v1 coerce les query params
  // numériques (ex: "2" -> 2) et casse les comparaisons strictes
  // sur les valeurs stockées en string. On récupère donc toute la
  // collection et on filtre nous-mêmes.
  const utilisateurs = await getUtilisateurs();
  return utilisateurs.find(u => u.email === email) || null;
}

export async function getUtilisateurParTelephone(telephone) {
  const utilisateurs = await getUtilisateurs();
  return utilisateurs.find(u => u.telephone === telephone) || null;
}

export async function creerUtilisateur(utilisateur) {
  return await requete('/utilisateurs', {
    method: 'POST',
    body: JSON.stringify(utilisateur)
  });
}

export async function mettreAJourUtilisateur(id, utilisateur) {
  return await requete(`/utilisateurs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(utilisateur)
  });
}

export async function supprimerUtilisateur(id) {
  return await requete(`/utilisateurs/${id}`, {
    method: 'DELETE'
  });
}

export async function verifierConnexion(email, motDePasse) {
  const utilisateurs = await getUtilisateurs();
  return utilisateurs.find(u => u.email === email && u.motDePasse === motDePasse) || null;
}

// ==================== DÉPENSES ====================
export async function getDepenses() {
  return await requete('/depenses');
}

export async function getDepenseParId(id) {
  return await requete(`/depenses/${id}`);
}

export async function ajouterDepense(depense) {
  return await requete('/depenses', {
    method: 'POST',
    body: JSON.stringify(depense)
  });
}

export async function modifierDepense(id, depense) {
  return await requete(`/depenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(depense)
  });
}

export async function supprimerDepense(id) {
  return await requete(`/depenses/${id}`, {
    method: 'DELETE'
  });
}

// ==================== STATISTIQUES ====================
export async function getStatistiques() {
  return await requete('/statistiques');
}

// ==================== PLATS ====================
export async function getPlats() {
  return await requete('/plats');
}

export async function getPlatParId(id) {
  return await requete(`/plats/${id}`);
}

export async function ajouterPlat(plat) {
  return await requete('/plats', {
    method: 'POST',
    body: JSON.stringify(plat)
  });
}

export async function modifierPlat(id, plat) {
  return await requete(`/plats/${id}`, {
    method: 'PUT',
    body: JSON.stringify(plat)
  });
}

export async function supprimerPlat(id) {
  return await requete(`/plats/${id}`, {
    method: 'DELETE'
  });
}

// ==================== COMMANDES ====================
export async function getCommandes() {
  return await requete('/commandes');
}

export async function getCommandeParId(id) {
  return await requete(`/commandes/${id}`);
}

export async function getCommandesParUtilisateur(userId) {
  const commandes = await getCommandes();
  return commandes
    .filter(c => String(c.userId) === String(userId))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function creerCommande(commande) {
  return await requete('/commandes', {
    method: 'POST',
    body: JSON.stringify(commande)
  });
}

export async function modifierCommande(id, commande) {
  return await requete(`/commandes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(commande)
  });
}

export async function mettreAJourStatutCommande(id, statut) {
  return await requete(`/commandes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: statut })
  });
}

export async function supprimerCommande(id) {
  return await requete(`/commandes/${id}`, {
    method: 'DELETE'
  });
}

// ==================== FAVORIS ====================
export async function getFavoris() {
  return await requete('/favoris');
}

export async function getFavorisParUtilisateur(userId) {
  const favoris = await getFavoris();
  return favoris.filter(f => String(f.userId) === String(userId));
}

export async function getFavoriParId(id) {
  return await requete(`/favoris/${id}`);
}

export async function ajouterFavori(favori) {
  return await requete('/favoris', {
    method: 'POST',
    body: JSON.stringify(favori)
  });
}

export async function supprimerFavori(id) {
  return await requete(`/favoris/${id}`, {
    method: 'DELETE'
  });
}


export async function getPanier(userId) {
  const panier = await requete('/panier');
  return panier.filter(item => String(item.userId) === String(userId));
}

export async function getArticlePanier(id) {
  return await requete(`/panier/${id}`);
}

export async function ajouterAuPanier(article) {
  // Vérifier si l'article existe déjà dans le panier (filtrage côté client)
  const panier = await requete('/panier');
  const existing = panier.filter(item =>
    String(item.userId) === String(article.userId) &&
    String(item.platId) === String(article.platId)
  );

  if (existing.length > 0) {
    // Incrémenter la quantité
    return await requete(`/panier/${existing[0].id}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantite: existing[0].quantite + 1 })
    });
  }

  // Créer un nouvel article
  return await requete('/panier', {
    method: 'POST',
    body: JSON.stringify({ ...article, quantite: 1 })
  });
}

export async function modifierQuantitePanier(id, quantite) {
  if (quantite <= 0) {
    return await supprimerDuPanier(id);
  }
  return await requete(`/panier/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantite })
  });
}

export async function supprimerDuPanier(id) {
  return await requete(`/panier/${id}`, {
    method: 'DELETE'
  });
}

export async function viderPanier(userId) {
  const panier = await getPanier(userId);
  const suppressions = panier.map(item => supprimerDuPanier(item.id));
  await Promise.all(suppressions);
  return { succes: true };
}

export async function getTotalPanier(userId) {
  const panier = await getPanier(userId);
  const plats = await getPlats();
  const platsMap = new Map(plats.map(p => [String(p.id), p]));
  
  let total = 0;
  for (const item of panier) {
    const plat = platsMap.get(String(item.platId));
    if (plat) {
      total += plat.prix * item.quantite;
    }
  }
  return total;
}

export async function getNombreArticlesPanier(userId) {
  const panier = await getPanier(userId);
  return panier.reduce((total, item) => total + item.quantite, 0);
}