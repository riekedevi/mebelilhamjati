/* ============================================================
   Mebel Ilham Jati Solo — App logic
   ============================================================ */

import {
  furnitureItems, visitServices, visitSteps, gallery,
  buildFurnitureTypes, buildMaterials, buildBudgets,
  visitFurnitureTypes, visitDamageOptions,
  WHATSAPP_NUMBER
} from "./data.js";

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

/* ---------- Populate Form Dropdowns ---------- */
function populateSelect(select, options) {
  if (!select) return;
  select.innerHTML = options.map(o => `<option value="${o}">${o}</option>`).join("");
}

const buildForm = document.getElementById("buildForm");
if (buildForm) {
  populateSelect(buildForm.querySelector('[name="jenis"]'), buildFurnitureTypes);
  populateSelect(buildForm.querySelector('[name="material"]'), buildMaterials);
  populateSelect(buildForm.querySelector('[name="budget"]'), buildBudgets);
}

const visitForm = document.getElementById("visitForm");
if (visitForm) {
  populateSelect(visitForm.querySelector('[name="jenis"]'), visitFurnitureTypes);
}

/* ---------- Render Damage Options (checkboxes) ---------- */
const damageEl = document.getElementById("damageOptions");
if (damageEl) {
  damageEl.innerHTML = visitDamageOptions.map((opt, i) => `
    <label><input type="checkbox" name="kerusakan" value="${opt}" /> ${opt}</label>
  `).join("");
}

/* ---------- Service Pick → Show Form ---------- */
const formBuild = document.getElementById("formBuild");
const formVisit = document.getElementById("formVisit");

document.querySelectorAll("[data-form]").forEach(btn => {
  btn.addEventListener("click", () => {
    const which = btn.getAttribute("data-form");
    formBuild.hidden = which !== "build";
    formVisit.hidden = which !== "visit";
    const target = which === "build" ? formBuild : formVisit;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ---------- Close Form ---------- */
document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-close");
    const el = document.getElementById(id);
    if (el) el.hidden = true;
  });
});

/* ---------- WhatsApp Helper ---------- */
function waUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function getCheckedDamage(form) {
  const checked = form.querySelectorAll('input[name="kerusakan"]:checked');
  return Array.from(checked).map(c => c.value);
}

function formatUkuran(form) {
  const konsultasi = form.querySelector('[name="ukuran_konsultasi"]');
  if (konsultasi && konsultasi.checked) return "Belum tahu / ingin konsultasi";
  const p = form.querySelector('[name="panjang"]')?.value || "0";
  const l = form.querySelector('[name="lebar"]')?.value || "0";
  const t = form.querySelector('[name="tinggi"]')?.value || "0";
  return `P: ${p}cm, L: ${l}cm, T: ${t}cm`;
}

/* ---------- Build Form Submit ---------- */
if (buildForm) {
  buildForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(buildForm);
    const nama = d.get("nama") || "-";
    const wa = d.get("wa") || "-";
    const jenis = d.get("jenis") || "-";
    const jumlah = d.get("jumlah") || "-";
    const ukuran = formatUkuran(buildForm);
    const material = d.get("material") || "-";
    const warna = d.get("warna") || "-";
    const alamat = d.get("alamat") || "-";
    const kecamatan = d.get("kecamatan") || "-";
    const kota = d.get("kota") || "-";
    const catatan = d.get("catatan") || "-";
    const budget = d.get("budget") || "-";
    const referensiFiles = buildForm.querySelector('[name="referensi"]')?.files;

    const pesan =
      `Halo Mebel Ilham Jati Solo, saya ingin konsultasi/pesan pembuatan furniture.\n\n` +
      `*Nama:* ${nama}\n` +
      `*WhatsApp:* ${wa}\n` +
      `*Jenis Furniture:* ${jenis}\n` +
      `*Jumlah:* ${jumlah}\n` +
      `*Ukuran:* ${ukuran}\n` +
      `*Material/Bahan:* ${material}\n` +
      `*Warna/Finishing:* ${warna}\n` +
      `*Lokasi:* ${alamat}, ${kecamatan}, ${kota}\n` +
      `*Estimasi Budget:* ${budget}\n` +
      `*Catatan:* ${catatan}\n\n` +
      (referensiFiles && referensiFiles.length > 0
        ? `*Foto referensi:* terlampir (${referensiFiles.length} foto), akan dikirim setelah chat ini terbuka.`
        : `*Foto referensi:* belum ada.`);

    window.open(waUrl(pesan), "_blank");
    showToast("Mengarahkan ke WhatsApp...");
  });
}

/* ---------- Visit Form Submit ---------- */
if (visitForm) {
  visitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(visitForm);
    const nama = d.get("nama") || "-";
    const wa = d.get("wa") || "-";
    const jenis = d.get("jenis") || "-";
    const kerusakan = getCheckedDamage(visitForm);
    const kerusakanText = kerusakan.length > 0 ? kerusakan.join(", ") : "-";
    const alamat = d.get("alamat") || "-";
    const namaLokasi = d.get("nama_lokasi") || "-";
    const kecamatan = d.get("kecamatan") || "-";
    const kota = d.get("kota") || "-";
    const tanggal = d.get("tanggal") || "-";
    const jam = d.get("jam") || "-";
    const catatan = d.get("catatan") || "-";
    const fotoFiles = visitForm.querySelector('[name="kerusakan_foto"]')?.files;

    const pesan =
      `Halo Mebel Ilham Jati Solo, saya ingin booking Visit Service.\n\n` +
      `*Nama:* ${nama}\n` +
      `*WhatsApp:* ${wa}\n` +
      `*Jenis Furniture:* ${jenis}\n` +
      `*Jenis Kerusakan/Service:* ${kerusakanText}\n` +
      `*Alamat:* ${alamat}${namaLokasi !== "-" ? " (" + namaLokasi + ")" : ""}\n` +
      `*Kecamatan:* ${kecamatan}\n` +
      `*Kota/Kabupaten:* ${kota}\n` +
      `*Tanggal yang Diinginkan:* ${tanggal}\n` +
      `*Jam yang Diinginkan:* ${jam}\n` +
      `*Catatan:* ${catatan}\n\n` +
      (fotoFiles && fotoFiles.length > 0
        ? `*Foto/Video Kerusakan:* terlampir (${fotoFiles.length} file), akan dikirim setelah chat ini terbuka.`
        : `*Foto/Video Kerusakan:* belum ada.`);

    window.open(waUrl(pesan), "_blank");
    showToast("Mengarahkan ke WhatsApp...");
  });
}

/* ---------- Simple WhatsApp Links ---------- */
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
