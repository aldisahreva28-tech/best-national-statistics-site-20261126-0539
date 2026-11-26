/* AngkaNusa — program penyerahan entri (Node 22, stdlib saja).
   Menyalin app/ dan screenshots/ dari samping file ini ke direktori
   keluaran, lalu menulis dossier.json dengan library make.fun yang
   divendor di ./vendor/makefun-frontend.ts. Library itu dibiarkan apa
   adanya: scorer mengharuskan dossier.json sama persis dengan yang
   ditulis salinan library mereka sendiri.
   Di luar container grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
     mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
   Program ini deterministik: dua kali jalan menulis byte yang identik. */

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

/* Batas yang sama dengan gate scorer: paling banyak 4 screenshot, masing-masing
   paling besar 256 KiB; app/ paling banyak 993 entri dan 16 MiB; teks dossier
   dibatasi 160 KiB. */
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

/* Verifikasi keluaran sendiri: dossier.json harus bisa dibaca ulang dan
   terurai sebagai JSON, dan setiap screenshot yang diserahkan harus ada di
   output. Bila ada yang tidak cocok, keluar dengan kode bukan nol supaya
   kegagalan terlihat, bukan diam-diam menghasilkan keluaran rusak. */
const dossierPath = join(out, 'dossier.json');
let dossier;
try {
  dossier = JSON.parse(readFileSync(dossierPath, 'utf8'));
} catch {
  console.error(`dossier.json di ${dossierPath} tidak bisa dibaca atau bukan JSON yang sah`);
  process.exit(1);
}
if (typeof dossier !== 'object' || dossier === null || !('text' in dossier)) {
  console.error('dossier.json tidak berisi dossier yang diharapkan (tidak ada kunci text)');
  process.exit(1);
}
const sourceShots = existsSync(join(here, 'screenshots')) ? readdirSync(join(here, 'screenshots')) : [];
for (const shot of sourceShots) {
  if (!existsSync(join(out, 'screenshots', shot))) {
    console.error(`screenshot ${shot} hilang dari output`);
    process.exit(1);
  }
}
if (!existsSync(join(out, 'app', 'index.html'))) {
  console.error('app/index.html hilang dari output');
  process.exit(1);
}
console.log(`dossier.json ditulis (${sourceShots.length} screenshot, app/ lengkap)`);
