// src/scripts/dashboardClient.js

import {
  getPlats,
  getUtilisateurParId,
  mettreAJourUtilisateur,
  getCommandesParUtilisateur,
  creerCommande,
  getFavorisParUtilisateur,
  getPanier,
  ajouterAuPanier,
  modifierQuantitePanier,
  supprimerDuPanier,
  getTotalPanier,
  getNombreArticlesPanier
} from '../services/api.js';

import { getUtilisateurConnecte, deconnexion, mettreAJourSession } from '../services/auth.js';
import { navigate } from '../router/router.js';

let utilisateur = null;
let allPlats = [];
let panierItems = [];
let commandesList = [];
let favorisList = [];
let currentCategory = "all";
let currentSearch = "";
let currentDeliveryMode = "livraison";
let currentDeliveryFee = 1500;

// ==================== INITIALISATION ====================
export async function initDashboardClient() {
  utilisateur = getUtilisateurConnecte();
  if (!utilisateur) {
    navigate('/');
    return;
  }

  await new Promise(resolve => setTimeout(resolve, 150));

  await Promise.all([
    chargerPlats(),
    chargerPanier(),
    chargerCommandes(),
    chargerFavoris(),
    chargerProfil()
  ]);

  const prenom = utilisateur.nomComplet?.split(' ')[0] || 'Client';
  const initiale = prenom.charAt(0).toUpperCase();

  const userAvatar = document.getElementById('userAvatar');
  const welcomeAvatar = document.getElementById('welcomeAvatar');
  const welcomeMessage = document.getElementById('welcomeMessage');

  if (userAvatar) userAvatar.textContent = initiale;
  if (welcomeAvatar) welcomeAvatar.textContent = initiale;
  if (welcomeMessage) welcomeMessage.innerHTML = `Salut 👋 ${prenom}`;

  renderPlats();
  await updateCartUI();
  renderOrders();
  renderFavorites();
  initComposePlat();
  initBudgetIntelligent();
  initEventListeners();

  console.log('Dashboard client initialisé avec succès');
}

async function chargerPlats() {
  try {
    allPlats = await getPlats();
    console.log('Plats chargés:', allPlats.length);
  } catch (error) {
    console.error('Erreur chargement plats:', error);
    allPlats = [];
  }
}

async function chargerPanier() {
  try {
    panierItems = await getPanier(utilisateur.id);
    console.log('Panier chargé:', panierItems.length);
  } catch (error) {
    console.error('Erreur chargement panier:', error);
    panierItems = [];
  }
}

async function chargerCommandes() {
  try {
    commandesList = await getCommandesParUtilisateur(utilisateur.id);
    console.log('Commandes chargées:', commandesList.length);
  } catch (error) {
    console.error('Erreur chargement commandes:', error);
    commandesList = [];
  }
}

async function chargerFavoris() {
  try {
    favorisList = await getFavorisParUtilisateur(utilisateur.id);
    console.log('Favoris chargés:', favorisList.length);
  } catch (error) {
    console.error('Erreur chargement favoris:', error);
    favorisList = [];
  }
}

async function chargerProfil() {
  try {
    const userData = await getUtilisateurParId(utilisateur.id);
    if (userData) {
      const profileNom = document.getElementById('profileNom');
      const profileEmail = document.getElementById('profileEmail');
      const profileTel = document.getElementById('profileTel');
      const profileAdresse = document.getElementById('profileAdresse');

      if (profileNom) profileNom.value = userData.nomComplet || '';
      if (profileEmail) profileEmail.value = userData.email || '';
      if (profileTel) profileTel.value = userData.telephone || '';
      if (profileAdresse) profileAdresse.value = userData.adresse || '';
    }
  } catch (error) {
    console.error('Erreur chargement profil:', error);
  }
}

