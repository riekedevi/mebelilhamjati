/* ============================================================
   Mebel Ilham Jati Solo — App logic
   ============================================================ */

import { services, icons, WHATSAPP_NUMBER } from "./data.js";

/* ---------- Render Layanan ---------- */
const serviceList = document.getElementById("serviceList");
serviceList.innerHTML = services.map(s => `
  <article class="svc-card">
    <div class="svc-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[s.icon] || ""}</svg></div>
    <div class="svc-body">
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <span class="svc-price">${s.price}</span>
    </div>
  </article>
`).join("");

/* ---------- Booking → WhatsApp ---------- */
const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(bookingForm);
  const nama = data.get("nama");
  const wa = data.get("whatsapp");
  const jenis = data.get("jenis");
  const tanggal = data.get("tanggal");
  const detail = data.get("detail");

  const tgl = tanggal ? new Date(tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-";

  const pesan =
    `Halo Mebel Ilham Jati Solo, saya ingin booking konsultasi.\n\n` +
    `*Nama:* ${nama}\n` +
    `*No. WhatsApp:* ${wa}\n` +
    `*Jenis Mebel:* ${jenis}\n` +
    `*Tanggal diinginkan:* ${tgl}\n` +
    `*Detail:* ${detail || "-"}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
  showToast("Mengarahkan ke WhatsApp...");
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
