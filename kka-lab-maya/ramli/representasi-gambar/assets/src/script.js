const TOTAL_STAGES = 5;

const HERO_PREVIEW = [
  0,0,0,1,1,1,1,0,0,0,
  0,0,1,0,0,0,0,1,0,0,
  0,1,0,1,0,0,1,0,1,0,
  1,0,0,0,1,1,0,0,0,1,
  1,0,0,0,1,1,0,0,0,1,
  1,0,0,0,1,1,0,0,0,1,
  1,0,0,0,1,1,0,0,0,1,
  0,1,0,1,0,0,1,0,1,0,
  0,0,1,0,0,0,0,1,0,0,
  0,0,0,1,1,1,1,0,0,0
];

const STAGES = {
  1: {
    shortLabel: '1 Piksel',
    title: 'Tahap 1 — Nyalakan Satu Piksel',
    tag: 'Konsep Dasar',
    focus: 'Memahami bahwa satu kotak pada grid mewakili satu data piksel.',
    mission: 'Aktifkan minimal 1 piksel agar terlihat bahwa satu perubahan data saja sudah mengubah tampilan visual.',
    dataset: 'Grid 10 × 10 berisi nilai 0 dan 1. Pada awal tahap, semua piksel bernilai 0.',
    tips: 'Klik satu kotak saja dulu. Amati bagaimana satu angka 1 muncul pada output matrix.',
    targetType: 'single',
    targetPattern: [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]],
    example: {
      intro: 'Mulailah dari hal paling kecil: satu piksel aktif.',
      code: `[0, 0, 0]
[0, 1, 0]
[0, 0, 0]`,
      output: 'Pada contoh ini, hanya piksel tengah yang aktif.',
      why: 'Satu angka 1 berarti ada satu posisi yang aktif. Komputer membaca lokasi itu sebagai bagian dari gambar.'
    }
  },
  2: {
    shortLabel: 'Garis',
    title: 'Tahap 2 — Bentuk Garis 5 Piksel',
    tag: 'Membaca Pola',
    focus: 'Memahami bahwa susunan beberapa nilai 1 pada posisi berurutan membentuk pola yang lebih jelas.',
    mission: 'Buat satu garis mendatar atau tegak yang terdiri dari minimal 5 piksel aktif berturut-turut.',
    dataset: 'Kamu boleh membuat garis secara manual atau memakai pola cepat Garis 5 Piksel.',
    tips: 'Perhatikan bahwa posisi angka 1 yang berurutan menghasilkan bentuk garis.',
    targetType: 'line',
    targetPattern: [[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]],
    example: {
      intro: 'Lima piksel aktif berurutan dapat membentuk satu garis sederhana.',
      code: '[1, 1, 1, 1, 1]',
      output: 'Jika kelima angka 1 diletakkan pada satu baris yang sama, terbentuk garis mendatar.',
      why: 'Bentuk visual muncul bukan karena banyaknya angka 1 saja, tetapi karena angka-angka itu ditempatkan secara berurutan.'
    }
  },
  3: {
    shortLabel: 'Plus',
    title: 'Tahap 3 — Bentuk Tanda Plus',
    tag: 'Representasi Bentuk',
    focus: 'Menghubungkan pola data dua arah dengan bentuk visual yang lebih kompleks.',
    mission: 'Bentuk tanda plus pada grid. Kamu boleh menyusunnya manual atau memakai pola cepat Tanda Plus.',
    dataset: 'Targetnya adalah satu baris tengah dan satu kolom tengah yang aktif.',
    tips: 'Bentuk ini menunjukkan bahwa gambar tersusun dari kombinasi baris dan kolom data.',
    targetType: 'plus',
    targetPattern: [[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0]],
    example: {
      intro: 'Pola plus menunjukkan bahwa satu bentuk dapat dihasilkan dari gabungan arah horizontal dan vertikal.',
      code: `[0,0,1,0,0]
[0,0,1,0,0]
[1,1,1,1,1]
[0,0,1,0,0]
[0,0,1,0,0]`,
      output: 'Baris dan kolom yang saling berpotongan menghasilkan tanda plus.',
      why: 'Komputer membaca pola ini sebagai sekumpulan piksel aktif pada posisi tertentu. Ketika posisinya tepat, muncullah bentuk plus.'
    }
  },
  4: {
    shortLabel: 'Geser',
    title: 'Tahap 4 — Geser Pola',
    tag: 'Transformasi Posisi',
    focus: 'Memahami bahwa gambar dapat berubah pembacaannya ketika posisi piksel berubah.',
    mission: 'Geser pola minimal satu kali ke arah mana pun, lalu amati perubahan pada matrix dan posisi piksel aktif.',
    dataset: 'Saat masuk tahap ini, pola tanda plus disiapkan sebagai titik awal.',
    tips: 'Setelah digeser, bandingkan posisi angka 1 sebelum dan sesudah.',
    targetType: 'shift',
    targetPattern: [[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0]],
    example: {
      intro: 'Pola yang sama dapat berpindah posisi ke kiri, kanan, atas, atau bawah.',
      code: `Sebelum digeser:
[0,0,1,0,0]
[1,1,1,1,1]

Sesudah digeser ke kanan:
[0,0,0,1,0]
[0,1,1,1,1]`,
      output: 'Bentuk dasarnya masih sama, tetapi posisinya berpindah.',
      why: 'Perubahan posisi data mengubah letak bentuk pada grid. Inilah mengapa koordinat atau posisi piksel sangat penting.'
    }
  },
  5: {
    shortLabel: 'Mandiri',
    title: 'Tahap 5 — Ubah Pola Secara Mandiri',
    tag: 'Kreasi dan Interpretasi',
    focus: 'Mendorong siswa membuat pola sendiri sambil tetap membaca matrix sebagai data.',
    mission: 'Setelah pola digeser, lakukan minimal 3 perubahan manual pada grid agar bentuknya berubah lagi.',
    dataset: 'Tidak ada satu jawaban tunggal. Yang penting kamu bisa menjelaskan perubahan data dan hasil visualnya.',
    tips: 'Coba tambah atau kurangi piksel pada posisi tertentu, lalu amati matrix dan bentuknya.',
    targetType: 'custom',
    targetPattern: [[0,1,0,1,0],[1,1,1,1,1],[0,1,1,1,0],[0,0,1,0,0],[0,0,1,0,0]],
    example: {
      intro: 'Tahap terakhir mengajakmu membuat pola sendiri sambil tetap sadar bahwa gambar dibaca sebagai data.',
      code: `Contoh perubahan:
- tambahkan 1 piksel di kiri atas
- hapus 1 piksel di tengah bawah
- aktifkan 1 piksel di sisi kanan`,
      output: 'Bentuk baru muncul karena susunan angka 1 dan 0 berubah.',
      why: 'Ketika siswa mengubah pola secara mandiri, mereka berlatih membaca hubungan antara aksi, data, dan hasil gambar.'
    }
  }
};

