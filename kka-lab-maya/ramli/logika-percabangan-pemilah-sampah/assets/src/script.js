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

function setCheckVisible(id, visible){
  const el = document.getElementById(id);
  if (el) el.classList.toggle('visible', visible);
}

function markTujuanRead() {
  appState.hasReadTujuan = true;
  try { sessionStorage.setItem('logika_tujuanRead', 'true'); } catch(e){}
  setCheckVisible('check-tujuan', true);
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
  try { sessionStorage.setItem('logika_caraRead', 'true'); } catch(e){}
  setCheckVisible('check-cara', true);
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

/* ══════════════════════════════════════════════════════════
   FITUR 1 – REFLEKSI INTERAKTIF
   ══════════════════════════════════════════════════════════ */
const REFLEKSI_LOGIKA_QS = [
  { q: 'Mengapa aturan "berbahaya" harus diperiksa lebih dulu dari aturan lain?', ph: 'Contoh: baterai bekas adalah sampah anorganik DAN berbahaya. Jika aturan "anorganik" lebih dulu, baterai masuk Tong Kuning — padahal seharusnya Tong Merah. Apa dampaknya di kehidupan nyata?' },
  { q: 'Apa yang terjadi jika tisu kotor diletakkan di aturan "kertas" sebelum aturan "residu"?', ph: 'Contoh: tisu kotor cocok dengan kondisi "kertas" (bahan dasarnya) DAN "residu" (sudah tidak bisa didaur ulang). Jika "kertas" lebih dulu → tisu masuk Tong Biru, padahal harusnya Tong Hitam. Mengapa ini bermasalah?' },
  { q: 'Kapan kamu membutuhkan aturan SELAIN ITU (else) dalam kehidupan nyata?', ph: 'Contoh: "Jika hujan → bawa payung. Jika berawan → bawa jaket tipis. SELAIN ITU → pergi seperti biasa." Aturan SELAIN ITU memastikan sistem selalu punya jawaban. Coba buat contohmu sendiri!' },
  { q: 'Apa perbedaan antara aturan khusus dan aturan umum? Berikan contohnya!', ph: 'Khusus = hanya berlaku untuk kasus tertentu (misal: "baterai berbahaya → Tong Merah"). Umum = berlaku untuk banyak kasus (misal: "anorganik → Tong Kuning"). Mengapa aturan khusus harus lebih dulu?' },
];

function openRefleksiInteraktifLogika() {
  const list = document.getElementById('refleksiLogikaList');
  list.innerHTML = REFLEKSI_LOGIKA_QS.map((item, i) => `
    <div>
      <label style="display:block; font-weight:700; color:#1e293b; margin-bottom:8px;">${i+1}. ${item.q}</label>
      <textarea class="refleksi-textarea" id="rlq_${i}" placeholder="${item.ph}"></textarea>
    </div>`).join('');
  const btn = document.getElementById('simpanRefleksiLogikaBtn');
  btn.textContent = 'Simpan Refleksi ✓';
  btn.style.background = '';
  openModal('refleksiModal');
}

function simpanRefleksiLogika() {
  const btn = document.getElementById('simpanRefleksiLogikaBtn');
  btn.textContent = '✅ Tersimpan!';
  btn.style.background = '#16a34a';
  setTimeout(() => { btn.textContent = 'Simpan Refleksi ✓'; btn.style.background = ''; }, 2000);
}

/* ══════════════════════════════════════════════════════════
   FITUR 2 – POHON KEPUTUSAN
   ══════════════════════════════════════════════════════════ */
const POHON_ITEMS = [
  { label: '🔋 Baterai', tags: ['berbahaya'], tong: 'Tong Merah — B3' },
  { label: '🍌 Kulit Pisang', tags: ['organik'], tong: 'Tong Hijau — Organik' },
  { label: '📰 Koran Bekas', tags: ['kertas', 'recycle'], tong: 'Tong Biru — Kertas' },
  { label: '🧻 Tisu Kotor', tags: ['kertas', 'residu'], tong: 'Tong Hitam — Residu' },
  { label: '🍶 Botol Plastik', tags: ['anorganik', 'recycle'], tong: 'Tong Kuning — Anorganik' },
];

const POHON_RULES = [
  { kondisi: 'berbahaya', label: 'Mengandung bahan berbahaya', tong: 'Tong Merah — B3' },
  { kondisi: 'residu',    label: 'Termasuk sampah residu',     tong: 'Tong Hitam — Residu' },
  { kondisi: 'organik',   label: 'Termasuk sampah organik',    tong: 'Tong Hijau — Organik' },
  { kondisi: 'kertas',    label: 'Berbahan kertas',            tong: 'Tong Biru — Kertas' },
  { kondisi: 'recycle',   label: 'Dapat didaur ulang',         tong: 'Tong Kuning — Anorganik' },
];

let pohonTimerId = null;

function openPohonKeputusan() {
  const wrap = document.getElementById('pohonItemBtns');
  wrap.innerHTML = POHON_ITEMS.map((it, i) =>
    `<button onclick="animatePohon(${i})" style="background:#e0e7ff;border:2px solid #818cf8;border-radius:10px;padding:8px 14px;font-weight:700;font-size:14px;cursor:pointer;">${it.label}</button>`
  ).join('');
  document.getElementById('pohonTree').textContent = 'Pilih item di atas untuk memulai animasi.';
  document.getElementById('pohonResult').textContent = '';
  openModal('pohonModal');
}

function animatePohon(itemIdx) {
  if (pohonTimerId) clearTimeout(pohonTimerId);
  const item = POHON_ITEMS[itemIdx];
  const treeEl = document.getElementById('pohonTree');
  const resultEl = document.getElementById('pohonResult');
  resultEl.textContent = '';

  const lines = POHON_RULES.map((r, i) => {
    const kw = i === 0 ? 'JIKA' : 'ATAU JIKA';
    return `${kw} item.${r.kondisi} → masuk ke ${r.tong}`;
  });
  lines.push('SELAIN ITU → Tong Hitam — Residu');
  treeEl.innerHTML = lines.map((l, i) =>
    `<span class="pohon-line" id="pl_${i}">${l}</span>`
  ).join('\n');

  let step = 0;
  function tick() {
    if (step > 0) {
      const prev = document.getElementById(`pl_${step-1}`);
      if (prev) prev.classList.remove('active-branch');
    }
    if (step >= POHON_RULES.length) {
      const fallback = document.getElementById(`pl_${POHON_RULES.length}`);
      if (fallback) { fallback.classList.add('match-branch'); }
      resultEl.textContent = `✅ ${item.label} → ${item.tong}`;
      return;
    }
    const r = POHON_RULES[step];
    const lineEl = document.getElementById(`pl_${step}`);
    const matches = item.tags.includes(r.kondisi);
    if (matches) {
      if (lineEl) lineEl.classList.add('match-branch');
      resultEl.textContent = `✅ ${item.label} → ${r.tong}`;
      for (let j = step+1; j <= POHON_RULES.length; j++) {
        const el = document.getElementById(`pl_${j}`);
        if (el) el.classList.add('skip-branch');
      }
      return;
    }
    if (lineEl) { lineEl.classList.add('active-branch'); lineEl.classList.add('skip-branch'); }
    step++;
    pohonTimerId = setTimeout(tick, 600);
  }
  tick();
}

/* ══════════════════════════════════════════════════════════
   FITUR 3 – KASUS TEPI
   ══════════════════════════════════════════════════════════ */
const KASUS_TEPI_DATA = [
  {
    name: '🧻 Tisu Kotor Bekas Makanan',
    tags: [{ label: 'Kertas', color: '#dbeafe', tc: '#1e3a8a' }, { label: 'Residu', color: '#f3e8ff', tc: '#581c87' }],
    desc: 'Tisu ini terbuat dari kertas tapi sudah kotor dan tidak bisa didaur ulang.',
    opts: ['Tong Biru — Kertas', 'Tong Hitam — Residu', 'Tong Kuning — Anorganik'],
    correct: 1,
    explain: 'Meskipun berbahan kertas, tisu kotor masuk ke Residu karena tidak bisa didaur ulang lagi. Aturan "residu" harus lebih dulu dari "kertas"!',
  },
  {
    name: '♻️ Botol Plastik Bekas',
    tags: [{ label: 'Anorganik', color: '#fef9c3', tc: '#713f12' }, { label: 'Dapat didaur ulang', color: '#dcfce7', tc: '#166534' }],
    desc: 'Botol ini plastik (anorganik) dan bisa didaur ulang.',
    opts: ['Tong Hijau — Organik', 'Tong Kuning — Anorganik', 'Tong Merah — B3'],
    correct: 1,
    explain: 'Botol plastik masuk ke Tong Kuning (Anorganik). Meski bisa didaur ulang, kondisi "anorganik" adalah aturan yang lebih spesifik untuk plastik.',
  },
  {
    name: '🔦 Baterai Alkaline Bekas',
    tags: [{ label: 'Berbahaya', color: '#fee2e2', tc: '#991b1b' }, { label: 'Anorganik', color: '#fef9c3', tc: '#713f12' }],
    desc: 'Baterai alkaline adalah sampah anorganik yang juga mengandung bahan berbahaya.',
    opts: ['Tong Merah — B3', 'Tong Kuning — Anorganik', 'Tong Hitam — Residu'],
    correct: 0,
    explain: 'Baterai yang berbahaya harus masuk ke Tong Merah (B3). Aturan "berbahaya" WAJIB diperiksa lebih dulu dari "anorganik"!',
  },
];

let ktIdx = 0;
let ktAnswered = false;

function openKasusTepi() {
  ktIdx = 0; ktAnswered = false;
  renderKasusTepi();
  openModal('kasusTepiModal');
}

function renderKasusTepi() {
  ktAnswered = false;
  document.getElementById('nextKasusTepiBtn').classList.add('hidden');
  const d = KASUS_TEPI_DATA[ktIdx];
  document.getElementById('kasusTepiProg').textContent = `Kasus ${ktIdx+1} / ${KASUS_TEPI_DATA.length}`;
  document.getElementById('kasusTepiBody').innerHTML = `
    <div class="kasus-item-card">
      <div class="kasus-item-name">${d.name}</div>
      <div class="kasus-item-tags">${d.tags.map(t => `<span class="kasus-tag" style="background:${t.color};color:${t.tc};">${t.label}</span>`).join('')}</div>
      <p style="font-size:14px;color:#475569;margin-bottom:12px;">${d.desc}</p>
      <div>${d.opts.map((o, i) => `<button class="kasus-option" onclick="checkKasusTepi(${i})" id="kt_${i}">${o}</button>`).join('')}</div>
      <div id="kasus-fb" style="margin-top:10px; font-size:14px; font-weight:700; display:none;"></div>
    </div>`;
}

function checkKasusTepi(i) {
  if (ktAnswered) return;
  ktAnswered = true;
  const d = KASUS_TEPI_DATA[ktIdx];
  document.getElementById(`kt_${d.correct}`).classList.add('benar');
  const fb = document.getElementById('kasus-fb');
  fb.style.display = 'block';
  if (i === d.correct) {
    fb.style.color = '#15803d';
    fb.textContent = '✅ Benar! ' + d.explain;
  } else {
    document.getElementById(`kt_${i}`).classList.add('salah');
    fb.style.color = '#dc2626';
    fb.textContent = '❌ ' + d.explain;
  }
  if (ktIdx < KASUS_TEPI_DATA.length - 1) document.getElementById('nextKasusTepiBtn').classList.remove('hidden');
}

function nextKasusTepi() {
  ktIdx++;
  if (ktIdx < KASUS_TEPI_DATA.length) renderKasusTepi();
}

/* ══════════════════════════════════════════════════════════
   FITUR 4 – DETEKTIF BUG LOGIKA
   ══════════════════════════════════════════════════════════ */
const DETEKTIF_LOGIKA_DATA = [
  {
    q: 'Aturan mana yang menyebabkan Baterai masuk ke tong yang salah?',
    rules: [
      'JIKA anorganik → Tong Kuning',
      'JIKA berbahaya → Tong Merah',
      'JIKA organik → Tong Hijau',
    ],
    bugIdx: 0,
    explain: 'Aturan "anorganik" ada di baris pertama. Karena Baterai Bekas juga anorganik, ia tertangkap SEBELUM sampai ke aturan "berbahaya". Aturan berbahaya harus lebih dulu!',
  },
  {
    q: 'Aturan mana yang menyebabkan Tisu Kotor masuk ke Tong Biru (padahal harusnya Hitam)?',
    rules: [
      'JIKA berbahaya → Tong Merah',
      'JIKA kertas → Tong Biru',
      'JIKA residu → Tong Hitam',
    ],
    bugIdx: 1,
    explain: 'Aturan "kertas" ada sebelum "residu". Tisu kotor cocok dengan "kertas" sehingga langsung masuk Tong Biru. Aturan "residu" harus lebih dulu dari "kertas"!',
  },
];

let dlIdx = 0;
let dlAnswered = false;

function openDetektifLogika() {
  dlIdx = 0; dlAnswered = false;
  renderDetektifLogika();
  openModal('detektifLogikaModal');
}

function renderDetektifLogika() {
  dlAnswered = false;
  document.getElementById('nextDetektifLogikaBtn').classList.add('hidden');
  const d = DETEKTIF_LOGIKA_DATA[dlIdx];
  document.getElementById('detektifLogikaProg').textContent = `Tantangan ${dlIdx+1} / ${DETEKTIF_LOGIKA_DATA.length}`;
  document.getElementById('detektifLogikaBody').innerHTML = `
    <p style="font-weight:700; font-size:16px; color:#0f172a; margin-bottom:14px;">${d.q}</p>
    ${d.rules.map((r, i) => `
      <button class="kasus-option" onclick="checkDetektifLogika(${i})" id="dl_${i}" style="font-family:monospace; display:block; width:100%; text-align:left; margin-bottom:8px;">
        Baris ${i+1}: ${r}
      </button>`).join('')}
    <div id="dl-fb" style="margin-top:10px; font-size:14px; font-weight:700; display:none;"></div>`;
}

function checkDetektifLogika(i) {
  if (dlAnswered) return;
  dlAnswered = true;
  const d = DETEKTIF_LOGIKA_DATA[dlIdx];
  document.getElementById(`dl_${d.bugIdx}`).classList.add('benar');
  const fb = document.getElementById('dl-fb');
  fb.style.display = 'block';
  if (i === d.bugIdx) {
    fb.style.color = '#15803d';
    fb.textContent = '✅ Tepat! ' + d.explain;
  } else {
    document.getElementById(`dl_${i}`).classList.add('salah');
    fb.style.color = '#dc2626';
    fb.textContent = '❌ Bukan itu. ' + d.explain;
  }
  if (dlIdx < DETEKTIF_LOGIKA_DATA.length - 1) document.getElementById('nextDetektifLogikaBtn').classList.remove('hidden');
}

function nextDetektifLogika() {
  dlIdx++;
  if (dlIdx < DETEKTIF_LOGIKA_DATA.length) renderDetektifLogika();
}

/* ══════════════════════════════════════════════════════════
   FITUR 5 – KUIS URUTAN
   ══════════════════════════════════════════════════════════ */
const KUIS_URUTAN_DATA = [
  {
    desc: 'Urutkan aturan dari yang paling KHUSUS ke paling UMUM agar tidak terjadi bug!',
    items: [
      { text: 'JIKA organik → Tong Hijau', correctPos: 2 },
      { text: 'JIKA berbahaya → Tong Merah', correctPos: 0 },
      { text: 'JIKA residu → Tong Hitam', correctPos: 1 },
      { text: 'JIKA kertas → Tong Biru', correctPos: 3 },
    ],
    explain: 'Urutan benar: Berbahaya (1) → Residu (2) → Organik (3) → Kertas (4). Aturan paling khusus duluan!',
  },
  {
    desc: 'Tisu kotor bisa cocok "kertas" DAN "residu". Susun aturan agar tisu kotor masuk ke tong yang BENAR!',
    items: [
      { text: 'JIKA kertas → Tong Biru', correctPos: 1 },
      { text: 'JIKA berbahaya → Tong Merah', correctPos: 0 },
      { text: 'JIKA residu → Tong Hitam', correctPos: 2 },
    ],
    explain: 'Urutan benar: Berbahaya (1) → Kertas (2) → Residu (3). TAPI tunggu! Tisu kotor cocok "kertas" dulu → masuk Tong Biru (salah). Seharusnya "residu" lebih dulu dari "kertas"! Ingat: aturan lebih khusus = yang paling sempit cakupannya.',
  },
  {
    desc: 'Susun aturan agar baterai bekas PASTI masuk Tong Merah, bukan Tong Kuning!',
    items: [
      { text: 'JIKA recycle → Tong Kuning', correctPos: 2 },
      { text: 'JIKA berbahaya → Tong Merah', correctPos: 0 },
      { text: 'JIKA anorganik → Tong Kuning', correctPos: 1 },
    ],
    explain: 'Urutan benar: Berbahaya (1) → Anorganik (2) → Recycle (3). Baterai cocok dengan "berbahaya" dan "anorganik" — harus diperiksa "berbahaya" lebih dulu agar masuk Tong Merah yang tepat.',
  },
];

let kuIdx = 0;
let kuItems = [];
let kuDragSrc = null;

function openKuisUrutan() {
  kuIdx = 0;
  renderKuisUrutan();
  openModal('kuisUrutanModal');
}

function renderKuisUrutan() {
  document.getElementById('nextKuisUrutanBtn').classList.add('hidden');
  document.getElementById('kuisUrutanFeedback').style.display = 'none';
  const d = KUIS_URUTAN_DATA[kuIdx];
  document.getElementById('kuisUrutanDesc').innerHTML = d.desc;
  document.getElementById('kuisUrutanProg').textContent = `Soal ${kuIdx+1} / ${KUIS_URUTAN_DATA.length}`;
  kuItems = d.items.map((it, i) => ({ ...it, currentPos: i }));
  shuffleKuItems();
  renderKuList();
}

function shuffleKuItems() {
  for (let i = kuItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kuItems[i], kuItems[j]] = [kuItems[j], kuItems[i]];
  }
}

