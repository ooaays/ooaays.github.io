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
    mission: 'Aktifkan tepat 1 piksel agar terlihat bahwa satu perubahan saja sudah mengubah tampilan visual.',
    dataset: 'Grid 10 × 10 berisi nilai 0 dan 1. Pada awal tahap, semua piksel bernilai 0.',
    tips: 'Klik satu kotak saja dulu. Amati bagaimana satu piksel yang menyala langsung mengubah tampilan.',
    reflection: 'Sebelum menekan Periksa Tahap, jelaskan: piksel mana yang kamu aktifkan dan apa arti satu angka 1 pada grid.',
    targetType: 'single',
    targetPattern: [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]],
    example: {
      intro: 'Mulailah dari hal paling kecil: satu piksel aktif.',
      code: `[0, 0, 0]
[0, 1, 0]
[0, 0, 0]`,
      output: 'Pada contoh ini, hanya satu piksel yang aktif.',
      meaning: 'Nilai biner 1 berarti satu piksel menyala, sedangkan nilai 0 berarti piksel tidak menyala. Jadi komputer membaca contoh ini sebagai satu titik aktif di tengah.',
      why: 'Satu piksel yang aktif sudah cukup untuk menunjukkan bahwa gambar digital tersusun dari banyak kotak kecil.'
    }
  },
  2: {
    shortLabel: 'Garis',
    title: 'Tahap 2 — Bentuk Garis 5 Piksel',
    tag: 'Membaca Pola',
    focus: 'Memahami bahwa susunan beberapa nilai 1 pada posisi berurutan membentuk pola yang lebih jelas.',
    mission: 'Buat satu garis mendatar atau tegak yang terdiri dari minimal 5 piksel aktif berturut-turut.',
    dataset: 'Susun sendiri lima piksel aktif yang berurutan hingga membentuk garis.',
    tips: 'Perhatikan bahwa posisi angka 1 yang berurutan menghasilkan bentuk garis.',
    reflection: 'Amati dulu: apakah angka 1 milikmu sudah berurutan pada satu baris atau satu kolom? Mengapa itu membentuk garis?',
    targetType: 'line',
    targetPattern: [[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]],
    example: {
      intro: 'Lima piksel aktif berurutan dapat membentuk satu garis sederhana.',
      code: '[1, 1, 1, 1, 1]',
      output: 'Jika kelima angka 1 diletakkan pada satu baris yang sama, terbentuk garis mendatar.',
      meaning: 'Setiap angka 1 mewakili piksel aktif. Karena lima nilai 1 tersusun berurutan, komputer membacanya sebagai lima piksel yang saling tersambung.',
      why: 'Bentuk visual muncul bukan karena banyaknya angka 1 saja, tetapi karena angka-angka itu ditempatkan secara berurutan.'
    }
  },
  3: {
    shortLabel: 'Plus',
    title: 'Tahap 3 — Bentuk Tanda Plus',
    tag: 'Representasi Bentuk',
    focus: 'Menghubungkan pola data dua arah dengan bentuk visual yang lebih kompleks.',
    mission: 'Bentuk tanda plus pada grid dengan menyusun piksel secara manual.',
    dataset: 'Targetnya adalah satu baris tengah dan satu kolom tengah yang aktif.',
    tips: 'Bentuk ini menunjukkan bahwa gambar tersusun dari kombinasi baris dan kolom data.',
    reflection: 'Coba sebutkan baris mana dan kolom mana yang menjadi pusat bentuk plus. Apa yang terjadi jika salah satu bagian tidak aktif?',
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
      meaning: 'Angka 1 menandakan piksel aktif pada baris tengah dan kolom tengah. Angka 0 menandakan area yang tetap kosong, sehingga bentuk plus terlihat jelas.',
      why: 'Komputer membaca pola ini sebagai sekumpulan piksel aktif pada posisi tertentu. Ketika posisinya tepat, muncullah bentuk plus.'
    }
  },
  4: {
    shortLabel: 'Geser',
    title: 'Tahap 4 — Geser Pola',
    tag: 'Transformasi Posisi',
    focus: 'Memahami bahwa gambar dapat berubah pembacaannya ketika posisi piksel berubah.',
    mission: 'Geser pola minimal satu kali ke arah mana pun, lalu amati perubahan posisi piksel aktif.',
    dataset: 'Saat masuk tahap ini, pola tanda plus disiapkan sebagai titik awal.',
    tips: 'Setelah digeser, bandingkan posisi angka 1 sebelum dan sesudah.',
    reflection: 'Bandingkan sebelum dan sesudah geser: apakah jumlah piksel aktif berubah, atau hanya posisinya yang berubah?',
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
      meaning: 'Nilai biner 1 tetap mewakili piksel aktif. Yang berubah bukan arti 0 dan 1, tetapi letak posisi 1 pada grid.',
      why: 'Perubahan posisi data mengubah letak bentuk pada grid. Inilah mengapa koordinat atau posisi piksel sangat penting.'
    }
  },
  5: {
    shortLabel: 'Mandiri',
    title: 'Tahap 5 — Ubah Pola Secara Mandiri',
    tag: 'Kreasi dan Interpretasi',
    focus: 'Mendorong siswa membuat pola sendiri sambil tetap membaca susunan data.',
    mission: 'Setelah pola digeser, lakukan minimal 3 perubahan manual pada grid agar bentuknya berubah lagi.',
    dataset: 'Tidak ada satu jawaban tunggal. Yang penting kamu bisa menjelaskan perubahan data dan hasil visualnya.',
    tips: 'Coba tambah atau kurangi piksel pada posisi tertentu, lalu amati data dan bentuknya.',
    reflection: 'Setelah mengubah pola, jelaskan perubahan data yang kamu buat dan bagaimana perubahan itu memengaruhi bentuk gambar.',
    targetType: 'custom',
    targetPattern: [[0,1,0,1,0],[1,1,1,1,1],[0,1,1,1,0],[0,0,1,0,0],[0,0,1,0,0]],
    example: {
      intro: 'Tahap terakhir mengajakmu membuat pola sendiri sambil tetap sadar bahwa gambar dibaca sebagai data.',
      code: `Contoh perubahan:
- tambahkan 1 piksel di kiri atas
- hapus 1 piksel di tengah bawah
- aktifkan 1 piksel di sisi kanan`,
      output: 'Bentuk baru muncul karena susunan angka 1 dan 0 berubah.',
      meaning: 'Saat kamu menambah atau menghapus nilai 1, kamu sebenarnya mengubah piksel mana yang aktif. Itulah sebabnya tampilan gambar ikut berubah.',
      why: 'Ketika siswa mengubah pola secara mandiri, mereka berlatih membaca hubungan antara aksi, data, dan hasil gambar.'
    }
  }
};