const state = {
  tujuanRead: false,
  caraRead: false,
  introRead: false,
  hasSeenIntro: false,
  currentCara: 0,
  currentBio: 0,
  currentStage: 1,
  completed: {},
  gridSize: 10,
  grid: [],
  lastAction: 'Belum ada perubahan.',
  lastPosition: '-',
  shiftCount: 0,
  manualEditsStage5: 0,
  enteredStage5: false
};

function init() {
  try {
    if (sessionStorage.getItem('gambar_tujuanRead') === 'true') { state.tujuanRead = true; setCheckVisible('check-tujuan', true); }
    if (sessionStorage.getItem('gambar_caraRead') === 'true') { state.caraRead = true; setCheckVisible('check-cara', true); }
  } catch(e) {}
  createEmptyGrid();
  renderHeroPreview();
  renderStageNav();
  renderMissionPanel();
  renderBoard();
  renderOutputs();
  renderProgress();
  updateStartButton();
  updateNextButton();
}

document.addEventListener('DOMContentLoaded', init);

function createEmptyGrid() {
  state.grid = Array.from({ length: state.gridSize }, () => Array(state.gridSize).fill(0));
}

function renderHeroPreview() {
  const wrap = document.getElementById('heroPreviewGrid');
  wrap.innerHTML = '';
  HERO_PREVIEW.forEach(v => {
    const cell = document.createElement('div');
    cell.className = 'pixel-mini-cell' + (v ? ' active' : '');
    wrap.appendChild(cell);
  });
}

function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('show');
  if (!document.querySelector('.modal-backdrop.show')) document.body.style.overflow = 'auto';
}

function openTujuanModal(){ openModal('tujuanModal'); }
function openCaraModal(){ state.currentCara = 0; syncCaraSlides(); openModal('caraModal'); }
function openBioModal(){ state.currentBio = 0; syncBioSlides(); openModal('bioModal'); }
function openQuizModal(){ openModal('quizModal'); }

function setCheckVisible(id, visible){
  const el = document.getElementById(id);
  if (el) el.classList.toggle('visible', visible);
}

function completeTujuan(){
  state.tujuanRead = true;
  try { sessionStorage.setItem('gambar_tujuanRead', 'true'); } catch(e){}
  setCheckVisible('check-tujuan', true);
  closeModal('tujuanModal');
  updateStartButton();
}

function completeCara(){
  state.caraRead = true;
  try { sessionStorage.setItem('gambar_caraRead', 'true'); } catch(e){}
  setCheckVisible('check-cara', true);
  closeModal('caraModal');
  updateStartButton();
}

function completeIntro(){
  state.introRead = true;
  closeModal('introModal');
}

function updateStartButton(){
  const btn = document.getElementById('btn-start');
  const banner = document.getElementById('homeUnlockBanner');
  const unlocked = state.tujuanRead && state.caraRead;
  btn.classList.toggle('disabled-style', !unlocked);
  btn.setAttribute('aria-disabled', unlocked ? 'false' : 'true');
  btn.title = unlocked ? 'Mulai percobaan' : 'Buka Tujuan dan Cara Penggunaan terlebih dahulu';
  banner.style.display = unlocked ? 'block' : 'none';
}

function tryOpenLabPage(){
  if (!(state.tujuanRead && state.caraRead)) {
    openModal('lockedModal');
    return;
  }
  showPage('labPage');
  if (!state.hasSeenIntro) {
    state.hasSeenIntro = true;
    openModal('introModal');
  }
}

function showPage(id){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}

function changeCaraSlide(direction){
  const slides = document.querySelectorAll('.cara-slide');
  state.currentCara += direction;
  if (state.currentCara < 0) state.currentCara = 0;
  if (state.currentCara > slides.length - 1) state.currentCara = slides.length - 1;
  syncCaraSlides();
}

