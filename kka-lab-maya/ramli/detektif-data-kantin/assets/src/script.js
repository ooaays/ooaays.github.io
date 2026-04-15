/* ==========================================================
   Python Data Lab – Detektif Data Kantin  (v2)
   script.js  |  Direktorat SMP – Kemendikdasmen
   Fitur baru: Tahap 5 (zip), Progress Bar, Kuis Refleksi,
               Sertifikat, Mode Guru
   ========================================================== */

const TOTAL_STAGES = 5;

/* ────────────────────────────────────────────────────────── */
/*  STAGE DATA                                                */
/* ────────────────────────────────────────────────────────── */
const STAGES = {
  1: {
    shortLabel: 'Rapikan Data',
    title: 'Tahap 1 — Pisahkan Data',
    tag: 'Dekomposisi Data',
    focus: 'Memecah data mentah menjadi variabel Python yang terstruktur.',
    mission: 'Isi dua slot kosong agar data mentah kantin berubah menjadi dua list: daftar produk dan daftar harga.',
    dataset: '"Pensil", 5000, "Buku", 12000, "Tas", 80000, "Sepatu", 150000, "Botol Minum", 25000',
    tips: 'Petunjuk: nama produk masuk ke list data_produk, sedangkan angka harga masuk ke list harga.',
    concept: 'Ketika data masih campur, komputer sulit membedakan mana nama dan mana angka. Dengan memisahkan ke dua list, setiap variabel punya satu jenis data yang jelas.',
    slots: ['produk_list', 'harga_list'],
    slotHelp: {
      produk_list: 'Isi slot ini dengan daftar nama barang. Yang masuk ke sini hanya teks nama produk, bukan angka harga.',
      harga_list:  'Isi slot ini dengan daftar angka harga. Yang masuk ke sini hanya angka, bukan nama produk.'
    },
    answers: {
      produk_list: '["Pensil", "Buku", "Tas", "Sepatu", "Botol Minum"]',
      harga_list:  '[5000, 12000, 80000, 150000, 25000]'
    },
    template: [
      ['data_produk = ', { slot: 'produk_list' }],
      ['harga = ',       { slot: 'harga_list'  }],
      ['print("Data berhasil dipisah!")']
    ],
    options: [
      '["Pensil", "Buku", "Tas", "Sepatu", "Botol Minum"]',
      '[5000, 12000, 80000, 150000, 25000]',
      '{"Pensil": 5000, "Buku": 12000}',
      'max(harga)',
      'for produk in data_produk:'
    ],
    output: 'Data berhasil dipisah!\nDaftar produk: 5 item\nDaftar harga: 5 item',
    explanation: 'Python lebih mudah bekerja jika data rapi. Pada tahap ini, data mentah dipecah menjadi dua list: satu list nama produk dan satu list harga. Inilah fondasi untuk semua tahap berikutnya.',
    example: {
      intro:  'Contoh kecil: data mentah masih campur antara nama barang dan harga.',
      code:   'data_produk = ["Pensil", "Buku"]\nharga = [5000, 12000]\nprint("Data berhasil dipisah!")',
      output: 'Data berhasil dipisah!',
      why:    'Komputer lebih mudah mengolah data jika nama barang dan harga dipisahkan ke tempat yang rapi. Ini disebut dekomposisi data.'
    },
    mistakeMap: {
      produk_list: {
        '{"Pensil": 5000, "Buku": 12000}': 'Kamu memilih dictionary, padahal tahap ini meminta list nama produk.',
        'max(harga)': 'Ini fungsi untuk mencari nilai terbesar, bukan daftar nama produk.',
        'for produk in data_produk:': 'Ini baris perulangan, bukan isi list produk.'
      },
      harga_list: {
        '{"Pensil": 5000, "Buku": 12000}': 'Kamu memilih dictionary, padahal slot ini harus berisi list angka harga.',
        'max(harga)': 'Ini fungsi, bukan daftar harga.',
        'for produk in data_produk:': 'Ini perulangan, bukan data harga.'
      }
    }
  },

  2: {
    shortLabel: 'Cari Terbesar',
    title: 'Tahap 2 — Cari Harga Tertinggi',
    tag: 'Mengenali Pola',
    focus: 'Menggunakan fungsi Python untuk menemukan nilai maksimum dari daftar harga.',
    mission: 'Pilih komponen kode yang benar agar Python dapat menemukan harga paling mahal dari daftar harga kantin.',
    dataset: 'harga = [5000, 12000, 80000, 150000, 25000]',
    tips: 'Petunjuk: gunakan fungsi Python yang memang dirancang untuk mencari nilai terbesar.',
    concept: 'Fungsi bawaan Python seperti max() membantu kita menemukan pola tanpa harus membandingkan satu per satu secara manual. Ini adalah inti dari berpikir algoritmik.',
    slots: ['fungsi_max'],
    slotHelp: {
      fungsi_max: 'Isi slot ini dengan fungsi Python yang mencari nilai terbesar dari daftar harga.'
    },
    answers: { fungsi_max: 'max(harga)' },
    template: [
      ['harga = [5000, 12000, 80000, 150000, 25000]'],
      ['print(', { slot: 'fungsi_max' }, ')']
    ],
    options: ['max(harga)', 'min(harga)', 'sum(harga)', 'data_produk', 'print(harga)'],
    output: '150000',
    explanation: 'Fungsi max() mencari angka terbesar dari daftar harga. Hasilnya: 150000 (Sepatu). Python menyelesaikan ini dalam satu baris — bayangkan jika kamu harus membandingkan ratusan harga secara manual!',
    example: {
      intro:  'Tanpa Python, kita harus memeriksa satu per satu. Dengan max(), cukup satu perintah.',
      code:   'harga = [5000, 12000, 80000, 150000]\nprint(max(harga))',
      output: '150000',
      why:    'Fungsi max() mencari angka paling besar dari list harga secara otomatis.'
    },
    mistakeMap: {
      fungsi_max: {
        'min(harga)':   'Kamu memilih min(), padahal misi ini meminta harga tertinggi, bukan harga terendah.',
        'sum(harga)':   'sum() menjumlahkan semua harga, bukan mencari yang paling besar.',
        'data_produk':  'data_produk berisi nama barang, bukan angka harga yang ingin dibandingkan.',
        'print(harga)': 'Ini hanya menampilkan seluruh list, bukan mencari nilai tertinggi.'
      }
    }
  },

  3: {
    shortLabel: 'Saring Data',
    title: 'Tahap 3 — Saring Harga Mahal',
    tag: 'Menyaring Informasi',
    focus: 'Menggunakan kondisi if untuk memilih data yang memenuhi syarat tertentu.',
    mission: 'Isi kondisi if agar Python hanya menampilkan harga yang lebih besar dari 50000.',
    dataset: 'harga = [5000, 12000, 80000, 150000, 25000]',
    tips: 'Petunjuk: yang diperiksa adalah nilai satu per satu dalam perulangan, bukan seluruh list sekaligus.',
    concept: 'Kondisi if adalah "gerbang seleksi" dalam kode. Data yang tidak memenuhi syarat akan dilewati. Ini sangat berguna saat kita punya banyak data dan hanya butuh sebagian.',
    slots: ['kondisi_if'],
    slotHelp: {
      kondisi_if: 'Isi slot ini dengan syarat untuk setiap nilai yang sedang dibaca di dalam perulangan. Gunakan variabel "nilai" yang mewakili setiap angka harga.'
    },
    answers: { kondisi_if: 'nilai > 50000' },
    template: [
      ['harga = [5000, 12000, 80000, 150000, 25000]'],
      ['for nilai in harga:'],
      ['    if ', { slot: 'kondisi_if' }, ':'],
      ['        print(nilai)']
    ],
    options: ['nilai > 50000', 'nilai < 50000', 'max(harga)', 'harga > 50000', 'nilai == 0'],
    output: '80000\n150000',
    explanation: 'Kondisi if menyaring data seperti saringan kopi — hanya nilai yang lolos syarat yang ditampilkan. Dari 5 harga, hanya 80000 dan 150000 yang lebih besar dari 50000.',
    example: {
      intro:  'Saat data banyak, kita hanya ingin melihat data yang memenuhi syarat tertentu.',
      code:   'harga = [5000, 12000, 80000, 150000]\nfor nilai in harga:\n    if nilai > 50000:\n        print(nilai)',
      output: '80000\n150000',
      why:    'if bertindak sebagai "penjaga" — hanya nilai yang lolos syarat yang masuk dan ditampilkan.'
    },
    mistakeMap: {
      kondisi_if: {
        'nilai < 50000':  'Ini menyaring harga murah (di bawah 50000), padahal misi meminta yang lebih dari 50000.',
        'max(harga)':     'max(harga) adalah fungsi yang menghasilkan angka, bukan kondisi logika benar/salah.',
        'harga > 50000':  'Yang diperiksa dalam if adalah variabel "nilai" (setiap item), bukan seluruh list harga.',
        'nilai == 0':     'Ini memeriksa apakah nilainya nol — tidak ada harga nol di data ini.'
      }
    }
  },

  4: {
    shortLabel: 'Tampilkan Semua',
    title: 'Tahap 4 — Tampilkan Semua Produk',
    tag: 'Perulangan Otomatis',
    focus: 'Menggunakan for loop untuk menampilkan semua data tanpa menulis print berkali-kali.',
    mission: 'Isi bagian yang kosong agar Python menampilkan semua nama produk satu per satu secara otomatis.',
    dataset: 'data_produk = ["Pensil", "Buku", "Tas", "Sepatu", "Botol Minum"]',
    tips: 'Petunjuk: perulangan harus membaca langsung dari list yang berisi nama-nama produk.',
    concept: 'Perulangan for adalah tulang punggung otomasi. Tanpa for, kamu harus menulis 5 baris print() untuk 5 produk, 100 baris untuk 100 produk. Dengan for, cukup 2 baris berapapun jumlah datanya.',
    slots: ['sumber_for'],
    slotHelp: {
      sumber_for: 'Isi slot ini dengan nama list yang menjadi sumber data perulangan. Python akan membaca setiap item dari list ini satu per satu.'
    },
    answers: { sumber_for: 'data_produk' },
    template: [
      ['data_produk = ["Pensil", "Buku", "Tas", "Sepatu", "Botol Minum"]'],
      ['for produk in ', { slot: 'sumber_for' }, ':'],
      ['    print(produk)']
    ],
    options: ['data_produk', 'max(data_produk)', 'produk', 'range(5)', 'harga'],
    output: 'Pensil\nBuku\nTas\nSepatu\nBotol Minum',
    explanation: 'for membaca setiap item di data_produk secara bergantian dan menampilkannya. Jika ada 1000 produk, kode ini tetap hanya 2 baris. Inilah kekuatan otomasi Python!',
    example: {
      intro:  'Jika produk banyak, Python menampilkan semuanya satu per satu dengan perulangan.',
      code:   'data_produk = ["Pensil", "Buku", "Tas"]\nfor produk in data_produk:\n    print(produk)',
      output: 'Pensil\nBuku\nTas',
      why:    'for membaca setiap item di dalam list secara bergantian — otomatis, efisien, dan bisa menangani data sebanyak apapun.'
    },
    mistakeMap: {
      sumber_for: {
        'max(data_produk)': 'max() menghasilkan satu nilai terbesar, bukan membaca semua item satu per satu.',
        'produk':           '"produk" adalah variabel sementara yang berubah tiap putaran, bukan sumber listnya.',
        'range(5)':         'range(5) menghasilkan angka 0-4. Untuk membaca nama produk, sumbernya harus data_produk.',
        'harga':            'List harga berisi angka, bukan nama produk yang ingin ditampilkan.'
      }
    }
  },

  5: {
    shortLabel: 'Gabungkan',
    title: 'Tahap 5 — Tampilkan Data Lengkap',
    tag: 'Integrasi Data',
    focus: 'Menggabungkan semua konsep: list, for, dan zip() untuk menampilkan data berpasangan.',
    mission: 'Isi slot agar Python menampilkan setiap produk beserta harganya secara berpasangan menggunakan zip().',
    dataset: 'data_produk = ["Pensil","Buku","Tas","Sepatu","Botol Minum"]\nharga = [5000, 12000, 80000, 150000, 25000]',
    tips: 'Petunjuk: fungsi zip() menggabungkan dua list menjadi pasangan. Variabel yang dipakai dalam for harus dua nama, satu untuk produk satu untuk harga.',
    concept: 'zip() adalah fungsi yang "memasangkan" dua list seperti risleting. Ini adalah cara Python menggabungkan data_produk dan harga yang sudah kita pisahkan di Tahap 1 — kita melingkari penuh satu siklus pengolahan data!',
    slots: ['isi_zip'],
    slotHelp: {
      isi_zip: 'Isi slot ini dengan fungsi yang memasangkan data_produk dan harga agar setiap nama produk bisa tampil bersama harganya.'
    },
    answers: { isi_zip: 'zip(data_produk, harga)' },
    template: [
      ['data_produk = ["Pensil","Buku","Tas","Sepatu","Botol Minum"]'],
      ['harga = [5000, 12000, 80000, 150000, 25000]'],
      ['for produk, hrg in ', { slot: 'isi_zip' }, ':'],
      ['    print(produk, "-", hrg)']
    ],
    options: [
      'zip(data_produk, harga)',
      'max(data_produk, harga)',
      'data_produk + harga',
      'for data_produk in harga',
      'range(data_produk)'
    ],
    output: 'Pensil - 5000\nBuku - 12000\nTas - 80000\nSepatu - 150000\nBotol Minum - 25000',
    explanation: 'zip() menggabungkan data_produk dan harga menjadi pasangan. Ini adalah puncak dari perjalanan kita: kita memisahkan data di Tahap 1 agar bisa memprosesnya di Tahap 2, 3, 4 — dan di sini kita menggabungkannya kembali menjadi informasi yang utuh dan bermakna.',
    example: {
      intro:  'zip() bekerja seperti risleting — menggabungkan dua list menjadi pasangan yang rapi.',
      code:   'produk = ["Pensil", "Buku"]\nharga  = [5000, 12000]\nfor p, h in zip(produk, harga):\n    print(p, "-", h)',
      output: 'Pensil - 5000\nBuku - 12000',
      why:    'zip() memasangkan item dari dua list secara berurutan. Ini menunjukkan mengapa kita memisahkan data di awal — supaya bisa digabungkan kembali dengan cara yang lebih terstruktur.'
    },
    mistakeMap: {
      isi_zip: {
        'max(data_produk, harga)': 'max() tidak bisa membandingkan dua list berbeda jenis seperti ini.',
        'data_produk + harga':     'Operator + hanya menyambung dua list menjadi satu list panjang, bukan memasangkan.',
        'for data_produk in harga':'Ini adalah baris perulangan, bukan isi dari perulangan.',
        'range(data_produk)':      'range() hanya menerima angka, bukan list nama produk.'
      }
    }
  }
};

