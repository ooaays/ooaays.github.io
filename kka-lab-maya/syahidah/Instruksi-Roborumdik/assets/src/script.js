
// ==============================================
// SCIPT ANIMASI BALON TEKS ROBOT
// ==============================================
const texts = [
"Hai Murid Hebat !",
"Namaku Roborumdik",
"Bantu aku berikan aku instruksi",
"Instruksi untuk gerakan tarian yang menarik",
"Aku bisa mengikuti instruksi yang kamu berikan !",
"Semangat ! Kita Pasti Bisa !"
]
let index=0
const speech=document.getElementById("speech")
function showText(){
    speech.innerText=texts[index]
    speech.style.opacity=1
    setTimeout(()=>{ speech.style.opacity=0 },3500)
    index++
    if(index<texts.length){ setTimeout(showText,4000) }
}
setTimeout(showText,1000)

// ==============================================
// SCRIPT MODAL CAPAIAN PEMBELAJARAN
// ==============================================
const cpModal = document.getElementById('cpModal');
const startBtn = document.getElementById('startBtn');
let hasSeenTujuan = false;
let hasSeenCara = false;
const lockedPopup = document.getElementById('lockedPopup');

function updateStartButton() {
    const unlocked = hasSeenTujuan && hasSeenCara;
    if (!startBtn) return;

    if (unlocked) {
        startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        startBtn.classList.add('cursor-pointer');
        startBtn.setAttribute('href', 'lab.html');
        startBtn.removeAttribute('aria-disabled');
        startBtn.title = 'Klik untuk mulai percobaan';
    } else {
        startBtn.classList.add('opacity-50', 'cursor-not-allowed');
        startBtn.classList.remove('cursor-pointer');
        startBtn.removeAttribute('href');
        startBtn.setAttribute('aria-disabled', 'true');
        startBtn.title = 'Buka Tujuan dan Cara Penggunaan terlebih dahulu untuk mulai percobaan';
    }
}

function tryStartPercobaan(event) {
    if (!hasSeenTujuan || !hasSeenCara) {
        event.preventDefault();
        openLockedPopup();
    }
}

function openLockedPopup() {
    if (!lockedPopup) return;
    lockedPopup.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLockedPopup() {
    if (!lockedPopup) return;
    lockedPopup.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function openCPModal() { hasSeenTujuan = true; updateStartButton(); cpModal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
function closeCPModal() { cpModal.classList.add('hidden'); document.body.style.overflow = 'auto'; }

// ==============================================
// SCRIPT MODAL CARA PENGGUNAAN (9 SLIDES)
// ==============================================
const caraModal = document.getElementById('caraModal');
let currentSlide = 0;
const totalSlides = 9;

function openCaraModal() {
    hasSeenCara = true;
    updateStartButton();
    caraModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    currentSlide = 0; 
    updateSlideView();
}

function closeCaraModal() {
    caraModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
    
    // Auto scroll konten ke atas saat pindah slide
    const contentArea = document.querySelector('#caraModal .overflow-y-auto');
    if(contentArea) contentArea.scrollTop = 0;

    updateSlideView();
}

function updateSlideView() {
    for (let i = 0; i < totalSlides; i++) {
        document.getElementById('slide-' + i).classList.add('hidden');
        let dot = document.getElementById('dot-' + i);
        dot.classList.remove('bg-orange-500', 'w-8');
        dot.classList.add('bg-slate-300', 'w-3');
    }
    
    document.getElementById('slide-' + currentSlide).classList.remove('hidden');
    let activeDot = document.getElementById('dot-' + currentSlide);
    activeDot.classList.remove('bg-slate-300', 'w-3');
    activeDot.classList.add('bg-orange-500', 'w-8');

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (currentSlide === 0) { 
        prevBtn.style.visibility = 'hidden'; 
    } else { 
        prevBtn.style.visibility = 'visible'; 
    }
    
    if (currentSlide === totalSlides - 1) { 
        nextBtn.style.visibility = 'hidden'; 
    } else { 
        nextBtn.style.visibility = 'visible'; 
    }
}

// ==============================================
// SCRIPT MODAL BIODATA PENGEMBANG
// ==============================================
const bioModal = document.getElementById('bioModal');
let bioCurrentSlide = 0;
const bioTotalSlides = 2;

function openBioModal() {
    bioCurrentSlide = 0;
    updateBioSlideView();
    bioModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeBioModal() { bioModal.classList.add('hidden'); document.body.style.overflow = 'auto'; }

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