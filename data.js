/* ============================================================
   Mebel Ilham Jati Solo — Data
   ============================================================ */

export const WHATSAPP_NUMBER = "6285865702681";

export const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

/* Pembuatan furniture — daftar contoh */
export const furnitureItems = [
  "Meja", "Kursi", "Lemari", "Tempat tidur", "Meja makan",
  "Bufet", "Rak", "Laci", "Wardrobe", "Furniture custom lainnya"
];

/* Visit service — daftar layanan */
export const visitServices = [
  "Perbaikan Furniture", "Service Lemari", "Service Meja", "Service Kursi",
  "Service Tempat Tidur", "Service Laci", "Service Pintu Furniture",
  "Perbaikan Engsel & Rel", "Perbaikan Furniture Goyang / Longgar",
  "Penguatan & Perbaikan Sambungan", "Bongkar & Pasang Furniture",
  "Setting / Penyesuaian Furniture", "Perawatan Furniture",
  "Re-finishing Furniture", "Survey & Cek Kerusakan"
];

/* Form Pembuatan Furniture — dropdown jenis */
export const buildFurnitureTypes = [
  "Meja", "Kursi", "Lemari", "Tempat Tidur", "Meja Makan",
  "Bufet", "Rak", "Laci", "Wardrobe", "Furniture Custom Lainnya"
];

/* Form Pembuatan Furniture — dropdown material */
export const buildMaterials = [
  "Belum tahu / konsultasi terlebih dahulu",
  "Jati Solid", "Mahoni", "MDF / HPL", "Multiwood", "Kayu Kamper", "Lainnya"
];

/* Form Pembuatan Furniture — dropdown budget */
export const buildBudgets = [
  "< Rp1.000.000",
  "Rp1.000.000 - Rp3.000.000",
  "Rp3.000.000 - Rp5.000.000",
  "> Rp5.000.000",
  "Belum menentukan"
];

/* Form Visit Service — dropdown jenis furniture */
export const visitFurnitureTypes = [
  "Lemari", "Meja", "Kursi", "Tempat Tidur",
  "Laci", "Rak", "Bufet", "Furniture Lainnya"
];

/* Form Visit Service — pilihan kerusakan (multi-select) */
export const visitDamageOptions = [
  "Furniture goyang / longgar",
  "Engsel rusak",
  "Rel laci bermasalah",
  "Pintu furniture bermasalah",
  "Sambungan lepas",
  "Kaki furniture rusak",
  "Perlu bongkar & pasang",
  "Perlu perbaikan furniture",
  "Perlu setting / penyesuaian",
  "Perlu perawatan",
  "Perlu re-finishing",
  "Belum tahu / minta dicek teknisi"
];

/* Alur booking visit service */
export const visitSteps = [
  { num: "01", title: "Kirim Foto", desc: "Kirim foto atau video furniture yang ingin diperbaiki melalui WhatsApp." },
  { num: "02", title: "Konsultasi", desc: "Tim melakukan pengecekan awal dan memberikan estimasi." },
  { num: "03", title: "Tentukan Jadwal", desc: "Pilih waktu kunjungan yang tersedia." },
  { num: "04", title: "Teknisi Datang", desc: "Teknisi datang langsung ke rumah atau kost untuk melakukan pengecekan dan service." }
];

/* Galeri hasil pekerjaan */
export const gallery = [
  { img: "https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Meja makan kayu jati" },
  { img: "https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Lemari pakaian jati" },
  { img: "https://images.pexels.com/photos/7109998/pexels-photo-7109998.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Proses pengerjaan furniture" },
  { img: "https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Tempat tidur jati minimalis" },
  { img: "https://images.pexels.com/photos/5466146/pexels-photo-5466146.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Proses finishing furniture" },
  { img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Rak buku dan TV kayu" },
  { img: "https://images.pexels.com/photos/7061419/pexels-photo-7061419.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Wardrobe jati custom" },
  { img: "https://images.pexels.com/photos/27520661/pexels-photo-27520661.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Perbaikan furniture di workshop" }
];