function syncCaraSlides(){
  const slides = document.querySelectorAll('.cara-slide');
  slides.forEach((slide, index) => slide.classList.toggle('hidden', index !== state.currentCara));
  slides.forEach((_, index) => document.getElementById(`caraDot-${index}`).classList.toggle('active', index === state.currentCara));
  document.getElementById('caraPrevBtn').style.visibility = state.currentCara === 0 ? 'hidden' : 'visible';
  document.getElementById('caraNextBtn').style.visibility = state.currentCara === slides.length - 1 ? 'hidden' : 'visible';
}

function changeBioSlide(direction){
  const slides = document.querySelectorAll('#bioModal .bio-slide');
  state.currentBio += direction;
  if (state.currentBio < 0) state.currentBio = 0;
  if (state.currentBio > slides.length - 1) state.currentBio = slides.length - 1;
  syncBioSlides();
}

function syncBioSlides(){
  const slides = document.querySelectorAll('#bioModal .bio-slide');
  slides.forEach((slide, index) => slide.classList.toggle('hidden', index !== state.currentBio));
  document.getElementById('bioPrevBtn').style.visibility = state.currentBio === 0 ? 'hidden' : 'visible';
  document.getElementById('bioNextBtn').style.visibility = state.currentBio === slides.length - 1 ? 'hidden' : 'visible';
}

function highestUnlockedStage(){
  let unlocked = 1;
  for (let i = 1; i <= TOTAL_STAGES; i++) {
    if (state.completed[i]) unlocked = Math.min(TOTAL_STAGES, i + 1);
  }
  return unlocked;
}

function renderStageNav(){
  const nav = document.getElementById('stageNav');
  nav.innerHTML = '';
  const unlocked = highestUnlockedStage();
  for (let i = 1; i <= TOTAL_STAGES; i++) {
    const btn = document.createElement('button');
    btn.className = 'stage-card';
    btn.innerHTML = `<span class="num">${i}</span><span class="label">${STAGES[i].shortLabel}</span>`;
    if (state.currentStage === i) btn.classList.add('active');
    else if (state.completed[i]) btn.classList.add('done');
    if (i > unlocked) {
      btn.classList.add('locked');
      btn.disabled = true;
    } else {
      btn.onclick = () => changeStage(i);
    }
    nav.appendChild(btn);
  }
}

function changeStage(stageNo){
  if (stageNo > highestUnlockedStage()) return;
  const preserve = state.currentStage === 4 && stageNo === 5;
  state.currentStage = stageNo;
  setupStage(stageNo, preserve);
  renderAll();
}

function setupStage(stageNo, preserveCurrent = false){
  state.lastAction = 'Belum ada perubahan.';
  state.lastPosition = '-';
  state.shiftCount = 0;
  if (stageNo === 5) {
    if (!preserveCurrent) {
      applyPlusPattern(false);
      shiftGrid('right', false);
    }
    state.manualEditsStage5 = 0;
    state.enteredStage5 = true;
  } else {
    state.enteredStage5 = false;
    state.manualEditsStage5 = 0;
    if (!preserveCurrent) {
      createEmptyGrid();
      if (stageNo === 4) applyPlusPattern(false);
    }
  }
}

function renderMissionPanel(){
  const stage = STAGES[state.currentStage];
  const box = document.getElementById('missionPanel');
  box.innerHTML = `
    <div class="mission-card">
      <div class="mission-tag">${stage.tag}</div>
      <div class="text-2xl font-black text-slate-900 mb-2">${stage.title}</div>
      <div class="text-slate-600 leading-7 mb-3">${stage.focus}</div>
      <div class="bg-white border border-sky-100 rounded-2xl p-4 text-slate-700 leading-7">
        <b>Misi:</b> ${stage.mission}
      </div>
    </div>
    <div class="mb-4">
      <div class="font-black text-slate-800 mb-2">Dataset / Kondisi Awal</div>
      <div class="dataset-box">${stage.dataset}</div>
    </div>
    <div class="info-box">
      <b>Petunjuk:</b><br>${stage.tips}
    </div>
    <div class="pixel-target-card">
      <div class="pixel-target-title">Contoh target pola</div>
      <div id="targetPatternWrap"></div>
      <div class="target-note">Target ini membantu siswa membayangkan pola yang diharapkan pada tahap aktif.</div>
    </div>
  `;
  renderTargetPattern(stage.targetPattern);
}

function renderTargetPattern(pattern){
  const wrap = document.getElementById('targetPatternWrap');
  const small = pattern.length === 5;
  wrap.innerHTML = `<div class="pattern-preview-grid ${small ? 'small' : ''}" id="targetGrid"></div>`;
  const grid = document.getElementById('targetGrid');
  pattern.flat().forEach(v => {
    const cell = document.createElement('div');
    cell.className = 'pattern-preview-cell' + (v ? ' active' : '');
    grid.appendChild(cell);
  });
}

function renderBoard(){
  const board = document.getElementById('pixelBoard');
  board.innerHTML = '';
  state.grid.forEach((row,rowIndex) => {
    row.forEach((value,colIndex) => {
      const cell = document.createElement('button');
      if (value === 1) cell.classList.add('active');
      cell.addEventListener('click', () => toggleCell(rowIndex,colIndex));
      board.appendChild(cell);
    });
  });
}

function toggleCell(row,col){
  state.grid[row][col] = state.grid[row][col] === 1 ? 0 : 1;
  state.lastAction = `Piksel pada baris ${row+1}, kolom ${col+1} diubah menjadi ${state.grid[row][col]}.`;
  state.lastPosition = `Baris ${row+1}, kolom ${col+1}`;
  if (state.currentStage === 5) state.manualEditsStage5 += 1;
  renderBoard();
  renderOutputs();
}

