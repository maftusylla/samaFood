
import { inscription} from '../../services/auth.js';
import { navigate } from '../../router/router.js';
import {
    validerInscription,
    afficherErreurChamp,
    afficherNotification,
    togglePasswordVisibility
} from '../../utils/utils.js';


const Inscription = () => `
<section class="page-inscription">
  <div class="panneau-gauche">
    <div class="fond-image">
      <img src="images/pizza.jpg" alt=""/>
    </div>
    <div class="fond-degrade"></div>
    <div class="contenu-marque">
      <div class="logo-marque">
       <img src="images/logo.png" style ="width:50px">
        <span class="nom-marque">SamaFood</span>
      </div>
      <div class="slogan-marque">
        <h2>Votre meilleur coin !!</h2>
        <p class="description-marque">Application pour commander votre meilleur plat !!</p>
      </div>
      <div class="carte-badge">
        <div class="icone-badge">
          <svg viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M11 0L13.4817 7.63729H21.5106L15.0145 12.3655L17.4962 20.0028L11 15.2746L4.50385 20.0028L6.98554 12.3655L0.489435 7.63729H8.5183L11 0Z" fill="#FF7A00"/>
          </svg>
        </div>
        <div class="texte-badge">
          <span class="etiquette-badge">Meilleur choix</span>
          <span class="valeur-badge">1500+ Membres</span>
        </div>
      </div>
    </div>
  </div>

  <div class="panneau-droit">
    <div class="conteneur-formulaire">
      <h2 class="titre-formulaire">Créer un compte</h2>
      <div class="separateur-horizontal">
        <hr class="ligne-separateur"/>
        <div class="espace-separateur"></div>
        <hr class="ligne-separateur"/>
      </div>

      <form id="formulaire-inscription" novalidate>

        <div class="groupe-champ">
          <label for="inscription-nom">Nom Complet</label>
          <input id="inscription-nom" type="text" placeholder="Entrez votre nom au complet" autocomplete="name"/>

        </div>

        <div class="groupe-champ">
          <label for="inscription-email">Adresse Email</label>
          <input id="inscription-email" type="email" placeholder="votrenom@example.com" autocomplete="email"/>

        </div>

        <div class="groupe-champ">
          <label for="inscription-telephone">Numéro de téléphone</label>
          <div class="enveloppe-telephone">
            <span class="prefixe-telephone">+221</span>
            <input id="inscription-telephone" type="tel" placeholder="XX XXX XX XX" autocomplete="tel"/>
          </div>

        </div>

        <div class="groupe-champ" style="margin-bottom:0;">
          <label for="inscription-mdp">Mot de passe</label>
          <div class="enveloppe-motdepasse">
            <input id="inscription-mdp" type="password" placeholder="" autocomplete="new-password"/>
            <button type="button" class="bouton-visibilite" aria-label="Afficher le mot de passe">
              <i class="fa-regular fa-eye"></i>
            </button>
          </div>

        </div>

        <div class="rangee-case-a-cocher">
          <input type="checkbox" class="case-a-cocher" id="conditions-utilisation"/>
          <label class="libelle-case" for="conditions-utilisation">
            J'accepte les conditions d'utilisation
          </label>

        </div>

        <button type="submit" class="bouton-creer-compte">Créer un compte</button>

      </form>

      <div class="pied-formulaire">
        Tu as déjà un compte ?
        <a href="#/connexion">Connecte-toi</a>
      </div>
    </div>
  </div>
</section>
`;



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