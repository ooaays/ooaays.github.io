const CONDITION_LABEL = {
  berbahaya: 'Mengandung bahan berbahaya',
  organik: 'Termasuk sampah organik',
  residu: 'Termasuk sampah residu',
  kertas: 'Berbahan kertas',
  recycle: 'Dapat didaur ulang',
  anorganik: 'Termasuk sampah anorganik'
};

const BIN_INFO = {
  hijau: { name: 'Tong Hijau', label: 'ORGANIK', color: '#22c55e', textColor: '#ffffff' },
  kuning: { name: 'Tong Kuning', label: 'ANORGANIK', color: '#fde047', textColor: '#713f12' },
  merah: { name: 'Tong Merah', label: 'B3', color: '#ef4444', textColor: '#ffffff' },
  biru: { name: 'Tong Biru', label: 'KERTAS', color: '#2563eb', textColor: '#ffffff' },
  hitam: { name: 'Tong Hitam', label: 'RESIDU', color: '#1e293b', textColor: '#ffffff' }
};

const CORRECT_BIN = {
  organik: 'hijau',
  anorganik: 'kuning',
  b3: 'merah',
  kertas: 'biru',
  residu: 'hitam'
};

const ITEMS = [
  {
    image: 'assets/img/items/kulit-pisang.svg',
    label: 'Kulit Pisang',
    actualType: 'organik',
    matches: ['organik']
  },
  {
    image: 'assets/img/items/botol-plastik.svg',
    label: 'Botol Plastik',
    actualType: 'anorganik',
    matches: ['anorganik', 'recycle']
  },
  {
    image: 'assets/img/items/baterai-bekas.svg',
    label: 'Baterai Bekas',
    actualType: 'b3',
    matches: ['berbahaya']
  },
  {
    image: 'assets/img/items/koran-bekas.svg',
    label: 'Koran Bekas',
    actualType: 'kertas',
    matches: ['kertas', 'recycle']
  },
  {
    image: 'assets/img/items/kardus.svg',
    label: 'Kardus',
    actualType: 'kertas',
    matches: ['kertas', 'recycle']
  },
  {
    image: 'assets/img/items/daun-kering.svg',
    label: 'Daun Kering',
    actualType: 'organik',
    matches: ['organik']
  },
  {
    image: 'assets/img/items/kaleng-minuman.svg',
    label: 'Kaleng Minuman',
    actualType: 'anorganik',
    matches: ['anorganik', 'recycle']
  },
  {
    image: 'assets/img/items/tisu-kotor.svg',
    label: 'Tisu Kotor',
    actualType: 'residu',
    matches: ['residu', 'kertas']
  }
];

const CHALLENGES = [
  {
    id: 'c1',
    title: 'Level 1 — Aturan Belum Lengkap',
    focus: 'Menambah aturan yang belum ada',
    objective: 'Capai akurasi 100% dengan menambahkan aturan yang hilang tanpa merusak aturan yang sudah benar.',
    hint: 'Aturan umum seperti "dapat didaur ulang" belum cukup. Coba pikirkan item berbahaya, kertas, dan residu.',
    starterRules: [
      { condition: 'organik', action: 'hijau' },
      { condition: 'recycle', action: 'kuning' }
    ]
  },
  {
    id: 'c2',
    title: 'Level 2 — Urutan Masih Keliru',
    focus: 'Menyusun aturan khusus sebelum aturan umum',
    objective: 'Perbaiki urutan sampai kertas dan tisu kotor tidak salah tong.',
    hint: 'Ada aturan umum yang diletakkan terlalu atas. Cek kondisi yang bisa mengenai item kertas sekaligus item daur ulang.',
    starterRules: [
      { condition: 'berbahaya', action: 'merah' },
      { condition: 'organik', action: 'hijau' },
      { condition: 'kertas', action: 'biru' },
      { condition: 'recycle', action: 'kuning' },
      { condition: 'residu', action: 'hitam' }
    ]
  },
  {
    id: 'c3',
    title: 'Level 3 — Debug Campuran',
    focus: 'Menemukan aksi salah, aturan hilang, dan urutan yang belum tepat',
    objective: 'Benahi semua bug sampai baterai, kertas, dan residu masuk ke tong yang tepat.',
    hint: 'Periksa apakah ada aksi yang salah total, aturan yang belum ada, atau aturan umum yang terlalu cepat dijalankan.',
    starterRules: [
      { condition: 'organik', action: 'hijau' },
      { condition: 'recycle', action: 'kuning' },
      { condition: 'berbahaya', action: 'kuning' },
      { condition: 'kertas', action: 'biru' }
    ]
  }
];

