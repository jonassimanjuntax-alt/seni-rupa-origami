# Petualangan Dunia Origami 3D – SD TERAMIA (Seni Rupa Kelas 3 SD)

Aplikasi game edukasi interaktif 3D seni melipat kertas (Origami) untuk siswa kelas 3 SD TERAMIA, dirancang secara khusus untuk media pembelajaran interaktif pada **Interactive Flat Panel (IFP) Hisense 75 inci** dengan orientasi landscape rasio 16:9.

---

## 🌟 Identitas dan Materi Pembelajaran
- **Sekolah**: SD TERAMIA
- **Mata Pelajaran**: Seni Rupa
- **Kelas**: 3 SD
- **Materi**: Seni Melipat Kertas (Origami)
- **Karakter Pemandu**: Maskot ORI (Anak Indonesia yang ceria dengan narator berbahasa Indonesia)

---

## 🚀 Fitur Utama
1. **Tutorial Origami Animasi 3D Realistis (Three.js)**:
   - Gerakan pelipatan kertas bertahap secara halus dengan tekstur kertas dua sisi (merah/putih).
   - Penanda sumbu lipatan, garis putus-putus, arah panah merah, dan titik sudut temu.
   - Kontrol kecepatan perlahan (slow-motion), ulangi animasi, langkah sebelumnya, dan langkah berikutnya.
   - Sudut pandang 3D dapat diputar dan diamati secara bebas (360° orbit view).
2. **4 Level Pembelajaran Lengkap**:
   - **Level 1**: Petualangan Lipatan Dasar (*Perahu Kertas Klasik*)
   - **Level 2**: Petualangan Pesawat Kertas 3D (*Pesawat Supersonik Kertas*)
   - **Level 3**: Petualangan Hewan Origami 3D (*Ikan Koi Origami*)
   - **Level 4**: Petualangan Bunga Origami 3D (*Bunga Tulip Mekar*)
3. **Pembelajaran Mendalam 3 Tahap**:
   - **Menganalisis**: Pertanyaan pemantik alasan geometris dan pengamatan bentuk sebelum melipat.
   - **Mengaplikasikan**: Tutorial 3D interaktif yang dipraktikkan langsung dengan kertas origami asli di kelas.
   - **Merefleksi**: Evaluasi dan inspirasi reflektif: *"Setiap lipatan adalah proses belajar. Tidak harus langsung sempurna, yang penting berani mencoba dan terus berkreasi!"*
4. **Permainan Teka-Teki Silang (TTS) Kompetisi Dua Tim (80 Pertanyaan Valid)**:
   - Sistem kompetisi **TIM MERAH vs TIM PUTIH** secara bergiliran.
   - Tepat 10 pertanyaan TTS per tim di setiap level (**Total 80 pertanyaan terverifikasi** tanpa duplikasi antar tim pada level yang sama).
   - Kisi-kisi teka-teki silang otentik dengan koordinat dan perpotongan huruf yang 100% valid.
   - Keyboard sentuh virtual di layar untuk kemudahan pengetikan pada IFP 75 inci.
   - Sistem poin: Benar (+10 poin), Petunjuk (-2 poin), Salah/Kosong (0 poin). Nilai maksimal 100 poin per level.
5. **Narator Text-to-Speech Bahasa Indonesia & Efek Suara Procedural**:
   - Web Speech API Bahasa Indonesia (`id-ID`) yang memandu instruksi, menyapa, dan membacakan soal.
   - Efek suara sintetis Web Audio API (chime jawaban benar, buzz jawaban salah, suara lipatan, dan fanfare kemenangan).
6. **Desain Sentuh IFP Single-Screen Fixed Layout**:
   - Bebas scroll (zero-scroll `overflow: hidden`) dengan tata letak responsif 16:9.
   - Tombol-tombol sentuh berukuran besar, nyaman dibaca hingga jarak 10 meter.
   - 7 Tombol kendali navigasi global: Beranda, Pilih Level, Petunjuk, Suara Narator, Layar Penuh (Fullscreen API), Ulangi Permainan, dan Kembali.
7. **Penyimpanan Lokal (localStorage)**:
   - Menyimpan nilai, riwayat penyelesaian level, rekap klasemen, dan pengaturan tanpa perlu login atau koneksi database eksternal.

---

## 🛠️ Instalasi & Menjalankan Proyek

### Prasyarat
- Node.js versi 18 atau lebih tinggi
- npm versi 9 atau lebih tinggi

### Instalasi Dependensi
```bash
npm install
```

### Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Aplikasi akan aktif di `http://localhost:3000`.

### Menjalankan Unit Test (Logika & Data TTS)
```bash
npx --yes tsx --test src/utils/scoring.test.ts
npx --yes tsx --test src/data/ttsData.test.ts
```

### Membangun Proyek untuk Produksi (Build)
```bash
npm run build
```
Hasil build disimpan di direktori `dist/`.

---

## 🌐 Panduan Deployment ke Vercel

Proyek ini telah dikonfigurasi dengan file `vercel.json` untuk SPA routing:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
