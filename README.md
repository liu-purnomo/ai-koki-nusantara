
# AI Koki Nusantara 🍳🤖

AI Koki Nusantara adalah aplikasi berbasis AI yang membantu Anda menemukan dan merekomendasikan resep masakan berdasarkan bahan-bahan yang Anda miliki di rumah. Cukup masukkan daftar bahan, dan aplikasi akan memberikan inspirasi resep yang mudah, praktis, dan sesuai dengan stok dapur Anda!

---

## ✨ Fitur Utama

- Rekomendasi resep otomatis berbasis AI (Gemini API)
- Input bahan dalam bahasa Indonesia
- Hasil resep lengkap dengan langkah-langkah dan takaran
- Tampilan modern, responsif, dan mudah digunakan
- Notifikasi jika bahan tidak cukup atau tidak ditemukan

---

## 🚀 Cara Menjalankan Aplikasi

**Prasyarat:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Buat file `.env.local` dan masukkan API key Gemini Anda:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```
3. Jalankan aplikasi:
   ```bash
   npm run dev
   ```
4. Buka browser ke [http://localhost:5173](http://localhost:5173)

---

## 🧑‍🍳 Cara Menggunakan

1. Masukkan daftar bahan yang Anda miliki (misal: telur, bawang merah, cabai)
2. Klik tombol "Cari Resep"
3. Dapatkan rekomendasi resep lengkap beserta langkah-langkah memasak

---

## 🛠️ Teknologi yang Digunakan

- React + TypeScript
- Vite
- Gemini API (Google AI)

---

## 📦 Struktur Proyek

- `components/` — Komponen UI aplikasi
- `services/` — Integrasi API Gemini
- `App.tsx` — Komponen utama aplikasi

---

## 📄 Lisensi

Aplikasi ini dibuat untuk tujuan pembelajaran dan pengembangan. Silakan gunakan, modifikasi, dan kembangkan sesuai kebutuhan!

---

Selamat memasak dengan AI Koki Nusantara! 🍽️