const appState = {
  hasReadTujuan: false,
  hasReadCara: false,
  introShown: false,
  currentCaraSlide: 0,
  currentBioSlide: 0,
  rules: [],
  queue: [],
  placedItems: {},
  processedResults: [],
  logs: [],
  score: { total: 0, correct: 0, wrong: 0 },
  running: false,
  currentIndex: -1,
  banner: { tone: 'info', text: 'Sistem di-reset. Susun aturan jika perlu, lalu jalankan simulasi.' },
  activeChallengeId: null,
  completedChallenges: {}
};

function qs(id) { return document.getElementById(id); }

function openModal(id) {
  const el = qs(id);
  if (!el) return;
  el.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const el = qs(id);
  if (!el) return;
  el.classList.remove('show');
  if (!document.querySelector('.modal-backdrop.show')) {
    document.body.style.overflow = '';
  }
}

function showPage(id) {
  document.querySelectorAll('.page').forEach((page) => page.classList.remove('active'));
  qs(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'labPage') {
    renderAll();
    if (!appState.introShown) {
      appState.introShown = true;
      openModal('introModal');
    }
  }
}

function updateStartUnlock() {
  const unlocked = appState.hasReadTujuan && appState.hasReadCara;
  const btn = qs('btnStart');
  const banner = qs('homeUnlockBanner');
  if (unlocked) {
    btn.classList.remove('disabled-style');
    btn.setAttribute('aria-disabled', 'false');
    btn.title = 'Mulai percobaan';
    banner.classList.remove('hidden');
  } else {
    btn.classList.add('disabled-style');
    btn.setAttribute('aria-disabled', 'true');
    btn.title = 'Baca Tujuan Pembelajaran dan Cara Penggunaan terlebih dahulu';
    banner.classList.add('hidden');
  }
}

function tryOpenLabPage() {
  if (!(appState.hasReadTujuan && appState.hasReadCara)) {
    openModal('lockedModal');
    return;
  }
  showPage('labPage');
}

function openTujuanModal() { openModal('tujuanModal'); }

function markTujuanRead() {
  appState.hasReadTujuan = true;
  updateStartUnlock();
  closeModal('tujuanModal');
}

function getCaraSlides() {
  return Array.from(document.querySelectorAll('#caraSlidesWrap .cara-slide'));
}

function openCaraModal() {
  appState.currentCaraSlide = 0;
  updateCaraSlideView();
  openModal('caraModal');
}

function changeCaraSlide(direction) {
  const slides = getCaraSlides();
  appState.currentCaraSlide = Math.max(0, Math.min(slides.length - 1, appState.currentCaraSlide + direction));
  updateCaraSlideView();
}

function updateCaraSlideView() {
  const slides = getCaraSlides();
  slides.forEach((slide, index) => {
    slide.classList.toggle('hidden', index !== appState.currentCaraSlide);
    const dot = qs(`caraDot-${index}`);
    if (dot) dot.classList.toggle('active', index === appState.currentCaraSlide);
  });
  const lastIndex = slides.length - 1;
  qs('caraPrevBtn').style.visibility = appState.currentCaraSlide === 0 ? 'hidden' : 'visible';
  qs('caraNextBtn').style.visibility = appState.currentCaraSlide === lastIndex ? 'hidden' : 'visible';
}

function finishCaraRead() {
  appState.hasReadCara = true;
  updateStartUnlock();
  closeModal('caraModal');
}

function openBioModal() {
  appState.currentBioSlide = 0;
  updateBioSlideView();
  openModal('bioModal');
}

function getBioSlides() {
  return Array.from(document.querySelectorAll('#bioModal .bio-slide'));
}

function changeBioSlide(direction) {
  const slides = getBioSlides();
  appState.currentBioSlide = Math.max(0, Math.min(slides.length - 1, appState.currentBioSlide + direction));
  updateBioSlideView();
}

