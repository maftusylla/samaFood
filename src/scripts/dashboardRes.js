import DashboardResponsable from '../pages/dashboardResponsable/index.js';
import { getUtilisateurConnecte, deconnexion } from '../services/auth.js';
import { getDepenses, getStatistiques } from '../services/api.js';
import { navigate } from '../router/router.js';
import { afficherNotification, formaterMontant, formaterDate } from '../utils/utils.js';

function _ligneDepense(d) {
    const [annee] = d.date.split('-');
    const dateObj = new Date(d.date);
    const moisFr = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
    const badges = { alimentaire: 'badge-alimentaire', electricite: 'badge-electricite', personnel: 'badge-personnel', maintenance: 'badge-maintenance' };
    const statuts = { paye: 'statut-paye', 'en-cours': 'statut-en-cours' };
    const labels = { paye: 'Payé', 'en-cours': 'En Cours' };

    return `
	<tr>
		<td>
			<div class="date-tableau">${moisFr}</div>
			<div class="date-annee-tableau">${annee}</div>
		</td>
		<td>
			<div class="fournisseur-tableau">
				<div class="icone-fournisseur">${d.icone}</div>
				<span class="nom-fournisseur">${d.fournisseur}</span>
			</div>
		</td>
		<td>
			<span class="badge-categorie ${badges[d.categorie] || ''}">
				${d.categorie.charAt(0).toUpperCase() + d.categorie.slice(1)}
			</span>
		</td>
		<td><span class="montant-tableau">${formaterMontant(d.montant)}</span></td>
		<td>
			<div class="statut-tableau ${statuts[d.statut] || ''}">
				<span class="pastille-statut"></span>${labels[d.statut] || d.statut}
			</div>
		</td>
		<td>
			<button class="bouton-action-tableau" aria-label="Actions">
				<i class="fa-solid fa-ellipsis"></i>
			</button>
		</td>
	</tr>`;
}

function _initialiserGraphiques(stats) {
    const canvasEvolution = document.getElementById('graphique-evolution');
    const canvasDonut = document.getElementById('graphique-donut');

    if (canvasEvolution && typeof Chart !== 'undefined') {
        new Chart(canvasEvolution, {
            type: 'line',
            data: {
                labels: stats.evolution.labels,
                datasets: [
                    {
                        label: 'Revenus',
                        data: stats.evolution.revenus,
                        borderColor: '#D4E4FA',
                        backgroundColor: 'rgba(212,228,250,0.1)',
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: '#D4E4FA',
                        pointBorderColor: '#051424'
                    },
                    {
                        label: 'Dépenses',
                        data: stats.evolution.depenses,
                        borderColor: '#FF7A00',
                        backgroundColor: 'rgba(255,122,0,0.05)',
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: '#FF7A00',
                        pointBorderColor: '#051424'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { color: '#E0C0AF', callback: v => `${(v / 1000000).toFixed(1)}M` }
                    },
                    x: { grid: { display: false }, ticks: { color: '#E0C0AF' } }
                }
            }
        });
    }

    if (canvasDonut && typeof Chart !== 'undefined') {
        const r = stats.repartitionCouts;
        new Chart(canvasDonut, {
            type: 'doughnut',
            data: {
                labels: ['Ingrédients', 'Personnel', 'Frais Fixes'],
                datasets: [{ data: [r.ingredients, r.personnel, r.fraisFixes], backgroundColor: ['#FF7A00', '#3b82f6', '#6b7280'], borderWidth: 0, borderRadius: 4 }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '65%',
                plugins: { legend: { display: false } }
            }
        });
    }
}

DashboardResponsable.afterRender = async () => {
    const utilisateur = getUtilisateurConnecte();
    if (utilisateur) {
        const initiales = utilisateur.nomComplet
            .split(' ').map(m => m[0]).join('').toUpperCase().slice(0, 2);
        const el = document.getElementById('nom-responsable');
        const av = document.getElementById('avatar-responsable');
        if (el) el.textContent = utilisateur.nomComplet.split(' ')[0];
        if (av) av.textContent = initiales;
    }

    document.querySelector('.bouton-deconnexion')?.addEventListener('click', (e) => {
        e.preventDefault();
        deconnexion();
        afficherNotification('Déconnexion réussie', 'succes');
        navigate('/');
    });

    const stats = await getStatistiques();
    const depenses = await getDepenses();

    // Remplir les KPI
    const elChiffreAffaires = document.getElementById('kpi-chiffreAffaires');
    if (elChiffreAffaires) {
        elChiffreAffaires.textContent = stats.kpi?.chiffreAffaires ? stats.kpi.chiffreAffaires.toLocaleString('fr-FR') : '—';
    }
    const elDepensesTotales = document.getElementById('kpi-depensesTotales');
    if (elDepensesTotales) {
        elDepensesTotales.textContent = stats.kpi?.depensesTotales ? stats.kpi.depensesTotales.toLocaleString('fr-FR') : '—';
    }
    const elMargeBrute = document.getElementById('kpi-margeBrute');
    if (elMargeBrute) {
        elMargeBrute.textContent = stats.kpi?.margeBrute ? `${stats.kpi.margeBrute}%` : '—';
    }
    const elBeneficeNet = document.getElementById('kpi-beneficeNet');
    if (elBeneficeNet) {
        elBeneficeNet.textContent = stats.kpi?.beneficeNet ? stats.kpi.beneficeNet.toLocaleString('fr-FR') : '—';
    }

    const elRepartitionIngredients = document.getElementById('repartition-ingredients');
    if (elRepartitionIngredients) {
        elRepartitionIngredients.textContent = stats.repartitionCouts?.ingredients != null ? `${stats.repartitionCouts.ingredients}%` : '—';
    }
    const elRepartitionPersonnel = document.getElementById('repartition-personnel');
    if (elRepartitionPersonnel) {
        elRepartitionPersonnel.textContent = stats.repartitionCouts?.personnel != null ? `${stats.repartitionCouts.personnel}%` : '—';
    }
    const elRepartitionFraisFixes = document.getElementById('repartition-fraisFixes');
    if (elRepartitionFraisFixes) {
        elRepartitionFraisFixes.textContent = stats.repartitionCouts?.fraisFixes != null ? `${stats.repartitionCouts.fraisFixes}%` : '—';
    }

    // Remplir tableau des dépenses
    const tableauBody = document.getElementById('tableau-depenses-body');
    if (tableauBody) {
        tableauBody.innerHTML = (depenses || []).map(d => _ligneDepense(d)).join('');
    }
    const infoPagination = document.getElementById('info-pagination');
    if (infoPagination) {
        infoPagination.textContent = `Affichage de 1–${(depenses || []).length} sur ${(depenses || []).length} entrées`;
    }

    _initialiserGraphiques(stats);

    document.querySelectorAll('.btn-periode').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.btn-periode').forEach(b => {
                b.classList.remove('actif-periode');
                b.classList.add('inactif-periode');
            });
            btn.classList.add('actif-periode');
            btn.classList.remove('inactif-periode');
        });
    });
};

export default DashboardResponsable;
