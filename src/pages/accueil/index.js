import { navigate } from '../../router/router.js';
const Accueil = () => `
<section class="page-accueil">
  <!-- HEADER -->
  <header class="landing-header" id="header">
    <div class="header-container">
      <div class="logo">
        <span class="logo-main">SamaFood</span>
        <span class="logo-sub">MANAGER</span>
      </div>
      <nav class="nav-menu">
        <a class="nav-link" data-section="home">Accueil</a>
        <a class="nav-link" data-section="plats">Menu</a>
        <a class="nav-link" data-section="apropos">À propos</a>
        <a class="nav-link" data-section="contact">Contact</a>
      </nav>
      <div style="display: flex; align-items: center; gap: 16px;">
        <div class="cart-icon" id="cartIcon">
          <i class="fa-solid fa-bag-shopping"></i>
          <span class="cart-count" id="cartCount">0</span>
        </div>
        <button class="btn-connexion" id="loginBtn">
          <i class="fa-regular fa-user" style="margin-right: 8px;"></i>Connexion
        </button>
        <button class="mobile-menu-btn" id="mobileMenuBtn"><i class="fa-solid fa-bars" style="color: rgb(235, 145, 20);"></i></button>
      </div>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section id="home" class="hero-section">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <div class="hero-text" data-aos="fade-right">
        <div class="hero-badge">
          <i class="fa-solid fa-location-dot"></i>
          <span>Le goût du Sénégal, livré chez vous</span>

        </div>
        <h1 class="hero-title">Des plats <span>délicieux</span><br>livrés chez vous</h1>
        <p>Rapide - Frais - Savoureux. Des centaines de restaurants partenaires te proposent leurs meilleures spécialités : Thiéboudienne, Yassa, Mafé, Dibi et bien plus encore.</p>
        <div class="hero-buttons">
          <button class="btn-connexion" style="background: #FF7A00; color: #522300; border: none;" id="heroOrderBtn">
            <i class="fa-regular fa-bell" style="margin-right: 8px;"></i>Commander
          </button>
        </div>
        <div class="hero-stats" id="statsContainer">
          <div class="stat-item">
            <span class="stat-number" data-target="10000">0</span>
            <span class="stat-label">Clients satisfaits</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" data-target="50">0</span>
            <span class="stat-label">Restaurants</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" data-target="30">0</span>
            <span class="stat-label">Livraison (min)</span>
          </div>
        </div>
      </div>
      <div class="hero-gallery" data-aos="fade-left">
        <div class="floating-card card-1">
          <img src="images/thieb.jpg" alt="Thiéboudienne">
          <h4>Thiéboudienne</h4>
          <div class="price">2 500 FCFA</div>
        </div>
        <div class="floating-card card-2">
          <img src="images/yassa.jpg" alt="Yassa">
          <h4>Yassa Poulet</h4>
          <div class="price">2 200 FCFA</div>
        </div>
        <div class="floating-card card-3">
          <img src="images/pizza.jpg" alt="Pizza">
          <h4>Pizza Royale</h4>
          <div class="price">4 500 FCFA</div>
        </div>
        <div class="floating-card card-4">
          <img src="images/salad.jpg" alt="Salade">
          <h4>Salade César</h4>
          <div class="price">1 800 FCFA</div>
        </div>
        <div class="floating-card card-5">
          <img src="images/mafé.jpg" alt="Mafé">
          <h4>Mafé</h4>
          <div class="price">2 800 FCFA</div>
        </div>
      </div>
    </div>


    
  </section>

  <!-- POURQUOI SamaFood -->
  <section class="section">
    <div class="container">
      <h2 class="section-title">Pourquoi choisir <span>SamaFood</span> ?</h2>
      <p class="section-subtitle">Savourez l'expérience SamaFood !</p>
      <div class="why-grid">
        <div class="why-card" data-aos="zoom-in">
          <div class="why-icon"><i class="fa-solid fa-utensils"></i></div>
          <h3>Plats de qualité</h3>
          <p>Préparés avec soin par  meilleurs chefs</p>
        </div>
        <div class="why-card" data-aos="zoom-in" data-aos-delay="100">
          <div class="why-icon"><i class="fa-solid fa-shield"></i></div>
          <h3>Paiement sécurisé</h3>
          <p>Wave, Orange Money, Free Money</p>
        </div>
        <div class="why-card" data-aos="zoom-in" data-aos-delay="200">
          <div class="why-icon"><i class="fa-regular fa-clock"></i></div>
          <h3>Support 24/7</h3>
          <p>Nous sommes là pour vous</p>
        </div>
        <div class="why-card" data-aos="zoom-in" data-aos-delay="300">
          <div class="why-icon"><i class="fa-solid fa-truck-fast"></i></div>
          <h3>Livraison rapide</h3>
          <p>30 minutes en moyenne</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CATÉGORIES POPULAIRES -->
  <section class="section" style="padding-top: 0;">
    <div class="container">
      <h2 class="section-title">Nos <span>catégories</span></h2>
      <div class="categories-grid" id="categoriesGrid">
        <div class="categorie-card active" data-categorie="all"><i class="fa-solid fa-utensils"></i> Tous</div>
        <div class="categorie-card" data-categorie="senegalais"><i class="fa-solid fa-bowl-food"></i> Sénégalais</div>
        <div class="categorie-card" data-categorie="fastfood"><i class="fa-solid fa-burger"></i> Fast-food</div>
        <div class="categorie-card" data-categorie="pizza"><i class="fa-solid fa-pizza-slice"></i> Pizzas</div>
        <div class="categorie-card" data-categorie="boissons"><i class="fa-solid fa-mug-saucer"></i> Boissons</div>
      </div>
    </div>
  </section>

  <!-- PLATS POPULAIRES -->
  <section id="plats" class="section">
    <div class="container">
      <h2 class="section-title"> Nos <span>plats populaires</span></h2>
      <p class="section-subtitle">Découvrez les favoris de nos clients</p>
      <div class="plats-grid" id="platsGrid"></div>
    </div>
  </section>

  <!-- SECTION COMPOSER MON PLAT -->
<section id="compose-plat" class="section" style="background: rgba(10, 25, 41, 0.3);">
  <div class="container">
    <div class="compose-header">
      <div class="compose-badge">
        <i class="fa-regular fa-gem"></i>
        <span>Exclusivité SamaFood</span>
      </div>
      <h2 class="section-title"> Créez votre <span>repas idéal</span></h2>
      <p class="section-subtitle">Composez votre plat selon vos envies</p>
    </div>

    <div class="compose-grid">
      <!-- PARTIE GAUCHE - Étapes de construction -->
      <div class="compose-steps">
        <div class="step-card">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Choisissez votre base</h3>
            <div class="step-options" data-step="base">
              <button class="step-option active" data-value="Riz blanc" data-price="0">
                <span class="option-icon"></span>
                <span class="option-name">Riz blanc</span>
                <span class="option-price">+0 FCFA</span>
              </button>
              <button class="step-option" data-value="Riz rouge" data-price="200">
                <span class="option-icon"></span>
                <span class="option-name">Riz rouge</span>
                <span class="option-price">+200 FCFA</span>
              </button>
              <button class="step-option" data-value="Frites" data-price="500">
                <span class="option-icon"></span>
                <span class="option-name">Frites</span>
                <span class="option-price">+500 FCFA</span>
              </button>
              <button class="step-option" data-value="Couscous" data-price="300">
                <span class="option-icon"></span>
                <span class="option-name">Couscous</span>
                <span class="option-price">+300 FCFA</span>
              </button>
            </div>
          </div>
        </div>

        <div class="step-card">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Ajoutez une protéine</h3>
            <div class="step-options" data-step="proteine">
              <button class="step-option active" data-value="Poulet" data-price="1000">
                <span class="option-icon"></span>
                <span class="option-name">Poulet</span>
                <span class="option-price">+1000 FCFA</span>
              </button>
              <button class="step-option" data-value="Poisson" data-price="1200">
                <span class="option-icon"></span>
                <span class="option-name">Poisson</span>
                <span class="option-price">+1200 FCFA</span>
              </button>
              <button class="step-option" data-value="Viande" data-price="1500">
                <span class="option-icon"></span>
                <span class="option-name">Viande</span>
                <span class="option-price">+1500 FCFA</span>
              </button>
              <button class="step-option" data-value="Crevettes" data-price="1800">
                <span class="option-icon"></span>
                <span class="option-name">Crevettes</span>
                <span class="option-price">+1800 FCFA</span>
              </button>
            </div>
          </div>
        </div>

        <div class="step-card">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Sélectionnez une sauce</h3>
            <div class="step-options" data-step="sauce">
              <button class="step-option active" data-value="Yassa" data-price="300">
                <span class="option-icon"></span>
                <span class="option-name">Yassa</span>
                <span class="option-price">+300 FCFA</span>
              </button>
              <button class="step-option" data-value="Mafé" data-price="400">
                <span class="option-icon"></span>
                <span class="option-name">Mafé</span>
                <span class="option-price">+400 FCFA</span>
              </button>
              <button class="step-option" data-value="Tomate épicée" data-price="300">
                <span class="option-icon"></span>
                <span class="option-name">Tomate épicée</span>
                <span class="option-price">+300 FCFA</span>
              </button>
              <button class="step-option" data-value="Sauce maison" data-price="500">
                <span class="option-icon"></span>
                <span class="option-name">Sauce maison</span>
                <span class="option-price">+500 FCFA</span>
              </button>
            </div>
          </div>
        </div>

        <div class="step-card">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>Ajoutez des accompagnements</h3>
            <div class="step-checkboxes" data-step="accompagnements">
              <label class="checkbox-option">
                <input type="checkbox" data-value="Salade" data-price="200">
                <span class="checkbox-icon"></span>
                <span class="checkbox-name">Salade</span>
                <span class="checkbox-price">+200 FCFA</span>
              </label>
              <label class="checkbox-option">
                <input type="checkbox" data-value="Oignons grillés" data-price="150">
                <span class="checkbox-icon"></span>
                <span class="checkbox-name">Oignons grillés</span>
                <span class="checkbox-price">+150 FCFA</span>
              </label>
              <label class="checkbox-option">
                <input type="checkbox" data-value="Bananes plantains" data-price="250">
                <span class="checkbox-icon"></span>
                <span class="checkbox-name">Bananes plantains</span>
                <span class="checkbox-price">+250 FCFA</span>
              </label>
              <label class="checkbox-option">
                <input type="checkbox" data-value="Légumes sautés" data-price="300">
                <span class="checkbox-icon"></span>
                <span class="checkbox-name">Légumes sautés</span>
                <span class="checkbox-price">+300 FCFA</span>
              </label>
            </div>
          </div>
        </div>

        <div class="step-card">
          <div class="step-number">5</div>
          <div class="step-content">
            <h3>Choisissez votre boisson</h3>
            <div class="step-options" data-step="boisson">
              <button class="step-option active" data-value="Bissap" data-price="300">
                <span class="option-icon"></span>
                <span class="option-name">Bissap</span>
                <span class="option-price">+300 FCFA</span>
              </button>
              <button class="step-option" data-value="Bouye" data-price="300">
                <span class="option-icon"></span>
                <span class="option-name">Bouye</span>
                <span class="option-price">+300 FCFA</span>
              </button>
              <button class="step-option" data-value="Gingembre" data-price="250">
                <span class="option-icon"></span>
                <span class="option-name">Gingembre</span>
                <span class="option-price">+250 FCFA</span>
              </button>
              <button class="step-option" data-value="Eau minérale" data-price="0">
                <span class="option-icon"></span>
                <span class="option-name">Eau minérale</span>
                <span class="option-price">+0 FCFA</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- PARTIE DROITE - Récapitulatif -->
      <div class="compose-recap">
        <div class="recap-card">
          <div class="recap-header">
            <i class="fa-regular fa-clipboard"></i>
            <h3>Votre création</h3>
            <div class="chef-badge" id="chefBadge" style="display: none;">
               Création du chef
            </div>
          </div>
          
          <div class="recap-content">
            <div class="recap-item">
              <span class="recap-label">Base :</span>
              <span class="recap-value" id="recapBase">Riz blanc</span>
            </div>
            <div class="recap-item">
              <span class="recap-label">Protéine :</span>
              <span class="recap-value" id="recapProteine">Poulet</span>
            </div>
            <div class="recap-item">
              <span class="recap-label">Sauce :</span>
              <span class="recap-value" id="recapSauce">Yassa</span>
            </div>
            <div class="recap-item">
              <span class="recap-label">Accompagnements :</span>
              <span class="recap-value" id="recapAccompagnements">Aucun</span>
            </div>
            <div class="recap-item">
              <span class="recap-label">Boisson :</span>
              <span class="recap-value" id="recapBoisson">Bissap</span>
            </div>
          </div>

          <div class="recap-divider"></div>

          <div class="recap-total">
            <span>Total estimé :</span>
            <strong id="recapTotal">3 300 FCFA</strong>
          </div>

          <button class="btn-composer" id="btnComposer">
            <i class="fa-regular fa-bell"></i>
            Composer mon plat
          </button>
          <p class="recap-note">
            <i class="fa-regular fa-lock"></i> Connectez-vous pour personnaliser et commander
          </p>
        </div>

        <!-- Image du plat qui évolue -->
        <div class="plat-preview">
          <div class="preview-image" id="previewImage">
            <div class="preview-placeholder">
              <i class="fa-solid fa-plate-wheat"></i>
              <span>Votre plat apparaîtra ici</span>
            </div>
          </div>
          <div class="preview-steps" id="previewSteps">
            <div class="preview-step active" data-step="base"></div>
            <div class="preview-step" data-step="proteine"></div>
            <div class="preview-step" data-step="sauce"></div>
            <div class="preview-step" data-step="boisson"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  <!-- PROMOTIONS & COUPONS -->
  <section class="section">
    <div class="container">
      <h2 class="section-title"><span>Promotions</span> du moment</h2>
      <div class="promo-grid">
        <div class="promo-card" data-aos="flip-left">
          <div class="promo-badge">-20%</div>
          <i class="fa-regular fa-clock" style="font-size: 48px;"></i>
          <h3>Menus Midi</h3>
          <p>Sur tous les menus entre 12h et 14h</p>
        </div>
        <div class="promo-card" data-aos="flip-left" data-aos-delay="100">
          <div class="promo-badge">Gratuit</div>
          <i class="fa-solid fa-truck" style="font-size: 48px;"></i>
          <h3>Livraison offerte</h3>
          <p>Dès 5000 FCFA d'achat</p>
        </div>
        <div class="promo-card" data-aos="flip-left" data-aos-delay="200">
          <div class="promo-badge">-15%</div>
          <i class="fa-regular fa-graduation-cap" style="font-size: 48px;"></i>
          <h3>Menu étudiant</h3>
          <p>Sur présentation de la carte étudiant</p>
          <div class="coupon-code">CODE: ETUDIANT15</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ASSISTANT REPAS -->
  <section class="assistant-section" data-aos="fade-up">
    <h2 class="section-title"><span>SamaFood Assistant</span></h2>
    <p>Que veux-tu manger aujourd'hui ?</p>
    <div class="assistant-options">
      <button class="assistant-btn" data-preference="epice"><i class="fa-solid fa-pepper-hot"></i> Épicé</button>
      <button class="assistant-btn" data-preference="leger"><i class="fa-solid fa-leaf"></i> Léger</button>
      <button class="assistant-btn" data-preference="senegalais"><i class="fa-solid fa-bowl-food"></i> Sénégalais</button>
      <button class="assistant-btn" data-preference="rapide"><i class="fa-solid fa-bolt"></i> Rapide</button>
    </div>
    <div class="assistant-result" id="assistantResult">
      <i class="fa-regular fa-lightbulb" style="font-size: 32px; color: #FF7A00;"></i>
      <p id="assistantMessage" style="margin-top: 12px;"></p>
    </div>
  </section>

  <!-- AVIS CLIENTS -->
  <section class="section">
    <div class="container">
      <h2 class="section-title">Ce qu'ils <span>disent de nous</span></h2>
      <p class="section-subtitle">Ils nous font confiance</p>
      <div class="avis-grid" id="avisGrid"></div>
    </div>
  </section>

  <!-- APPLICATION MOBILE -->
  <section class="app-section" data-aos="fade-up">
    <div class="app-content">
      <div>
        <h2 class="section-title" style="text-align: left;"><span>SamaFood</span> sur mobile</h2>
        <p style="margin-bottom: 20px;">Commandez où que vous soyez avec notre application mobile</p>
        <div class="app-features">
          <div class="app-feature"><i class="fa-regular fa-circle-check"></i> Commander en ligne</div>
          <div class="app-feature"><i class="fa-regular fa-circle-check"></i> Suivre la livraison</div>
          <div class="app-feature"><i class="fa-regular fa-circle-check"></i> Paiement mobile</div>
          <div class="app-feature"><i class="fa-regular fa-circle-check"></i> Historique des commandes</div>
        </div>
        <div class="store-buttons">
          <button class="btn-store"><i class="fa-brands fa-google-play"></i> Google Play</button>
          <button class="btn-store"><i class="fa-brands fa-apple"></i> App Store</button>
        </div>
      </div>
      <div class="phone-mockup">
        <img src="images/call.png" alt="Appel SamaFood" />
      </div>
    </div>
  </section>

  <!-- À PROPOS -->
  <section id="apropos" class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
        <div data-aos="fade-right">
          <h2 class="section-title" style="text-align: left;">À propos de <span>SamaFood</span></h2>
          <p style="margin-bottom: 20px; line-height: 1.7;">SamaFood est né d'une passion pour la cuisine sénégalaise et du désir de la rendre accessible à tous. Depuis 2024, nous sélectionnons les meilleurs restaurants partenaires pour vous offrir une expérience culinaire unique.</p>
          <p style="margin-bottom: 30px; line-height: 1.7;">Notre mission : rendre la commande de repas simple, rapide et fiable pour tous les Sénégalais.</p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <span style="background: rgba(255, 122, 0, 0.15); padding: 8px 20px; border-radius: 40px;"><i class="fa-regular fa-bolt"></i> Rapidité</span>
            <span style="background: rgba(255, 122, 0, 0.15); padding: 8px 20px; border-radius: 40px;"><i class="fa-regular fa-star"></i> Qualité</span>
            <span style="background: rgba(255, 122, 0, 0.15); padding: 8px 20px; border-radius: 40px;"><i class="fa-regular fa-hand-peace"></i> Hygiène</span>
            <span style="background: rgba(255, 122, 0, 0.15); padding: 8px 20px; border-radius: 40px;"><i class="fa-regular fa-face-smile"></i> Satisfaction</span>
          </div>
        </div>
        <div data-aos="fade-left">
          <img src="images/accueil.jpg" style="width: 100%; border-radius: 24px;">
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT & CARTE -->
  <section id="contact" class="section" style="background: rgba(10, 25, 41, 0.3);">
    <div class="container">
      <h2 class="section-title">  <i class="fa-solid fa-phone" style="font-size: 42px; color: #FF7A00;"></i>
      <span>Contactez-nous</span></h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 40px;">
        <div style="background: #0a1929; border-radius: 20px; padding: 32px; text-align: center;">
          <i class="fa-solid fa-phone" style="font-size: 42px; color: #FF7A00;"></i>
          <h3 style="margin: 16px 0;">Téléphone</h3>
          <p>+221 78 123 45 67</p>
        </div>
        <div style="background: #0a1929; border-radius: 20px; padding: 32px; text-align: center;">
          <i class="fa-regular fa-envelope" style="font-size: 42px; color: #FF7A00;"></i>
          <h3 style="margin: 16px 0;">Email</h3>
          <p>contact@samafood.com</p>
        </div>
        <div style="background: #0a1929; border-radius: 20px; padding: 32px; text-align: center;">
          <i class="fa-solid fa-location-dot" style="font-size: 42px; color: #FF7A00;"></i>
          <h3 style="margin: 16px 0;">Adresse</h3>
          <p>Dakar, Sénégal</p>
        </div>
      </div>
      <div class="map-container">
        <div class="map-placeholder">
          <i class="fa-solid fa-map" style="font-size: 48px; color: #FF7A00;"></i>
          <p>📍 Dakar, Liberté 6, Sénégal</p>
        </div>
      </div>
    </div>
  </section>

  <!-- NEWSLETTER -->
  <section class="assistant-section" style="margin-top: 0;">
    <h2 class="section-title"><i class="fa-regular fa-envelope" style="font-size: 42px; color: #FF7A00;"></i>
    <span>Newsletter</span></h2>
    <p>Recevez nos offres exclusives</p>
    <div class="newsletter-form">
      <input type="email" placeholder="Votre email" id="newsletterEmail">
      <button id="newsletterBtn">S'abonner</button>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">SamaFood</div>
        <p style="color: rgba(224, 192, 175, 0.6); font-size: 14px;">Le goût du Sénégal, livré chez vous</p>
      </div>
      <div class="footer-col">
        <h4>Liens rapides</h4>
        <a data-section="home">Accueil</a>
        <a data-section="plats">Explorer</a>
        <a data-section="restaurants">Commandes</a>
        <a data-section="apropos">Favoris</a>
        <a data-section="contact">Profil</a>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <a>Livraison</a>
        <a>Réservation</a>
        <a>Promotions</a>
      </div>
      <div class="footer-col">
        <h4>Suivez-nous</h4>
        <div class="social-links">
          <a href="#"><i class="fa-brands fa-instagram"></i></a>
          <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
        <div style="margin-top: 20px;">
          <p><i class="fa-regular fa-clock"></i> 08h - 23h</p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 SamaFood - Tous droits réservés</p>
    </div>
  </footer>

  <!-- BACK TO TOP -->
  <div class="back-top" id="backTop">
    <i class="fa-solid fa-arrow-up"></i>
  </div>

  <!-- MOBILE CALL TO ACTION -->
  <div class="mobile-cta" id="mobileCta">
    <div class="mobile-cta-content">
      <i class="fa-solid fa-phone"></i>
      <div class="mobile-cta-text">
        <h4>Livraison rapide</h4>
        <p>Commandez en quelques clics</p>
      </div>
    </div>
    <button id="mobileOrderBtn">Commander</button>
  </div>

</section>
`;


