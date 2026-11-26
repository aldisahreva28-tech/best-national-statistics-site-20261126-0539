[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/aldisahreva28-tech/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/aldisahreva28-tech/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# AngkaNusa — Statistik Indonesia

Situs statistik nasional Indonesia: angka pokok penduduk, ekonomi, tenaga
kerja, dan kemiskinan — dari data Badan Pusat Statistik (BPS), lengkap dengan
sumber dan tahun setiap angka. Dibangun untuk bounty
[Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
di [make.fun](https://make.fun).

## Isi situs

- **Beranda** — enam angka pokok (penduduk, PDB, pertumbuhan, pengangguran,
  kemiskinan, IPM) dan grafik riwayat penduduk 2010–2025.
- **Penduduk** — jumlah penduduk, pertumbuhan, sebaran Pulau Jawa, struktur
  usia, angka kelahiran, dan lima provinsi terpadat.
- **Ekonomi** — PDB 2024/2025 dengan pemilih tahun yang bekerja, grafik
  pertumbuhan 2023–2025, inflasi, dan perdagangan luar negeri.
- **Tenaga Kerja** — TPT Agustus & November 2025, pekerja informal, setengah
  menganggur, paruh waktu, dan upah rata-rata.
- **Kemiskinan** — tingkat kemiskinan Maret & September 2025, garis
  kemiskinan, rasio Gini, IPM, plus catatan perbandingan garis Bank Dunia.
- **Provinsi** — tabel provinsi yang bisa diurutkan (nama / penduduk) dan
  dicari lewat kotak filter.
- **Tentang & Sumber** — arti setiap istilah dan daftar sumber lengkap.

Semua grafik adalah batang SVG buatan tangan, tanpa library dan tanpa
permintaan jaringan apa pun: situs berjalan sepenuhnya dari file-file di
`app/` dan dibuka di desktop maupun ponsel.

## Menjalankan

```sh
node serve.ts        # lalu buka http://localhost:8080
```

## Menyerahkan (program entri)

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, stdlib saja) menyalin `app/` dan `screenshots/` ke
direktori keluaran dan menulis `dossier.json` dengan library make.fun yang
divendor di `vendor/makefun-frontend.ts`.

## Struktur

```
main.ts                  # program penyerahan (Node 22, stdlib)
serve.ts                 # server statis untuk pengembangan lokal
app/index.html           # kerangka: header/nav, <main id="app">, footer
app/style.css            # seluruh sistem desain (teal + amber, responsif)
app/main.js              # router rute hash + pengendali halaman
app/views.js             # template setiap halaman
app/data.js              # semua angka, masing-masing dengan sumber + tahun
app/charts.js            # grafik batang SVG buatan tangan
screenshots/             # 4 tangkapan layar situs yang sedang berjalan
shots.json               # rute & viewport tiap tangkapan layar
```

## Lisensi

MIT — lihat [LICENSE](LICENSE).
