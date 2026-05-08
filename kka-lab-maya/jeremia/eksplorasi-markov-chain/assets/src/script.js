// FUNGSI ANIMASI BALON KATA
setTimeout(() => {
    const speech = document.getElementById('speech');
    if(speech) speech.style.opacity = '1';
}, 800);

// START BUTTON LOCKING
let materiOpened = false;
let caraOpened = false;

function setCheckVisible(id, visible) {
    const element = document.getElementById(id);
    if (!element) return;
    element.classList.toggle('hidden', !visible);
    element.classList.toggle('visible', visible);
}

function loadReadState() {
    try {
        if (sessionStorage.getItem('markov_tujuanRead') === 'true') {
            materiOpened = true;
        }
        if (sessionStorage.getItem('markov_caraRead') === 'true') {
            caraOpened = true;
        }
    } catch (e) {
        // sesi storage mungkin tidak tersedia
    }
    updateStartButton();
}

function updateStartButton() {
    const startButton = document.getElementById('startButton');
    if (!startButton) return;

    setCheckVisible('check-tujuan', materiOpened);
    setCheckVisible('check-cara', caraOpened);

    if (materiOpened && caraOpened) {
        startButton.classList.remove('opacity-70', 'cursor-not-allowed', 'pointer-events-none');
        startButton.classList.add('cursor-pointer');
        startButton.disabled = false;
        startButton.setAttribute('aria-disabled', 'false');
        startButton.removeAttribute('title');
    } else {
        startButton.classList.add('opacity-70', 'cursor-not-allowed');
        startButton.classList.remove('cursor-pointer', 'pointer-events-none');
        startButton.disabled = false;
        startButton.setAttribute('aria-disabled', 'true');
        startButton.setAttribute('title', 'Buka Tujuan Praktikum dan Cara Penggunaan terlebih dahulu');
    }
}

function tryStart() {
    if (materiOpened && caraOpened) {
        window.location.href = 'lab.html';
    } else {
        document.getElementById('lockedModal').classList.remove('hidden');
    }
}

// MODAL CAPAIAN PEMBELAJARAN
function openCPModal() {
    document.getElementById('cpModal').classList.remove('hidden');
}
function closeCPModal() {
    materiOpened = true;
    try { sessionStorage.setItem('markov_tujuanRead', 'true'); } catch (e) {}
    setCheckVisible('check-tujuan', true);
    updateStartButton();
    document.getElementById('cpModal').classList.add('hidden');
}

// MODAL BIODATA
let bioCurrentSlide = 0;
const bioTotalSlides = 2;

function openBioModal() {
    document.getElementById('bioModal').classList.remove('hidden');
    bioCurrentSlide = 0;
    updateBioSlideView();
}
function closeBioModal() {
    document.getElementById('bioModal').classList.add('hidden');
}

function changeBioSlide(direction) {
    bioCurrentSlide += direction;
    if (bioCurrentSlide < 0) bioCurrentSlide = 0;
    if (bioCurrentSlide >= bioTotalSlides) bioCurrentSlide = bioTotalSlides - 1;

    const contentArea = document.querySelector('#bioModal .overflow-y-auto');
    if (contentArea) contentArea.scrollTop = 0;

    updateBioSlideView();
}

function updateBioSlideView() {
    for (let i = 0; i < bioTotalSlides; i++) {
        const slide = document.getElementById('bio-slide-' + i);
        if (slide) {
            slide.classList.toggle('hidden', i !== bioCurrentSlide);
        }
    }

    const prevBtn = document.getElementById('bioPrevBtn');
    const nextBtn = document.getElementById('bioNextBtn');

    if (prevBtn) {
        prevBtn.style.visibility = bioCurrentSlide === 0 ? 'hidden' : 'visible';
    }
    if (nextBtn) {
        nextBtn.style.visibility = bioCurrentSlide === bioTotalSlides - 1 ? 'hidden' : 'visible';
    }
}

// MODAL CARA PENGGUNAAN & SLIDER
let currentSlide = 0;
const totalSlides = 8;

function openCaraModal() {
    document.getElementById('caraModal').classList.remove('hidden');
    currentSlide = 0;
    updateSlide();
}

function closeCaraModal() {
    caraOpened = true;
    try { sessionStorage.setItem('markov_caraRead', 'true'); } catch (e) {}
    setCheckVisible('check-cara', true);
    updateStartButton();
    document.getElementById('caraModal').classList.add('hidden');
}

function closeLockedModal() {
    document.getElementById('lockedModal').classList.add('hidden');
}

function updateSlide() {
    // Sembunyikan semua konten dan matikan indikator dots
    for(let i = 0; i < totalSlides; i++) {
        document.getElementById(`slide-${i}`).classList.remove('block');
        document.getElementById(`slide-${i}`).classList.add('hidden');
        
        let dot = document.getElementById(`dot-${i}`);
        dot.classList.remove('w-8', 'bg-orange-500');
        dot.classList.add('w-3', 'bg-slate-300');
    }
    
    // Tampilkan slide saat ini
    document.getElementById(`slide-${currentSlide}`).classList.remove('hidden');
    document.getElementById(`slide-${currentSlide}`).classList.add('block');
    
    let activeDot = document.getElementById(`dot-${currentSlide}`);
    activeDot.classList.remove('w-3', 'bg-slate-300');
    activeDot.classList.add('w-8', 'bg-orange-500');

    // Kontrol tombol Sebelumnya
    if(currentSlide === 0) {
        document.getElementById('prevBtn').style.visibility = 'hidden';
    } else {
        document.getElementById('prevBtn').style.visibility = 'visible';
    }

    // Kontrol tombol Selanjutnya / Tutup
    if(currentSlide === totalSlides - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('closeCaraBtn').style.display = 'block';
    } else {
        document.getElementById('nextBtn').style.display = 'block';
        document.getElementById('closeCaraBtn').style.display = 'none';
    }
}

function changeSlide(step) {
    currentSlide += step;
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
    updateSlide();
}

loadReadState();