function clearGrid(){
  createEmptyGrid();
  if (state.currentStage === 5) state.manualEditsStage5 = 0;
  state.lastAction = 'Grid dikosongkan. Semua nilai kembali menjadi 0.';
  state.lastPosition = '-';
  renderBoard();
  renderOutputs('Grid dikosongkan. Sekarang amati kembali bagaimana gambar hilang ketika semua nilai kembali menjadi 0.');
}

function resetCurrentStage(){
  setupStage(state.currentStage, false);
  renderAll();
  document.getElementById('stageFeedback').innerHTML = 'Tahap direset. Susun kembali pola sesuai misi saat ini.';
}

function applyPreset(type){
  if (type === 'single') {
    createEmptyGrid();
    state.grid[4][4] = 1;
    state.lastAction = 'Pola cepat satu piksel diterapkan.';
    state.lastPosition = 'Baris 5, kolom 5';
  }
  if (type === 'line') {
    createEmptyGrid();
    for (let i=2;i<7;i++) state.grid[4][i] = 1;
    state.lastAction = 'Pola cepat garis 5 piksel diterapkan.';
    state.lastPosition = 'Baris 5, kolom 3–7';
  }
  if (type === 'plus') {
    applyPlusPattern(true);
    return;
  }
  if (type === 'frame') {
    createEmptyGrid();
    for (let i=0;i<state.gridSize;i++) {
      state.grid[0][i] = 1; state.grid[state.gridSize-1][i] = 1; state.grid[i][0] = 1; state.grid[i][state.gridSize-1] = 1;
    }
    state.lastAction = 'Pola cepat bingkai diterapkan.';
    state.lastPosition = 'Baris dan kolom tepi';
  }
  renderBoard();
  renderOutputs();
}

function applyPlusPattern(withMessage = true){
  createEmptyGrid();
  const mid = Math.floor(state.gridSize/2);
  for (let i=0;i<state.gridSize;i++) {
    state.grid[mid][i] = 1;
    state.grid[i][mid] = 1;
  }
  if (withMessage) {
    state.lastAction = 'Pola cepat tanda plus diterapkan.';
    state.lastPosition = 'Baris tengah dan kolom tengah';
    renderBoard();
    renderOutputs();
  }
}

function shiftGrid(direction, announce = true){
  const size = state.gridSize;
  const newGrid = Array.from({ length:size }, () => Array(size).fill(0));
  for (let row=0; row<size; row++) {
    for (let col=0; col<size; col++) {
      if (state.grid[row][col] !== 1) continue;
      let nr=row, nc=col;
      if (direction==='up') nr--;
      if (direction==='down') nr++;
      if (direction==='left') nc--;
      if (direction==='right') nc++;
      if (nr>=0 && nr<size && nc>=0 && nc<size) newGrid[nr][nc] = 1;
    }
  }
  state.grid = newGrid;
  state.shiftCount += 1;
  state.lastAction = `Pola digeser ke arah ${translateDirection(direction)}.`;
  state.lastPosition = `Perpindahan global ke ${translateDirection(direction)}`;
  renderBoard();
  renderOutputs(announce ? `Pola digeser ke arah ${translateDirection(direction)}. Sekarang bandingkan posisi angka 1 sebelum dan sesudah pergeseran.` : undefined);
}

function translateDirection(direction){
  return ({up:'atas',down:'bawah',left:'kiri',right:'kanan'})[direction] || direction;
}

function countActive(){ return state.grid.flat().filter(v => v===1).length; }

function hasStreak(length){
  for (const row of state.grid) {
    let s=0; for (const v of row) { s = v===1 ? s+1 : 0; if (s>=length) return true; }
  }
  for (let col=0; col<state.gridSize; col++) {
    let s=0; for (let row=0; row<state.gridSize; row++) { s = state.grid[row][col]===1 ? s+1 : 0; if (s>=length) return true; }
  }
  return false;
}

function plusPatternMatches(){
  const mid = Math.floor(state.gridSize/2);
  for (let r=0;r<state.gridSize;r++) {
    for (let c=0;c<state.gridSize;c++) {
      const expected = (r===mid || c===mid) ? 1 : 0;
      if (state.grid[r][c] !== expected) return false;
    }
  }
  return true;
}

function getTopRowCol(){
  const rows = state.grid.map(row => row.reduce((a,b) => a+b, 0));
  const cols = Array.from({length:state.gridSize}, (_,c) => state.grid.reduce((a,row)=>a+row[c], 0));
  const maxR = Math.max(...rows), maxC = Math.max(...cols);
  return {
    topRow: maxR === 0 ? '-' : `Baris ${rows.indexOf(maxR)+1} (${maxR} piksel aktif)`,
    topCol: maxC === 0 ? '-' : `Kolom ${cols.indexOf(maxC)+1} (${maxC} piksel aktif)`
  };
}