let navigateToLogin = null;

if (typeof window.navigate === 'function') {
  navigateToLogin = () => window.navigate('/connexion');
} else if (typeof window.navigateTo === 'function') {
  navigateToLogin = () => window.navigateTo('/connexion');
} else {
  navigateToLogin = () => { window.location.hash = '/connexion'; };
}

const plats = [
    { id: 1, nom: "Thiéboudienne", prix: 4500, image: "images/thieb.jpg", categorie: "senegalais" },
    { id: 2, nom: "Yassa Poulet", prix: 4000, image: "images/yassa.jpg", categorie: "senegalais" },
    { id: 3, nom: "Mafé", prix: 4000, image: "images/mafé.jpg", categorie: "senegalais" },
    { id: 4, nom: "Dibi", prix: 3500, image: "images/dibi.jpg", categorie: "senegalais" },
    { id: 5, nom: "Burger Royal", prix: 3500, image: "images/burgerRoyale.jpg", categorie: "fastfood" },
    { id: 6, nom: "Pizza Royale", prix: 4500, image: "images/pizza.jpg", categorie: "pizza" },
    { id: 7, nom: "Jus de Bissap", prix: 1000, image: "images/jus bissap.jpg", categorie: "boissons" },
    { id: 8, nom: "Jus de Bouye", prix: 1000, image: "images/jus bouye.jpg", categorie: "boissons" },
    { id: 9, nom: "Jus de gingembre ananas", prix: 1500, image: "images/gingimbre.jpg", categorie: "boissons" },
    { id: 10, nom: "Pizza dream", prix: 5500, image: "images/pizza2.jpg", categorie: "pizza" },
    { id: 11, nom: "Salade de fruits ", prix: 2000, image: "images/sadedefruits.jpg", categorie: "boissons" },
    { id: 12, nom: "Tacos", prix: 3500, image: "images/tacos.jpg", categorie: "fastfood" },
    { id: 13, nom: "Wraps", prix: 3000, image: "images/wraps.jpg", categorie: "fastfood" }

    
];