/* ────────────────────────────────────────────────────────── */
/*  KUIS REFLEKSI DATA                                        */
/* ────────────────────────────────────────────────────────── */
const QUIZ_QUESTIONS = [
  {
    q: 'Di kelas kamu ada data campuran: nama siswa dan nilai ujian mereka. Langkah pertama yang paling tepat sebelum mengolahnya dengan Python adalah…',
    options: [
      'Langsung mencari nilai tertinggi dengan max()',
      'Memisahkan nama siswa ke satu list dan nilai ke list lain',
      'Mencetak semua data sekaligus dengan print()',
      'Membuat perulangan for terlebih dahulu'
    ],
    correct: 1,
    explain: 'Dekomposisi data (Tahap 1) adalah fondasi. Sebelum mengolah, kita harus memisahkan jenis data agar Python bisa memproses masing-masing dengan tepat.'
  },
  {
    q: 'Kamu punya list nilai ujian 30 siswa. Kamu ingin tahu siapa yang mendapat nilai paling tinggi. Fungsi Python yang paling tepat adalah…',
    options: [
      'for nilai in data_nilai:',
      'if nilai > 80:',
      'max(data_nilai)',
      'zip(nama, nilai)'
    ],
    correct: 2,
    explain: 'max() adalah fungsi bawaan Python untuk mencari nilai terbesar dari sebuah list — persis seperti yang kita pelajari di Tahap 2.'
  },
  {
    q: 'Dari 30 nilai ujian, kamu hanya ingin menampilkan siswa yang nilainya di atas 75 (lulus). Kode yang paling tepat adalah…',
    options: [
      'if nilai > 75: print(nilai)',
      'max(data_nilai) > 75',
      'for nilai in data_nilai: print(nilai)',
      'zip(nama, nilai) > 75'
    ],
    correct: 0,
    explain: 'Kondisi if di dalam perulangan for (Tahap 3) adalah cara Python "menyaring" — hanya data yang lolos syarat yang diproses lebih lanjut.'
  },
  {
    q: 'Kamu ingin menampilkan semua 30 nama siswa tanpa menulis 30 baris print(). Cara paling efisien menggunakan Python adalah…',
    options: [
      'Menulis print() sebanyak 30 kali',
      'Menggunakan max(nama_siswa)',
      'Menggunakan for nama in data_siswa: print(nama)',
      'Menggunakan if nama in data_siswa: print(nama)'
    ],
    correct: 2,
    explain: 'Perulangan for (Tahap 4) adalah kekuatan otomasi Python. Dua baris kode cukup untuk memproses berapapun jumlah data.'
  },
  {
    q: 'Kamu sudah punya list nama_siswa dan list nilai secara terpisah. Kamu ingin menampilkan "Andi — 85" untuk setiap siswa. Fungsi yang tepat adalah…',
    options: [
      'nama_siswa + nilai',
      'max(nama_siswa, nilai)',
      'zip(nama_siswa, nilai)',
      'range(nama_siswa)'
    ],
    correct: 2,
    explain: 'zip() menggabungkan dua list menjadi pasangan (Tahap 5). Ini melengkapi siklus: kita pisahkan data di awal agar bisa digabung kembali dengan cara yang bermakna.'
  }
];

