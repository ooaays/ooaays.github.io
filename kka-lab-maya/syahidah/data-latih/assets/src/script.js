
let soundEnabled = false;
let hasSeenIntro = false;
let hasSeenCP = false;
let hasSeenCara = false;

// Level system
let currentLevel = 1; // 1: Pelajaran, 2: Kehidupan sehari-hari

// Dynamic datasets
const datasets = {
    1: { // Level 1: Pelajaran
        ipa: [],
        mtk: [],
        indo: []
    },
    2: { // Level 2: Kehidupan sehari-hari
        makanan: [],
        hobi: [],
        transportasi: []
    }
};

// Active tags (current level)
let activeTags = { ...datasets[1] };

// Load badword library
let badwordList = [];
fetch('assets/src/indonesian-badword.json')
    .then(response => response.json())
    .then(data => {
        badwordList = data.categories.flatMap(cat => 
            cat.words.flatMap(word => [word.word.toLowerCase(), ...(word.variations || []).map(v => v.toLowerCase())])
        );
    })
    .catch(err => console.log('Failed to load badword list:', err));

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
function setCheckVisible(id, visible){
  const el = document.getElementById(id);
  if (el) el.classList.toggle('visible', visible);
}
    // ================= MODAL CONTROL =================

// TUJUAN PEMBELAJARAN
function openCPModal(){
    hasSeenCP = true;
    checkStartButtonState();
    document.getElementById("cpModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
    try { sessionStorage.setItem('tujuanRead', 'true'); } catch(e){}
    setCheckVisible('check-tujuan', true);
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

    try { sessionStorage.setItem('caraRead', 'true'); } catch(e){}
    setCheckVisible('check-cara', true);
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
    const closeBtn = document.getElementById("closeBtn");

    prevBtn.style.visibility = currentSlide === 0 ? "hidden" : "visible";
    nextBtn.style.visibility = currentSlide === totalSlides - 1 ? "hidden" : "visible";
    closeBtn.style.visibility = currentSlide === totalSlides - 1 ? "visible" : "hidden";

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
    normalizeText(value) {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^\w\s\u00C0-\u017F]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    },
    isToxicTag(tag) {
        const normalized = this.normalizeText(tag);
        return normalized
            .split(' ')
            .some(word => badwordList.includes(word));
    },
    containsToxicWord(text) {
        const normalized = this.normalizeText(text);
        return normalized
            .split(' ')
            .some(word => badwordList.includes(word));
    },
    // Levenshtein Distance for typo detection
    levenshtein(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    },
    similarity(a, b) {
        const maxLen = Math.max(a.length, b.length);
        if (maxLen === 0) return 1.0;
        const distance = this.levenshtein(a, b);
        return (maxLen - distance) / maxLen;
    },
    findClosestWord(word, dataset) {
        let bestMatch = null;
        let bestSimilarity = 0;
        for (let category in dataset) {
            dataset[category].forEach(correctWord => {
                const sim = this.similarity(word, correctWord);
                if (sim > bestSimilarity && sim >= 0.7) {
                    bestMatch = correctWord;
                    bestSimilarity = sim;
                }
            });
        }
        return bestMatch;
    }
};
        
        // State Dataset
        let activeTags = {
            ipa: [],
            mtk: [],
            indo: []
        };

        const botResponses = {
            // Level 1 responses
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
            // Level 2 responses
            makanan: [
                "Berdasarkan analisis, kalimat ini berkaitan dengan topik makanan.",
                "Sistem mendeteksi pola yang merujuk pada jenis-jenis makanan atau kuliner.",
                "Konteks kalimat ini terklasifikasi ke dalam kategori makanan.",
                "Hasil pemrosesan menunjukkan keterkaitan dengan dunia kuliner.",
                "Kalimat tersebut memiliki probabilitas tinggi pada kategori makanan."
            ],
            hobi: [
                "Berdasarkan analisis, kalimat ini berkaitan dengan topik hobi atau kegiatan rekreasi.",
                "Sistem mendeteksi pola yang merujuk pada aktivitas atau kesenangan pribadi.",
                "Konteks kalimat ini terklasifikasi ke dalam kategori hobi.",
                "Hasil pemrosesan menunjukkan keterkaitan dengan kegiatan rekreasi.",
                "Kalimat tersebut memiliki probabilitas tinggi pada kategori hobi."
            ],
            transportasi: [
                "Berdasarkan analisis, kalimat ini berkaitan dengan topik transportasi.",
                "Sistem mendeteksi pola yang merujuk pada alat transportasi atau mobilitas.",
                "Konteks kalimat ini terklasifikasi ke dalam kategori transportasi.",
                "Hasil pemrosesan menunjukkan keterkaitan dengan sarana transportasi.",
                "Kalimat tersebut memiliki probabilitas tinggi pada kategori transportasi."
            ],
            unknown: [
                "Mohon maaf, sistem belum dapat mengidentifikasi pola kalimat tersebut.",
                "Data latih tidak mencukupi untuk melakukan klasifikasi pada kalimat ini.",
                "Sistem gagal menemukan kecocokan dengan basis data yang ada.",
                "Kata kunci pada kalimat tidak terdaftar dalam memori sistem.",
                "Silakan berikan tambahan data latih agar sistem dapat mengenali konteks ini."
            ],
            multiple: [
                "Kalimat ini memiliki kemungkinan beberapa kategori dengan tingkat keyakinan yang sama.",
                "Sistem mendeteksi beberapa pola yang cocok dengan kategori berbeda.",
                "Hasil analisis menunjukkan kemungkinan multi-kategori.",
                "Kalimat tersebut dapat diklasifikasikan ke dalam beberapa kategori sekaligus."
            ]
        };

        let isTrained = false;

        window.onload = () => {
            checkStartButtonState();
            addChatMessage("Selamat datang. Saya adalah Asisten AI. Silakan masukkan data latih pada panel kiri, kemudian jalankan proses pelatihan.", 'bot');
            
            // Initialize level system
            updateLevelUI();
            updateCategorySections();
            
            // Set default level to 1
            currentLevel = 1;
            activeTags = { ...datasets[1] };
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
            if (!container) return; // Skip if container doesn't exist for current level
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
            
            const demoData = {
                1: { // Level 1: Pelajaran
                    ipa: "energi, gaya, massa, zat, atom, molekul, sel, jaringan, organ, ekosistem, fotosintesis, gravitasi, listrik, magnet, suhu, kalor, reaksi, senyawa, unsur, gelombang",
                    mtk: "penjumlahan, pengurangan, perkalian, pembagian, pecahan, desimal, persentase, aljabar, persamaan, fungsi, geometri, sudut, luas, volume, bilangan, akar, pangkat, statistika, peluang, grafik",
                    indo: "kata, kalimat, paragraf, wacana, sinonim, antonim, imbuhan, awalan, akhiran, ejaan, tanda baca, narasi, deskripsi, eksposisi, persuasi, dialog, teks, makna, diksi, struktur"
                },
                2: { // Level 2: Kehidupan sehari-hari
                    makanan: "nasi goreng, bakso, sate, rendang, gado gado, ayam goreng, mie goreng, capcay, pizza, burger, spaghetti, sushi, dimsum, roti, kue, es krim, jus, teh, kopi, air mineral",
                    hobi: "futsal, sepakbola, basket, voli, badminton, tenis, renang, lari, bersepeda, menggambar, melukis, menyanyi, menari, memasak, membaca, menulis, fotografi, traveling, hiking, camping",
                    transportasi: "mobil, motor, sepeda, bus, kereta, pesawat, kapal, helikopter, truk, taksi, ojek, becak, delman, kuda, unta, gajah, onta, kuda nil, perahu, kapal laut"
                }
            };

            const currentDemo = demoData[currentLevel];
            for (let cat in currentDemo) {
                activeTags[cat] = currentDemo[cat].split(',').map(s => s.trim().toLowerCase());
                renderTags(cat);
            }
            
            document.getElementById('insight-text').textContent = "Data uji coba berhasil dimuat. Harap tekan tombol 'Mulai Pelatihan Model'.";
        }

        function resetAll() {
            activeTags = { ...datasets[currentLevel] };
            // Reset all tag containers
            Object.keys(datasets[currentLevel]).forEach(cat => {
                const container = document.getElementById(`${cat}-tags`);
                if (container) container.innerHTML = "";
            });
            document.getElementById('chat-window').innerHTML = "";
            addChatMessage("Seluruh data latih telah dihapus. Sistem siap menerima instruksi baru.", 'bot');
            isTrained = false;
            document.getElementById('insight-text').textContent = "Sistem telah diatur ulang ke kondisi awal.";
            
            // Reset confidence bars
            resetConfidenceBars();
        }

        function resetConfidenceBars() {
            Object.keys(datasets[currentLevel]).forEach(cat => {
                const valEl = document.getElementById(`conf-val-${cat}`);
                const barEl = document.getElementById(`conf-bar-${cat}`);
                if (valEl) valEl.textContent = "0%";
                if (barEl) barEl.style.width = "0%";
            });
        }

        function trainModel() {
            const log = document.getElementById('train-log');
            log.classList.remove('hidden');
            
            setTimeout(() => {
                log.classList.add('hidden');
                isTrained = true;
                const total = Object.values(activeTags).reduce((sum, arr) => sum + arr.length, 0);
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

            // Check for bad words first
            if (trainingLib.containsToxicWord(text)) {
                addChatMessage(text, 'user');
                input.value = "";
                setTimeout(() => addChatMessage("Input mengandung kata yang tidak pantas.", 'warning'), 400);
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
                
                // Handle typo suggestions
                if (res.typoSuggestions.length > 0) {
                    const suggestions = res.typoSuggestions.map(s => `"${s.suggestion}" untuk "${s.original}"`).join(', ');
                    addChatMessage(`Apakah maksud Anda: ${suggestions}?`, 'bot');
                }

                // Handle classification result
                let responseMsg;
                if (res.categories.length === 0) {
                    responseMsg = botResponses.unknown[Math.floor(Math.random() * botResponses.unknown.length)];
                } else if (res.categories.length === 1) {
                    responseMsg = `Kalimat ini termasuk kategori: ${getCategoryDisplayName(res.categories[0])}`;
                } else {
                    responseMsg = `Kalimat ini memiliki kemungkinan beberapa kategori: ${res.categories.map(cat => getCategoryDisplayName(cat)).join(', ')}`;
                }
                
                addChatMessage(responseMsg, 'bot');

                // Update insight text
                if (res.categories.length > 0) {
                    const matchesText = res.exactMatches.length > 0 ? ` (Kata Kunci: ${res.exactMatches.join(', ')})` : '';
                    document.getElementById('insight-text').textContent = `Kalimat cocok dengan kategori ${res.categories.map(cat => cat.toUpperCase()).join(', ')}${matchesText}`;
                } else {
                    document.getElementById('insight-text').textContent = "Sistem gagal mengidentifikasi kategori. Tidak ada kata kunci yang cocok.";
                }

                // Update confidence bars with animation
                updateConfidenceBars(res.confidences);
            }, 800);
        }

        function getCategoryDisplayName(category) {
            const names = {
                ipa: 'Ilmu Pengetahuan Alam',
                mtk: 'Matematika', 
                indo: 'Bahasa Indonesia',
                makanan: 'Makanan',
                hobi: 'Hobi',
                transportasi: 'Transportasi'
            };
            return names[category] || category;
        }

        function updateConfidenceBars(confidences) {
            // Reset all bars first
            resetConfidenceBars();
            
            // Update bars with animation
            setTimeout(() => {
                Object.keys(confidences).forEach(cat => {
                    const valEl = document.getElementById(`conf-val-${cat}`);
                    const barEl = document.getElementById(`conf-bar-${cat}`);
                    if (valEl && barEl) {
                        valEl.textContent = `${confidences[cat]}%`;
                        barEl.style.width = `${confidences[cat]}%`;
                    }
                });
            }, 100);
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
            // 1. Normalisasi input
            const normalizedInput = trainingLib.normalizeText(input);
            const words = normalizedInput.split(' ').filter(w => w.length > 0);
            
            let scores = {};
            let exactMatches = [];
            let typoSuggestions = [];
            
            // Initialize scores for all categories
            Object.keys(activeTags).forEach(cat => {
                scores[cat] = 0;
            });

            // 2. Process each word
            words.forEach(word => {
                let foundExact = false;
                
                // Check exact matches first
                for (let cat in activeTags) {
                    if (activeTags[cat].includes(word)) {
                        scores[cat] += 1; // Exact match = 1 point
                        exactMatches.push(word);
                        foundExact = true;
                    }
                }
                
                // If no exact match, try fuzzy matching
                if (!foundExact) {
                    const suggestion = trainingLib.findClosestWord(word, activeTags);
                    if (suggestion) {
                        // Find which category contains the suggestion
                        for (let cat in activeTags) {
                            if (activeTags[cat].includes(suggestion)) {
                                scores[cat] += 0.8; // Typo match = 0.8 points
                                typoSuggestions.push({ original: word, suggestion: suggestion });
                                break;
                            }
                        }
                    }
                }
            });

            // 3. Calculate confidences
            const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
            let confidences = {};
            
            if (totalScore > 0) {
                Object.keys(scores).forEach(cat => {
                    confidences[cat] = Math.round((scores[cat] / totalScore) * 100);
                });
            } else {
                Object.keys(scores).forEach(cat => {
                    confidences[cat] = 0;
                });
            }

            // 4. Determine categories (balanced classification)
            const maxConfidence = Math.max(...Object.values(confidences));
            const categories = Object.keys(confidences).filter(cat => confidences[cat] === maxConfidence && confidences[cat] > 0);

            return {
                categories: categories,
                confidences: confidences,
                exactMatches: exactMatches,
                typoSuggestions: typoSuggestions
            };
        }

        // LEVEL TOGGLE FUNCTIONS
        function toggleLevel(level) {
            if (currentLevel === level) return;
            
            currentLevel = level;
            activeTags = { ...datasets[level] };
            
            // Update UI
            updateLevelUI();
            
            // Reset training state
            isTrained = false;
            resetAll();
            
            // Update category sections
            updateCategorySections();
        }

        function updateLevelUI() {
            // Update toggle buttons
            document.querySelectorAll('.level-toggle').forEach(btn => {
                btn.classList.remove('active');
            });
            document.getElementById(`level-${currentLevel}`).classList.add('active');
            
            // Update page title
            const titles = {
                1: 'Lab Virtual Data Latih KA - Level 1: Pelajaran',
                2: 'Lab Virtual Data Latih KA - Level 2: Kehidupan Sehari-hari'
            };
            document.title = titles[currentLevel];
            
            // Update main heading
            const heading = document.querySelector('h1');
            if (heading) {
                heading.innerHTML = currentLevel === 1 ? 
                    'Data Latih <span class="text-blue-600">KA</span>' : 
                    'Data Latih <span class="text-green-600">KA</span>';
            }
        }

        function updateCategorySections() {
            const categories = Object.keys(datasets[currentLevel]);
            const container = document.querySelector('.grid.grid-cols-1.gap-4');
            
            if (!container) return;
            
            container.innerHTML = '';
            
            categories.forEach(cat => {
                const categoryNames = {
                    ipa: 'Ilmu Pengetahuan Alam (Sains)',
                    mtk: 'Matematika',
                    indo: 'Bahasa Indonesia',
                    makanan: 'Makanan',
                    hobi: 'Hobi',
                    transportasi: 'Transportasi'
                };
                
                const categoryIcons = {
                    ipa: 'fa-flask',
                    mtk: 'fa-calculator',
                    indo: 'fa-book',
                    makanan: 'fa-utensils',
                    hobi: 'fa-gamepad',
                    transportasi: 'fa-car'
                };
                
                const categoryColors = {
                    ipa: 'text-green-700',
                    mtk: 'text-blue-700',
                    indo: 'text-orange-700',
                    makanan: 'text-red-700',
                    hobi: 'text-purple-700',
                    transportasi: 'text-teal-700'
                };
                
                const section = document.createElement('div');
                section.className = 'p-4 rounded-2xl bg-white border border-gray-100 shadow-sm';
                section.innerHTML = `
                    <label class="flex items-center gap-2 text-xs font-bold ${categoryColors[cat]} mb-2 uppercase tracking-wider">
                        <i class="fa-solid ${categoryIcons[cat]}"></i> ${categoryNames[cat]}
                    </label>
                    <div class="tag-container" id="${cat}-tags-container" onclick="focusInput('${cat}-input')">
                        <div id="${cat}-tags" class="flex flex-wrap gap-1.5"></div>
                        <input type="text" id="${cat}-input" class="input-tag" placeholder="Ketik dan tekan koma..." onkeyup="handleTagInput(event, '${cat}')">
                    </div>
                `;
                container.appendChild(section);
            });
            
            // Update confidence bars section
            updateConfidenceBarsSection();
        }

        function updateConfidenceBarsSection() {
            const container = document.querySelector('.mt-4.pt-3.border-t.border-gray-200.space-y-3');
            if (!container) return;
            
            const categories = Object.keys(datasets[currentLevel]);
            const categoryNames = {
                ipa: 'Ilmu Pengetahuan Alam',
                mtk: 'Matematika',
                indo: 'Bahasa Indonesia',
                makanan: 'Makanan',
                hobi: 'Hobi',
                transportasi: 'Transportasi'
            };
            
            container.innerHTML = `
                <h4 class="text-xs font-bold text-gray-700 mb-2"><i class="fa-solid fa-chart-pie mr-1"></i> Tingkat Keyakinan Per Kategori</h4>
                ${categories.map(cat => `
                    <div>
                        <div class="flex justify-between text-[10px] font-bold text-gray-600 mb-1">
                            <span>${categoryNames[cat]}</span>
                            <span id="conf-val-${cat}">0%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                            <div id="conf-bar-${cat}" class="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all duration-500" style="width: 0%"></div>
                        </div>
                    </div>
                `).join('')}
            `;
        }

try {
  if (sessionStorage.getItem('tujuanRead') === 'true') { hasSeenCP = true; setCheckVisible('check-tujuan', true); }
  if (sessionStorage.getItem('caraRead') === 'true') { hasSeenCara = true; setCheckVisible('check-cara', true); }
  checkStartButtonState();
} catch(e) {}