function renderOutputs(customExplain){
  const matrixText = state.grid.map(row => `[${row.join(', ')}]`).join('\n');
  document.getElementById('matrixOutput').textContent = matrixText;
  const active = countActive();
  document.getElementById('activeCountSummary').textContent = `Jumlah piksel aktif: ${active}`;
  document.getElementById('binarySummary').textContent = active === 0 ?
    'Belum ada piksel aktif. Aktifkan satu kotak untuk melihat bahwa satu data bisa mengubah tampilan visual.' :
    `Saat ini ada ${active} piksel aktif dan ${state.gridSize*state.gridSize-active} piksel tidak aktif. Pola yang terlihat ditentukan oleh posisi piksel-piksel aktif tersebut.`;
  const tc = getTopRowCol();
  document.getElementById('changeSummary').textContent = state.lastAction;
  document.getElementById('changePanel').innerHTML = `<p><strong>Aksi terakhir:</strong> ${state.lastAction}</p><p><strong>Posisi terakhir:</strong> ${state.lastPosition}</p><p><strong>Baris paling aktif:</strong> ${tc.topRow}</p><p><strong>Kolom paling aktif:</strong> ${tc.topCol}</p>`;
  document.getElementById('explainBox').textContent = customExplain || 'Setiap angka 1 menandakan piksel aktif dan setiap angka 0 menandakan piksel tidak aktif. Susunan nilai itulah yang membuat komputer dapat menampilkan pola visual.';
}

function checkStage(){
  const ok = stagePassed(state.currentStage);
  const feedback = document.getElementById('stageFeedback');
  if (ok) {
    state.completed[state.currentStage] = true;
    feedback.innerHTML = successMessage(state.currentStage);
    document.getElementById('explainBox').textContent = explanationMessage(state.currentStage);
  } else {
    feedback.innerHTML = failMessage(state.currentStage);
  }
  renderStageNav();
  renderProgress();
  updateNextButton();
}

function stagePassed(stageNo){
  const active = countActive();
  if (stageNo === 1) return active >= 1;
  if (stageNo === 2) return hasStreak(5);
  if (stageNo === 3) return plusPatternMatches();
  if (stageNo === 4) return state.shiftCount >= 1;
  if (stageNo === 5) return state.manualEditsStage5 >= 3 && active >= 8;
  return false;
}

function successMessage(stageNo){
  return {
    1:'Berhasil. Satu piksel aktif sudah cukup untuk menunjukkan bahwa satu data bisa memengaruhi tampilan.',
    2:'Berhasil. Kamu sudah membentuk satu garis dari lima piksel aktif yang berurutan.',
    3:'Berhasil. Pola plus terbentuk dan menunjukkan hubungan baris, kolom, dan bentuk gambar.',
    4:'Berhasil. Pola sudah digeser. Sekarang siswa dapat melihat bahwa posisi data ikut berubah.',
    5:'Berhasil. Kamu sudah mengubah pola secara mandiri. Ini menunjukkan bahwa gambar dapat dibangun dan dimodifikasi melalui data biner.'
  }[stageNo];
}

function explanationMessage(stageNo){
  return {
    1:'Satu kotak yang aktif berarti ada satu posisi data bernilai 1. Inilah dasar representasi gambar digital.',
    2:'Ketika beberapa nilai 1 disusun berurutan, komputer membacanya sebagai pola garis.',
    3:'Bentuk plus muncul karena kombinasi piksel aktif pada baris tengah dan kolom tengah.',
    4:'Bentuk yang sama bisa terlihat pada posisi berbeda karena koordinat piksel berubah.',
    5:'Perubahan mandiri pada grid membantu siswa memahami bahwa gambar adalah hasil dari susunan data, bukan objek yang berdiri sendiri.'
  }[stageNo];
}

function failMessage(stageNo){
  return {
    1:'Belum tepat. Aktifkan minimal satu piksel pada grid, lalu periksa lagi.',
    2:'Belum tepat. Buat satu garis mendatar atau tegak dengan minimal lima piksel aktif yang berurutan.',
    3:'Belum tepat. Bentuk pola plus utuh, atau gunakan tombol pola cepat Tanda Plus lalu periksa lagi.',
    4:'Belum tepat. Geser pola minimal satu kali ke arah mana pun.',
    5:'Belum tepat. Lakukan minimal tiga perubahan manual setelah pola digeser, lalu periksa lagi.'
  }[stageNo];
}

function updateNextButton(){
  const btn = document.getElementById('stageNextBtn');
  const enabled = state.completed[state.currentStage] && state.currentStage < TOTAL_STAGES;
  btn.disabled = !enabled;
  btn.classList.toggle('opacity-50', !enabled);
  btn.classList.toggle('cursor-not-allowed', !enabled);
}

function goNextStage(){
  if (!state.completed[state.currentStage] || state.currentStage >= TOTAL_STAGES) return;
  const next = state.currentStage + 1;
  const preserve = state.currentStage === 4 && next === 5;
  state.currentStage = next;
  setupStage(next, preserve);
  renderAll();
}

function renderProgress(){
  const done = Object.keys(state.completed).length;
  const pct = Math.round((done / TOTAL_STAGES) * 100);
  document.getElementById('progressLabel').textContent = `${done} / ${TOTAL_STAGES} Tahap Selesai (${pct}%)`;
  document.getElementById('progressBar').style.width = `${pct}%`;
  const steps = document.getElementById('progressSteps');
  steps.innerHTML = '';
  for (let i=1;i<=TOTAL_STAGES;i++) {
    const dot = document.createElement('div');
    dot.className = 'prog-step-dot';
    if (state.completed[i]) dot.classList.add('done');
    if (!state.completed[i] && i === state.currentStage) dot.classList.add('current');
    steps.appendChild(dot);
  }
  const quizBtn = document.getElementById('startQuizBtn');
  if (done === TOTAL_STAGES) quizBtn.classList.remove('hidden-btn');
}

function openExampleModal(){
  const stage = STAGES[state.currentStage];
  document.getElementById('exampleTitle').textContent = `${stage.title} — Contoh`;
  document.getElementById('exampleIntro').textContent = stage.example.intro;
  document.getElementById('exampleCode').textContent = stage.example.code;
  document.getElementById('exampleOutput').textContent = stage.example.output;
  document.getElementById('exampleWhy').textContent = stage.example.why;
  openModal('exampleModal');
}