/* ────────────────────────────────────────────────────────── */
/*  APP STATE                                                 */
/* ────────────────────────────────────────────────────────── */
const state = {
  currentStage: 1,
  completed:    {},
  slotValues:   { 1:{}, 2:{}, 3:{}, 4:{}, 5:{} },
  activeSlot:   null,
  hasSeenIntro: false,
  quizAnswers:  {},
  quizDone:     false
};

/* Gate state */
let hasSeenTujuan = false;
let hasSeenCara   = false;

/* Cara slide index */
let currentCaraSlide = 0;

/* Bio slide index */
let currentBioSlide = 0;

/* Quiz state */
let currentQuizQ    = 0;

/* Mode Guru */
let isGuruMode      = false;
let logoClickCount  = 0;
let logoClickTimer  = null;

/* ────────────────────────────────────────────────────────── */
/*  PAGE NAVIGATION                                           */
/* ────────────────────────────────────────────────────────── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'labPage') {
    renderAll();
    if (!state.hasSeenIntro) {
      state.hasSeenIntro = true;
      openModal('introModal');
    }
  }
}

/* ────────────────────────────────────────────────────────── */
/*  GATE – Kunci "Mulai Percobaan"                           */
/* ────────────────────────────────────────────────────────── */
function tryOpenLabPage() {
  if (!hasSeenTujuan || !hasSeenCara) {
    openModal('lockedModal');
    return;
  }
  showPage('labPage');
}

