import Inscription from '../pages/inscription/index.js';
import { inscription } from '../services/auth.js';
import { navigate } from '../router/router.js';
import {
    validerInscription,
    afficherErreurChamp,
    afficherNotification,
    togglePasswordVisibility
} from '../utils/utils.js';

Inscription.afterRender = async () => {
    document.querySelectorAll('.bouton-visibilite').forEach(btn => {
        btn.addEventListener('click', () => togglePasswordVisibility(btn));
    });

    document.getElementById('formulaire-inscription')?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const inputs = {
            nom: document.getElementById('inscription-nom'),
            email: document.getElementById('inscription-email'),
            tel: document.getElementById('inscription-telephone'),
            mdp: document.getElementById('inscription-mdp'),
            checkbox: document.getElementById('conditions-utilisation')
        };

        const nom = inputs.nom?.value || '';
        const email = inputs.email?.value || '';
        const telephone = (inputs.tel?.value || '').replace(/\s/g, '');
        const mdp = inputs.mdp?.value || '';
        const conditions = inputs.checkbox?.checked || false;

        if (!validerInscription(nom, email, telephone, mdp, conditions, inputs)) return;

        const resultat = await inscription(nom, email, telephone, mdp);

        if (resultat.succes) {
            afficherNotification(resultat.message, 'succes');
            navigate('/');
        } else {
            afficherErreurChamp(inputs.email, resultat.message);
        }
    });
};

export default Inscription;