function handleQuiz(button){
  const isCorrect = button.dataset.answer === 'true';
  const key = button.dataset.quiz;
  const feedbackId = {q1:'quizFeedback1', q2:'quizFeedback2', q3:'quizFeedback3'}[key];
  const all = document.querySelectorAll(`.quiz-option[data-quiz="${key}"]`);
  all.forEach(btn => btn.classList.remove('correct','wrong'));
  button.classList.add(isCorrect ? 'correct' : 'wrong');
  const feedback = document.getElementById(feedbackId);
  feedback.style.display = 'block';
  feedback.textContent = isCorrect ? 'Benar. Itulah inti konsep representasi gambar pada lab ini.' : 'Belum tepat. Coba baca lagi konsep dasar dan amati output matrix.';
  feedback.className = 'quiz-feedback ' + (isCorrect ? 'success' : 'error');
}

function renderAll(){
  renderStageNav();
  renderMissionPanel();
  renderBoard();
  renderOutputs();
  renderProgress();
  updateNextButton();
}

/* ============================================================
   REFLEKSI INTERAKTIF
   ============================================================ */
function simpanRefleksi() {
  const vals = ['refleksi1','refleksi2','refleksi3','refleksi4']
    .map(id => (document.getElementById(id) || {}).value || '')
    .map(v => v.trim());
  if (vals.every(v => !v)) {
    alert('Tuliskan setidaknya satu jawaban sebelum menyimpan.');
    return;
  }
  const btn = document.getElementById('simpanRefleksiBtn');
  if (btn) {
    btn.textContent = '✅ Tersimpan!';
    btn.style.background = '#16a34a';
    setTimeout(() => {
      btn.textContent = 'Simpan Refleksi';
      btn.style.background = '#6366f1';
    }, 2500);
  }
}

/* ============================================================
   TEBAK GAMBAR DARI MATRIX
   ============================================================ */
const TEBAK_PUZZLES = [
  {
    label: 'Puzzle 1/3 — Huruf L',
    matrix: [
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,1]
    ]
  },
  {
    label: 'Puzzle 2/3 — Huruf T',
    matrix: [
      [1,1,1,1,1],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0]
    ]
  },
  {
    label: 'Puzzle 3/3 — Bingkai Kotak',
    matrix: [
      [1,1,1,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,1]
    ]
  }
];

let tebakIndex = 0;
let tebakGrid = [];
let tebakChecked = false;

function openTebakModal() {
  tebakIndex = 0;
  loadTebakPuzzle();
  openModal('tebakModal');
}

function loadTebakPuzzle() {
  tebakChecked = false;
  tebakGrid = Array.from({length:5}, () => Array(5).fill(0));
  const p = TEBAK_PUZZLES[tebakIndex];
  const matEl = document.getElementById('tebakMatrix');
  if (matEl) matEl.textContent = p.matrix.map(r => '[' + r.join(', ') + ']').join('\n');
  const lbl = document.getElementById('tebakLabel');
  if (lbl) lbl.textContent = p.label;
  const res = document.getElementById('tebakResult');
  if (res) res.innerHTML = '';
  const btn = document.getElementById('tebakCheckBtn');
  if (btn) btn.disabled = false;
  renderTebakGrid();
}

function renderTebakGrid() {
  const wrap = document.getElementById('tebakGrid');
  if (!wrap) return;
  wrap.innerHTML = '';
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const cell = document.createElement('button');
      cell.className = 'tebak-cell' + (tebakGrid[r][c] ? ' active' : '');
      if (!tebakChecked) {
        cell.onclick = () => {
          tebakGrid[r][c] = tebakGrid[r][c] ? 0 : 1;
          renderTebakGrid();
        };
      }
      wrap.appendChild(cell);
    }
  }
}

function checkTebak() {
  tebakChecked = true;
  const p = TEBAK_PUZZLES[tebakIndex];
  const cells = document.querySelectorAll('#tebakGrid .tebak-cell');
  let correct = 0;
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const idx = r * 5 + c;
      const expected = p.matrix[r][c];
      const student = tebakGrid[r][c];
      cells[idx].onclick = null;
      if (expected === student) {
        cells[idx].classList.add('correct');
        correct++;
      } else if (expected === 1 && student === 0) {
        cells[idx].classList.add('hint');
      } else {
        cells[idx].classList.add('wrong');
      }
    }
  }
  const res = document.getElementById('tebakResult');
  if (!res) return;
  if (correct === 25) {
    res.innerHTML = '<span style="color:#16a34a;font-weight:bold">✅ Sempurna! Kamu berhasil membaca matrix dan merekonstruksi gambar dengan benar.</span>';
  } else {
    res.innerHTML = `<span style="color:#dc2626;font-weight:bold">❌ ${correct}/25 sel benar.</span> Sel <span style="background:#fbbf24;padding:1px 5px;border-radius:4px;font-weight:bold;">kuning</span> = piksel aktif yang terlewat.`;
  }
  const btn = document.getElementById('tebakCheckBtn');
  if (btn) btn.disabled = true;
}

function nextTebakPuzzle() {
  if (tebakIndex < TEBAK_PUZZLES.length - 1) {
    tebakIndex++;
    loadTebakPuzzle();
  } else {
    tebakIndex = 0;
    loadTebakPuzzle();
  }
}

/* ============================================================
   DETEKTIF MATRIX
   ============================================================ */