const state = {
  tujuanRead: false,
  caraRead: false,
  currentCara: 0,
  currentBio: 0,
  currentStage: 1,
  completed: {},
  gridRows: 10,
  gridCols: 13,
  grid: [],
  lastAction: 'Belum ada perubahan.',
  lastPosition: '-',
  shiftCount: 0,
  manualEditsStage5: 0,
  enteredStage5: false,
  quizAnswers: {}
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
  renderBoardAxes();
  renderBoard();
  renderOutputs();
  renderProgress();
  updateStartButton();
  updateNextButton();
  renderQuizSummary();
}

document.addEventListener('DOMContentLoaded', init);

function createEmptyGrid() {
  state.grid = Array.from({ length: state.gridRows }, () => Array(state.gridCols).fill(0));
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
  const closeBtn = document.getElementById('caraCloseBtn');
  if (closeBtn) closeBtn.classList.toggle('hidden', state.currentCara !== slides.length - 1);
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
  if (!nav) return;
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
  const gridLabel = `${state.gridRows} × ${state.gridCols}`;
  box.innerHTML = `
    <div class="mission-card">
      <div class="mission-tag">${stage.tag}</div>
      <div class="mission-title">${stage.title}</div>
      <div class="mission-focus">${stage.focus}</div>
      <div class="mission-box">
        <b>Misi:</b> ${stage.mission}
      </div>
    </div>
    <div class="mission-block">
      <div class="mission-block-title">Dataset / Kondisi Awal</div>
      <div class="dataset-box">${stage.dataset.replace('10 × 10', gridLabel)}</div>
    </div>
    <div class="info-box">
      <b>Petunjuk:</b><br>${stage.tips}
    </div>
    <div class="helper-box">
      <b>Fokus berpikir:</b><br>${stage.reflection}
    </div>
    <div class="pixel-target-card compact">
      <div class="pixel-target-title">Target pola</div>
      <div id="targetPatternWrap"></div>
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
  board.style.setProperty('--grid-cols', state.gridCols);
  state.grid.forEach((row,rowIndex) => {
    row.forEach((value,colIndex) => {
      const cell = document.createElement('button');
      if (value === 1) cell.classList.add('active');
      cell.addEventListener('click', () => toggleCell(rowIndex,colIndex));
      board.appendChild(cell);
    });
  });
}

function renderBoardAxes(){
  const topAxis = document.getElementById('pixelBoardAxisTop');
  const leftAxis = document.getElementById('pixelBoardAxisLeft');
  if (!topAxis || !leftAxis) return;

  topAxis.innerHTML = '<div class="axis-corner-label"></div>';
  leftAxis.innerHTML = '';
  topAxis.style.setProperty('--grid-cols', state.gridCols);
  leftAxis.style.setProperty('--grid-rows', state.gridRows);

  for (let i = 1; i <= state.gridCols; i++) {
    const col = document.createElement('div');
    col.className = 'axis-label axis-label-col';
    col.textContent = i;
    topAxis.appendChild(col);
  }

  for (let i = 1; i <= state.gridRows; i++) {
    const row = document.createElement('div');
    row.className = 'axis-label axis-label-row';
    row.textContent = i;
    leftAxis.appendChild(row);
  }
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
  const midRow = Math.floor(state.gridRows / 2);
  const midCol = Math.floor(state.gridCols / 2);
  if (type === 'single') {
    createEmptyGrid();
    state.grid[midRow][midCol] = 1;
    state.lastAction = 'Pola cepat satu piksel diterapkan.';
    state.lastPosition = `Baris ${midRow+1}, kolom ${midCol+1}`;
  }
  if (type === 'line') {
    createEmptyGrid();
    for (let i=midCol-2;i<=midCol+2;i++) state.grid[midRow][i] = 1;
    state.lastAction = 'Pola cepat garis 5 piksel diterapkan.';
    state.lastPosition = `Baris ${midRow+1}, kolom ${midCol-1}–${midCol+3}`;
  }
  if (type === 'plus') {
    applyPlusPattern(true);
    return;
  }
  if (type === 'frame') {
    createEmptyGrid();
    for (let col=0;col<state.gridCols;col++) {
      state.grid[0][col] = 1;
      state.grid[state.gridRows-1][col] = 1;
    }
    for (let row=0;row<state.gridRows;row++) {
      state.grid[row][0] = 1;
      state.grid[row][state.gridCols-1] = 1;
    }
    state.lastAction = 'Pola cepat bingkai diterapkan.';
    state.lastPosition = 'Baris dan kolom tepi';
  }
  renderBoard();
  renderOutputs();
}

function applyPlusPattern(withMessage = true){
  createEmptyGrid();
  const midRow = Math.floor(state.gridRows / 2);
  const midCol = Math.floor(state.gridCols / 2);
  for (let col=0;col<state.gridCols;col++) state.grid[midRow][col] = 1;
  for (let row=0;row<state.gridRows;row++) state.grid[row][midCol] = 1;
  if (withMessage) {
    state.lastAction = 'Pola cepat tanda plus diterapkan.';
    state.lastPosition = 'Baris tengah dan kolom tengah';
    renderBoard();
    renderOutputs();
  }
}

function shiftGrid(direction, announce = true){
  const newGrid = Array.from({ length:state.gridRows }, () => Array(state.gridCols).fill(0));
  for (let row=0; row<state.gridRows; row++) {
    for (let col=0; col<state.gridCols; col++) {
      if (state.grid[row][col] !== 1) continue;
      let nr=row, nc=col;
      if (direction==='up') nr--;
      if (direction==='down') nr++;
      if (direction==='left') nc--;
      if (direction==='right') nc++;
      if (nr>=0 && nr<state.gridRows && nc>=0 && nc<state.gridCols) newGrid[nr][nc] = 1;
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
  for (let col=0; col<state.gridCols; col++) {
    let s=0; for (let row=0; row<state.gridRows; row++) { s = state.grid[row][col]===1 ? s+1 : 0; if (s>=length) return true; }
  }
  return false;
}

function plusPatternMatches(){
  const midRow = Math.floor(state.gridRows / 2);
  const midCol = Math.floor(state.gridCols / 2);
  for (let r=0;r<state.gridRows;r++) {
    for (let c=0;c<state.gridCols;c++) {
      const expected = (r===midRow || c===midCol) ? 1 : 0;
      if (state.grid[r][c] !== expected) return false;
    }
  }
  return true;
}

function getTopRowCol(){
  const rows = state.grid.map(row => row.reduce((a,b) => a+b, 0));
  const cols = Array.from({length:state.gridCols}, (_,c) => state.grid.reduce((a,row)=>a+row[c], 0));
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
  const tc = getTopRowCol();
  document.getElementById('changeSummary').textContent = state.lastAction;
  document.getElementById('changePanel').innerHTML = `<p><strong>Aksi terakhir:</strong> ${state.lastAction}</p><p><strong>Posisi terakhir:</strong> ${state.lastPosition}</p><p><strong>Baris paling aktif:</strong> ${tc.topRow}</p><p><strong>Kolom paling aktif:</strong> ${tc.topCol}</p>`;
  document.getElementById('explainBox').textContent = customExplain || 'Setiap piksel direpresentasikan dengan bilangan biner: 1 berarti piksel aktif dan 0 berarti piksel tidak aktif. Komputer membaca susunan 0 dan 1 inilah sebagai gambar.';
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
    document.getElementById('explainBox').textContent = coachingMessage(state.currentStage);
  }
  renderStageNav();
  renderProgress();
  updateNextButton();
  showStageResult(ok);
}

function showStageResult(ok){
  const title = document.getElementById('stageResultTitle');
  const message = document.getElementById('stageResultMessage');
  const detail = document.getElementById('stageResultDetail');
  const iconWrap = document.getElementById('stageResultIcon');
  const iconText = document.getElementById('stageResultIconText');
  const nextBtn = document.getElementById('stageResultNextBtn');
  const canContinue = ok && state.currentStage < TOTAL_STAGES;

  if (ok) {
    title.textContent = state.currentStage === TOTAL_STAGES ? 'Tahap Selesai' : 'Jawaban Benar';
    message.textContent = successMessage(state.currentStage);
    detail.textContent = state.currentStage === TOTAL_STAGES
      ? 'Semua tahap selesai. Kamu bisa lanjut ke kuis refleksi atau meninjau kembali pola yang sudah dibuat.'
      : 'Kamu boleh lanjut ke tahap berikutnya.';
    iconWrap.className = 'w-20 h-20 rounded-full flex items-center justify-center bg-emerald-100';
    iconText.className = 'text-4xl font-black text-emerald-600';
    iconText.textContent = '✓';
  } else {
    title.textContent = 'Coba Lagi';
    message.textContent = failMessage(state.currentStage);
    detail.textContent = 'Perbaiki susunan pikselmu dulu. Setelah itu, tekan Periksa Tahap lagi.';
    iconWrap.className = 'w-20 h-20 rounded-full flex items-center justify-center bg-rose-100';
    iconText.className = 'text-4xl font-black text-rose-600';
    iconText.textContent = '!';
  }

  nextBtn.style.display = canContinue ? 'inline-flex' : 'none';
  openModal('stageResultModal');
}

function stagePassed(stageNo){
  const active = countActive();
  if (stageNo === 1) return active === 1;
  if (stageNo === 2) return hasStreak(5);
  if (stageNo === 3) return plusPatternMatches();
  if (stageNo === 4) return state.shiftCount >= 1;
  if (stageNo === 5) return state.manualEditsStage5 >= 3 && active >= 8;
  return false;
}

function successMessage(stageNo){
  return {
    1:'Berhasil. Tepat satu piksel aktif menunjukkan bahwa satu nilai biner 1 pada satu posisi sudah cukup untuk mengubah tampilan gambar.',
    2:'Berhasil. Kamu sudah membentuk satu garis dari lima piksel aktif yang berurutan. Ini berarti susunan beberapa nilai biner 1 dapat dibaca komputer sebagai pola visual.',
    3:'Berhasil. Pola plus terbentuk dan menunjukkan bahwa bentuk gambar muncul dari susunan nilai biner 0 dan 1 pada baris dan kolom tertentu.',
    4:'Berhasil. Pola sudah digeser. Ini menunjukkan bahwa nilai biner aktifnya tetap dapat dibaca sebagai bentuk yang sama, tetapi posisinya berubah.',
    5:'Berhasil. Kamu sudah mengubah pola secara mandiri. Ini menunjukkan bahwa gambar dapat dibangun dan dimodifikasi melalui susunan bilangan biner 0 dan 1.'
  }[stageNo];
}

function explanationMessage(stageNo){
  return {
    1:'Satu kotak yang aktif berarti ada satu posisi data bernilai biner 1, sedangkan kotak lain bernilai 0. Inilah dasar representasi gambar digital.',
    2:'Ketika beberapa nilai biner 1 disusun berurutan, komputer membacanya sebagai pola garis pada kumpulan piksel.',
    3:'Bentuk plus muncul karena kombinasi piksel bernilai 1 pada baris tengah dan kolom tengah, sedangkan posisi lain tetap 0.',
    4:'Bentuk yang sama bisa terlihat pada posisi berbeda karena koordinat piksel bernilai 1 berubah, walaupun konsep binernya tetap sama.',
    5:'Perubahan mandiri pada grid membantu siswa memahami bahwa gambar adalah hasil susunan data biner 0 dan 1, bukan objek yang berdiri sendiri.'
  }[stageNo];
}

function failMessage(stageNo){
  const active = countActive();
  return {
    1:`Belum tepat. Saat ini ada ${active} piksel aktif. Tahap 1 hanya boleh berisi tepat satu piksel aktif agar terlihat bahwa satu data saja sudah bisa mengubah gambar.`,
    2:'Belum tepat. Buat satu garis mendatar atau tegak dengan minimal lima piksel aktif yang berurutan. Cek lagi apakah angka 1 milikmu masih terpencar.',
    3:'Belum tepat. Bentuk pola plus utuh dengan menyusun piksel pada baris dan kolom yang tepat. Jika ada satu bagian bergeser, bentuk plus belum terbaca jelas.',
    4:'Belum tepat. Geser pola minimal satu kali ke arah mana pun. Fokusnya bukan mengganti jumlah piksel, tetapi mengamati perpindahan posisinya.',
    5:`Belum tepat. Lakukan minimal tiga perubahan manual setelah pola digeser, lalu periksa lagi. Saat ini jumlah piksel aktifmu ${active}, jadi jelaskan juga perubahan apa yang kamu buat.`
  }[stageNo];
}

function coachingMessage(stageNo){
  return {
    1:'Coba sebutkan satu posisi yang ingin kamu nyalakan, lalu matikan kotak lain sampai hanya tersisa satu angka 1.',
    2:'Perhatikan output data. Jika ingin membentuk garis, angka 1 perlu tersusun berurutan pada satu baris atau satu kolom.',
    3:'Lihat hubungan baris dan kolom tengah. Bentuk plus baru muncul jika keduanya saling berpotongan dengan tepat.',
    4:'Bandingkan matriks sebelum dan sesudah digeser. Tanyakan: apakah bentuknya sama, tetapi lokasinya berpindah?',
    5:'Jangan hanya menambah piksel. Coba jelaskan piksel mana yang diubah dan bagaimana perubahan itu mengubah bentuk akhirnya.'
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
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'prog-step';
    dot.innerHTML = `<span class="prog-step-num">${i}</span><span class="prog-step-label">${STAGES[i].shortLabel}</span>`;
    if (state.completed[i]) dot.classList.add('done');
    if (!state.completed[i] && i === state.currentStage) dot.classList.add('current');
    if (i <= highestUnlockedStage()) {
      dot.onclick = () => changeStage(i);
    } else {
      dot.disabled = true;
    }
    steps.appendChild(dot);
    if (i < TOTAL_STAGES) {
      const line = document.createElement('div');
      line.className = 'prog-line' + (state.completed[i] ? ' done' : '');
      steps.appendChild(line);
    }
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
  document.getElementById('exampleMeaning').textContent = stage.example.meaning;
  document.getElementById('exampleWhy').textContent = stage.example.why;
  openModal('exampleModal');
}

function handleQuiz(button){
  const isCorrect = button.dataset.answer === 'true';
  const key = button.dataset.quiz;
  const feedbackId = {q1:'quizFeedback1', q2:'quizFeedback2', q3:'quizFeedback3'}[key];
  const all = document.querySelectorAll(`.quiz-option[data-quiz="${key}"]`);
  all.forEach(btn => {
    btn.classList.remove('correct','wrong');
    btn.disabled = true;
    if (btn.dataset.answer === 'true') btn.classList.add('correct');
  });
  button.classList.add(isCorrect ? 'correct' : 'wrong');
  state.quizAnswers[key] = isCorrect;
  const feedback = document.getElementById(feedbackId);
  feedback.style.display = 'block';
  feedback.textContent = isCorrect ? 'Benar. Itulah inti konsep representasi gambar pada lab ini.' : 'Belum tepat. Coba baca lagi petunjuk tahap dan amati output data.';
  feedback.className = 'quiz-feedback ' + (isCorrect ? 'success' : 'error');
  renderQuizSummary();
}

function openQuizModal(){
  renderQuizSummary();
  openModal('quizModal');
}

function renderQuizSummary(){
  const summary = document.getElementById('quizSummary');
  if (!summary) return;
  const answered = Object.keys(state.quizAnswers).length;
  const correct = Object.values(state.quizAnswers).filter(Boolean).length;
  if (answered === 0) {
    summary.textContent = 'Jawab semua soal untuk melihat ringkasan pemahaman.';
    summary.className = 'quiz-summary';
    return;
  }
  if (answered < 3) {
    summary.textContent = `Sementara ${correct} dari ${answered} jawaban sudah tepat. Lanjutkan sampai semua soal selesai.`;
    summary.className = 'quiz-summary in-progress';
    return;
  }
  const message = correct === 3
    ? 'Mantap. Semua jawaban tepat dan konsep representasi gambar sudah terbaca dengan baik.'
    : `Kuis selesai. ${correct} dari 3 jawaban tepat. Ulangi diskusi pada konsep data, posisi, dan output hasil agar lebih kuat.`;
  summary.textContent = message;
  summary.className = 'quiz-summary ' + (correct === 3 ? 'success' : 'review');
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
    gridB: [[1,0,0,0,1],[0,1,0,1,0],[0,0,0,0,0],[0,1,0,1,0],[1,0,0,0,1]],
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
  const countA = pair.gridA.flat().filter(v => v).length;
  const countB = pair.gridB.flat().filter(v => v).length;
  if (titleEl) {
    titleEl.textContent = countA === countB
      ? `Kedua pola berikut sama-sama memiliki ${countA} piksel aktif — tapi bentuknya berbeda total!`
      : `Kedua pola berikut memiliki jumlah piksel aktif yang berbeda. Mari bandingkan bentuk dan datanya.`;
  }
  renderStaticGrid('jumlahGridA', pair.gridA, pair.labelA);
  renderStaticGrid('jumlahGridB', pair.gridB, pair.labelB);
  const confirm = document.getElementById('jumlahSamaConfirm');
  if (confirm) confirm.textContent = `Pola A: ${countA} piksel aktif  |  Pola B: ${countB} piksel aktif`;
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