function checkStartButtonState() {
  const btn = document.getElementById('btn-start');
  if (!btn) return;
  if (hasSeenTujuan && hasSeenCara) {
    btn.classList.remove('disabled-style');
    btn.setAttribute('aria-disabled', 'false');
    btn.title = 'Mulai percobaan';
  } else {
    btn.classList.add('disabled-style');
    btn.setAttribute('aria-disabled', 'true');
    btn.title = 'Buka Tujuan dan Cara Penggunaan terlebih dahulu';
  }
}

/* ────────────────────────────────────────────────────────── */
/*  MODAL HELPERS                                             */
/* ────────────────────────────────────────────────────────── */
function openModal(id) {
  document.getElementById(id).classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
  document.body.style.overflow = 'auto';
}

/* ────────────────────────────────────────────────────────── */
/*  TUJUAN MODAL                                              */
/* ────────────────────────────────────────────────────────── */
function openTujuanModal() {
  hasSeenTujuan = true;
  checkStartButtonState();
  openModal('tujuanModal');
}

/* ────────────────────────────────────────────────────────── */
/*  CARA MODAL                                                */
/* ────────────────────────────────────────────────────────── */
function openCaraModal() {
  hasSeenCara = true;
  checkStartButtonState();
  currentCaraSlide = 0;
  updateCaraSlideView();
  openModal('caraModal');
}

function changeCaraSlide(dir) {
  const slides = document.querySelectorAll('.cara-slide');
  currentCaraSlide = Math.max(0, Math.min(slides.length - 1, currentCaraSlide + dir));
  updateCaraSlideView();
}

function updateCaraSlideView() {
  const slides = document.querySelectorAll('.cara-slide');
  slides.forEach((s, i) => {
    s.classList.toggle('hidden', i !== currentCaraSlide);
    const dot = document.getElementById(`caraDot-${i}`);
    if (dot) dot.classList.toggle('active', i === currentCaraSlide);
  });
  const prev = document.getElementById('caraPrevBtn');
  const next = document.getElementById('caraNextBtn');
  if (prev) prev.style.visibility = currentCaraSlide === 0 ? 'hidden' : 'visible';
  if (next) next.style.visibility = currentCaraSlide === slides.length - 1 ? 'hidden' : 'visible';
}

