
import { connexion } from '../../services/auth.js';
import { navigate } from '../../router/router.js';

import {
    validerConnexion,
    afficherErreurChamp,
    afficherNotification,
    togglePasswordVisibility
} from '../../utils/utils.js';


const Connexion = () => `
<section class="page-connexion">
  <div class="logo-samafood">
    <a href="#/" style="display:inline-block;">
      <img src="images/logo.png" alt="SamaFood"/>
    </a>
  </div>
  <div class="carte-connexion">
    <h1 class="titre-connexion">Connexion</h1>
    <p class="sous-titre-connexion">Accédez à votre espace SamaFood</p>

    <form id="formulaire-connexion" novalidate>

      <div class="champ-formulaire">
        <label class="etiquette-champ" for="connexion-email">Adresse Email</label>
        <div class="boite-saisie">
          <span class="icone-champ"><i class="fa-regular fa-envelope"></i></span>
          <input id="connexion-email" type="email" placeholder="exemple@samafood.sn" autocomplete="email"/>
        </div>
          <small class="message-erreur"></small>

      </div>

      <div class="champ-formulaire">
        <label class="etiquette-champ" for="connexion-mdp">Mot de passe</label>
        <div class="boite-saisie">
          <span class="icone-champ"><i class="fa-solid fa-lock"></i></span>
          <input id="connexion-mdp" type="password" placeholder="••••••••" autocomplete="current-password"/>
          <button type="button" class="bouton-oeil" aria-label="Afficher le mot de passe">
            <i class="fa-regular fa-eye"></i>
          </button>
        </div>
          <small class="message-erreur"></small>

      </div>

      <button type="submit" class="bouton-principal">
        Se connecter
        <i class="fa-solid fa-arrow-right"></i>
      </button>

      <a href="#/inscription" class="lien-inscription">S'inscrire ?</a>

    </form>
  </div>
</section>
`;

Connexion.afterRender = async () => {
    document.querySelectorAll('.bouton-oeil').forEach(btn => {
        btn.addEventListener('click', () => togglePasswordVisibility(btn));
    });

    document.getElementById('formulaire-connexion')?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('connexion-email');
        const mdpInput = document.getElementById('connexion-mdp');
        const email = emailInput?.value.trim() || '';
        const mdp = mdpInput?.value || '';

        if (!validerConnexion(email, mdp, emailInput, mdpInput)) return;

        const resultat = await connexion(email, mdp);

        if (resultat.succes) {
            afficherNotification(`Bienvenue ${resultat.utilisateur.nomComplet} !`, 'succes');
            emailInput.value = '';
            mdpInput.value = '';

            navigate(
                resultat.utilisateur.role === 'responsable'
                    ? '/dashboard-responsable'
                    : '/dashboard-client'
            );
        } else {
            afficherErreurChamp(mdpInput, resultat.message);
        }
    });
};


export default Connexion;