// ==================== PANIER ====================
async function updateCartUI() {
  console.log('🔄 Mise à jour du panier...');

  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartDeliveryFee = document.getElementById('cartDeliveryFee');
  const cartGrandTotal = document.getElementById('cartGrandTotal');

  await chargerPanier();

  const platsMap = new Map(allPlats.map(p => [String(p.id), p]));
  let total = 0;
  for (const item of panierItems) {
    const plat = platsMap.get(String(item.platId));
    const prix = plat ? plat.prix : (item.prix || 0);
    total += prix * (item.quantite || 1);
  }

  const nbArticles = panierItems.reduce((sum, item) => sum + (item.quantite || 1), 0);
  const grandTotal = total + currentDeliveryFee;

  if (cartCount) cartCount.textContent = nbArticles;
  if (cartSubtotal) cartSubtotal.textContent = `${total.toLocaleString()} FCFA`;
  if (cartDeliveryFee) cartDeliveryFee.textContent = `${currentDeliveryFee.toLocaleString()} FCFA`;
  if (cartGrandTotal) cartGrandTotal.textContent = `${grandTotal.toLocaleString()} FCFA`;

  if (cartItems) {
    if (panierItems.length === 0) {
      cartItems.innerHTML = `<div class="cart-empty"><i class="fa-solid fa-bag-shopping"></i><p>Votre panier est vide</p></div>`;
    } else {
      cartItems.innerHTML = panierItems.map(item => {
        const plat = platsMap.get(String(item.platId));
        const nom = plat?.nom || item.nom || 'Plat';
        const prix = plat ? plat.prix : (item.prix || 0);
        return `
          <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
              <h4>${nom}</h4>
              <div class="cart-item-price">${prix.toLocaleString()} FCFA</div>
              ${item.quantite > 1 ? `<small>${item.quantite} x ${prix.toLocaleString()} FCFA</small>` : ''}
            </div>
            <div class="cart-item-actions">
              <button class="cart-qty-btn" data-action="decr" data-id="${item.id}" data-quantite="${item.quantite}">-</button>
              <span class="item-qty">${item.quantite}</span>
              <button class="cart-qty-btn" data-action="incr" data-id="${item.id}" data-quantite="${item.quantite}">+</button>
              <button class="cart-remove" data-id="${item.id}"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  attachCartEvents();
}

function attachCartEvents() {
  document.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.removeEventListener('click', handleQuantityChange);
    btn.addEventListener('click', handleQuantityChange);
  });

  document.querySelectorAll('.cart-remove').forEach(btn => {
    btn.removeEventListener('click', handleRemoveItem);
    btn.addEventListener('click', handleRemoveItem);
  });
}

async function handleQuantityChange(e) {
  const btn = e.currentTarget;
  const action = btn.dataset.action;
  const id = btn.dataset.id;
  let quantite = parseInt(btn.dataset.quantite);

  quantite = action === 'incr' ? quantite + 1 : quantite - 1;

  if (quantite <= 0) {
    await supprimerDuPanier(id);
  } else {
    await modifierQuantitePanier(id, quantite);
  }

  await updateCartUI();
}

async function handleRemoveItem(e) {
  const btn = e.currentTarget;
  const id = btn.dataset.id;
  await supprimerDuPanier(id);
  await updateCartUI();
}

async function ajouterAuPanierHandler(platId, platNom, platPrix) {
  try {
    platId = String(platId);
    const existing = panierItems.find(item => String(item.platId) === platId);

    if (existing) {
      await modifierQuantitePanier(existing.id, existing.quantite + 1);
      showNotification(`${platNom} quantité augmentée !`, 'success');
    } else {
      await ajouterAuPanier({
        userId: utilisateur.id,
        platId: platId,
        nom: platNom,
        prix: platPrix,
        quantite: 1
      });
      showNotification(`${platNom} ajouté au panier !`, 'success');
    }

    await updateCartUI();
  } catch (error) {
    console.error('Erreur ajout au panier:', error);
    showNotification('Erreur lors de l\'ajout au panier', 'error');
  }
}

// ==================== PLATS ====================
function renderPlats() {
  let filtered = [...allPlats];
  if (currentCategory !== "all") filtered = filtered.filter(p => p.categorie === currentCategory);
  if (currentSearch) filtered = filtered.filter(p => p.nom.toLowerCase().includes(currentSearch.toLowerCase()));

  const grid = document.getElementById('platsGrid');
  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state"><i class="fa-regular fa-face-frown"></i><p>Aucun plat trouvé</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map(plat => `
    <div class="plat-card">
      <div class="plat-image">
        <img src="${plat.image || 'images/tacos.jpg'}" alt="${plat.nom}">
        <span class="plat-popularite"> ${plat.popularite || 85}%</span>
      </div>
      <div class="plat-info">
        <h3>${plat.nom}</h3>
        <p class="plat-description">${plat.description || 'Délicieux plat préparé avec soin'}</p>
        <div class="plat-footer">
          <span class="plat-prix">${plat.prix.toLocaleString()} FCFA</span>
          <button class="btn-add-cart" data-id="${plat.id}" data-nom="${plat.nom}" data-prix="${plat.prix}">
            <i class="fa-solid fa-plus"></i> Ajouter
          </button>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.removeEventListener('click', handleAddToCart);
    btn.addEventListener('click', handleAddToCart);
  });
}

function handleAddToCart(e) {
  const btn = e.currentTarget;
  const id = btn.dataset.id;
  const nom = btn.dataset.nom;
  const prix = parseInt(btn.dataset.prix);
  ajouterAuPanierHandler(id, nom, prix);
}

// ==================== COMMANDES ====================
function renderOrders() {
  const container = document.getElementById('ordersContainer');
  if (!container) return;

  if (commandesList.length === 0) {
    container.innerHTML = `<div class="empty-state"><i class="fa-regular fa-clock"></i><h3>Aucune commande</h3><p>Vos commandes apparaîtront ici</p></div>`;
  } else {
    container.innerHTML = commandesList.map(order => `
      <div class="order-card">
        <div class="order-header">
          <span class="order-number">#${order.id}</span>
          <span class="order-status ${order.status}">${getStatusText(order.status)}</span>
        </div>
        <div class="order-details">
          <p>${order.items?.length || 0} articles</p>
          <p class="order-total">${order.total.toLocaleString()} FCFA</p>
        </div>
        <div class="order-date">${new Date(order.date).toLocaleDateString('fr-FR')} • ${new Date(order.date).toLocaleTimeString()}</div>
        <button class="btn-track" data-order='${JSON.stringify(order)}'>Suivre la commande</button>
      </div>
    `).join('');

    document.querySelectorAll('.btn-track').forEach(btn => {
      btn.removeEventListener('click', handleTrackOrder);
      btn.addEventListener('click', handleTrackOrder);
    });
  }
}

function handleTrackOrder(e) {
  const btn = e.currentTarget;
  showTracking(JSON.parse(btn.dataset.order));
}

function getStatusText(status) {
  const map = { en_attente: 'En attente', en_preparation: 'En préparation', en_livraison: 'En livraison', livree: 'Livrée' };
  return map[status] || status;
}

function getEstimatedDelivery(date) {
  const d = new Date(date);
  const start = new Date(d.getTime() + 25 * 60000);
  const end = new Date(d.getTime() + 35 * 60000);
  return `${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`;
}

async function showTracking(order) {
  changeSection('tracking');
  const container = document.getElementById('trackingContainer');
  if (!container) return;

  const isActive = order.status !== 'livree';

  container.innerHTML = `
    <div class="tracking-card">
      <div class="tracking-header">
        <h3>COMMANDE EN COURS</h3>
        <span class="tracking-number">#${order.id}</span>
      </div>
      <div class="tracking-estimated">
        <i class="fa-regular fa-clock"></i>
        <div><span>Arrivée estimée</span><strong>${getEstimatedDelivery(order.date)}</strong></div>
      </div>
      <div class="tracking-steps">
        <div class="tracking-step ${order.status !== 'en_attente' ? 'completed' : ''}">
          <div class="step-icon"><i class="fa-regular fa-circle-check"></i></div>
          <div class="step-content">
            <strong>${order.status === 'en_attente' ? 'ACTION EN COURS' : 'TERMINÉ'}</strong>
            <span>${order.status === 'en_attente' ? 'En attente de validation' : new Date(order.date).toLocaleTimeString()}</span>
            <p>Commande validée - Votre paiement a été confirmé</p>
          </div>
        </div>
        <div class="tracking-step ${order.status === 'en_preparation' ? 'active' : order.status !== 'en_attente' ? 'completed' : ''}">
          <div class="step-icon"><i class="fa-solid fa-utensils"></i></div>
          <div class="step-content">
            <strong>${order.status === 'en_preparation' ? 'ACTION EN COURS' : order.status !== 'en_attente' ? 'TERMINÉ' : 'PROCHAINE ÉTAPE'}</strong>
            <span>${order.status === 'en_preparation' ? 'En cours de préparation' : 'En Préparation'}</span>
            <p>Le chef prépare vos plats avec des ingrédients frais du marché.</p>
          </div>
        </div>
        <div class="tracking-step ${order.status === 'en_livraison' ? 'active' : order.status === 'livree' ? 'completed' : ''}">
          <div class="step-icon"><i class="fa-solid fa-truck"></i></div>
          <div class="step-content">
            <strong>${order.status === 'en_livraison' ? 'ACTION EN COURS' : order.status === 'livree' ? 'TERMINÉ' : 'PROCHAINE ÉTAPE'}</strong>
            <span>En cours de livraison</span>
            <p>Moussa a récupéré votre commande et se trouve actuellement à 5 minutes de votre position.</p>
          </div>
        </div>
        <div class="tracking-step ${order.status === 'livree' ? 'completed' : ''}">
          <div class="step-icon"><i class="fa-regular fa-circle-check"></i></div>
          <div class="step-content">
            <strong>${order.status === 'livree' ? 'TERMINÉ' : 'PROCHAINE ÉTAPE'}</strong>
            <span>Livré</span>
            <p>Une fois livré, n'oubliez pas de noter la qualité du repas et le service du livreur.</p>
          </div>
        </div>
      </div>
      ${isActive ? `
        <div class="tracking-delivery-man">
          <div class="delivery-avatar">MD</div>
          <div><strong>Moussa Diouf</strong><div class="delivery-rating">★★★★★ 4.9 (1.2k avis)</div></div>
        </div>
      ` : ''}
      <div class="tracking-actions">
        <button class="btn-outline" id="trackingInvoiceBtn"><i class="fa-regular fa-receipt"></i> Facture</button>
        <button class="btn-outline" id="trackingShareBtn"><i class="fa-regular fa-share-nodes"></i> Partager</button>
        <button class="btn-primary" id="trackingSupportBtn"><i class="fa-regular fa-headset"></i> Contacter</button>
      </div>
      ${isActive ? `<p class="tracking-update"><i class="fa-regular fa-bell"></i> Statut mis à jour : Votre livreur est maintenant dans votre rue.</p>` : ''}
    </div>
  `;

  document.getElementById('trackingInvoiceBtn')?.addEventListener('click', () => showNotification('Facture téléchargée', 'success'));
  document.getElementById('trackingShareBtn')?.addEventListener('click', () => showNotification('Lien partagé !', 'success'));
  document.getElementById('trackingSupportBtn')?.addEventListener('click', () => showNotification('Support contacté', 'info'));
}

async function validerCommande() {
  if (panierItems.length === 0) {
    showNotification('Votre panier est vide', 'error');
    return;
  }

  try {
    const platsMap = new Map(allPlats.map(p => [String(p.id), p]));
    let total = 0;
    for (const item of panierItems) {
      const plat = platsMap.get(String(item.platId));
      const prix = plat ? plat.prix : (item.prix || 0);
      total += prix * (item.quantite || 1);
    }

    const specialNote = document.getElementById('specialNote')?.value || '';
    const grandTotal = total + currentDeliveryFee;

    const newCommande = {
      userId: utilisateur.id,
      date: new Date().toISOString(),
      status: 'en_attente',
      total: grandTotal,
      deliveryMode: currentDeliveryMode,
      deliveryFee: currentDeliveryFee,
      specialNote: specialNote,
      items: panierItems.map(item => ({
        platId: String(item.platId),
        nom: item.nom,
        quantite: item.quantite
      }))
    };

    await creerCommande(newCommande);

    for (const item of panierItems) {
      await supprimerDuPanier(item.id);
    }

    await chargerPanier();
    await chargerCommandes();
    await updateCartUI();
    renderOrders();

    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartDrawer) cartDrawer.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');

    showNotification('Commande validée avec succès !', 'success');
    changeSection('orders');
  } catch (error) {
    console.error('Erreur validation:', error);
    showNotification('Erreur lors de la validation', 'error');
  }
}

// ==================== FAVORIS ====================
function renderFavorites() {
  const container = document.getElementById('favoritesContainer');
  if (!container) return;

  if (favorisList.length === 0) {
    container.innerHTML = `<div class="empty-state"><i class="fa-regular fa-heart"></i><h3>Aucun favori</h3><p>Ajoutez vos plats préférés</p></div>`;
  } else {
    const platsMap = new Map(allPlats.map(p => [String(p.id), p]));
    container.innerHTML = `<div class="favorites-grid">${favorisList.map(fav => {
      const plat = platsMap.get(String(fav.platId));
      return plat ? `
        <div class="plat-card">
          <img src="${plat.image}" alt="${plat.nom}">
          <div class="plat-info">
            <h3>${plat.nom}</h3>
            <p class="plat-prix">${plat.prix.toLocaleString()} FCFA</p>
            <button class="btn-add-cart-fav" data-id="${plat.id}" data-nom="${plat.nom}" data-prix="${plat.prix}">Ajouter au panier</button>
          </div>
        </div>
      ` : '';
    }).join('')}</div>`;

    document.querySelectorAll('.btn-add-cart-fav').forEach(btn => {
      btn.removeEventListener('click', handleAddToCartFav);
      btn.addEventListener('click', handleAddToCartFav);
    });
  }
}

function handleAddToCartFav(e) {
  const btn = e.currentTarget;
  const id = btn.dataset.id;
  const nom = btn.dataset.nom;
  const prix = parseInt(btn.dataset.prix);
  ajouterAuPanierHandler(id, nom, prix);
}

// ==================== COMPOSER MON PLAT ====================
function initComposePlat() {
  const BASE_PRICE = 2500;
  let selections = {
    base: { value: "Riz blanc", price: 0 },
    proteine: { value: "Poulet", price: 1000 },
    sauce: { value: "Yassa", price: 300 },
    boisson: { value: "Bissap", price: 300 },
    extras: []
  };

  function updateRecap() {
    let total = BASE_PRICE + selections.base.price + selections.proteine.price + selections.sauce.price + selections.boisson.price;
    selections.extras.forEach(e => total += e.price);

    const recapDiv = document.getElementById('composeRecapItems');
    const totalDiv = document.getElementById('composeTotal');
    if (recapDiv) {
      recapDiv.innerHTML = `
        <div class="recap-item"><span>Base:</span><strong>${selections.base.value}</strong></div>
        <div class="recap-item"><span>Protéine:</span><strong>${selections.proteine.value}</strong></div>
        <div class="recap-item"><span>Sauce:</span><strong>${selections.sauce.value}</strong></div>
        <div class="recap-item"><span>Boisson:</span><strong>${selections.boisson.value}</strong></div>
        <div class="recap-item"><span>Extras:</span><strong>${selections.extras.length ? selections.extras.map(e => e.value).join(', ') : 'Aucun'}</strong></div>
      `;
    }
    if (totalDiv) totalDiv.textContent = `Total: ${total.toLocaleString()} FCFA`;
    return total;
  }

  document.querySelectorAll('.step-option').forEach(btn => {
    btn.removeEventListener('click', handleStepOption);
    btn.addEventListener('click', handleStepOption);

    function handleStepOption() {
      const step = btn.closest('.step-options').dataset.step;
      const value = btn.dataset.value;
      const price = parseInt(btn.dataset.price);

      btn.parentElement.querySelectorAll('.step-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (step === 'base') selections.base = { value, price };
      else if (step === 'proteine') selections.proteine = { value, price };
      else if (step === 'sauce') selections.sauce = { value, price };
      else if (step === 'boisson') selections.boisson = { value, price };

      updateRecap();
    }
  });

  document.querySelectorAll('.step-checkboxes input').forEach(cb => {
    cb.removeEventListener('change', handleCheckboxChange);
    cb.addEventListener('change', handleCheckboxChange);

    function handleCheckboxChange() {
      const value = cb.dataset.value;
      const price = parseInt(cb.dataset.price);
      if (cb.checked) selections.extras.push({ value, price });
      else selections.extras = selections.extras.filter(e => e.value !== value);
      updateRecap();
    }
  });

  const addBtn = document.getElementById('addCustomToCart');
  if (addBtn) {
    addBtn.removeEventListener('click', handleAddCustom);
    addBtn.addEventListener('click', handleAddCustom);
  }

  function handleAddCustom() {
    const total = updateRecap();
    const platNom = `${selections.base.value} + ${selections.proteine.value} + ${selections.sauce.value}`;
    ajouterAuPanierHandler(Date.now(), platNom, total);
    showNotification('Votre plat personnalisé a été ajouté au panier !', 'success');
  }

  updateRecap();
}

// ==================== BUDGET INTELLIGENT ====================
function initBudgetIntelligent() {
  const budgetSlider = document.getElementById('budgetSlider');
  const budgetValue = document.getElementById('budgetValue');
  const suggestionsContainer = document.getElementById('budgetSuggestions');

  const combos = [
    { nom: "Classic Royale Burger", prix: 3300, items: "Frites Maison + Coca-Cola 33cl", badge: "Best-Seller", image: "🍔" },
    { nom: "Pizza Marguerita Solo", prix: 2800, items: "Pizza individuelle + Jus d'orange frais", badge: null, image: "🍕" },
    { nom: "Pause Douceur", prix: 1500, items: "Gaufre au chocolat + Milkshake Vanille", badge: null, image: "🍰" },
    { nom: "Sama Bowl", prix: 3000, items: "Riz, poulet grillé, avocat, sauce mangue", badge: null, image: "🥗" },
    { nom: "Thiéboudienne Express", prix: 4500, items: "Thiéboudienne + Jus de Bissap", badge: "Populaire", image: "🍛" }
  ];

  function updateSuggestions(budget) {
    if (!suggestionsContainer) return;
    const compatible = combos.filter(c => c.prix <= budget);
    suggestionsContainer.innerHTML = compatible.map(combo => `
      <div class="budget-card">
        <div class="budget-card-header">
          <div class="budget-card-icon">${combo.image}</div>
          <div><h3>${combo.nom}</h3><p>${combo.items}</p></div>
          ${combo.badge ? `<span class="budget-badge">${combo.badge}</span>` : ''}
        </div>
        <div class="budget-card-footer">
          <span class="budget-price">${combo.prix.toLocaleString()} FCFA</span>
          <button class="btn-add-cart-budget" data-nom="${combo.nom}" data-prix="${combo.prix}">Ajouter</button>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.btn-add-cart-budget').forEach(btn => {
      btn.removeEventListener('click', handleAddBudget);
      btn.addEventListener('click', handleAddBudget);
    });
  }

  function handleAddBudget(e) {
    const btn = e.currentTarget;
    ajouterAuPanierHandler(Date.now() + Math.random(), btn.dataset.nom, parseInt(btn.dataset.prix));
  }

  if (budgetSlider) {
    budgetSlider.removeEventListener('input', handleBudgetInput);
    budgetSlider.addEventListener('input', handleBudgetInput);

    function handleBudgetInput(e) {
      const val = parseInt(e.target.value);
      if (budgetValue) budgetValue.textContent = `${val.toLocaleString()} FCFA`;
      updateSuggestions(val);
    }
    updateSuggestions(5000);
  }
}

// ==================== PROFIL ====================
async function saveProfile() {
  try {
    const profileNom = document.getElementById('profileNom');
    const profileEmail = document.getElementById('profileEmail');
    const profileTel = document.getElementById('profileTel');
    const profileAdresse = document.getElementById('profileAdresse');

    const updatedUser = {
      ...utilisateur,
      nomComplet: profileNom?.value || '',
      email: profileEmail?.value || '',
      telephone: profileTel?.value || '',
      adresse: profileAdresse?.value || ''
    };

    await mettreAJourUtilisateur(utilisateur.id, updatedUser);
    
    // Mettre à jour la session locale et le stockage
    utilisateur = mettreAJourSession(updatedUser);

    const prenom = utilisateur.nomComplet?.split(' ')[0] || 'Client';
    const userAvatar = document.getElementById('userAvatar');
    const welcomeAvatar = document.getElementById('welcomeAvatar');
    const welcomeMessage = document.getElementById('welcomeMessage');

    if (userAvatar) userAvatar.textContent = prenom.charAt(0).toUpperCase();
    if (welcomeAvatar) welcomeAvatar.textContent = prenom.charAt(0).toUpperCase();
    if (welcomeMessage) welcomeMessage.innerHTML = `Salut 👋 ${prenom}`;

    showNotification('Profil mis à jour !', 'success');
  } catch (error) {
    console.error('Erreur sauvegarde profil:', error);
    showNotification('Erreur lors de la mise à jour', 'error');
  }
}

// ==================== NAVIGATION ====================
function changeSection(sectionId) {
  const sections = ['menu', 'compose', 'orders', 'tracking', 'favorites', 'budget', 'profile'];
  sections.forEach(s => {
    const section = document.getElementById(`${s}Section`);
    if (section) section.classList.remove('active');
  });

  const activeSection = document.getElementById(`${sectionId}Section`);
  if (activeSection) activeSection.classList.add('active');

  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === sectionId) link.classList.add('active');
  });
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'success') {
  const notif = document.createElement('div');
  notif.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'info' ? 'fa-circle-info' : 'fa-circle-exclamation'}"></i> ${message}`;
  notif.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; 
    background: ${type === 'success' ? '#22c55e' : type === 'info' ? '#3b82f6' : '#ef4444'};
    color: white; padding: 12px 20px; border-radius: 8px; 
    z-index: 2000; animation: fadeInUp 0.3s ease; font-weight: 500;
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

// ==================== ÉVÉNEMENTS ====================
function initEventListeners() {
  // Catégories
  document.querySelectorAll('.categorie-btn').forEach(btn => {
    btn.removeEventListener('click', handleCategoryClick);
    btn.addEventListener('click', handleCategoryClick);
  });

  function handleCategoryClick(e) {
    const btn = e.currentTarget;
    document.querySelectorAll('.categorie-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.categorie;
    renderPlats();
  }

  // Recherche
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.removeEventListener('input', handleSearch);
    searchInput.addEventListener('input', handleSearch);
  }

  function handleSearch(e) {
    currentSearch = e.target.value;
    renderPlats();
  }

  // Navigation sidebar
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.removeEventListener('click', handleNavClick);
    link.addEventListener('click', handleNavClick);
  });

  function handleNavClick(e) {
    e.preventDefault();
    changeSection(e.currentTarget.dataset.section);
  }

  // Mode de livraison
  document.querySelectorAll('.delivery-option').forEach(opt => {
    opt.removeEventListener('click', handleDeliveryMode);
    opt.addEventListener('click', handleDeliveryMode);
  });

  function handleDeliveryMode(e) {
    const opt = e.currentTarget;
    document.querySelectorAll('.delivery-option').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    const radio = opt.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
    currentDeliveryMode = opt.dataset.mode;
    currentDeliveryFee = parseInt(opt.dataset.fee);
    updateCartUI();
  }

  // Panier drawer
  const cartIcon = document.getElementById('cartIcon');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCart = document.getElementById('closeCart');

  if (cartIcon) {
    cartIcon.removeEventListener('click', openCart);
    cartIcon.addEventListener('click', openCart);
  }
  if (closeCart) {
    closeCart.removeEventListener('click', closeCartHandler);
    closeCart.addEventListener('click', closeCartHandler);
  }
  if (cartOverlay) {
    cartOverlay.removeEventListener('click', closeCartHandler);
    cartOverlay.addEventListener('click', closeCartHandler);
  }

  function openCart() {
    if (cartDrawer) cartDrawer.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('open');
  }

  function closeCartHandler() {
    if (cartDrawer) cartDrawer.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
  }

  // Checkout
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.removeEventListener('click', validerCommande);
    checkoutBtn.addEventListener('click', validerCommande);
  }

  // Sauvegarde profil
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  if (saveProfileBtn) {
    saveProfileBtn.removeEventListener('click', saveProfile);
    saveProfileBtn.addEventListener('click', saveProfile);
  }

  // ==================== DÉCONNEXION (CORRIGÉE) ====================
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.removeEventListener('click', handleLogout);
    logoutBtn.addEventListener('click', handleLogout);
  }

  function handleLogout(e) {
    e.preventDefault();
    console.log('🔴 Déconnexion - suppression sessionStorage');
    deconnexion();           // Vide sessionStorage
    navigate('/');           // Redirection via routeur
  }

  // Dropdown utilisateur
  const userMenu = document.getElementById('userMenu');
  const userDropdown = document.getElementById('userDropdown');
  if (userMenu && userDropdown) {
    userMenu.removeEventListener('click', toggleDropdown);
    userMenu.addEventListener('click', toggleDropdown);
    document.removeEventListener('click', closeDropdown);
    document.addEventListener('click', closeDropdown);
  }

  function toggleDropdown(e) {
    e.stopPropagation();
    userDropdown.classList.toggle('open');
  }

  function closeDropdown() {
    userDropdown.classList.remove('open');
  }
}

// Exporter les fonctions nécessaires
export { updateCartUI, chargerPanier };