/* ────────────────────────────────────────────────────────── */
/*  BIO MODAL                                                 */
/* ────────────────────────────────────────────────────────── */
function openBioModal() {
  currentBioSlide = 0;
  updateBioSlideView();
  openModal('bioModal');
}

function changeBioSlide(dir) {
  const slides = document.querySelectorAll('.bio-slide');
  currentBioSlide = Math.max(0, Math.min(slides.length - 1, currentBioSlide + dir));
  updateBioSlideView();
}

function updateBioSlideView() {
  const slides = document.querySelectorAll('.bio-slide');
  slides.forEach((s, i) => s.classList.toggle('hidden', i !== currentBioSlide));
  const prev = document.getElementById('bioPrevBtn');
  const next = document.getElementById('bioNextBtn');
  if (prev) prev.style.visibility = currentBioSlide === 0 ? 'hidden' : 'visible';
  if (next) next.style.visibility = currentBioSlide === slides.length - 1 ? 'hidden' : 'visible';
}

/* ────────────────────────────────────────────────────────── */
/*  EXAMPLE MODAL                                             */
/* ────────────────────────────────────────────────────────── */
function openExampleModal() {
  const stage = STAGES[state.currentStage];
  document.getElementById('exampleTitle').textContent  = stage.title + ' — Contoh';
  document.getElementById('exampleIntro').textContent  = stage.example.intro;
  document.getElementById('exampleCode').textContent   = stage.example.code;
  document.getElementById('exampleOutput').textContent = stage.example.output;
  document.getElementById('exampleWhy').textContent    = stage.example.why;
  openModal('exampleModal');
}

/* ────────────────────────────────────────────────────────── */
/*  STAGE NAVIGATION                                          */
/* ────────────────────────────────────────────────────────── */
function highestUnlockedStage() {
  let u = 1;
  for (let i = 1; i <= TOTAL_STAGES; i++) {
    if (state.completed[i]) u = Math.min(TOTAL_STAGES, i + 1);
  }
  return u;
}

function changeStage(no) {
  if (no > highestUnlockedStage()) return;
  state.currentStage = no;
  state.activeSlot   = null;
  resetFeedbackOnly();
  renderAll();
  openExampleModal();
}

function goNextStage() {
  if (state.currentStage >= TOTAL_STAGES) return;
  if (!state.completed[state.currentStage]) return;
  state.currentStage += 1;
  state.activeSlot    = null;
  resetFeedbackOnly();
  renderAll();
  openExampleModal();
}

/* ────────────────────────────────────────────────────────── */
/*  PROGRESS BAR                                              */
/* ────────────────────────────────────────────────────────── */
function renderProgressBar() {
  const bar   = document.getElementById('progressBar');
  const label = document.getElementById('progressLabel');
  const steps = document.getElementById('progressSteps');
  if (!bar) return;

  const doneCount = Object.keys(state.completed).filter(k => state.completed[k]).length;
  const pct       = Math.round((doneCount / TOTAL_STAGES) * 100);

  bar.style.width   = pct + '%';
  label.textContent = `${doneCount} / ${TOTAL_STAGES} Tahap Selesai (${pct}%)`;

  if (!steps) return;
  steps.innerHTML = '';
  for (let i = 1; i <= TOTAL_STAGES; i++) {
    const dot = document.createElement('div');
    dot.className = 'prog-step';
    if (state.completed[i])         dot.classList.add('done');
    else if (state.currentStage===i) dot.classList.add('current');
    dot.title = STAGES[i].shortLabel;
    dot.innerHTML = state.completed[i]
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>`
      : `<span>${i}</span>`;
    dot.onclick = () => { if(i <= highestUnlockedStage()) changeStage(i); };
    steps.appendChild(dot);

    if (i < TOTAL_STAGES) {
      const line = document.createElement('div');
      line.className = 'prog-line' + (state.completed[i] ? ' done' : '');
      steps.appendChild(line);
    }
  }

  /* Tampilkan tombol kuis jika semua tahap selesai */
  const quizBtn = document.getElementById('startQuizBtn');
  if (quizBtn) {
    const allDone = Object.keys(state.completed).filter(k=>state.completed[k]).length === TOTAL_STAGES;
    quizBtn.classList.toggle('hidden-btn', !allDone);
    quizBtn.classList.toggle('pulse-btn', allDone && !state.quizDone);
  }
}

/* ────────────────────────────────────────────────────────── */
/*  RENDER FUNCTIONS                                          */
/* ────────────────────────────────────────────────────────── */
function renderAll() {
  renderStageNav();
  renderMissionPanel();
  renderOptions();
  renderCodeArea();
  updateNextButton();
  renderProgressBar();
}

function renderStageNav() {
  const nav      = document.getElementById('stageNav');
  const unlocked = highestUnlockedStage();
  nav.innerHTML  = '';

  for (let i = 1; i <= TOTAL_STAGES; i++) {
    const btn = document.createElement('button');
    btn.className = 'stage-card';
    btn.innerHTML = `<span class="num">${i}</span><span class="label">${STAGES[i].shortLabel}</span>`;

    if (state.currentStage === i) btn.classList.add('active');
    else if (state.completed[i])  btn.classList.add('done');

    if (i > unlocked) {
      btn.classList.add('locked');
      btn.disabled = true;
    } else {
      btn.onclick = () => changeStage(i);
    }
    nav.appendChild(btn);
  }
}

function renderMissionPanel() {
  const stage = STAGES[state.currentStage];
  document.getElementById('missionPanel').innerHTML = `
    <div class="mission-card">
      <div class="mission-tag">${stage.tag}</div>
      <div class="text-2xl font-black text-slate-900 mb-2">${stage.title}</div>
      <div class="text-slate-600 leading-7 mb-3">${stage.focus}</div>
      <div class="bg-white border border-sky-100 rounded-2xl p-4 text-slate-700 leading-7">
        <b>Misi:</b> ${stage.mission}
      </div>
    </div>
    <div class="mb-4">
      <div class="font-black text-slate-800 mb-2">Dataset Mentah</div>
      <div class="dataset-box">${escapeHtml(stage.dataset)}</div>
    </div>
    <div class="concept-box">
      <div class="concept-box-label">Konsep Kunci</div>
      ${stage.concept}
    </div>
    <div class="info-box mt-3"><b>Petunjuk:</b><br>${stage.tips}</div>
    <div class="grid grid-cols-1 gap-3 mt-4">
      <button onclick="openExampleModal()" class="bg-sky-600 text-white rounded-2xl px-4 py-3 font-black">Contoh Tahap Ini</button>
      <button onclick="openModal('istilahModal')" class="bg-indigo-600 text-white rounded-2xl px-4 py-3 font-black">Istilah Penting</button>
    </div>
  `;
}

function renderOptions() {
  const stage     = STAGES[state.currentStage];
  const activeBox = document.getElementById('activeSlotBox');
  const helpBox   = document.getElementById('slotHelpBox');
  const grid      = document.getElementById('optionGrid');

  if (!state.activeSlot) {
    activeBox.textContent = 'Klik kotak kosong pada area kode terlebih dahulu.';
    helpBox.textContent   = 'Bantuan slot akan muncul di sini setelah kamu memilih salah satu kotak kosong.';
  } else {
    activeBox.innerHTML = `Slot aktif: <span class="ml-2 font-black">${state.activeSlot}</span>`;
    helpBox.textContent = stage.slotHelp[state.activeSlot] || 'Pilih komponen kode yang paling sesuai.';
  }

  grid.innerHTML = '';
  stage.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<div class="option-chip">komponen kode</div><br>
      <span style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">${escapeHtml(opt)}</span>`;
    btn.onclick = () => fillSlot(opt);
    grid.appendChild(btn);
  });
}