const avis = [
    { nom: "Awa Ndiaye", avatar: "A", date: "Il y a 2 jours", note: 5, texte: "Livraison très rapide et plats délicieux ! Je recommande." },
    { nom: "Mamadou Sall", avatar: "M", date: "Il y a 5 jours", note: 5, texte: "Meilleure plateforme de commande à Dakar." },
    { nom: "Fatou Diop", avatar: "F", date: "Il y a 1 semaine", note: 4, texte: "Service impeccable, application très intuitive." }
];

let cartCount = 0;
let currentCategory = "all";
let ecouteursGlobauxInitialises = false;

const renderPlats = () => {
    const filtered = currentCategory === "all" ? plats : plats.filter(p => p.categorie === currentCategory);
    const grid = document.getElementById('platsGrid');
    if (!grid) return;

    grid.innerHTML = filtered.map(p => `
        <div class="plat-card" data-aos="fade-up">
          <img src="${p.image}" alt="${p.nom}">
          <div class="plat-info">
            <h3>${p.nom}</h3>
            <div class="plat-cat">${p.categorie === 'senegalais' ? '🇸🇳 Sénégalais' : p.categorie === 'fastfood' ? '<i class="fa-solid fa-burger" style="color: rgb(235, 145, 20);"></i> Fast-food' : p.categorie === 'pizza' ? '<i class="fa-light fa-pizza-slice fa-lg" style="color: rgb(235, 145, 20);"></i> Pizza' : '<i class="fa-solid fa-wine-glass-empty" style="color: rgb(235, 145, 20);"></i> Boisson'}</div>
            <div class="plat-price">${p.prix.toLocaleString()} FCFA</div>
            <button class="btn-order" data-id="${p.id}" data-nom="${p.nom}">Commander</button>
          </div>
        </div>
    `).join('');

    grid.querySelectorAll('.btn-order').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const nom = btn.getAttribute('data-nom');
            cartCount++;
            const compteur = document.getElementById('cartCount');
            if (compteur) compteur.innerText = cartCount;
            alert(`"${nom}" ajouté au panier !`);
        });
    });

    if (typeof AOS !== 'undefined') AOS.refresh();
};


