// src/pages/dashboardClient/index.js

import { initDashboardClient } from '../../scripts/dashboardClient.js';

const pageDashboardClient = async () => {
  return `
    <div class="dashboard-client vue actif" data-vue="dashboard-client">
      <!-- HEADER -->
      <header class="client-header">
        <div class="logo">
          <span class="logo-main">SamaFood</span>
          <span class="logo-sub">CLIENT</span>
        </div>
        <div class="search-bar">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Rechercher un plat..." id="searchInput">
        </div>
        <div class="header-right">
          <div class="cart-icon" id="cartIcon">
            <i class="fa-solid fa-bag-shopping"></i>
            <span class="cart-count" id="cartCount">0</span>
          </div>
          <div class="user-menu" id="userMenu">
            <div class="user-avatar" id="userAvatar">C</div>
            <div class="user-dropdown" id="userDropdown">
              <a href="#" data-section="profile"><i class="fa-regular fa-user"></i> Mon profil</a>
              <a href="#" data-section="orders"><i class="fa-regular fa-clock"></i> Mes commandes</a>
              <a href="#" data-section="favorites"><i class="fa-regular fa-heart"></i> Favoris</a>
              <hr>
              <a href="#" id="logoutBtn"><i class="fa-solid fa-arrow-right-from-bracket"></i> Déconnexion</a>
            </div>
          </div>
        </div>
      </header>

      <div class="client-main">
        <!-- SIDEBAR -->
        <aside class="client-sidebar">
          <div class="welcome-card">
            <div class="welcome-avatar" id="welcomeAvatar">C</div>
            <h3 id="welcomeMessage">Salut 👋 Client</h3>
            <p>Qu'est-ce qu'on mange aujourd'hui ?</p>
          </div>
          <nav class="sidebar-nav">
            <a href="#" data-section="menu" class="active"><i class="fa-solid fa-utensils"></i> Menu</a>
            <a href="#" data-section="compose"><i class="fa-solid fa-wand-magic"></i> Composer mon plat</a>
            <a href="#" data-section="orders"><i class="fa-regular fa-clock"></i> Mes commandes</a>
            <a href="#" data-section="favorites"><i class="fa-regular fa-heart"></i> Favoris</a>
            <a href="#" data-section="budget"><i class="fa-solid fa-brain"></i> Budget intelligent</a>
            <a href="#" data-section="profile"><i class="fa-regular fa-user"></i> Mon profil</a>
          </nav>
          <div class="promo-sidebar">
            <div class="promo-badge">-20%</div>
            <p>Menu Midi<br><small>12h - 14h</small></p>
          </div>
        </aside>

        <!-- CONTENU PRINCIPAL -->
        <main class="client-content" id="clientContent">
          <!-- SECTION MENU -->
          <div id="menuSection" class="content-section active">
            <div class="categories-bar" id="categoriesBar">
              <button class="categorie-btn active" data-categorie="all"><i class="fa-solid fa-utensils"></i> Tous</button>
              <button class="categorie-btn" data-categorie="traditionnel"><i class="fa-solid fa-bowl-food"></i> Traditionnel</button>
              <button class="categorie-btn" data-categorie="fastfood"><i class="fa-solid fa-burger"></i> Fast-food</button>
              <button class="categorie-btn" data-categorie="pizza"><i class="fa-solid fa-pizza-slice"></i> Pizzas</button>
              <button class="categorie-btn" data-categorie="boissons"><i class="fa-solid fa-mug-saucer"></i> Boissons</button>
            </div>
            <div class="plats-grid" id="platsGrid"></div>
          </div>

          <!-- SECTION COMPOSER MON PLAT -->
          <div id="composeSection" class="content-section">
            <div class="compose-header">
              <h2><i class="fa-solid fa-wand-magic"></i> Composer mon plat</h2>
              <p>Composition libre : assemblez les meilleurs ingrédients pour un plat unique</p>
            </div>
            <div class="compose-grid">
              <div class="compose-options">
                <div class="compose-step">
                  <div class="step-number">01</div>
                  <h3>Choisissez votre base</h3>
                  <div class="step-options" data-step="base">
                    <button class="step-option active" data-value="Riz blanc" data-price="0">🍚 Riz blanc <span>+0 FCFA</span></button>
                    <button class="step-option" data-value="Riz rouge" data-price="200">🍚🔥 Riz rouge <span>+200 FCFA</span></button>
                    <button class="step-option" data-value="Frites" data-price="500">🍟 Frites <span>+500 FCFA</span></button>
                    <button class="step-option" data-value="Couscous" data-price="300">🥗 Couscous <span>+300 FCFA</span></button>
                  </div>
                </div>
                <div class="compose-step">
                  <div class="step-number">02</div>
                  <h3>Ajoutez une protéine</h3>
                  <div class="step-options" data-step="proteine">
                    <button class="step-option active" data-value="Poulet" data-price="1000">🍗 Poulet <span>+1000 FCFA</span></button>
                    <button class="step-option" data-value="Poisson" data-price="1200">🐟 Poisson <span>+1200 FCFA</span></button>
                    <button class="step-option" data-value="Viande" data-price="1500">🥩 Viande <span>+1500 FCFA</span></button>
                    <button class="step-option" data-value="Crevettes" data-price="1800">🦐 Crevettes <span>+1800 FCFA</span></button>
                  </div>
                </div>
                <div class="compose-step">
                  <div class="step-number">03</div>
                  <h3>Sélectionnez une sauce</h3>
                  <div class="step-options" data-step="sauce">
                    <button class="step-option active" data-value="Yassa" data-price="300">🥘 Yassa <span>+300 FCFA</span></button>
                    <button class="step-option" data-value="Mafé" data-price="400">🥜 Mafé <span>+400 FCFA</span></button>
                    <button class="step-option" data-value="Tomate épicée" data-price="300">🍅 Tomate épicée <span>+300 FCFA</span></button>
                  </div>
                </div>
                <div class="compose-step">
                  <div class="step-number">04</div>
                  <h3>Ajoutez des extras</h3>
                  <div class="step-checkboxes">
                    <label><input type="checkbox" data-value="Salade" data-price="200"> 🥗 Salade <span>+200 FCFA</span></label>
                    <label><input type="checkbox" data-value="Fromage" data-price="300"> 🧀 Fromage <span>+300 FCFA</span></label>
                    <label><input type="checkbox" data-value="Bacon" data-price="500"> 🥓 Bacon <span>+500 FCFA</span></label>
                    <label><input type="checkbox" data-value="Oignons grillés" data-price="150"> 🧅 Oignons grillés <span>+150 FCFA</span></label>
                    <label><input type="checkbox" data-value="Oeuf miroir" data-price="500"> 🍳 Oeuf miroir <span>+500 FCFA</span></label>
                  </div>
                </div>
                <div class="compose-step">
                  <div class="step-number">05</div>
                  <h3>Choisissez votre boisson</h3>
                  <div class="step-options" data-step="boisson">
                    <button class="step-option active" data-value="Bissap" data-price="300">🌸 Bissap <span>+300 FCFA</span></button>
                    <button class="step-option" data-value="Bouye" data-price="300">🍊 Bouye <span>+300 FCFA</span></button>
                    <button class="step-option" data-value="Gingembre" data-price="250">🧡 Gingembre <span>+250 FCFA</span></button>
                    <button class="step-option" data-value="Coca-Cola" data-price="300">🥤 Coca-Cola <span>+300 FCFA</span></button>
                  </div>
                </div>
              </div>
              <div class="compose-recap">
                <div class="recap-card">
                  <h3>Votre création</h3>
                  <div class="recap-items" id="composeRecapItems"></div>
                  <div class="recap-total" id="composeTotal">Total: 2 800 FCFA</div>
                  <button class="btn-add-custom" id="addCustomToCart">Ajouter au panier</button>
                </div>
                <div class="delivery-estimate">
                  <i class="fa-regular fa-clock"></i>
                  <div>
                    <span>Livraison estimée</span>
                    <strong>25 - 35 minutes • Plateau, Dakar</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- SECTION COMMANDES -->
          <div id="ordersSection" class="content-section">
            <div class="orders-container" id="ordersContainer"></div>
          </div>

          <!-- SECTION SUIVI COMMANDE -->
          <div id="trackingSection" class="content-section">
            <div class="tracking-container" id="trackingContainer"></div>
          </div>

          <!-- SECTION FAVORIS -->
          <div id="favoritesSection" class="content-section">
            <div class="favorites-container" id="favoritesContainer"></div>
          </div>

          <!-- SECTION BUDGET INTELLIGENT -->
          <div id="budgetSection" class="content-section">
            <div class="budget-container">
              <div class="budget-header">
                <h2><i class="fa-solid fa-brain"></i> Mangez Intelligemment</h2>
                <p>Optimisez votre plaisir en fonction de votre budget. Notre IA compose le menu parfait pour vous.</p>
              </div>
              <div class="budget-slider-container">
                <label>Votre budget :</label>
                <input type="range" id="budgetSlider" min="1000" max="10000" step="500" value="5000">
                <span id="budgetValue">5 000 FCFA</span>
              </div>
              <div class="budget-suggestions" id="budgetSuggestions"></div>
            </div>
          </div>

          <!-- SECTION PROFIL -->
          <div id="profileSection" class="content-section">
            <div class="profile-container">
              <div class="profile-card">
                <h3 style="margin-bottom: 24px;">Mon profil</h3>
                <div class="profile-field"><label>Nom complet</label><input type="text" id="profileNom" placeholder="Votre nom"></div>
                <div class="profile-field"><label>Email</label><input type="email" id="profileEmail" placeholder="votre@email.com"></div>
                <div class="profile-field"><label>Téléphone</label><input type="tel" id="profileTel" placeholder="77 123 45 67"></div>
                <div class="profile-field"><label>Adresse de livraison</label><input type="text" id="profileAdresse" placeholder="Votre adresse"></div>
                <button class="btn-save-profile" id="saveProfileBtn">Enregistrer les modifications</button>
              </div>
            </div>
          </div>
        </main>

        <!-- PANIER DRAWER -->
        <div class="cart-drawer" id="cartDrawer">
          <div class="cart-header">
            <h3><i class="fa-solid fa-bag-shopping"></i> Votre panier</h3>
            <button class="close-cart" id="closeCart"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="cart-items" id="cartItems">
            <div class="cart-empty"><i class="fa-solid fa-bag-shopping"></i><p>Votre panier est vide</p></div>
          </div>
          <div class="cart-delivery-mode">
            <h4>Mode de réception</h4>
            <div class="delivery-options" id="deliveryOptions">
              <label class="delivery-option active" data-mode="livraison" data-fee="1500">
                <input type="radio" name="deliveryMode" value="livraison" checked>
                <i class="fa-solid fa-truck"></i> Livraison
                <span>30-45 min • 1 500 FCFA</span>
              </label>
              <label class="delivery-option" data-mode="emporter" data-fee="0">
                <input type="radio" name="deliveryMode" value="emporter">
                <i class="fa-solid fa-bag-shopping"></i> À emporter
                <span>Prêt dans 15 min • Gratuit</span>
              </label>
              <label class="delivery-option" data-mode="surplace" data-fee="0">
                <input type="radio" name="deliveryMode" value="surplace">
                <i class="fa-solid fa-chair"></i> Sur place
                <span>Table réservée • Gratuit</span>
              </label>
            </div>
          </div>
          <div class="cart-note">
            <h4>Note spéciale</h4>
            <textarea id="specialNote" placeholder="Une préférence particulière ? Moins de piment, couverts en bois, code de porte... Dites-nous tout !"></textarea>
          </div>
          <div class="cart-summary">
            <div class="summary-line"><span>Sous-total</span><span id="cartSubtotal">0 FCFA</span></div>
            <div class="summary-line"><span>Livraison</span><span id="cartDeliveryFee">0 FCFA</span></div>
            <div class="summary-line"><span>Taxe (TVA)</span><span>0 FCFA</span></div>
            <div class="summary-total"><span>Total</span><strong id="cartGrandTotal">0 FCFA</strong></div>
          </div>
          <div class="cart-footer">
            <button class="btn-checkout" id="checkoutBtn">Valider la commande</button>
            <p class="secure-payment"><i class="fa-regular fa-lock"></i> Paiement 100% sécurisé</p>
          </div>
        </div>
      </div>
      <div class="cart-overlay" id="cartOverlay"></div>
    </div>
  `;
};
pageDashboardClient.afterRender = async () => {
  console.log('🔵 afterRender dashboard client appelé');
  await initDashboardClient();
  console.log('🔴 initDashboardClient terminé');
};
//pageDashboardClient.afterRender = initDashboardClient;

export default pageDashboardClient;