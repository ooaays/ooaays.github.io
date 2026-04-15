
let soundEnabled = false;
let hasSeenIntro = false;
let hasSeenCP = false;
let hasSeenCara = false;

function tryOpenLabPage() {
    if (!hasSeenCP || !hasSeenCara) {
        const lockedPopup = document.getElementById("lockedPopup");
        if (lockedPopup) lockedPopup.classList.remove("hidden");
        document.body.style.overflow = "hidden";
        return;
    }
    showPage('labPage');
}

function closeStartLockedPopup() {
    const lockedPopup = document.getElementById('lockedPopup');
    if (!lockedPopup) return;
    lockedPopup.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function checkStartButtonState() {
    const btnStart = document.getElementById('btn-start');
    if (!btnStart) return;

    if (hasSeenCP && hasSeenCara) {
        btnStart.classList.remove('disabled-style');
        btnStart.setAttribute('aria-disabled', 'false');
        btnStart.title = 'Mulai percobaan';
    } else {
        btnStart.classList.add('disabled-style');
        btnStart.setAttribute('aria-disabled', 'true');
        btnStart.title = 'Buka Tujuan dan Cara Penggunaan terlebih dahulu';
    }
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById(id);
    if (page) page.classList.add('active');
    window.scrollTo({ top:0, behavior:"smooth" });

    if (id === 'labPage' && !hasSeenIntro) {
        hasSeenIntro = true;
        document.getElementById('introModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeIntroModal() {
    document.getElementById('introModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

    function speakText(text) {
        if (!soundEnabled || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 1.0;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    }

    // ================= MODAL CONTROL =================

// TUJUAN PEMBELAJARAN
function openCPModal(){
    hasSeenCP = true;
    checkStartButtonState();
    document.getElementById("cpModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeCPModal(){
    document.getElementById("cpModal").classList.add("hidden");
    document.body.style.overflow = "auto";
}

// CARA PENGGUNAAN
function openCaraModal(){
    hasSeenCara = true;
    checkStartButtonState();
    document.getElementById("caraModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // reset ke slide pertama
    currentSlide = 0;

    for(let i=0;i<totalSlides;i++){
        document.getElementById("slide-" + i).classList.add("hidden-slide");
    }

    document.getElementById("slide-0").classList.remove("hidden-slide");

    updateDots();
    updateButtons();
}

function closeCaraModal(){
    document.getElementById("caraModal").classList.add("hidden");
    document.body.style.overflow = "auto";
}



// ================= SLIDER CARA PENGGUNAAN =================
let currentSlide = 0;
const totalSlides = 4;

function changeSlide(direction){
    // sembunyikan slide sekarang
    document.getElementById("slide-" + currentSlide).classList.add("hidden-slide");

    // update index
    currentSlide += direction;

    // batas aman
    if(currentSlide < 0) currentSlide = 0;
    if(currentSlide >= totalSlides) currentSlide = totalSlides - 1;

    // tampilkan slide baru
    document.getElementById("slide-" + currentSlide).classList.remove("hidden-slide");

    updateDots();
    updateButtons();
}

function updateDots(){
    for(let i=0;i<totalSlides;i++){
        const dot = document.getElementById("dot-" + i);
        if(i === currentSlide){
            dot.classList.remove("w-3","bg-slate-300");
            dot.classList.add("w-8","bg-orange-500");
        }else{
            dot.classList.remove("w-8","bg-orange-500");
            dot.classList.add("w-3","bg-slate-300");
        }
    }
}

function updateButtons(){
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    prevBtn.style.visibility = currentSlide === 0 ? "hidden" : "visible";
    nextBtn.style.visibility = currentSlide === totalSlides - 1 ? "hidden" : "visible";
}


// ==============================================
// SCRIPT MODAL BIODATA PENGEMBANG
// ==============================================
const bioModal = document.getElementById('bioModal');
let bioCurrentSlide = 0;
const bioTotalSlides = 2;

// BIODATA
function openBioModal(){
    bioCurrentSlide = 0;
    updateBioSlideView();
    document.getElementById("bioModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeBioModal(){
    document.getElementById("bioModal").classList.add("hidden");
    document.body.style.overflow = "auto";
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


const trainingLib = {
    toxicWords: ["bodoh", "tolol", "anjing", "babi", "bangsat", "goblok", "asu", "jelek"],
    normalizeText(value) {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\u00C0-\u017F\s]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    },
    isToxicTag(tag) {
        const normalized = this.normalizeText(tag);
        return normalized
            .split(' ')
            .some(word => this.toxicWords.includes(word));
    },
    containsToxicWord(text) {
        const normalized = this.normalizeText(text);
        return normalized
            .split(' ')
            .some(word => this.toxicWords.includes(word));
    }
};
        
        // State Dataset
        let activeTags = {
            ipa: [],
            mtk: [],
            indo: []
        };

        const botResponses = {
            ipa: [
                "Berdasarkan analisis, kalimat ini berkaitan dengan Ilmu Pengetahuan Alam.",
                "Sistem mendeteksi pola yang merujuk pada fenomena alam dan sains.",
                "Konteks kalimat ini terklasifikasi ke dalam bidang studi Ilmu Pengetahuan Alam.",
                "Hasil pemrosesan menunjukkan keterkaitan dengan materi sains.",
                "Kalimat tersebut memiliki probabilitas tinggi pada kategori Ilmu Pengetahuan Alam."
            ],
            mtk: [
                "Berdasarkan analisis, kalimat ini berkaitan dengan Matematika.",
                "Sistem mendeteksi pola logika numerik dan perhitungan.",
                "Konteks kalimat ini terklasifikasi ke dalam bidang studi Matematika.",
                "Hasil pemrosesan menunjukkan keterkaitan dengan ilmu pasti atau aritmetika.",
                "Kalimat tersebut memiliki probabilitas tinggi pada kategori Matematika."
            ],
            indo: [
                "Berdasarkan analisis, kalimat ini berkaitan dengan Bahasa Indonesia.",
                "Sistem mendeteksi pola linguistik atau tata bahasa.",
                "Konteks kalimat ini terklasifikasi ke dalam studi sastra atau Bahasa Indonesia.",
                "Hasil pemrosesan menunjukkan keterkaitan dengan struktur kalimat dan kebahasaan.",
                "Kalimat tersebut memiliki probabilitas tinggi pada kategori Bahasa Indonesia."
            ],
            unknown: [
                "Mohon maaf, sistem belum dapat mengidentifikasi pola kalimat tersebut.",
                "Data latih tidak mencukupi untuk melakukan klasifikasi pada kalimat ini.",
                "Sistem gagal menemukan kecocokan dengan basis data yang ada.",
                "Kata kunci pada kalimat tidak terdaftar dalam memori sistem.",
                "Silakan berikan tambahan data latih agar sistem dapat mengenali konteks ini."
            ]
        };

        let isTrained = false;

        window.onload = () => {
            checkStartButtonState();
            addChatMessage("Selamat datang. Saya adalah Asisten AI. Silakan masukkan data latih pada panel kiri, kemudian jalankan proses pelatihan.", 'bot');
        };

        function focusInput(id) { document.getElementById(id).focus(); }

        // MANAJEMEN TAG
        function handleTagInput(e, category) {
            const input = e.target;
            const value = input.value.trim();

            if (e.key === ',' || e.key === 'Enter') {
                const tagValue = value.replace(',', '');
                if (tagValue && !activeTags[category].includes(tagValue)) {
                    if (trainingLib.isToxicTag(tagValue)) {
                        input.value = "";
                        alert("Kata yang dimasukkan tidak boleh mengandung kata tidak pantas.");
                        addChatMessage("Kata yang dimasukkan tidak boleh mengandung kata tidak pantas.", 'warning');
                        return;
                    }
                    activeTags[category].push(trainingLib.normalizeText(tagValue));
                    renderTags(category);
                }
                input.value = "";
            }
        }

        function renderTags(category) {
            const container = document.getElementById(`${category}-tags`);
            container.innerHTML = "";
            activeTags[category].forEach((tag, index) => {
                const tagEl = document.createElement('div');
                tagEl.className = 'tag';
                tagEl.innerHTML = `${tag} <span class="tag-remove" onclick="removeTag('${category}', ${index})">&times;</span>`;
                container.appendChild(tagEl);
            });
        }

        function removeTag(category, index) {
            activeTags[category].splice(index, 1);
            renderTags(category);
        }

        // AUTO-FILL DATA DEMO
        function fillDemoData() {
            resetAll();
            
            const demo = {
                ipa: "energi, gaya, massa, zat, atom, molekul, sel, jaringan, organ, ekosistem, fotosintesis, gravitasi, listrik, magnet, suhu, kalor, reaksi, senyawa, unsur, gelombang",
                mtk: "penjumlahan, pengurangan, perkalian, pembagian, pecahan, desimal, persentase, aljabar, persamaan, fungsi, geometri, sudut, luas, volume, bilangan, akar, pangkat, statistika, peluang, grafik",
                indo: "kata, kalimat, paragraf, wacana, sinonim, antonim, imbuhan, awalan, akhiran, ejaan, tanda baca, narasi, deskripsi, eksposisi, persuasi, dialog, teks, makna, diksi, struktur"
            };

            for (let cat in demo) {
                activeTags[cat === 'mtk' ? 'mtk' : (cat === 'indo' ? 'indo' : 'ipa')] = 
                    demo[cat].split(',').map(s => s.trim().toLowerCase());
                renderTags(cat);
            }
            
            document.getElementById('insight-text').textContent = "Data uji coba berhasil dimuat. Harap tekan tombol 'Mulai Pelatihan Model'.";
        }

        function resetAll() {
            activeTags = { ipa: [], mtk: [], indo: [] };
            renderTags('ipa');
            renderTags('mtk');
            renderTags('indo');
            document.getElementById('chat-window').innerHTML = "";
            addChatMessage("Seluruh data latih telah dihapus. Sistem siap menerima instruksi baru.", 'bot');
            isTrained = false;
            document.getElementById('insight-text').textContent = "Sistem telah diatur ulang ke kondisi awal.";
            
            // Atur ulang Bar Confidence
            ['ipa', 'mtk', 'indo'].forEach(cat => {
                document.getElementById(`conf-val-${cat}`).textContent = "0%";
                document.getElementById(`conf-bar-${cat}`).style.width = "0%";
            });
        }

        function trainModel() {
            const log = document.getElementById('train-log');
            log.classList.remove('hidden');
            
            setTimeout(() => {
                log.classList.add('hidden');
                isTrained = true;
                const total = activeTags.ipa.length + activeTags.mtk.length + activeTags.indo.length;
                document.getElementById('insight-text').textContent = `Pelatihan model berhasil diselesaikan menggunakan ${total} kata kunci.`;
                addChatMessage("Proses pelatihan selesai. Sistem kini siap melakukan klasifikasi teks.", 'bot');
            }, 1000);
        }

        // CHAT LOGIC
        function handleChatKeyPress(e) { if (e.key === 'Enter') sendMessage(); }

        function sendMessage() {
            const input = document.getElementById('user-input');
            const text = input.value.trim();
            if (!text) return;

            if (trainingLib.containsToxicWord(text)) {
                addChatMessage(text, 'user');
                input.value = "";
                setTimeout(() => addChatMessage("Peringatan Sistem: Dilarang menggunakan bahasa yang tidak pantas.", 'warning'), 400);
                return;
            }

            addChatMessage(text, 'user');
            input.value = "";

            if (!isTrained) {
                setTimeout(() => addChatMessage("Sistem belum dilatih. Harap jalankan proses pelatihan terlebih dahulu.", 'bot'), 600);
                return;
            }

            setTimeout(() => {
                const res = predict(text);
                const categoryList = botResponses[res.cat];
                const msg = categoryList[Math.floor(Math.random() * categoryList.length)];
                
                addChatMessage(msg, 'bot');
                if (res.cat !== 'unknown') {
                    document.getElementById('insight-text').textContent = `Kalimat cocok dengan kategori ${res.cat.toUpperCase()} (Kata Kunci Ditemukan: ${res.matches.join(', ')})`;
                } else {
                    document.getElementById('insight-text').textContent = "Sistem gagal mengidentifikasi kategori. Tidak ada kata kunci yang cocok.";
                }

                // Perbarui antarmuka Tingkat Keyakinan (Confidence) per Label
                ['ipa', 'mtk', 'indo'].forEach(cat => {
                    const conf = res.confidences[cat];
                    document.getElementById(`conf-val-${cat}`).textContent = `${conf}%`;
                    document.getElementById(`conf-bar-${cat}`).style.width = `${conf}%`;
                });
            }, 800);
        }

        function addChatMessage(text, sender) {
            const win = document.getElementById('chat-window');
            const div = document.createElement('div');
            div.className = `message ${sender === 'user' ? 'user-msg' : (sender === 'warning' ? 'warning-msg' : 'bot-msg')}`;
            div.textContent = text;
            win.appendChild(div);
            win.scrollTo({ top: win.scrollHeight, behavior: 'smooth' });
        }

        function predict(input) {
            const low = input.toLowerCase();
            let scores = { ipa: 0, mtk: 0, indo: 0 };
            let matches = { ipa: [], mtk: [], indo: [] };
            let totalMatchCount = 0;

            for (let cat in activeTags) {
                activeTags[cat].forEach(word => {
                    if (word && low.includes(word)) {
                        scores[cat]++;
                        matches[cat].push(word);
                        totalMatchCount++;
                    }
                });
            }

            let winner = Object.keys(scores).reduce((a, b) => scores[a] >= scores[b] ? a : b);
            
            // Hitung persentase keyakinan per kategori
            let confidences = { ipa: 0, mtk: 0, indo: 0 };
            if (totalMatchCount > 0) {
                for (let cat in scores) {
                    confidences[cat] = Math.round((scores[cat] / totalMatchCount) * 100);
                }
            }

            return (scores[winner] === 0) ? 
                { cat: 'unknown', matches: [], confidences: confidences } : 
                { cat: winner, matches: matches[winner], confidences: confidences };
        }