function initComposePlat() {
  let selections = {
    base: { value: "Riz blanc", price: 0 },
    proteine: { value: "Poulet", price: 1000 },
    sauce: { value: "Yassa", price: 300 },
    accompagnements: [],
    boisson: { value: "Bissap", price: 300 }
  };

  const BASE_PRICE = 2500;

  const recapBase = document.getElementById('recapBase');
  const recapProteine = document.getElementById('recapProteine');
  const recapSauce = document.getElementById('recapSauce');
  const recapAccompagnements = document.getElementById('recapAccompagnements');
  const recapBoisson = document.getElementById('recapBoisson');
  const recapTotal = document.getElementById('recapTotal');
  const chefBadge = document.getElementById('chefBadge');

  function updateTotal() {
    let total = BASE_PRICE;
    total += selections.base.price;
    total += selections.proteine.price;
    total += selections.sauce.price;
    selections.accompagnements.forEach(acc => total += acc.price);
    total += selections.boisson.price;
    
    recapTotal.textContent = total.toLocaleString() + ' FCFA';
    
    const isChefCreation = 
      selections.base.value === "Riz blanc" &&
      selections.proteine.value === "Poulet" &&
      selections.sauce.value === "Yassa" &&
      selections.boisson.value === "Bissap";
    
    chefBadge.style.display = isChefCreation ? 'flex' : 'none';
  }

  function updateRecap() {
    recapBase.textContent = selections.base.value;
    recapProteine.textContent = selections.proteine.value;
    recapSauce.textContent = selections.sauce.value;
    
    if (selections.accompagnements.length === 0) {
      recapAccompagnements.textContent = 'Aucun';
    } else {
      recapAccompagnements.textContent = selections.accompagnements.map(a => a.value).join(', ');
    }
    
    recapBoisson.textContent = selections.boisson.value;
    updateTotal();
    
    updatePreview();
  }

  function updatePreview() {
    const steps = ['base', 'proteine', 'sauce', 'boisson'];
    steps.forEach((step, index) => {
      const stepElement = document.querySelector(`.preview-step[data-step="${step}"]`);
      if (stepElement) {
        setTimeout(() => {
          stepElement.classList.add('active');
        }, index * 300);
      }
    });
  }

  document.querySelectorAll('.step-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.closest('.step-options').dataset.step;
      const value = btn.dataset.value;
      const price = parseInt(btn.dataset.price);
      
      // Désactiver les autres boutons du même groupe
      btn.parentElement.querySelectorAll('.step-option').forEach(b => {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      
      // Mettre à jour les sélections
      if (step === 'base') {
        selections.base = { value, price };
      } else if (step === 'proteine') {
        selections.proteine = { value, price };
      } else if (step === 'sauce') {
        selections.sauce = { value, price };
      } else if (step === 'boisson') {
        selections.boisson = { value, price };
      }
      
      updateRecap();
    });
  });

  // Initialisation des checkboxes d'accompagnements
  document.querySelectorAll('.checkbox-option input').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const value = checkbox.dataset.value;
      const price = parseInt(checkbox.dataset.price);
      const label = checkbox.closest('.checkbox-option');
      
      if (checkbox.checked) {
        selections.accompagnements.push({ value, price });
        label.classList.add('active');
      } else {
        selections.accompagnements = selections.accompagnements.filter(a => a.value !== value);
        label.classList.remove('active');
      }
      
      updateRecap();
    });
  });

  // Bouton composer
   const btnComposer = document.getElementById('btnComposer');
  if (btnComposer) {
    const newBtn = btnComposer.cloneNode(true);
    btnComposer.parentNode.replaceChild(newBtn, btnComposer);
    
    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Vérifier si l'utilisateur est connecté
      const utilisateur = window.Auth?.getUtilisateurConnecte?.();
      
      if (utilisateur) {
        alert(` Votre plat personnalisé a été ajouté au panier !\n\nTotal: ${recapTotal.textContent}`);
      } else {
        // Redirection vers connexion - Méthode fiable
        if (typeof window.navigate === 'function') {
          window.navigate('/connexion');
        } else if (typeof window.navigateTo === 'function') {
          window.navigateTo('/connexion');
        } else {
          window.location.hash = '/connexion';
        }
      }
    });
  }

  // Initialiser les styles des checkboxes
  document.querySelectorAll('.checkbox-option').forEach(opt => {
    const checkbox = opt.querySelector('input');
    if (checkbox && checkbox.checked) {
      opt.classList.add('active');
    }
  });

  updateRecap();
}