function updateBioSlideView() {
  const slides = getBioSlides();
  slides.forEach((slide, index) => slide.classList.toggle('hidden', index !== appState.currentBioSlide));
  const lastIndex = slides.length - 1;
  qs('bioPrevBtn').style.visibility = appState.currentBioSlide === 0 ? 'hidden' : 'visible';
  qs('bioNextBtn').style.visibility = appState.currentBioSlide === lastIndex ? 'hidden' : 'visible';
}

function openDebugModal() {
  renderDebugCards();
  openModal('debugModal');
}

function getChallengeById(id) {
  return CHALLENGES.find((challenge) => challenge.id === id) || null;
}

function renderDebugCards() {
  const wrap = qs('debugCards');
  if (!wrap) return;
  wrap.innerHTML = CHALLENGES.map((challenge) => {
    const isActive = appState.activeChallengeId === challenge.id;
    const isDone = Boolean(appState.completedChallenges[challenge.id]);
    const statusText = isDone ? 'Selesai' : isActive ? 'Aktif' : 'Belum Dicoba';
    const statusClass = isDone ? 'done' : isActive ? 'active' : 'idle';
    const starterRules = challenge.starterRules.map((rule) => (
      `<li>JIKA ${CONDITION_LABEL[rule.condition]} → ${BIN_INFO[rule.action].label}</li>`
    )).join('');

    return `
      <div class="debug-card ${statusClass}">
        <div class="debug-status ${statusClass}">${statusText}</div>
        <h3>${challenge.title}</h3>
        <p><strong>Fokus:</strong> ${challenge.focus}</p>
        <p><strong>Tugas:</strong> ${challenge.objective}</p>
        <div class="debug-starter">
          <strong>Aturan awal:</strong>
          <ul>${starterRules}</ul>
        </div>
        <div class="debug-hint"><strong>Petunjuk:</strong> ${challenge.hint}</div>
        <button class="pill-btn indigo full" onclick="loadChallenge('${challenge.id}')">${isActive ? 'Muat Ulang Tantangan Ini' : 'Muat Tantangan Ini'}</button>
      </div>
    `;
  }).join('');
}

function renderChallengeStatus() {
  const status = qs('challengeStatus');
  const objective = qs('challengeObjective');
  const badges = qs('challengeBadges');
  if (!status || !objective || !badges) return;

  badges.innerHTML = CHALLENGES.map((challenge) => {
    const done = appState.completedChallenges[challenge.id];
    const active = appState.activeChallengeId === challenge.id;
    const cls = done ? 'done' : active ? 'active' : 'idle';
    return `<span class="challenge-badge ${cls}">${challenge.title.split('—')[0].trim().replace('Level ', 'L')}</span>`;
  }).join('');

  const activeChallenge = getChallengeById(appState.activeChallengeId);
  if (!activeChallenge) {
    status.className = 'challenge-status info';
    status.innerHTML = 'Belum ada tantangan aktif. Buka mode debug untuk mencoba aturan yang sengaja dibuat salah atau belum lengkap.';
    objective.textContent = 'Fokus belajar: bedakan aturan khusus, aturan umum, dan aturan cadangan.';
    return;
  }

  const completed = Boolean(appState.completedChallenges[activeChallenge.id]);
  status.className = `challenge-status ${completed ? 'success' : 'warn'}`;
  status.innerHTML = `<strong>${activeChallenge.title}</strong><br>${activeChallenge.focus}`;
  objective.textContent = `${completed ? 'Selesai: ' : 'Target: '}${activeChallenge.objective}`;
}

function loadChallenge(id) {
  const challenge = getChallengeById(id);
  if (!challenge || appState.running) return;
  appState.activeChallengeId = id;
  appState.rules = challenge.starterRules.map((rule) => ({ ...rule }));
  setBuilderFeedback(`Tantangan dimuat: ${challenge.title}. ${challenge.hint}`, 'warn');
  setBanner(`Tantangan aktif: ${challenge.title}. Perbaiki aturan sampai akurasi 100%.`, 'warn');
  resetSimulation(true);
  renderRules();
  renderChallengeStatus();
  renderDebugCards();
  closeModal('debugModal');
  if (!qs('labPage').classList.contains('active')) {
    tryOpenLabPage();
  }
}