const DETEKTIF_PUZZLES = [
  {
    label: 'Tantangan 1/2 — Garis mendatar ada 1 sel yang salah posisi',
    target: [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [1,1,1,1,1],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ],
    buggy: [
      [0,0,0,0,0],
      [0,0,0,0,1],
      [1,1,1,1,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ],
    bugs: [[1,4],[2,4]]
  },
  {
    label: 'Tantangan 2/2 — Tanda Plus ada 1 piksel yang tidak seharusnya aktif',
    target: [
      [0,0,1,0,0],
      [0,0,1,0,0],
      [1,1,1,1,1],
      [0,0,1,0,0],
      [0,0,1,0,0]
    ],
    buggy: [
      [0,0,1,0,0],
      [0,1,1,0,0],
      [1,1,1,1,1],
      [0,0,1,0,0],
      [0,0,1,0,0]
    ],
    bugs: [[1,1]]
  }
];

let detektifIndex = 0;
let detektifSelected = [];
let detektifChecked = false;

function openDetektifModal() {
  detektifIndex = 0;
  loadDetektifPuzzle();
  openModal('detektifModal');
}

function loadDetektifPuzzle() {
  detektifSelected = [];
  detektifChecked = false;
  const p = DETEKTIF_PUZZLES[detektifIndex];
  const lbl = document.getElementById('detektifLabel');
  if (lbl) lbl.textContent = p.label;
  const res = document.getElementById('detektifResult');
  if (res) res.innerHTML = '';
  renderReadonlyDetektifGrid('detektifTargetGrid', p.target);
  renderBuggyGrid(p);
}

function renderReadonlyDetektifGrid(id, matrix) {
  const wrap = document.getElementById(id);
  if (!wrap) return;
  wrap.innerHTML = '';
  wrap.style.gridTemplateColumns = 'repeat(5, 32px)';
  matrix.flat().forEach(v => {
    const cell = document.createElement('div');
    cell.className = `detektif-cell ${v ? 'val1' : 'val0'}`;
    cell.style.cursor = 'default';
    wrap.appendChild(cell);
  });
}

function renderBuggyGrid(p) {
  const wrap = document.getElementById('detektifBugGrid');
  if (!wrap) return;
  wrap.innerHTML = '';
  wrap.style.gridTemplateColumns = 'repeat(5, 32px)';
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const v = p.buggy[r][c];
      const cell = document.createElement('button');
      cell.className = `detektif-cell ${v ? 'val1' : 'val0'}`;
      cell.dataset.r = r;
      cell.dataset.c = c;
      if (!detektifChecked) {
        cell.onclick = () => toggleDetektifCell(r, c, cell);
      }
      wrap.appendChild(cell);
    }
  }
}

function toggleDetektifCell(r, c, el) {
  const key = `${r},${c}`;
  const idx = detektifSelected.indexOf(key);
  if (idx >= 0) {
    detektifSelected.splice(idx, 1);
    el.classList.remove('selected');
  } else {
    detektifSelected.push(key);
    el.classList.add('selected');
  }
}

function checkDetektif() {
  detektifChecked = true;
  const p = DETEKTIF_PUZZLES[detektifIndex];
  const bugKeys = p.bugs.map(([r,c]) => `${r},${c}`);

  document.querySelectorAll('#detektifBugGrid .detektif-cell').forEach(cell => {
    cell.onclick = null;
  });

  bugKeys.forEach(key => {
    const [r,c] = key.split(',').map(Number);
    const el = document.querySelector(`#detektifBugGrid .detektif-cell[data-r="${r}"][data-c="${c}"]`);
    if (el) el.classList.add('correct-bug');
  });

  detektifSelected.forEach(key => {
    if (!bugKeys.includes(key)) {
      const [r,c] = key.split(',').map(Number);
      const el = document.querySelector(`#detektifBugGrid .detektif-cell[data-r="${r}"][data-c="${c}"]`);
      if (el) el.classList.add('wrong-pick');
    }
  });

  const found = detektifSelected.filter(k => bugKeys.includes(k)).length;
  const res = document.getElementById('detektifResult');
  if (!res) return;
  if (found === bugKeys.length && detektifSelected.length === bugKeys.length) {
    res.innerHTML = '<span style="color:#16a34a;font-weight:bold">✅ Hebat! Kamu berhasil menemukan semua sel yang salah.</span>';
  } else {
    res.innerHTML = `<span style="color:#dc2626;font-weight:bold">❌ Belum tepat.</span> Sel <span style="background:#22c55e;padding:1px 5px;border-radius:4px;font-weight:bold;color:white;">hijau</span> = posisi yang seharusnya diperbaiki.`;
  }
}

function nextDetektif() {
  if (detektifIndex < DETEKTIF_PUZZLES.length - 1) {
    detektifIndex++;
  } else {
    detektifIndex = 0;
  }
  loadDetektifPuzzle();
}

/* ============================================================
   JUMLAH SAMA, BENTUK BEDA
   ============================================================ */
const JUMLAH_SAMA_PAIRS = [
  {
    count: 8,
    gridA: [[1,1,1,1,1],[0,0,0,0,0],[1,1,1,0,0],[0,0,0,0,0],[0,0,0,0,0]],
    labelA: 'Pola A — 8 piksel aktif (garis + sebagian)',
    gridB: [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],
    labelB: 'Pola B — 8 piksel aktif (diagonal silang)'
  },
  {
    count: 9,
    gridA: [[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,0]],
    labelA: 'Pola A — 9 piksel aktif (dua garis)',
    gridB: [[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1],[0,0,0,0,0],[0,0,0,0,0]],
    labelB: 'Pola B — 9 piksel aktif (pola kotak-kotak)'
  }
];