function renderCodeArea() {
  const stage    = STAGES[state.currentStage];
  const codeArea = document.getElementById('codeArea');
  codeArea.innerHTML = '';

  stage.template.forEach((lineParts, idx) => {
    const line = document.createElement('div');
    line.className = 'code-line';

    const num = document.createElement('div');
    num.className   = 'line-num';
    num.textContent = idx + 1;

    const code = document.createElement('div');
    code.className = 'line-code';

    lineParts.forEach(part => {
      if (typeof part === 'string') {
        const sp = document.createElement('span');
        sp.textContent = part;
        code.appendChild(sp);
      } else if (part.slot) {
        const key   = part.slot;
        const value = state.slotValues[state.currentStage][key] || '';
        const slot  = document.createElement('span');
        slot.className = 'code-slot';
        if (state.activeSlot === key) slot.classList.add('active');
        if (value)                    slot.classList.add('filled');
        slot.textContent = value || '____';
        slot.onclick = () => selectSlot(key);
        code.appendChild(slot);
      }
    });

    line.appendChild(num);
    line.appendChild(code);
    codeArea.appendChild(line);
  });
}

/* ────────────────────────────────────────────────────────── */
/*  SLOT INTERACTIONS                                         */
/* ────────────────────────────────────────────────────────── */
function selectSlot(key) {
  state.activeSlot = key;
  renderOptions();
  renderCodeArea();
}

function fillSlot(value) {
  if (!state.activeSlot) return;
  state.slotValues[state.currentStage][state.activeSlot] = value;
  renderCodeArea();
  renderOptions();
}

function clearActiveSlot() {
  if (!state.activeSlot) return;
  delete state.slotValues[state.currentStage][state.activeSlot];
  renderCodeArea();
  renderOptions();
}

function resetStage() {
  state.slotValues[state.currentStage] = {};
  state.activeSlot = null;
  document.getElementById('terminalBody').textContent = 'Tahap direset.\nIsi ulang komponen kode untuk misi ini.';
  const eb = document.getElementById('explainBox');
  eb.className   = 'explain-box info';
  eb.textContent = 'Penjelasan akan muncul di sini setelah kode dijalankan.';
  updateNextButton();
  renderCodeArea();
  renderOptions();
}

/* ────────────────────────────────────────────────────────── */
/*  RUN CODE                                                  */
/* ────────────────────────────────────────────────────────── */
function stageIsCorrect() {
  const stage = STAGES[state.currentStage];
  const cur   = state.slotValues[state.currentStage];
  return stage.slots.every(k => cur[k] === stage.answers[k]);
}

function findWrongSlots() {
  const stage = STAGES[state.currentStage];
  const cur   = state.slotValues[state.currentStage];
  return stage.slots.filter(k => cur[k] !== stage.answers[k]);
}

function getSpecificMistakeMessage() {
  const stage      = STAGES[state.currentStage];
  const wrongSlots = findWrongSlots();
  for (const key of wrongSlots) {
    const chosen = state.slotValues[state.currentStage][key];
    if (chosen && stage.mistakeMap?.[key]?.[chosen]) return stage.mistakeMap[key][chosen];
  }
  if (wrongSlots.length > 0) return `Periksa lagi slot ${wrongSlots[0]}. Baca petunjuk dan bantuan slot.`;
  return 'Kode belum tepat. Periksa kembali isi slot yang masih salah.';
}