function clearActiveChallenge() {
  if (appState.running) return;
  appState.activeChallengeId = null;
  renderChallengeStatus();
  renderDebugCards();
  setBanner('Mode tantangan dinonaktifkan. Kamu bisa kembali ke simulasi bebas.', 'info');
}

function setBuilderFeedback(text, tone = 'info') {
  const box = qs('builderFeedback');
  box.className = `rule-feedback ${tone}`;
  box.textContent = text;
}

function setBanner(text, tone = 'info') {
  appState.banner = { text, tone };
  renderBanner();
}

function renderBanner() {
  const el = qs('simBanner');
  el.className = `sim-banner ${appState.banner.tone}`;
  el.textContent = appState.banner.text;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function addRule() {
  if (appState.running) return;

  const condition = qs('conditionSelect').value;
  const action = qs('actionSelect').value;

  if (!condition || !action) {
    setBuilderFeedback('Aturan belum lengkap. Pilih kondisi dan tong tujuan terlebih dahulu.', 'warn');
    return;
  }

  const duplicate = appState.rules.find((rule) => rule.condition === condition && rule.action === action);
  if (duplicate) {
    setBuilderFeedback('Aturan yang sama sudah ada. Hindari pengulangan yang tidak perlu.', 'warn');
    return;
  }

  const sameCondition = appState.rules.find((rule) => rule.condition === condition);
  appState.rules.push({ condition, action });
  qs('conditionSelect').value = '';
  qs('actionSelect').value = '';

  if (sameCondition) {
    setBuilderFeedback(`Kondisi ${CONDITION_LABEL[condition]} sudah pernah dibuat. Pastikan kamu memang ingin menguji prioritas antaraturan.`, 'warn');
  } else {
    setBuilderFeedback('Aturan berhasil ditambahkan. Periksa lagi apakah urutannya sudah dari khusus ke umum.', 'success');
  }

  renderRules();
}

function moveRule(index, direction) {
  if (appState.running) return;
  const target = index + direction;
  if (target < 0 || target >= appState.rules.length) return;
  const copy = [...appState.rules];
  [copy[index], copy[target]] = [copy[target], copy[index]];
  appState.rules = copy;
  setBuilderFeedback('Urutan aturan diubah. Cek kembali apakah aturan khusus sudah berada di atas aturan umum.', 'info');
  renderRules();
}

function deleteRule(index) {
  if (appState.running) return;
  appState.rules.splice(index, 1);
  setBuilderFeedback('Aturan dihapus.', 'info');
  renderRules();
}

function loadExampleRules() {
  if (appState.running) return;
  appState.rules = [
    { condition: 'berbahaya', action: 'merah' },
    { condition: 'organik', action: 'hijau' },
    { condition: 'residu', action: 'hitam' },
    { condition: 'kertas', action: 'biru' },
    { condition: 'recycle', action: 'kuning' }
  ];
  setBuilderFeedback('Aturan contoh berhasil dimuat. Perhatikan bahwa residu diletakkan di atas aturan kertas, dan kertas diletakkan di atas aturan daur ulang.', 'success');
  renderRules();
}

function renderRules() {
  const list = qs('rulesList');
  if (!appState.rules.length) {
    list.innerHTML = '<div class="rule-card"><div class="rule-desc">Belum ada aturan. Tambahkan aturan pertama agar sistem memiliki dasar untuk mengambil keputusan.</div></div>';
    return;
  }

  list.innerHTML = appState.rules.map((rule, index) => `
    <div class="rule-card">
      <div class="rule-row-top">
        <div>
          <div class="rule-tag">${index === 0 ? 'JIKA' : `ELSE IF ${index + 1}`}</div>
          <div class="rule-title">JIKA item ${CONDITION_LABEL[rule.condition].toLowerCase()}</div>
          <div class="rule-desc">MAKA masukkan ke ${BIN_INFO[rule.action].name} (${BIN_INFO[rule.action].label})</div>
        </div>
        <div class="rule-actions">
          <button class="mini-btn" onclick="moveRule(${index}, -1)">↑</button>
          <button class="mini-btn" onclick="moveRule(${index}, 1)">↓</button>
          <button class="mini-btn" onclick="deleteRule(${index})">✕</button>
        </div>
      </div>
    </div>
  `).join('');
}

function shuffle(source) {
  const arr = [...source];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function resetSimulation(reseed = true) {
  if (appState.running) return;

  if (reseed || appState.queue.length === 0) {
    appState.queue = shuffle(ITEMS);
  }

  appState.placedItems = { hijau: [], kuning: [], merah: [], biru: [], hitam: [] };
  appState.processedResults = new Array(appState.queue.length).fill(null);
  appState.logs = [];
  appState.currentIndex = -1;
  appState.score = { total: appState.queue.length, correct: 0, wrong: 0 };
  setBanner(appState.activeChallengeId ? 'Tantangan aktif. Uji dulu aturanmu dan lihat item mana yang masih salah.' : 'Sistem di-reset. Susun aturan jika perlu, lalu jalankan simulasi.', 'info');
  renderSimulation();
}

function itemMatchesCondition(item, condition) {
  return item.matches.includes(condition);
}

function renderConveyor() {
  const box = qs('conveyor');
  if (!appState.queue.length) {
    box.innerHTML = '<div class="item-name" style="color:#fff; font-size:14px;">Belum ada item yang dimuat.</div>';
    return;
  }

  box.innerHTML = appState.queue.map((item, index) => {
    const result = appState.processedResults[index];
    const badge = result ? `<div class="item-badge" style="background:${result.correct ? '#22c55e' : '#ef4444'}">${result.correct ? '✓' : '✕'}</div>` : '';
    return `
      <div class="item-card ${index === appState.currentIndex ? 'current' : ''} ${result ? 'done' : ''}">
        ${badge}
        <img src="${item.image}" alt="${escapeHtml(item.label)}">
        <div class="item-name">${escapeHtml(item.label)}</div>
      </div>
    `;
  }).join('');
}

function renderBins() {
  const grid = qs('binsGrid');
  const order = ['hijau', 'kuning', 'merah', 'biru', 'hitam'];
  grid.innerHTML = order.map((key) => {
    const bin = BIN_INFO[key];
    const items = appState.placedItems[key] || [];
    return `
      <div class="bin-card" style="background:${bin.color}; color:${bin.textColor};">
        <div class="bin-title">${bin.label}</div>
        <div class="bin-count">Isi: ${items.length}</div>
        <div class="bin-items">
          ${items.length
            ? items.map((item) => `<div class="bin-item ${item.correct ? 'correct' : 'wrong'}" title="${escapeHtml(item.label)}"><img src="${item.image}" alt="${escapeHtml(item.label)}"></div>`).join('')
            : '<div class="empty-bin">Belum ada isi</div>'}
        </div>
      </div>
    `;
  }).join('');
}

function renderLog() {
  const box = qs('decisionLog');
  box.textContent = appState.logs.length ? appState.logs.join('\n') : 'Belum ada simulasi. Jalankan sistem untuk melihat cara komputer memeriksa aturan.';
  box.scrollTop = box.scrollHeight;
}

function renderSummary() {
  const { total, correct, wrong } = appState.score;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  let note = 'Susun aturan lalu jalankan simulasi.';
  if (correct + wrong > 0) {
    if (accuracy === 100) {
      note = 'Semua item berhasil dipilah dengan benar. Artinya aturanmu sudah lengkap dan prioritasnya tepat.';
    } else if (accuracy >= 70) {
      note = 'Aturanmu sudah cukup baik, tetapi masih ada item yang salah tong. Cek apakah aturan khusus sudah berada di atas aturan umum.';
    } else {
      note = 'Aturanmu belum tepat. Periksa kembali kondisi, aksi, dan posisi tiap aturan.';
    }
  }
  qs('summaryBox').innerHTML = `<strong>Hasil Simulasi</strong><br>Sampah diproses: ${total}<br>Benar: ${correct}<br>Salah: ${wrong}<br>Akurasi: ${accuracy}%<br><br><span style="color:#475569">${note}</span>`;
}

function renderSimulation() {
  renderBanner();
  renderConveyor();
  renderBins();
  renderLog();
  renderSummary();
}

function renderAll() {
  renderRules();
  renderSimulation();
  renderChallengeStatus();
}

function logLine(text) {
  appState.logs.push(text);
  renderLog();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function evaluateActiveChallenge(accuracy) {
  const challenge = getChallengeById(appState.activeChallengeId);
  if (!challenge) return;

  if (accuracy === 100) {
    appState.completedChallenges[challenge.id] = true;
    setBuilderFeedback(`Tantangan selesai: ${challenge.title}. Kamu berhasil menemukan dan memperbaiki bug-nya.`, 'success');
    setBanner(`Hebat! ${challenge.title} berhasil diselesaikan dengan akurasi 100%.`, 'success');
  } else {
    setBuilderFeedback(`Tantangan belum selesai. ${challenge.hint}`, 'warn');
    setBanner(`Tantangan ${challenge.title} belum tuntas. Akurasimu ${accuracy}%.`, 'warn');
  }

  renderChallengeStatus();
  renderDebugCards();
}

async function runSimulation() {
  if (appState.running) return;
  if (!appState.rules.length) {
    setBanner('Tambahkan minimal satu aturan terlebih dahulu sebelum simulasi dijalankan.', 'warn');
    setBuilderFeedback('Belum ada aturan. Buat aturan dulu, baru jalankan simulasi.', 'warn');
    return;
  }

  resetSimulation(true);
  appState.running = true;
  setBanner('Simulasi dimulai. Sistem akan membaca aturan dari atas ke bawah.', 'info');
  await sleep(450);

  for (let i = 0; i < appState.queue.length; i += 1) {
    appState.currentIndex = i;
    renderConveyor();

    const item = appState.queue[i];
    logLine(`${i + 1}. Item: ${item.label}`);
    await sleep(420);

    let chosenBin = null;
    for (let r = 0; r < appState.rules.length; r += 1) {
      const rule = appState.rules[r];
      logLine(`- Mengecek aturan ${r + 1}: JIKA ${CONDITION_LABEL[rule.condition].toLowerCase()} → ${BIN_INFO[rule.action].name}`);
      await sleep(320);
      if (itemMatchesCondition(item, rule.condition)) {
        chosenBin = rule.action;
        logLine(`  ✓ Cocok dengan aturan ${r + 1}. Sistem berhenti di sini.`);
        break;
      }
      logLine('  ✕ Tidak cocok. Lanjut ke aturan berikutnya.');
      await sleep(200);
    }

    if (!chosenBin) {
      chosenBin = 'hitam';
      logLine(`- Tidak ada aturan yang cocok. Gunakan SELAIN ITU → ${BIN_INFO[chosenBin].name}.`);
      await sleep(260);
    }

    const correctBin = CORRECT_BIN[item.actualType];
    const isCorrect = chosenBin === correctBin;
    appState.processedResults[i] = { chosen: chosenBin, correct: isCorrect };
    appState.placedItems[chosenBin].push({ image: item.image, label: item.label, correct: isCorrect });

    if (isCorrect) {
      appState.score.correct += 1;
      logLine(`✓ Benar. ${item.label} masuk ke ${BIN_INFO[chosenBin].name}.`);
      setBanner(`Benar. ${item.label} dipilah ke ${BIN_INFO[chosenBin].name}.`, 'success');
    } else {
      appState.score.wrong += 1;
      logLine(`✕ Salah. ${item.label} seharusnya masuk ke ${BIN_INFO[correctBin].name}, bukan ${BIN_INFO[chosenBin].name}.`);
      setBanner(`Masih keliru. ${item.label} seharusnya masuk ke ${BIN_INFO[correctBin].name}.`, 'warn');
    }

    renderSimulation();
    await sleep(760);
  }

  appState.currentIndex = -1;
  renderConveyor();
  const accuracy = appState.score.total ? Math.round((appState.score.correct / appState.score.total) * 100) : 0;
  if (accuracy === 100) {
    setBanner('Simulasi selesai. Semua item berhasil dipilah dengan benar.', 'success');
  } else {
    setBanner(`Simulasi selesai. Akurasimu ${accuracy}%. Periksa kembali aturan yang masih salah.`, 'warn');
  }

  evaluateActiveChallenge(accuracy);
  appState.running = false;
}

document.addEventListener('DOMContentLoaded', () => {
  resetSimulation(true);
  renderRules();
  updateCaraSlideView();
  updateBioSlideView();
  updateStartUnlock();
  renderChallengeStatus();
  renderDebugCards();
});
