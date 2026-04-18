// Main script moved from inline <script>
document.addEventListener('DOMContentLoaded', function(){
  // =========================
  // PAGE SWITCH
  // =========================
  window.showPage = function(id){
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================
  // MODALS + Locking logic
  // =========================
  const tujuanModal = document.getElementById('tujuanModal');
  const bioModal = document.getElementById('bioModal');
  const refleksiModal = document.getElementById('refleksiModal');
  const caraModal = document.getElementById('caraModal');

  let tujuanRead = false;
  let caraRead = false;

  window.openTujuanModal = function(){ tujuanModal.classList.remove('hidden'); document.body.style.overflow='hidden'; }
  window.closeTujuanModal = function(){
    tujuanModal.classList.add('hidden');
    document.body.style.overflow='auto';
    tujuanRead = true;
    tryEnableStart();
    try { sessionStorage.setItem('repang_tujuanRead', 'true'); } catch(e){}
    setCheckVisible('check-tujuan', true);
  }

  let currentBioSlide = 0;

  window.openBioModal = function(){ bioModal.classList.remove('hidden'); document.body.style.overflow='hidden'; }
  window.closeBioModal = function(){
    bioModal.classList.add('hidden');
    document.body.style.overflow='auto';
    // reset ke slide pertama
    currentBioSlide = 0;
    document.querySelectorAll('.bio-slide').forEach((s,i) => s.classList.toggle('hidden', i !== 0));
    const prev = document.getElementById('bioPrevBtn');
    const next = document.getElementById('bioNextBtn');
    if(prev) prev.style.visibility = 'hidden';
    if(next) next.style.visibility = 'visible';
  }

  window.changeBioSlide = function(direction){
    const slides = document.querySelectorAll('.bio-slide');
    currentBioSlide = Math.max(0, Math.min(slides.length - 1, currentBioSlide + direction));
    slides.forEach((s, i) => s.classList.toggle('hidden', i !== currentBioSlide));
    const prev = document.getElementById('bioPrevBtn');
    const next = document.getElementById('bioNextBtn');
    if(prev) prev.style.visibility = currentBioSlide === 0 ? 'hidden' : 'visible';
    if(next) next.style.visibility = currentBioSlide === slides.length - 1 ? 'hidden' : 'visible';
  }

  window.openRefleksiModal = function(){ refleksiModal.classList.remove('hidden'); document.body.style.overflow='hidden'; }
  window.closeRefleksiModal = function(){ refleksiModal.classList.add('hidden'); document.body.style.overflow='auto'; }

  window.openCaraModal = function(){
    caraModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    currentSlide = 0;
    updateSlideView();
  }

  window.closeCaraModal = function(){
    caraModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    caraRead = true;
    tryEnableStart();
    try { sessionStorage.setItem('repang_caraRead', 'true'); } catch(e){}
    setCheckVisible('check-cara', true);
  }

  function tryEnableStart(){
    const btn = document.getElementById('btn-start');
    if(!btn) return;
    if(tujuanRead && caraRead){
      btn.classList.remove('disabled-style');
      btn.removeAttribute('aria-disabled');
      btn.title = 'Mulai percobaan';
      btn.onclick = function(){ showPage('labPage'); };
    }
  }

  // helper to toggle small check badges
  function setCheckVisible(id, visible){
    const el = document.getElementById(id);
    if(!el) return;
    if(visible) el.classList.add('visible'); else el.classList.remove('visible');
  }

  // load persisted read flags (if any)
  function loadReadFlags(){
    try{
      const t = sessionStorage.getItem('repang_tujuanRead');
      const c = sessionStorage.getItem('repang_caraRead');
      tujuanRead = t === 'true' || tujuanRead === true;
      caraRead = c === 'true' || caraRead === true;
      setCheckVisible('check-tujuan', tujuanRead);
      setCheckVisible('check-cara', caraRead);
      tryEnableStart();
    }catch(e){ /* ignore storage errors */ }
  }

  window.tryOpenLabPage = function(){
    const btn = document.getElementById('btn-start');
    if(btn && btn.classList.contains('disabled-style')){
      openTujuanModal();
      return;
    }
    showPage('labPage');
    openIntroLabModal();
  }

  window.openIntroLabModal  = function(){ document.getElementById('introLabModal').classList.remove('hidden'); document.body.style.overflow='hidden'; }
  window.closeIntroLabModal = function(){ document.getElementById('introLabModal').classList.add('hidden');    document.body.style.overflow='auto'; }

  window.openIstilahModal   = function(){ document.getElementById('istilahModal').classList.remove('hidden'); document.body.style.overflow='hidden'; }
  window.closeIstilahModal  = function(){ document.getElementById('istilahModal').classList.add('hidden');    document.body.style.overflow='auto'; }

  // =========================
  // CARA PENGGUNAAN (slides)
  // =========================
  let currentSlide = 0;
  function getCaraSlides(){ return document.querySelectorAll('.cara-slide'); }

  window.changeSlide = function(direction){
    const slides = getCaraSlides();
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= slides.length) currentSlide = slides.length - 1;
    const contentArea = document.getElementById('caraSlidesContainer');
    if (contentArea) contentArea.scrollTop = 0;
    updateSlideView();
  }

  function updateSlideView(){
    const slides = getCaraSlides();
    const totalSlides = slides.length;
    slides.forEach((slide, index) => {
      slide.classList.add('hidden-slide');
      const dot = document.getElementById('dot-' + index);
      if (dot) { dot.classList.remove('bg-orange-500', 'w-8'); dot.classList.add('bg-slate-300', 'w-3'); }
    });
    if (slides[currentSlide]) slides[currentSlide].classList.remove('hidden-slide');
    const activeDot = document.getElementById('dot-' + currentSlide);
    if (activeDot) { activeDot.classList.remove('bg-slate-300', 'w-3'); activeDot.classList.add('bg-orange-500', 'w-8'); }
    document.getElementById('prevBtn').style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
    document.getElementById('nextBtn').style.visibility = currentSlide === totalSlides - 1 ? 'hidden' : 'visible';
  }

  // =========================
  // ASCII & Bit Logic
  // =========================
  const controlNames = [
    "NUL","SOH","STX","ETX","EOT","ENQ","ACK","BEL",
    "BS","TAB","LF","VT","FF","CR","SO","SI",
    "DLE","DC1","DC2","DC3","DC4","NAK","SYN","ETB",
    "CAN","EM","SUB","ESC","FS","GS","RS","US"
  ];

  function pad8(n){ return n.toString(2).padStart(8, '0'); }

  function getAsciiInfo(n){
    if(n >= 0 && n <= 31){ return { label: controlNames[n], printable: false, desc: 'Karakter Kontrol (Tidak tercetak)'}; }
    if(n === 32){ return { label: 'SPACE', printable: true, desc: 'Karakter spasi' }; }
    if(n >= 33 && n <= 126){ return { label: String.fromCharCode(n), printable: true, desc: 'Karakter tercetak' }; }
    if(n === 127){ return { label: 'DEL', printable: false, desc: 'Karakter Kontrol (Delete)' }; }
    return { label: '-', printable: false, desc: 'Di luar rentang ASCII standar' };
  }

  function renderAsciiTable(selectedValue = 0){
    const tbody = document.getElementById('asciiTableBody'); if(!tbody) return;
    tbody.innerHTML = '';
    for(let i = 0; i < 128; i++){
      const info = getAsciiInfo(i);
      const tr = document.createElement('tr');
      tr.className = 'ascii-row ' + (i === selectedValue ? 'active' : '');
      tr.innerHTML = `
        <td class="px-3 py-2 border-b border-slate-100 font-semibold">${i}</td>
        <td class="px-3 py-2 border-b border-slate-100 font-mono">${pad8(i)}</td>
        <td class="px-3 py-2 border-b border-slate-100">${info.label}</td>
      `;
      tbody.appendChild(tr);
    }
    // scroll active row into view for better UX
    setTimeout(() => {
      const active = tbody.querySelector('.ascii-row.active');
      if(active && typeof active.scrollIntoView === 'function'){
        active.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  }

  const weights = [128,64,32,16,8,4,2,1];
  let bits = [0,0,0,0,0,0,0,0];

  function renderBitGrid(){
    const container = document.getElementById('bitGrid'); if(!container) return; container.innerHTML = '';
    weights.forEach((weight, index) => {
      const col = document.createElement('div'); col.className = 'bit-col';
      col.innerHTML = `
        <div class="bit-weight">${weight}</div>
        <button class="bit-button ${bits[index] === 1 ? 'on' : ''}" onclick="toggleBit(${index})">
          ${bits[index]}
        </button>
        <div class="bit-dot ${bits[index] === 1 ? 'on' : ''}"></div>
      `;
      container.appendChild(col);
    });
  }

  window.toggleBit = function(index){ bits[index] = bits[index] === 1 ? 0 : 1; renderBitGrid(); updateOutput(); }
  window.resetBits = function(){ bits = [0,0,0,0,0,0,0,0]; renderBitGrid(); updateOutput(); }

  function getDecimalValue(){ return bits.reduce((sum, bit, i) => sum + (bit * weights[i]), 0); }
  function getBinarySpaced(){ return bits.join(' '); }
  function getActiveWeights(){ return weights.filter((w, i) => bits[i] === 1); }

  function updateOutput(){
    const decimalValue = getDecimalValue();
    const asciiInfo = getAsciiInfo(decimalValue);
    const activeWeights = getActiveWeights();
    const bo = document.getElementById('binaryOutput'); if(bo) bo.textContent = getBinarySpaced();
    const d = document.getElementById('decimalOutput'); if(d) d.textContent = decimalValue;
    const a = document.getElementById('asciiOutput'); if(a) a.textContent = asciiInfo.label;
    const sa = document.getElementById('asciiSubOutput'); if(sa) sa.textContent = asciiInfo.desc;
    let explanation = '';
    if(activeWeights.length === 0){ explanation = 'Karena Anda belum menyalakan bit apa pun, total nilainya 0. Dalam standar ASCII, angka tersebut direpresentasikan sebagai karakter kontrol "NUL".'; }
    else{
      const activeText = activeWeights.join(', ');
      explanation = `Anda menyalakan bit ${activeText}, sehingga total nilainya menjadi ${decimalValue}. Bentuk biner 8-bit-nya adalah ${pad8(decimalValue)}. `;
      if(asciiInfo.printable){ explanation += `Dalam standar ASCII, angka tersebut direpresentasikan sebagai karakter "${asciiInfo.label}".`; }
      else{ explanation += `Dalam standar ASCII, angka tersebut direpresentasikan sebagai karakter kontrol "${asciiInfo.label}".`; }
    }
    const ex = document.getElementById('explanationText'); if(ex) ex.textContent = explanation;
    const ctx = document.getElementById('contextText');
    if(ctx){
      const contextMsg = getRealWorldContext(decimalValue, asciiInfo);
      ctx.textContent = contextMsg;
      ctx.style.display = contextMsg ? 'block' : 'none';
    }
    renderAsciiTable(decimalValue);
  }

  // =========================
  // REAL-WORLD CONTEXT
  // =========================
  function getRealWorldContext(n, asciiInfo){
    if(n >= 65 && n <= 90)
      return `Saat kamu mengetik huruf kapital '${asciiInfo.label}' di HP atau komputer, perangkatmu menyimpan dan memproses angka ${n} dalam bentuk biner ${pad8(n)}.`;
    if(n >= 97 && n <= 122)
      return `Saat kamu mengetik huruf '${asciiInfo.label}' di pesan chat, aplikasi menyimpannya sebagai angka ${n} dalam biner ${pad8(n)}.`;
    if(n >= 48 && n <= 57)
      return `Angka '${asciiInfo.label}' dalam teks (seperti di nomor HP atau alamat email) disimpan komputer sebagai nilai ${n} dalam biner ${pad8(n)}, bukan langsung sebagai angka matematika.`;
    if(n === 32)
      return `Setiap kali kamu menekan spasi saat mengetik, komputer menyimpan karakter SPACE ini sebagai angka 32 dalam biner 00100000.`;
    if(n >= 33 && n <= 126)
      return `Karakter '${asciiInfo.label}' sering muncul dalam password, kode program, atau alamat web — disimpan komputer sebagai angka ${n} dalam biner ${pad8(n)}.`;
    if(n >= 1 && n <= 31)
      return `Karakter kontrol seperti '${asciiInfo.label}' digunakan komputer untuk mengatur aliran data — misalnya TAB (9) untuk indentasi, atau LF (10) untuk pindah baris saat menyimpan file teks.`;
    return '';
  }

  // =========================
  // PRESETS
  // =========================
  window.applyPreset = function(name){
    let val = 0;
    if(name === 'A') val = 65;
    else if(name === 'a') val = 97;
    else if(name === '0') val = 48;
    else if(name === '1') val = 49;
    else if(name === 'SPACE') val = 32;
    else if(name === 'DEL') val = 127;
    else if(name === 'RANDOM') val = Math.floor(Math.random()*128);
    // set bits according to weights
    bits = weights.map(w => (val & w) ? 1 : 0);
    renderBitGrid();
    updateOutput();
  }

  // =========================
  // KEYBOARD SHORTCUTS
  // 1..8 toggle bits (left-to-right 128..1), R reset, M open Tujuan, C open Cara
  // =========================
  document.addEventListener('keydown', function(e){
    const activeTag = document.activeElement && document.activeElement.tagName;
    if(activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') return;
    const k = e.key.toLowerCase();
    if(k >= '1' && k <= '8'){
      const idx = parseInt(k,10) - 1;
      // toggle mapped bit
      toggleBit(idx);
      e.preventDefault();
      return;
    }
    if(k === 'r') { resetBits(); e.preventDefault(); return; }
    if(k === 'm') { openTujuanModal(); e.preventDefault(); return; }
    if(k === 'c') { openCaraModal(); e.preventDefault(); return; }
  });

  function renderHeroPreview(){
    const demoBits = [0,1,0,0,0,0,0,1]; // 65 = A
    const demoWeights = [128,64,32,16,8,4,2,1];
    const heroBits = document.getElementById('heroBits'); if(!heroBits) return; heroBits.innerHTML = '';
    demoWeights.forEach((weight, i) => {
      const col = document.createElement('div'); col.className = 'hero-bit-col';
      col.innerHTML = `
        <div class="hero-bit-weight">${weight}</div>
        <div class="hero-bit ${demoBits[i] === 1 ? 'on' : ''}">${demoBits[i]}</div>
      `;
      heroBits.appendChild(col);
    });
    const hb = document.getElementById('heroBinaryText'); if(hb) hb.textContent = '01000001';
    const hd = document.getElementById('heroDecimalText'); if(hd) hd.textContent = '65';
    const ha = document.getElementById('heroAsciiText'); if(ha) ha.textContent = 'A';
  }

  function animateHeroSpeech(){
    const bubble = document.getElementById("heroSpeech"); if(!bubble) return;
    setTimeout(() => { bubble.style.opacity = 1; }, 600);
    setTimeout(() => { bubble.style.opacity = 0; }, 4200);
    setTimeout(() => { bubble.style.opacity = 1; bubble.textContent = "64 + 1 = 65 = A"; }, 5200);
  }

  // =========================
  // TAB SWITCHING
  // =========================
  let decodeInitialized = false;

  window.switchTab = function(tab){
    const encodePanel = document.getElementById('encodePanel');
    const dekodePanel = document.getElementById('dekodePanel');
    const tabEncode   = document.getElementById('tab-encode');
    const tabDekode   = document.getElementById('tab-dekode');
    if(tab === 'encode'){
      encodePanel.classList.remove('hidden');
      dekodePanel.classList.add('hidden');
      tabEncode.classList.add('lab-tab-active');
      tabDekode.classList.remove('lab-tab-active');
    } else {
      encodePanel.classList.add('hidden');
      dekodePanel.classList.remove('hidden');
      tabEncode.classList.remove('lab-tab-active');
      tabDekode.classList.add('lab-tab-active');
      if(!decodeInitialized){ generateDecodeChallenge(); decodeInitialized = true; }
    }
  }

  // =========================
  // DECODE MODE
  // =========================
  const DECODE_LIMIT = 10;
  let decodeScore = 0;
  let decodeTotal = 0;
  let decodeQuestionNum = 0;
  let currentDecodeValue = 0;

  function generateDecodeChallenge(){
    if(decodeQuestionNum >= DECODE_LIMIT){ showDecodeResult(); return; }
    decodeQuestionNum++;

    // update progress UI
    const fill   = document.getElementById('decodeProgFill');
    const qLabel = document.getElementById('decodeQNum');
    if(fill)   fill.style.width = ((decodeQuestionNum / DECODE_LIMIT) * 100) + '%';
    if(qLabel) qLabel.textContent = decodeQuestionNum;

    // pick printable ASCII 33-126, weighted toward common chars (letters & digits)
    const pools = [
      ...Array.from({length:26}, (_,i) => 65+i),  // A-Z
      ...Array.from({length:26}, (_,i) => 97+i),  // a-z
      ...Array.from({length:10}, (_,i) => 48+i),  // 0-9
      33,34,35,36,37,38,42,43,45,46,47,58,59,63,64,95  // common symbols
    ];
    currentDecodeValue = pools[Math.floor(Math.random() * pools.length)];

    const binaryEl = document.getElementById('decodeBinary');
    if(binaryEl) binaryEl.textContent = pad8(currentDecodeValue);

    const options = generateDecodeOptions(currentDecodeValue);
    renderDecodeOptions(options);

    const feedback = document.getElementById('decodeFeedback');
    const nextBtn  = document.getElementById('nextChallengeBtn');
    if(feedback){ feedback.classList.add('hidden'); feedback.innerHTML = ''; }
    if(nextBtn)  nextBtn.classList.add('hidden');
  }

  function showDecodeResult(){
    const pct = Math.round((decodeScore / DECODE_LIMIT) * 100);
    let grade, gradeClass, gradeDesc;
    if(pct === 100){ grade = 'Sempurna!';       gradeClass = 'text-green-600';  gradeDesc = 'Luar biasa! Kamu menguasai dekode biner ASCII dengan sempurna.'; }
    else if(pct >= 80){ grade = 'Sangat Bagus!'; gradeClass = 'text-blue-600';   gradeDesc = 'Hampir sempurna. Terus pertahankan!'; }
    else if(pct >= 60){ grade = 'Bagus!';         gradeClass = 'text-indigo-600'; gradeDesc = 'Pemahaman yang baik. Terus berlatih!'; }
    else if(pct >= 40){ grade = 'Cukup';          gradeClass = 'text-orange-500'; gradeDesc = 'Coba lihat tabel ASCII di kiri dan coba lagi.'; }
    else               { grade = 'Perlu Latihan'; gradeClass = 'text-red-500';    gradeDesc = 'Jangan menyerah! Baca materi singkat lalu coba lagi.'; }

    const qa = document.getElementById('decodeQuestionArea');
    const ra = document.getElementById('decodeResultArea');
    if(qa) qa.classList.add('hidden');
    if(ra){
      ra.classList.remove('hidden');
      ra.innerHTML = `
        <div class="text-center py-2">
          <div class="mb-3 flex justify-center">${
            pct === 100
              ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-green-500"><path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.491 4.491 0 0 1-3.497-1.307 4.491 4.491 0 0 1-1.307-3.497A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.491 4.491 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd"/></svg>`
              : pct >= 60
              ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-yellow-400"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"/></svg>`
              : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14 text-indigo-400"><path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z"/></svg>`
          }</div>
          <div class="text-2xl font-black ${gradeClass} mb-1">${grade}</div>
          <p class="text-slate-500 text-sm mb-5">${gradeDesc}</p>
          <div class="inline-flex flex-col items-center bg-indigo-50 rounded-2xl px-8 py-4 border border-indigo-100 mb-6">
            <div class="text-5xl font-black text-indigo-700">${decodeScore}<span class="text-2xl text-indigo-400">/${DECODE_LIMIT}</span></div>
            <div class="text-base text-indigo-500 font-bold">${pct}%</div>
          </div>
          <div class="flex gap-3 justify-center flex-wrap">
            <button onclick="resetDecode()" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-[0_4px_0_#3730a3] active:shadow-none active:translate-y-1 transition-all">
              Coba Lagi
            </button>
            <button onclick="switchTab('encode')" class="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-6 py-3 rounded-xl">
              Ke Mode Encode
            </button>
          </div>
        </div>`;
    }
  }

  window.resetDecode = function(){
    decodeScore = 0;
    decodeTotal = 0;
    decodeQuestionNum = 0;
    const qa     = document.getElementById('decodeQuestionArea');
    const ra     = document.getElementById('decodeResultArea');
    const fill   = document.getElementById('decodeProgFill');
    const qLabel = document.getElementById('decodeQNum');
    const sEl    = document.getElementById('decodeScore');
    const tEl    = document.getElementById('decodeTotal');
    if(ra)     ra.classList.add('hidden');
    if(qa)     qa.classList.remove('hidden');
    if(fill)   fill.style.width = '0%';
    if(qLabel) qLabel.textContent = '0';
    if(sEl)    sEl.textContent = '0';
    if(tEl)    tEl.textContent = '0';
    decodeInitialized = false;
    generateDecodeChallenge();
    decodeInitialized = true;
  }

  function generateDecodeOptions(correct){
    const pool = new Set([correct]);
    // add nearby printable chars first
    const nearby = [correct-1, correct+1, correct-2, correct+2, correct+3, correct-3];
    for(const n of nearby){
      if(n >= 33 && n <= 126 && n !== correct) pool.add(n);
      if(pool.size >= 4) break;
    }
    // fill remainder with random printable
    let attempts = 0;
    while(pool.size < 4 && attempts < 50){
      pool.add(Math.floor(Math.random() * 94) + 33);
      attempts++;
    }
    const arr = [...pool].slice(0,4).map(v => ({
      value: v,
      label: getAsciiInfo(v).label,
      isCorrect: v === correct
    }));
    // shuffle
    for(let i = arr.length-1; i > 0; i--){
      const j = Math.floor(Math.random()*(i+1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderDecodeOptions(options){
    const container = document.getElementById('decodeOptions');
    if(!container) return;
    container.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'decode-option-btn';
      btn.dataset.value = opt.value;
      btn.innerHTML = `<span class="decode-opt-char">${opt.label}</span><span class="decode-opt-val">(${opt.value})</span>`;
      btn.onclick = () => checkDecodeAnswer(opt.value);
      container.appendChild(btn);
    });
  }

  window.checkDecodeAnswer = function(chosenValue){
    const isCorrect = chosenValue === currentDecodeValue;
    decodeTotal++;
    if(isCorrect) decodeScore++;

    // mark buttons
    document.querySelectorAll('.decode-option-btn').forEach(btn => {
      btn.classList.add('answered');
      const v = parseInt(btn.dataset.value);
      if(v === currentDecodeValue) btn.classList.add('decode-correct');
      else if(v === chosenValue && !isCorrect) btn.classList.add('decode-wrong');
    });

    // update score display
    const scoreEl = document.getElementById('decodeScore');
    const totalEl = document.getElementById('decodeTotal');
    if(scoreEl) scoreEl.textContent = decodeScore;
    if(totalEl) totalEl.textContent = decodeTotal;

    // build feedback
    const asciiInfo = getAsciiInfo(currentDecodeValue);
    const context   = getRealWorldContext(currentDecodeValue, asciiInfo);
    const feedback  = document.getElementById('decodeFeedback');
    if(feedback){
      feedback.classList.remove('hidden');
      const cls  = isCorrect ? 'decode-feedback-correct' : 'decode-feedback-wrong';
      const icon = isCorrect
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 shrink-0 mt-0.5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 shrink-0 mt-0.5"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd"/></svg>`;
      const head = isCorrect
        ? `<strong>Benar!</strong> Biner ${pad8(currentDecodeValue)} = desimal ${currentDecodeValue} = karakter "${asciiInfo.label}"`
        : `<strong>Belum tepat.</strong> Jawaban yang benar: ${pad8(currentDecodeValue)} = desimal ${currentDecodeValue} = karakter "${asciiInfo.label}"`;
      feedback.innerHTML = `
        <div class="${cls}">
          <div class="decode-fb-icon">${icon}</div>
          <div>${head}${context ? `<p class="decode-fb-context">${context}</p>` : ''}</div>
        </div>`;
    }

    const nextBtn = document.getElementById('nextChallengeBtn');
    if(nextBtn){
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = decodeQuestionNum >= DECODE_LIMIT ? 'Lihat Hasil →' : 'Tantangan Berikutnya →';
    }
  }

  window.nextDecodeChallenge = function(){ generateDecodeChallenge(); }

  /* ══════════════════════════════════════════════════════════
     FITUR 1 – REFLEKSI INTERAKTIF
     ══════════════════════════════════════════════════════════ */
  const REFLEKSI_REPANG_QS = [
    { q: 'Mengapa komputer menggunakan sistem biner (0 dan 1) bukan desimal (0–9)?', ph: 'Petunjuk: transistor di dalam komputer hanya punya 2 kondisi — dialiri listrik (1) atau tidak (0). Lebih mudah membuat mesin yang membedakan 2 keadaan daripada 10 keadaan. Coba jelaskan dengan caramu sendiri!' },
    { q: 'Berikan contoh situasi nyata di mana 8 bit (1 byte) terasa sangat kecil untuk menyimpan data!', ph: 'Petunjuk: 1 byte hanya bisa menyimpan 1 karakter teks. Satu foto kamera HP berukuran ~3 MB = sekitar 3 juta byte = 3 juta karakter. Bayangkan jika kamu harus menyimpan video 1 jam!' },
    { q: 'Apa hubungan antara angka biner dan karakter yang kamu lihat di layar HP atau komputer?', ph: 'Petunjuk: saat kamu ketik huruf "A", keyboard mengirim kode 65 ke komputer. Komputer melihat tabel ASCII, menemukan 65 = "A", lalu menampilkan bentuk huruf itu di layar. Bagaimana menurutmu?' },
  ];

  window.openRefleksiModal = function() {
    const list = document.getElementById('repangRefleksiList');
    list.innerHTML = REFLEKSI_REPANG_QS.map((item, i) => `
      <div>
        <label style="display:block;font-weight:700;color:#0f172a;margin-bottom:8px;">${i+1}. ${item.q}</label>
        <textarea class="refleksi-textarea" id="rrq_${i}" placeholder="${item.ph}"></textarea>
      </div>`).join('');
    const btn = document.getElementById('repangSimpanBtn');
    btn.textContent = 'Simpan ✓'; btn.style.background = '';
    refleksiModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeRefleksiModal = function() {
    refleksiModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  window.simpanRefleksiRepang = function() {
    const btn = document.getElementById('repangSimpanBtn');
    btn.textContent = '✅ Tersimpan!';
    btn.style.background = '#16a34a';
    setTimeout(() => { btn.textContent = 'Simpan ✓'; btn.style.background = ''; }, 2000);
  };

  /* ══════════════════════════════════════════════════════════
     FITUR 2 – TULIS INISIALMU
     ══════════════════════════════════════════════════════════ */
  const inisialModal = document.getElementById('inisialModal');
  const KAL_WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];

  window.openInisialModal = function() {
    document.getElementById('inisialInput').value = '';
    document.getElementById('inisialResult').innerHTML = '';
    inisialModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  window.closeInisialModal = function() {
    inisialModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };
  window.renderInisial = function() {
    const raw = document.getElementById('inisialInput').value.toUpperCase().replace(/[^A-Z0-9 ]/g,'').slice(0,4);
    if (!raw) { document.getElementById('inisialResult').innerHTML = '<p style="color:#dc2626; font-weight:700;">Masukkan huruf terlebih dahulu!</p>'; return; }
    document.getElementById('inisialResult').innerHTML = raw.split('').map(ch => {
      const code = ch.charCodeAt(0);
      const bits = KAL_WEIGHTS.map(w => (code & w) ? 1 : 0);
      const bitsStr = bits.join(' ');
      return `<div style="margin-bottom:14px; background:#f8fafc; border:2px solid #e2e8f0; border-radius:14px; padding:14px;">
        <div style="font-size:28px; font-weight:900; color:#4f46e5; margin-bottom:6px;">"${ch}"</div>
        <div style="font-family:monospace; font-size:18px; font-weight:700; color:#0f172a; letter-spacing:4px; margin-bottom:6px;">${bitsStr}</div>
        <div style="font-size:13px; color:#64748b;">Desimal: <strong>${code}</strong> | ASCII ke-${code}</div>
        <div style="display:flex; gap:6px; margin-top:8px; flex-wrap:wrap;">
          ${KAL_WEIGHTS.map((w, i) => `<div style="background:${bits[i] ? '#4f46e5' : '#e2e8f0'};color:${bits[i] ? 'white' : '#94a3b8'};border-radius:8px;width:36px;height:44px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:900;font-size:14px;">
            <span style="font-size:8px;font-weight:700;opacity:.7;">${w}</span>${bits[i]}
          </div>`).join('')}
        </div>
      </div>`;
    }).join('');
  };

  /* ══════════════════════════════════════════════════════════
     FITUR 3 – KALKULATOR NILAI BIT
     ══════════════════════════════════════════════════════════ */
  const kalkulatorBitModal = document.getElementById('kalkulatorBitModal');
  let kalBits = [0,0,0,0,0,0,0,0];

  window.openKalkulatorBitModal = function() {
    kalBits = [0,0,0,0,0,0,0,0];
    renderKalBitGrid();
    kalkulatorBitModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  window.closeKalkulatorBitModal = function() {
    kalkulatorBitModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };
  function renderKalBitGrid() {
    const grid = document.getElementById('kalBitGrid');
    grid.innerHTML = KAL_WEIGHTS.map((w, i) => `
      <div class="kal-bit-cell ${kalBits[i] ? 'on' : ''}" onclick="toggleKalBit(${i})">
        <span class="kal-bit-pos">bit ${7-i}</span>
        <span class="kal-bit-val">${kalBits[i]}</span>
        <span class="kal-bit-pw">×${w}</span>
      </div>`).join('');
    const active = KAL_WEIGHTS.filter((w,i) => kalBits[i]);
    const total = active.reduce((s,w) => s+w, 0);
    document.getElementById('kalBitTotal').textContent = total;
    document.getElementById('kalBitEquation').textContent =
      active.length ? active.join(' + ') + ' = ' + total : '(semua bit 0)';
  }
  window.toggleKalBit = function(i) {
    kalBits[i] = kalBits[i] ? 0 : 1;
    renderKalBitGrid();
  };

  /* ══════════════════════════════════════════════════════════
     FITUR 4 – DETEKTIF 1-BIT ERROR
     ══════════════════════════════════════════════════════════ */
  const detektif1BitModal = document.getElementById('detektif1BitModal');
  const D1B_CHALLENGES = [
    { correctChar: 'A', correctCode: 65 },
    { correctChar: 'Z', correctCode: 90 },
    { correctChar: 'M', correctCode: 77 },
  ];
  let d1bIdx = 0;
  let d1bBits = [];
  let d1bFlippedBit = -1;
  let d1bAnswered = false;

  window.openDetektif1BitModal = function() {
    d1bIdx = 0; d1bAnswered = false;
    renderD1B();
    detektif1BitModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  window.closeDetektif1BitModal = function() {
    detektif1BitModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };
  function renderD1B() {
    d1bAnswered = false;
    document.getElementById('nextD1BBtn').classList.add('hidden');
    document.getElementById('d1bFeedback').style.display = 'none';
    const ch = D1B_CHALLENGES[d1bIdx];
    document.getElementById('d1bProg').textContent = `Tantangan ${d1bIdx+1} / ${D1B_CHALLENGES.length}`;
    document.getElementById('d1bChar').textContent = ch.correctChar;
    d1bFlippedBit = Math.floor(Math.random() * 8);
    d1bBits = KAL_WEIGHTS.map((w, i) => {
      let b = (ch.correctCode & w) ? 1 : 0;
      if (i === d1bFlippedBit) b = 1 - b;
      return b;
    });
    const currentVal = d1bBits.reduce((s,b,i) => s + b * KAL_WEIGHTS[i], 0);
    document.getElementById('d1bCurrentChar').textContent =
      currentVal >= 32 && currentVal <= 126 ? String.fromCharCode(currentVal) : '(' + currentVal + ')';
    document.getElementById('d1bGrid').innerHTML = d1bBits.map((b, i) =>
      `<div class="d1b-cell ${b ? 'bit1' : 'bit0'}" id="d1bc_${i}" onclick="checkD1Bit(${i})">
        <span>${b}</span>
        <span class="d1b-pos">${KAL_WEIGHTS[i]}</span>
      </div>`).join('');
  }
  window.checkD1Bit = function(i) {
    if (d1bAnswered) return;
    d1bAnswered = true;
    const ch = D1B_CHALLENGES[d1bIdx];
    const fb = document.getElementById('d1bFeedback');
    fb.style.display = 'block';
    if (i === d1bFlippedBit) {
      document.getElementById(`d1bc_${i}`).classList.add('correct-flip');
      fb.style.background = '#f0fdf4'; fb.style.color = '#15803d'; fb.style.border = '2px solid #22c55e';
      fb.textContent = `✅ Tepat! Bit ke-${i} (nilai ${KAL_WEIGHTS[i]}) yang terbalik. Kode benar: ${ch.correctCode} = "${ch.correctChar}".`;
    } else {
      document.getElementById(`d1bc_${i}`).classList.add('wrong-flip');
      document.getElementById(`d1bc_${d1bFlippedBit}`).classList.add('correct-flip');
      fb.style.background = '#fef2f2'; fb.style.color = '#dc2626'; fb.style.border = '2px solid #ef4444';
      fb.textContent = `❌ Bukan itu. Yang terbalik adalah bit ke-${d1bFlippedBit} (nilai ${KAL_WEIGHTS[d1bFlippedBit]}).`;
    }
    if (d1bIdx < D1B_CHALLENGES.length - 1) document.getElementById('nextD1BBtn').classList.remove('hidden');
  };
  window.nextDetektif1Bit = function() {
    d1bIdx++;
    if (d1bIdx < D1B_CHALLENGES.length) renderD1B();
  };

  /* ══════════════════════════════════════════════════════════
     FITUR 5 – PERBANDINGAN 3 REPRESENTASI
     ══════════════════════════════════════════════════════════ */
  const perbandinganModal = document.getElementById('perbandinganModal');

  window.openPerbandinganModal = function() {
    document.getElementById('perbInput').value = '65';
    renderPerbandingan();
    perbandinganModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  window.closePerbandinganModal = function() {
    perbandinganModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };
  window.renderPerbandingan = function() {
    let n = parseInt(document.getElementById('perbInput').value, 10);
    if (isNaN(n) || n < 0) n = 0;
    if (n > 255) n = 255;
    document.getElementById('perbInput').value = n;
    const bin = n.toString(2).padStart(8, '0');
    const oct = n.toString(8).padStart(3, '0');
    const hex = n.toString(16).toUpperCase().padStart(2, '0');
    const ascii = n >= 32 && n <= 126 ? `"${String.fromCharCode(n)}"` : n < 32 ? '(karakter kontrol)' : '(tidak tercetak)';
    document.getElementById('perbResult').innerHTML = `
      <div class="perb-card"><span class="perb-label" style="color:#4f46e5;">Biner</span><div><div class="perb-value" style="color:#4f46e5;">${bin.split('').join(' ')}</div><div class="perb-note">Basis 2 — hanya 0 dan 1</div></div></div>
      <div class="perb-card"><span class="perb-label" style="color:#0369a1;">Desimal</span><div><div class="perb-value" style="color:#0369a1;">${n}</div><div class="perb-note">Basis 10 — yang kita gunakan sehari-hari</div></div></div>
      <div class="perb-card"><span class="perb-label" style="color:#d97706;">Oktal</span><div><div class="perb-value" style="color:#d97706;">${oct}</div><div class="perb-note">Basis 8 — digunakan di sistem Unix/Linux</div></div></div>
      <div class="perb-card"><span class="perb-label" style="color:#dc2626;">Heksadesimal</span><div><div class="perb-value" style="color:#dc2626;">${hex}</div><div class="perb-note">Basis 16 — kode warna CSS, alamat memori</div></div></div>
      <div class="perb-card"><span class="perb-label" style="color:#059669;">ASCII</span><div><div class="perb-value" style="color:#059669;">${ascii}</div><div class="perb-note">Karakter yang mewakili nilai ${n}</div></div></div>`;
  };

  // INIT
  loadReadFlags();
  renderHeroPreview(); animateHeroSpeech(); renderBitGrid(); updateOutput();
});