function runCode() {
  const terminal = document.getElementById('terminalBody');
  const explain  = document.getElementById('explainBox');
  const stage    = STAGES[state.currentStage];

  const missing = stage.slots.filter(k => !state.slotValues[state.currentStage][k]);
  if (missing.length > 0) {
    terminal.textContent = 'Program belum bisa dijalankan.\nMasih ada slot yang belum diisi.';
    explain.className    = 'explain-box warn';
    explain.textContent  = 'Masih ada bagian kode yang kosong. Isi semua slot dulu, baru jalankan kode.';
    return;
  }

  if (stageIsCorrect()) {
    const wasAlreadyDone = !!state.completed[state.currentStage];
    state.completed[state.currentStage] = true;
    terminal.textContent = stage.output;
    explain.className    = 'explain-box success';
    explain.textContent  = stage.explanation;

    const nextBtn = document.getElementById('stageNextBtn');
    if (state.currentStage < TOTAL_STAGES) {
      nextBtn.disabled = false;
      nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
      nextBtn.disabled = true;
      nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
      if (!wasAlreadyDone) {
        terminal.textContent += '\n\nLuar biasa! Semua tahap selesai.\nTekan "Kuis Refleksi" untuk menguji pemahamanmu.';
      }
    }

    renderProgressBar();
  } else {
    const wrongSlots = findWrongSlots();
    terminal.textContent = 'Program berjalan, tetapi hasilnya belum sesuai misi.\nPeriksa kembali slot: ' + wrongSlots.join(', ');
    explain.className    = 'explain-box warn';
    explain.textContent  = getSpecificMistakeMessage();
  }
  renderStageNav();
}

/* ────────────────────────────────────────────────────────── */
/*  KUIS REFLEKSI                                             */
/* ────────────────────────────────────────────────────────── */
function openQuizModal() {
  currentQuizQ = 0;
  state.quizAnswers = {};
  renderQuizQuestion();
  openModal('quizModal');
}

function renderQuizQuestion() {
  const q         = QUIZ_QUESTIONS[currentQuizQ];
  const total     = QUIZ_QUESTIONS.length;
  const container = document.getElementById('quizContent');
  if (!container) return;

  container.innerHTML = `
    <div class="quiz-progress-wrap">
      <div class="quiz-progress-bar" style="width:${((currentQuizQ)/total)*100}%"></div>
    </div>
    <div class="quiz-counter">Soal ${currentQuizQ+1} dari ${total}</div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options" id="quizOptions"></div>
    <div id="quizFeedback" class="quiz-feedback hidden-el"></div>
    <div class="quiz-nav-row">
      <button id="quizPrevBtn" onclick="quizNav(-1)"
              class="quiz-nav-btn" style="visibility:${currentQuizQ===0?'hidden':'visible'}">
        &larr; Sebelumnya
      </button>
      <button id="quizNextBtn" onclick="quizNav(1)"
              class="quiz-nav-btn quiz-nav-btn-next hidden-el">
        ${currentQuizQ === total-1 ? 'Lihat Hasil' : 'Selanjutnya'} &rarr;
      </button>
    </div>
  `;

  const opts = document.getElementById('quizOptions');
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.innerHTML = `<span class="quiz-opt-letter">${String.fromCharCode(65+idx)}</span>${escapeHtml(opt)}`;
    btn.onclick   = () => selectQuizAnswer(idx);
    /* Jika sudah dijawab sebelumnya, restore state */
    if (state.quizAnswers[currentQuizQ] !== undefined) {
      restoreQuizAnswer(btn, idx, q);
    }
    opts.appendChild(btn);
  });

  if (state.quizAnswers[currentQuizQ] !== undefined) showQuizFeedback(q, state.quizAnswers[currentQuizQ]);
}

function selectQuizAnswer(idx) {
  if (state.quizAnswers[currentQuizQ] !== undefined) return; /* Tidak bisa ganti jawaban */
  state.quizAnswers[currentQuizQ] = idx;

  const q    = QUIZ_QUESTIONS[currentQuizQ];
  const opts = document.querySelectorAll('.quiz-opt-btn');
  opts.forEach((btn, i) => restoreQuizAnswer(btn, i, q));
  showQuizFeedback(q, idx);

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) nextBtn.classList.remove('hidden-el');
}

function restoreQuizAnswer(btn, idx, q) {
  const chosen = state.quizAnswers[currentQuizQ];
  if (chosen === undefined) return;
  if (idx === q.correct) {
    btn.classList.add('quiz-correct');
  } else if (idx === chosen && idx !== q.correct) {
    btn.classList.add('quiz-wrong');
  }
  btn.disabled = true;
}

function showQuizFeedback(q, chosen) {
  const fb = document.getElementById('quizFeedback');
  if (!fb) return;
  fb.classList.remove('hidden-el');
  const isRight = chosen === q.correct;
  fb.className  = 'quiz-feedback ' + (isRight ? 'quiz-fb-correct' : 'quiz-fb-wrong');
  fb.innerHTML  = `<strong>${isRight ? 'Benar!' : 'Belum tepat.'}</strong> ${q.explain}`;
  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) nextBtn.classList.remove('hidden-el');
}

function quizNav(dir) {
  const next = currentQuizQ + dir;
  if (next < 0) return;
  if (next >= QUIZ_QUESTIONS.length) {
    showQuizResult();
    return;
  }
  currentQuizQ = next;
  renderQuizQuestion();
}

