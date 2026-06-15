
const NotFound = () => `
<div style="display:flex;align-items:center;justify-content:center;height:100vh;
  flex-direction:column;gap:16px;color:#D4E4FA;font-family:Inter,sans-serif;
  background:#051424;">
  <i class="fa-solid fa-bowl-food" style="font-size:64px;color:#FF7A00;"></i>
  <h1 style="font-size:2em;">404</h1>
  <p style="color:#E0C0AF;">Cette page n'existe pas dans SamaFood.</p>
  <a href="#/" style="padding:10px 24px;background:#FF7A00;color:#522300;
    border-radius:8px;font-weight:600;text-decoration:none;">
    Retour à l'accueil
  </a>
</div>
`;

export default NotFound;
