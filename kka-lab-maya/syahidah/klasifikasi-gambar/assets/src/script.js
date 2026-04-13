// ==============================================
// SCRIPT ANIMASI BALON TEKS ROBOT (TEMA AI)
// ==============================================
const texts = [
"Hai Murid Hebat!",
"Selamat datang di Lab Klasifikasi",
"Kita akan melatih AI untuk mengenali hewan",
"Yuk, mulai percobaannya!"
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

function updateStartButton() {
    const unlocked = hasSeenTujuan && hasSeenCara;
    if (!startBtn) return;

    if (unlocked) {
        startBtn.classList.remove('opacity-50', 'pointer-events-none', 'cursor-not-allowed');
        startBtn.classList.add('cursor-pointer');
        startBtn.setAttribute('href', 'lab.html');
        startBtn.removeAttribute('aria-disabled');
        startBtn.title = 'Klik untuk mulai percobaan';
    } else {
        startBtn.classList.add('opacity-50', 'pointer-events-none', 'cursor-not-allowed');
        startBtn.classList.remove('cursor-pointer');
        startBtn.removeAttribute('href');
        startBtn.setAttribute('aria-disabled', 'true');
        startBtn.title = 'Buka Tujuan dan Cara Penggunaan terlebih dahulu untuk mulai percobaan';
    }
}

function openCPModal() {
    hasSeenTujuan = true;
    updateStartButton();
    cpModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeCPModal() { cpModal.classList.add('hidden'); document.body.style.overflow = 'auto'; }

updateStartButton();

// ==============================================
// SCRIPT MODAL CARA PENGGUNAAN (9 SLIDES)
// ==============================================
const caraModal = document.getElementById('caraModal');
let currentSlide = 0;
const totalSlides = 5;

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
        let slide = document.getElementById('slide-' + i);
        if (slide) slide.classList.add('hidden');
        
        let dot = document.getElementById('dot-' + i);
        if (dot) {
            dot.classList.remove('bg-orange-500', 'w-8');
            dot.classList.add('bg-slate-300', 'w-3');
        }
    }
    
    let activeSlide = document.getElementById('slide-' + currentSlide);
    if (activeSlide) activeSlide.classList.remove('hidden');
    
    let activeDot = document.getElementById('dot-' + currentSlide);
    if (activeDot) {
        activeDot.classList.remove('bg-slate-300', 'w-3');
        activeDot.classList.add('bg-orange-500', 'w-8');
    }

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (currentSlide === 0) { 
        if (prevBtn) prevBtn.style.visibility = 'hidden'; 
    } else { 
        if (prevBtn) prevBtn.style.visibility = 'visible'; 
    }
    
    if (currentSlide === totalSlides - 1) { 
        if (nextBtn) nextBtn.style.visibility = 'hidden'; 
    } else { 
        if (nextBtn) nextBtn.style.visibility = 'visible'; 
    }
}

// ==============================================
// SCRIPT MODAL BIODATA PENGEMBANG
// ==============================================
const bioModal = document.getElementById('bioModal');
function openBioModal() { bioModal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
function closeBioModal() { bioModal.classList.add('hidden'); document.body.style.overflow = 'auto'; }