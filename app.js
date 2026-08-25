/* ============================================================
   Mebel Ilham Jati Solo — App logic
   ============================================================ */

import { furnitureItems, visitServices, visitSteps, gallery, WHATSAPP_NUMBER } from "./data.js";

/* ---------- Render Furniture Items ---------- */
const furnitureEl = document.getElementById("furnitureItems");
if (furnitureEl) {
  furnitureEl.innerHTML = furnitureItems.map(item => `<span>${item}</span>`).join("");
}

/* ---------- Render Visit Service Items ---------- */
const visitEl = document.getElementById("visitItems");
if (visitEl) {
  visitEl.innerHTML = visitServices.map(item => `<span>${item}</span>`).join("");
}

/* ---------- Render Flow Steps ---------- */
const flowEl = document.getElementById("flowSteps");
if (flowEl) {
  flowEl.innerHTML = visitSteps.map(step => `
    <div class="flow-step">
      <div class="flow-num">${step.num}</div>
      <div class="flow-body">
        <h3>${step.title}</h3>
        <p>${step.desc}</p>
      </div>
    </div>
  `).join("");
}

/* ---------- Render Gallery ---------- */
const galleryEl = document.getElementById("galleryGrid");
if (galleryEl) {
  galleryEl.innerHTML = gallery.map(g => `
    <div class="gallery-item">
      <img src="${g.img}" alt="${g.alt}" loading="lazy" onerror="this.style.opacity=0.15" />
    </div>
  `).join("");
}

/* ---------- WhatsApp Links ---------- */
function waLink(message) {
  const text = `Halo Mebel Ilham Jati Solo, saya ingin ${message}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

document.querySelectorAll("[data-wa]").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const msg = el.getAttribute("data-wa");
    window.open(waLink(msg), "_blank");
    showToast("Mengarahkan ke WhatsApp...");
  });
});

/* ---------- Toast ---------- */
const toastEl = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2800);
}

/* ---------- Bottom nav active state via scroll ---------- */
const navLinks = document.querySelectorAll(".bottom-nav a");
const sections = document.querySelectorAll("[data-section]");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.dataset.section;
      navLinks.forEach((a) => a.classList.toggle("active", a.dataset.nav === id));
    }
  });
}, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

sections.forEach((s) => navObserver.observe(s));

/* ---------- PWA: Install prompt ---------- */
let deferredPrompt = null;
const installButton = document.getElementById("installButton");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === "accepted") showToast("Aplikasi terpasang. Terima kasih!");
  deferredPrompt = null;
  installButton.hidden = true;
});

window.addEventListener("appinstalled", () => {
  installButton.hidden = true;
  showToast("Aplikasi terpasang di perangkat Anda");
});

/* ---------- Register Service Worker ---------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