function renderKuList() {
  const list = document.getElementById('kuisUrutanList');
  list.innerHTML = kuItems.map((it, i) => `
    <div class="urutan-item" draggable="true" data-i="${i}"
         ondragstart="kuDragStart(event,${i})" ondragover="kuDragOver(event,${i})" ondrop="kuDrop(event,${i})" ondragleave="kuDragLeave(event,${i})">
      <div class="urutan-num">${i+1}</div>
      <div class="urutan-text">${it.text}</div>
    </div>`).join('');
}

function kuDragStart(e, i) { kuDragSrc = i; e.dataTransfer.effectAllowed = 'move'; }
function kuDragOver(e, i) { e.preventDefault(); if (i !== kuDragSrc) document.querySelectorAll('.urutan-item')[i]?.classList.add('drag-over'); }
function kuDragLeave(e, i) { document.querySelectorAll('.urutan-item')[i]?.classList.remove('drag-over'); }
function kuDrop(e, i) {
  e.preventDefault();
  document.querySelectorAll('.urutan-item').forEach(el => el.classList.remove('drag-over'));
  if (i === kuDragSrc) return;
  const moved = kuItems.splice(kuDragSrc, 1)[0];
  kuItems.splice(i, 0, moved);
  renderKuList();
}

function cekUrutan() {
  const d = KUIS_URUTAN_DATA[kuIdx];
  const fb = document.getElementById('kuisUrutanFeedback');
  const correct = kuItems.every((it, i) => it.correctPos === i);
  fb.style.display = 'block';
  if (correct) {
    fb.style.color = '#15803d';
    fb.textContent = '✅ Urutan sudah benar! ' + d.explain;
    document.querySelectorAll('.urutan-item').forEach(el => el.classList.add('correct-final'));
  } else {
    fb.style.color = '#dc2626';
    fb.textContent = '❌ Belum tepat. ' + d.explain;
  }
  if (kuIdx < KUIS_URUTAN_DATA.length - 1) document.getElementById('nextKuisUrutanBtn').classList.remove('hidden');
}

function nextKuisUrutan() {
  kuIdx++;
  if (kuIdx < KUIS_URUTAN_DATA.length) renderKuisUrutan();
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (sessionStorage.getItem('logika_tujuanRead') === 'true') { appState.hasReadTujuan = true; setCheckVisible('check-tujuan', true); }
    if (sessionStorage.getItem('logika_caraRead') === 'true') { appState.hasReadCara = true; setCheckVisible('check-cara', true); }
  } catch(e) {}
  resetSimulation(true);
  renderRules();
  updateCaraSlideView();
  updateBioSlideView();
  updateStartUnlock();
  renderChallengeStatus();
  renderDebugCards();
});
