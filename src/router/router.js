
import { getUtilisateurConnecte } from '../services/auth.js';

const routes = {
  '/': '../scripts/accueil.js',
  '/connexion': '../scripts/connexion.js',
  '/inscription': '../scripts/inscription.js',
  '/dashboard-responsable': '../scripts/dashboardRes.js',
  '/dashboard-client': '../pages/dashboardClient/index.js'
};

const routesProtegees = ['/dashboard-responsable', '/dashboard-client'];

const routesPubliques = ['/', '/connexion', '/inscription'];

const render = async (path) => {
  const app = document.getElementById('app');
  if (!app) return;

  const utilisateur = getUtilisateurConnecte();

  if (routesProtegees.includes(path) && !utilisateur) {
    return navigate('/');
  }

  if (routesPubliques.includes(path) && utilisateur) {
    const destination = utilisateur.role === 'responsable'
      ? '/dashboard-responsable'
      : '/dashboard-client';
    return navigate(destination);
  }

  const cheminModule = routes[path];

  app.innerHTML = `<div class="chargement-page">
    <i class="fa-solid fa-circle-notch fa-spin" style="color:#FF7A00;font-size:32px;"></i>
  </div>`;

  try {
    let pageModule;

    if (!cheminModule) {
      pageModule = await import('../pages/notFound/index.js');
    } else {
      pageModule = await import(cheminModule);
    }

    const pageComponent = pageModule.default;

    app.innerHTML = await pageComponent();
    const toutesLesPages = document.querySelectorAll('.page-accueil,.page-connexion, .page-inscription, .dashboard-client, .tableau-bord-responsable');
    toutesLesPages.forEach(page => {
      page.classList.remove('actif');
    });

    const pageCourante = document.querySelector('.page-connexion, .page-inscription, .dashboard-client, .tableau-bord-responsable');
    if (pageCourante) {
      pageCourante.classList.add('actif');
    }

    const vue = document.querySelector('.vue');
    if (vue) {
      vue.classList.add('actif');
    }

    if (typeof pageComponent.afterRender === 'function') {
      await pageComponent.afterRender();
    }

  } catch (erreur) {
    console.error(`[Router] Erreur de chargement (${path}) :`, erreur);
    app.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;gap:16px;color:#D4E4FA;font-family:Inter,sans-serif;">
      <i class="fa-solid fa-triangle-exclamation" style="font-size:48px;color:#FF7A00;"></i>
      <h2>Erreur technique</h2>
      <p style="color:#E0C0AF;">Impossible de charger cette page.</p>
      <button onclick="window.location.hash='/'" style="padding:10px 20px;background:#FF7A00;color:#522300;border:none;border-radius:8px;cursor:pointer;font-weight:600;">
        Retour à l'accueil
      </button>
    </div>`;
  }
};

export const navigate = (path) => {
  window.location.hash = path;
};

const handleHashChange = async () => {
  const path = window.location.hash.replace('#', '') || '/';
  await render(path);
};
export const initRouter = () => {
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
};
