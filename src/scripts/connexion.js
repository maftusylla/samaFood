
import { connexion } from '../services/auth.js';
import { navigate } from '../router/router.js';
import Connexion from '../pages/connexion/index.js';

import {
    validerConnexion,
    afficherErreurChamp,
    afficherNotification,
    togglePasswordVisibility
} from '../utils/utils.js';

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