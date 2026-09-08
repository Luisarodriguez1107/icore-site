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

function wireHeroParallax() {
  const media = document.querySelector(".hero-media");
  const img = media?.querySelector("img");
  if (!media || !img) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let scrollProgress = 0;
  let tiltX = 0;
  let tiltY = 0;

  function applyTransform() {
    const floatY = (1 - scrollProgress) * 18;
    const scale = 0.97 + scrollProgress * 0.03;
    img.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(${floatY}px) scale(${scale})`;
  }

  function onScroll() {
    const rect = media.getBoundingClientRect();
    const raw = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    scrollProgress = Math.min(Math.max(raw, 0), 1);
    applyTransform();
  }

  function onMouseMove(e) {
    const rect = media.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY = relX * 16;
    tiltX = -relY * 16;
    applyTransform();
  }

  function onMouseLeave() {
    tiltX = 0;
    tiltY = 0;
    applyTransform();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  media.addEventListener("mousemove", onMouseMove);
  media.addEventListener("mouseleave", onMouseLeave);
  onScroll();
}

function wireMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

document.getElementById("year") && (document.getElementById("year").textContent = new Date().getFullYear());

wireWhatsappLinks();
wireMobileNav();
wireHeroParallax();
loadProducts();
