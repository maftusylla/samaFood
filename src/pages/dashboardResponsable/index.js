const DashboardResponsable = () => `
<section class="tableau-bord-responsable actif">

  <aside class="barre-laterale">
    <div class="barre-laterale-logo">
      <div class="nom-appli">SamaFood</div>
      <div class="role-utilisateur">Admin</div>
    </div>
    <nav class="navigation-principale">
      <div class="element-nav actif-nav">
        <i class="fa-solid fa-qrcode" style="color: rgb(224, 192, 175);"></i>
        Tableau de Bord
                <span class="badge-nav"></span>

      </div>
     
      <div class="element-nav">
       <i class="fa-solid fa-utensils" style="color: rgb(224, 192, 175);"></i>
        Plats
      </div>
      <div class="element-nav">
        <i class="fa-solid fa-cart-shopping" style="color: rgb(224, 192, 175);"></i>
        Commandes
      </div>
      <div class="element-nav">
     <i class="fa-solid fa-box-archive" style="color: rgb(224, 192, 175);"></i> 
      Stocks
      </div>
      <div class="element-nav">
        <i class="fa-solid fa-star"  style="color: rgb(224, 192, 175);"></i>
        Avis Clients
      </div>
      <div class="element-nav">
        <i class="fa-solid fa-recycle" style="color: rgb(224, 192, 175);"></i>
        Anti-Gaspillage
      </div>
    </nav>

    <div class="pied-barre-laterale">
      <div class="element-nav-bas">
        <i class="fa-solid fa-gear"></i>
        Paramètres
      </div>
      <button class="bouton-nouvelle-commande">
        <i class="fa-solid fa-plus"></i>
        Nouvelle Commande
      </button>
      <div class="profil-utilisateur">
        <div class="avatar-utilisateur" id="avatar-responsable">MF</div>
        <div class="infos-profil">
          <div class="nom-profil" id="nom-responsable">Chargement…</div>
          <div class="role-profil">Propriétaire</div>
        </div>
        <button class="bouton-deconnexion" title="Déconnexion" aria-label="Se déconnecter">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    </div>
  </aside>

  <div class="contenu-principal-dashboard">

    <header class="entete-dashboard">
      <div class="barre-recherche-dashboard">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Rechercher des analyses…" aria-label="Rechercher"/>
      </div>
      <div class="controles-entete">
        <div class="bascule-periode">
          <button class="btn-periode actif-periode">Mensuel</button>
          <button class="btn-periode inactif-periode">Trimestriel</button>
        </div>
        <div class="plage-date-dashboard">
          <i class="fa-regular fa-calendar"></i>
          Juin 2026 – Septembre 2026
        </div>
        <div class="bouton-cloche" role="button" tabindex="0" aria-label="Notifications">
          <i class="fa-regular fa-bell"></i>
          <span class="pastille-notif"></span>
        </div>
      </div>
    </header>

    <div class="zone-dashboard">

      <div class="entete-section-dashboard">
        <div>
          <div class="titre-section-dashboard">Analyse Financière</div>
          <div class="sous-titre-section-dashboard">
            Vue d'ensemble de la performance mensuelle de votre établissement.
          </div>
        </div>
        <button class="bouton-rapport">
          <i class="fa-solid fa-arrow-trend-up" style="font-size:12px;color:#FFB68B;"></i>
          Dépenses &amp; Rentabilité
        </button>
      </div>

      <!-- KPI : données injectées depuis le JSON -->
      <div class="grille-kpi">
        <div class="carte-kpi">
          <div class="entete-carte-kpi">
            <div class="icone-kpi"><i class="fa-solid fa-money-bills" style="color: rgb(224, 192, 175);"></i></div>
            <div class="variation-kpi">
              <i class="fa-solid fa-arrow-trend-up" style="font-size:10px;"></i> +12.5%
            </div>
          </div>
          <div class="libelle-kpi">Chiffre d'Affaires</div>
          <div>
            <div class="valeur-kpi" id="kpi-chiffreAffaires">—</div>
            <div class="unite-kpi">FCFA</div>
          </div>
        </div>

        <div class="carte-kpi">
          <div class="entete-carte-kpi">
            <div class="icone-kpi" style="background:rgba(168,85,247,0.1);border-color:rgba(239,68,68,0.2);color:#ef4444;">
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
            <div class="variation-kpi baisse">
              <i class="fa-solid fa-arrow-trend-up" style="font-size:10px;"></i> +4.2%
            </div>
          </div>
          <div class="libelle-kpi">Dépenses Totales</div>
          <div>
            <div class="valeur-kpi" id="kpi-depensesTotales">—</div>
            <div class="unite-kpi">FCFA</div>
          </div>
        </div>

        <div class="carte-kpi">
          <div class="entete-carte-kpi">
            <div class="icone-kpi" style="background:rgba(34,197,94,0.1);border-color:rgba(34,197,94,0.2);color:#22c55e;">
              <i class="fa-solid fa-chart-pie"></i>
            </div>
            <div class="variation-kpi">
              <i class="fa-solid fa-arrow-trend-up" style="font-size:10px;"></i> +18.3%
            </div>
          </div>
          <div class="libelle-kpi">Marge Brute</div>
          <div>
            <div class="valeur-kpi" id="kpi-margeBrute">—</div>
          </div>
        </div>

        <div class="carte-kpi">
          <div class="entete-carte-kpi">
            <div class="icone-kpi" style="background:rgba(168,85,247,0.1);border-color:rgba(168,85,247,0.2);color:#c084fc;">
              <i class="fa-solid fa-sack-dollar"></i>
            </div>
            <div class="variation-kpi">
              <i class="fa-solid fa-arrow-trend-up" style="font-size:10px;"></i> +9.1%
            </div>
          </div>
          <div class="libelle-kpi">Bénéfice Net</div>
          <div>
            <div class="valeur-kpi" id="kpi-beneficeNet">—</div>
            <div class="unite-kpi">FCFA</div>
          </div>
        </div>
      </div>

      <!-- GRAPHIQUES -->
      <div class="rangee-graphiques">
        <div class="carte-graphique">
          <div class="entete-graphique">
            <div>
              <div class="titre-graphique">Évolution Rentabilité</div>
              <div class="sous-titre-graphique">Revenus vs. Dépenses (6 derniers mois)</div>
            </div>
            <div class="legende-graphique">
              <div class="point-legende">
                <div class="cercle-legende" style="background:#D4E4FA;"></div>Revenus
              </div>
              <div class="point-legende">
                <div class="cercle-legende" style="background:#FF7A00;"></div>Dépenses
              </div>
            </div>
          </div>
          <div class="zone-graphique">
            <canvas id="graphique-evolution"></canvas>
          </div>
        </div>

        <div class="carte-graphique">
          <div class="entete-graphique">
            <div><div class="titre-graphique">Répartition des Coûts</div></div>
          </div>
          <div class="zone-donut">
            <div class="conteneur-donut">
              <canvas id="graphique-donut"></canvas>
              <div class="label-centre-donut">
                <span class="pourcentage-donut">100%</span>
                <span class="texte-donut">Total Charges</span>
              </div>
            </div>
            <div class="liste-repartition">
              <div class="ligne-repartition">
                <div class="point-repartition" style="background:#FF7A00;"></div>
                <span class="nom-repartition">Ingrédients</span>
                <span class="pourcent-repartition" id="repartition-ingredients">—</span>
              </div>
              <div class="ligne-repartition">
                <div class="point-repartition" style="background:#3b82f6;"></div>
                <span class="nom-repartition">Personnel</span>
                <span class="pourcent-repartition" id="repartition-personnel">—</span>
              </div>
              <div class="ligne-repartition">
                <div class="point-repartition" style="background:#6b7280;"></div>
                <span class="nom-repartition">Frais Fixes</span>
                <span class="pourcent-repartition" id="repartition-fraisFixes">—</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TABLEAU DES DÉPENSES : données JSON -->
      <div class="carte-tableau">
        <div class="entete-carte-tableau">
          <div class="titre-tableau">Détails des Dépenses Mensuelles</div>
          <button class="bouton-filtre">
            <i class="fa-solid fa-sliders" style="font-size:11px;"></i>
            Filtrer par Catégorie
          </button>
        </div>
        <table class="tableau-depenses">
          <thead>
            <tr>
              <th>Date</th>
              <th>Fournisseur / Type</th>
              <th>Catégorie</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="tableau-depenses-body">
          </tbody>
        </table>
        <div class="pied-tableau">
          <span class="info-pagination" id="info-pagination">Affichage de 0 sur 0 entrées</span>
          <div class="controles-pagination">
            <button class="btn-page" disabled style="color:rgba(224,192,175,0.35);cursor:default;" aria-label="Page précédente">
              <i class="fa-solid fa-chevron-left" style="font-size:10px;"></i>
            </button>
            <button class="btn-page actif-page">1</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
`;

export default DashboardResponsable;