function showQuizResult() {
  state.quizDone = true;
  const score    = Object.keys(state.quizAnswers)
    .filter(k => state.quizAnswers[k] === QUIZ_QUESTIONS[k].correct).length;
  const total    = QUIZ_QUESTIONS.length;
  const pct      = Math.round((score/total)*100);

  closeModal('quizModal');

  /* Isi sertifikat */
  document.getElementById('certScore').textContent   = `${score} / ${total}`;
  document.getElementById('certPct').textContent     = `${pct}%`;
  document.getElementById('certDate').textContent    = new Date().toLocaleDateString('id-ID', {day:'numeric',month:'long',year:'numeric'});

  let grade = '', gradeColor = '', gradeDesc = '';
  if (pct >= 80)      { grade='Sangat Baik'; gradeColor='#16a34a'; gradeDesc='Kamu memahami konsep pengolahan data dengan sangat baik!'; }
  else if (pct >= 60) { grade='Baik';        gradeColor='#2563eb'; gradeDesc='Pemahaman kamu sudah baik. Ulangi tahap yang dirasa sulit.'; }
  else                { grade='Perlu Latihan'; gradeColor='#dc2626'; gradeDesc='Jangan menyerah! Coba ulangi lab dari awal untuk memperkuat pemahaman.'; }

  document.getElementById('certGrade').textContent  = grade;
  document.getElementById('certGrade').style.color  = gradeColor;
  document.getElementById('certGradeDesc').textContent = gradeDesc;

  openModal('sertifikatModal');
  renderProgressBar();
}

/* ────────────────────────────────────────────────────────── */
/*  CETAK SERTIFIKAT                                          */
/* ────────────────────────────────────────────────────────── */
function printSertifikat() {
  window.print();
}

/* ────────────────────────────────────────────────────────── */
/*  MODE GURU                                                 */
/* ────────────────────────────────────────────────────────── */
function handleLogoClick() {
  logoClickCount++;
  clearTimeout(logoClickTimer);
  logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 2000);
  if (logoClickCount >= 5) {
    logoClickCount = 0;
    toggleGuruMode();
  }
}

function toggleGuruMode() {
  isGuruMode = !isGuruMode;
  if (isGuruMode) {
    renderGuruPanel();
    openModal('guruModal');
  }
}

function renderGuruPanel() {
  const body = document.getElementById('guruBody');
  if (!body) return;

  let html = '';
  for (let i = 1; i <= TOTAL_STAGES; i++) {
    const s = STAGES[i];
    const answersHtml = s.slots.map(slotKey =>
      `<div class="guru-answer-row">
        <span class="guru-slot-label">${slotKey}</span>
        <code class="guru-answer-code">${escapeHtml(s.answers[slotKey])}</code>
      </div>`
    ).join('');

    html += `
      <div class="guru-stage-card">
        <div class="guru-stage-header">
          <span class="guru-stage-num">${i}</span>
          <span class="guru-stage-title">${s.title}</span>
          <span class="guru-stage-tag">${s.tag}</span>
        </div>
        <div class="guru-section-label">Jawaban Benar</div>
        ${answersHtml}
        <div class="guru-section-label mt-2">Catatan Pedagogis</div>
        <div class="guru-notes">${s.concept}</div>
        <div class="guru-section-label mt-2">Output yang Diharapkan</div>
        <pre class="guru-output">${escapeHtml(s.output)}</pre>
      </div>
    `;
  }

  /* Tambah kunci jawaban kuis */
  html += `<div class="guru-stage-card">
    <div class="guru-stage-header">
      <span class="guru-stage-num" style="background:#7c3aed;">K</span>
      <span class="guru-stage-title">Kuis Refleksi — Kunci Jawaban</span>
    </div>`;
  QUIZ_QUESTIONS.forEach((q, i) => {
    html += `
      <div class="guru-answer-row" style="flex-direction:column; gap:4px; margin-bottom:10px;">
        <div style="font-weight:700; color:#1e293b;">Soal ${i+1}:</div>
        <div style="color:#475569; font-size:14px;">${q.q}</div>
        <div style="color:#16a34a; font-weight:700; font-size:14px;">
          Jawaban: ${String.fromCharCode(65+q.correct)}. ${q.options[q.correct]}
        </div>
      </div>`;
  });
  html += `</div>`;

  body.innerHTML = html;
}

/* ────────────────────────────────────────────────────────── */
/*  UTILITIES                                                 */
/* ────────────────────────────────────────────────────────── */
function resetFeedbackOnly() {
  document.getElementById('terminalBody').textContent = 'Python 3.10.x — siap digunakan.\nKlik kotak kosong, pilih komponen kode, lalu tekan Jalankan Kode.';
  const eb = document.getElementById('explainBox');
  eb.className   = 'explain-box info';
  eb.textContent = 'Penjelasan akan muncul di sini setelah kode dijalankan.';
}

function updateNextButton() {
  const btn     = document.getElementById('stageNextBtn');
  const enabled = state.completed[state.currentStage] && state.currentStage < TOTAL_STAGES;
  btn.disabled  = !enabled;
  if (enabled) btn.classList.remove('opacity-50','cursor-not-allowed');
  else         btn.classList.add('opacity-50','cursor-not-allowed');
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
    .replaceAll('"','&quot;').replaceAll("'",'&#039;');
}

/* ── Keyboard shortcut: Ctrl+Shift+G = Mode Guru ─────────── */
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.shiftKey && e.key === 'G') { e.preventDefault(); toggleGuruMode(); }
});

/* ── Boot ─────────────────────────────────────────────────── */
renderAll();