const renderAvis = () => {
    const grid = document.getElementById('avisGrid');
    if (!grid) return;

    grid.innerHTML = avis.map(a => `
        <div class="avis-card" data-aos="fade-up">
          <div class="avis-header">
            <div class="avis-avatar">${a.avatar}</div>
            <div>
              <strong>${a.nom}</strong>
              <div class="avis-stars">${'★'.repeat(a.note)}${'☆'.repeat(5 - a.note)}</div>
              <small style="color: rgba(224,192,175,0.4);"><i class="fa-regular fa-calendar-check" style="color: rgb(235, 145, 20);"></i> ${a.date}</small>
            </div>
          </div>
          <p class="avis-text">"${a.texte}"</p>
        </div>
    `).join('');

    if (typeof AOS !== 'undefined') AOS.refresh();
};

const initAssistant = () => {
    const recommendations = {
        epice: "Pour les amateurs d'épices, nous te recommandons le Dibi ou le Yassa Poulet !",
        leger: "Une envie de légèreté ? Essaye la Salade César ou le Jus de Bouye.",
        senegalais: " Un classique sénégalais ? Thiéboudienne, Mafé ou Yassa sont faits pour toi !",
        rapide: "⚡ Pressé ? Opte pour un Burger Royal ou une Pizza qui arrivent en 20 minutes."
    };

    document.querySelectorAll('.assistant-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const pref = btn.getAttribute('data-preference');
            const resultDiv = document.getElementById('assistantResult');
            const messageDiv = document.getElementById('assistantMessage');
            if (messageDiv) messageDiv.innerText = recommendations[pref];
            if (resultDiv) resultDiv.classList.add('show');
        });
    });
};

