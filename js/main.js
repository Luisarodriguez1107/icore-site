// ==============================
// CONFIGURACIÓN DEL NEGOCIO
// Edita estos valores con la info real de iCore.
// ==============================
const CONFIG = {
  // Número de WhatsApp en formato internacional SIN "+" ni espacios. Ej: 573001234567
  whatsappGeneral: "573000000000",
  whatsappChia: "573000000000",
  whatsappArauca: "573000000000",
  mensajeGeneral: "Hola iCore! Vengo de la página web y quiero más información 😀",
};

function buildWspLink(numero, mensaje) {
  const texto = encodeURIComponent(mensaje);
  return `https://wa.me/${numero}?text=${texto}`;
}

function wireWhatsappLinks() {
  const generalLinks = ["wsp-header", "wsp-hero", "wsp-confianza", "wsp-final", "wsp-footer", "wsp-float"];
  generalLinks.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = buildWspLink(CONFIG.whatsappGeneral, CONFIG.mensajeGeneral);
  });

  const chia = document.getElementById("wsp-chia");
  if (chia) chia.href = buildWspLink(CONFIG.whatsappChia, "Hola! Escribo por la tienda iCore Chía 😀");

  const arauca = document.getElementById("wsp-arauca");
  if (arauca) arauca.href = buildWspLink(CONFIG.whatsappArauca, "Hola! Escribo por la tienda iCore Arauca 😀");
}

function formatCOP(valor) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(valor);
}

function productCardHTML(p) {
  const iconoCategoria = p.categoria === "iphones" ? "📱" : "🎧";
  const precioAnterior = p.precioAnterior
    ? `<span class="price-before">${formatCOP(p.precioAnterior)}</span>`
    : "";
  const mensaje = `Hola! Estoy interesado en: ${p.nombre} (${formatCOP(p.precio)}). ¿Sigue disponible?`;
  const link = buildWspLink(CONFIG.whatsappGeneral, mensaje);

  return `
    <article class="product-card" data-categoria="${p.categoria}">
      <div class="product-media">
        <span class="product-badge">${p.condicion}</span>
        ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}" style="width:100%;height:100%;object-fit:cover;">` : iconoCategoria}
      </div>
      <div class="product-body">
        <h3>${p.nombre}</h3>
        <p class="product-desc">${p.descripcion}</p>
        <div class="product-price-row">
          <span class="price-now">${formatCOP(p.precio)}</span>
          ${precioAnterior}
        </div>
        <a class="product-cta" href="${link}" target="_blank" rel="noopener">Pedir por WhatsApp</a>
      </div>
    </article>
  `;
}

async function loadProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  let productos = [];
  try {
    const res = await fetch("data/products.json");
    productos = await res.json();
  } catch (e) {
    grid.innerHTML = `<p class="empty-state">No se pudo cargar el catálogo. Intenta de nuevo más tarde.</p>`;
    return;
  }

  function render(filtro) {
    const filtrados = filtro === "todos" ? productos : productos.filter((p) => p.categoria === filtro);
    if (filtrados.length === 0) {
      grid.innerHTML = `<p class="empty-state">No hay productos en esta categoría por ahora.</p>`;
      return;
    }
    grid.innerHTML = filtrados.map(productCardHTML).join("");
  }

  render("todos");

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.filter);
    });
  });
}

function wireMegaMenu() {
  const overlay = document.getElementById("mega-menu");
  const openBtn = document.getElementById("mega-menu-open");
  const closeBtn = document.getElementById("mega-menu-close");
  const backdrop = overlay?.querySelector(".mega-overlay-backdrop");
  if (!overlay || !openBtn) return;

  function open() {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
}

document.getElementById("year") && (document.getElementById("year").textContent = new Date().getFullYear());

wireWhatsappLinks();
wireMegaMenu();
loadProducts();
