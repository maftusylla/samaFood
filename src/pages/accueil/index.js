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

export default Accueil;