const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const updateCount = () => {
            count += Math.ceil(target / 50);
            if (count < target) {
                counter.innerText = count;
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

const initCategories = () => {
    document.querySelectorAll('.categorie-card').forEach(cat => {
        cat.addEventListener('click', () => {
            document.querySelectorAll('.categorie-card').forEach(c => c.classList.remove('active'));
            cat.classList.add('active');
            currentCategory = cat.getAttribute('data-categorie');
            renderPlats();
        });
    });
};

const redirectToLogin = () => navigate('/connexion');

const initEcouteursGlobaux = () => {
    if (ecouteursGlobauxInitialises) return;
    ecouteursGlobauxInitialises = true;

    window.addEventListener('scroll', () => {
        document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 50);
        document.getElementById('backTop')?.classList.toggle('visible', window.scrollY > 300);
    });
};

Accueil.afterRender = () => {
    renderPlats();
initComposePlat(); 
   renderAvis();
    initCategories();
    initAssistant();
    initEcouteursGlobaux();

    const statsContainer = document.getElementById('statsContainer');
    if (statsContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(statsContainer);
    }

    document.querySelectorAll('.btn-connexion, #heroOrderBtn, #loginBtn, #mobileOrderBtn').forEach(btn => {
        btn.addEventListener('click', redirectToLogin);
    });

   

    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.getElementById(link.getAttribute('data-section'));
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.getElementById('backTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            if (window.innerWidth <= 768) navMenu.style.flexDirection = 'column';
        });
    }

    document.getElementById('newsletterBtn')?.addEventListener('click', () => {
        const email = document.getElementById('newsletterEmail')?.value;
        if (email) alert('Merci pour votre abonnement !');
        else alert('Veuillez entrer un email valide');
    });

    if (typeof AOS !== 'undefined') AOS.refresh();
};



export default Accueil;