let jumlahSamaIndex = 0;

function openJumlahSamaModal() {
  jumlahSamaIndex = 0;
  renderJumlahSama();
  openModal('jumlahSamaModal');
}

function renderJumlahSama() {
  const pair = JUMLAH_SAMA_PAIRS[jumlahSamaIndex];
  const titleEl = document.getElementById('jumlahSamaTitle');
  if (titleEl) titleEl.textContent = `Kedua pola berikut sama-sama memiliki ${pair.count} piksel aktif — tapi bentuknya berbeda total!`;
  renderStaticGrid('jumlahGridA', pair.gridA, pair.labelA);
  renderStaticGrid('jumlahGridB', pair.gridB, pair.labelB);
  const confirm = document.getElementById('jumlahSamaConfirm');
  if (confirm) confirm.textContent = `Pola A: ${pair.gridA.flat().filter(v=>v).length} piksel aktif  |  Pola B: ${pair.gridB.flat().filter(v=>v).length} piksel aktif`;
}

function renderStaticGrid(id, matrix, label) {
  const wrap = document.getElementById(id);
  if (!wrap) return;
  wrap.innerHTML = '';

  const lbl = document.createElement('div');
  lbl.style.cssText = 'font-weight:bold;font-size:13px;color:#475569;margin-bottom:8px;';
  lbl.textContent = label;
  wrap.appendChild(lbl);

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(5,32px);gap:4px;justify-content:center;';
  matrix.flat().forEach(v => {
    const cell = document.createElement('div');
    cell.style.cssText = `width:32px;height:32px;border-radius:6px;border:2px solid ${v ? '#4f46e5' : '#cbd5e1'};background:${v ? '#6366f1' : '#f1f5f9'};`;
    grid.appendChild(cell);
  });
  wrap.appendChild(grid);

  const mat = document.createElement('pre');
  mat.style.cssText = 'font-family:monospace;font-size:11px;color:#64748b;margin-top:8px;line-height:1.7;';
  mat.textContent = matrix.map(r => '[' + r.join(',') + ']').join('\n');
  wrap.appendChild(mat);
}

function nextJumlahSama() {
  if (jumlahSamaIndex < JUMLAH_SAMA_PAIRS.length - 1) {
    jumlahSamaIndex++;
  } else {
    jumlahSamaIndex = 0;
  }
  renderJumlahSama();
}

/* ============================================================
   ANIMASI KOMPUTER MEMBACA MATRIX
   ============================================================ */
const ANIM_MATRIX = [
  [0,1,1,1,0],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [0,1,1,1,0]
];

let animRunning = false;
let animTimerId = null;

function openAnimasiModal() {
  animRunning = false;
  clearTimeout(animTimerId);
  resetAnimGrid();
  openModal('animasiModal');
}

function closeAnimasiModal() {
  animRunning = false;
  clearTimeout(animTimerId);
  closeModal('animasiModal');
}

function resetAnimGrid() {
  const wrap = document.getElementById('animGrid');
  const log = document.getElementById('animLog');
  if (!wrap) return;
  wrap.innerHTML = '';
  ANIM_MATRIX.flat().forEach((v, i) => {
    const cell = document.createElement('div');
    cell.className = 'anim-cell';
    cell.id = `anim-cell-${i}`;
    cell.textContent = v;
    wrap.appendChild(cell);
  });
  if (log) log.textContent = 'Klik "Mulai Animasi" untuk melihat cara komputer membaca matrix sel per sel.';
  const btn = document.getElementById('animStartBtn');
  if (btn) { btn.textContent = '▶ Mulai Animasi'; btn.disabled = false; }
}

function startAnimasi() {
  if (animRunning) return;
  animRunning = true;
  resetAnimGrid();
  const btn = document.getElementById('animStartBtn');
  if (btn) btn.disabled = true;
  const flat = ANIM_MATRIX.flat();
  let i = 0;

  function step() {
    if (!animRunning || i >= flat.length) {
      if (i >= flat.length) {
        const log = document.getElementById('animLog');
        if (log) log.innerHTML = `✅ <b>Selesai!</b> Komputer membaca semua ${flat.length} sel. Ditemukan <b>${flat.filter(v=>v).length} piksel aktif</b>. Susunan posisi itulah yang membentuk gambar.`;
        if (btn) { btn.textContent = '↺ Ulangi Animasi'; btn.disabled = false; }
      }
      animRunning = false;
      return;
    }
    const r = Math.floor(i / 5) + 1;
    const c = (i % 5) + 1;
    const prev = i > 0 ? document.getElementById(`anim-cell-${i-1}`) : null;
    if (prev) {
      prev.classList.remove('reading');
      prev.classList.add(flat[i-1] ? 'done1' : 'done0');
    }
    const cell = document.getElementById(`anim-cell-${i}`);
    if (cell) cell.classList.add('reading');
    const log = document.getElementById('animLog');
    if (log) log.innerHTML = `<b>Sel [baris ${r}, kolom ${c}]</b> → nilai = <b style="font-size:16px">${flat[i]}</b> → piksel ${flat[i] ? '<b style="color:#6366f1">AKTIF</b>' : '<b style="color:#94a3b8">tidak aktif</b>'}`;
    i++;
    animTimerId = setTimeout(step, 380);
  }

  animTimerId = setTimeout(step, 200);
}
