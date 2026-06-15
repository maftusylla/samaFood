import Accueil from '../pages/accueil/index.js';
import { navigate } from '../router/router.js';

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