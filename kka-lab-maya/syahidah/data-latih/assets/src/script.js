
/* --- DATASET NLP --- */
    const dataLatih1 = [
        { id: "d1", name: "Puisi" }, { id: "d2", name: "Cerita" }, { id: "d3", name: "Paragraf" }, { id: "d4", name: "Sinonim" }, { id: "d5", name: "Kalimat" },
        { id: "d6", name: "Candi" }, { id: "d7", name: "Cuaca" }, { id: "d8", name: "Ekonomi" }, { id: "d9", name: "Peta" }, { id: "d10", name: "Sejarah" },
        { id: "d11", name: "Rumus" }, { id: "d12", name: "Angka" }, { id: "d13", name: "Luas" }, { id: "d14", name: "Pecahan" }, { id: "d15", name: "Variabel" }
    ];

    const dataLatih2 = [
        { id: "a1", name: "Matriks" }, { id: "a2", name: "Segitiga" }, { id: "a3", name: "Probabilitas" }
    ];

    const dataLatih3 = [
        { id: "b1", name: "Majas" }, { id: "b2", name: "Pantun" }, { id: "b3", name: "Personifikasi" }
    ];

    let aiModel = {}; 
    let soundEnabled = true;
    let itemsTested = 0;
    
    let currentPhase = 1; 
    let activeDataset = dataLatih1;
    let totalItemsNeeded = activeDataset.length;
    let placedItems = 0;
    let selectedItemElement = null;
    let hasSeenIntro = false;

    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    window.onload = () => {
        loadItemsToPool(shuffleArray([...activeDataset]));
        updateCounter();
    };

    function showPage(id) {
        document.querySelectorAll('.page').forEach(p=>{
            p.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');
        window.scrollTo({ top:0, behavior:"smooth" });

        if(id === 'labPage' && !hasSeenIntro) {
            hasSeenIntro = true;
            document.getElementById('introModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeIntroModal() {
        document.getElementById('introModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    function loadItemsToPool(dataArray) {
        const sourcePool = document.getElementById('source-pool');
        sourcePool.innerHTML = ''; 

        dataArray.forEach(item => {
            const el = document.createElement('div');
            el.className = 'item';
            el.id = item.id;
            el.dataset.name = item.name;
            el.draggable = true;

            el.innerHTML = `<span>${item.name}</span>`;
            
            el.onclick = (e) => selectItem(e, el);

            el.ondragstart = (e) => {
                selectedItemElement = el;
                el.classList.add('selected');
                e.dataTransfer.setData('text/plain', el.id);
                document.querySelectorAll('.node-box').forEach(box => box.classList.add('highlight'));
            };
            el.ondragend = () => {
                removeNodeHighlights();
                if(selectedItemElement) selectedItemElement.classList.remove('selected');
                selectedItemElement = null;
            };

            sourcePool.appendChild(el);
        });
    }

    function selectItem(event, element) {
        event.stopPropagation(); 
        if (selectedItemElement === element) {
            element.classList.remove('selected');
            selectedItemElement = null;
            removeNodeHighlights();
            return;
        }
        if (selectedItemElement) selectedItemElement.classList.remove('selected');

        selectedItemElement = element;
        element.classList.add('selected');

        document.querySelectorAll('.node-box').forEach(box => {
            box.classList.add('highlight');
        });
    }

    function removeNodeHighlights() {
        document.querySelectorAll('.node-box').forEach(box => {
            box.classList.remove('highlight');
            box.classList.remove('drag-over');
        });
    }

    function allowDrop(event) {
        event.preventDefault(); 
        if(event.currentTarget.classList.contains('node-box')) {
            event.currentTarget.classList.add('drag-over');
        }
    }

    function drop(event, category) {
        event.preventDefault();
        event.currentTarget.classList.remove('drag-over');
        if (!selectedItemElement) {
            const dataId = event.dataTransfer.getData("text/plain");
            selectedItemElement = document.getElementById(dataId);
        }
        dropToNode(category);
    }

    function dropBackPool(event) {
        event.preventDefault();
        if (!selectedItemElement) {
            const dataId = event.dataTransfer.getData("text/plain");
            selectedItemElement = document.getElementById(dataId);
        }
        dropToPool();
    }

    function dropToNode(category) {
        if (!selectedItemElement) return;
        const targetNode = document.getElementById('node-' + category);
        if (!targetNode) return;
        targetNode.appendChild(selectedItemElement);

        if(!selectedItemElement.querySelector('.remove-btn')){
            const removeBtn = document.createElement('div');
            removeBtn.className = "remove-btn";
            removeBtn.innerHTML = "✕";

            removeBtn.onclick = (e)=>{
                e.stopPropagation();
                returnItemToPool(removeBtn.parentElement);
            };

            selectedItemElement.appendChild(removeBtn);
        }

        selectedItemElement.dataset.trainedCategory = category;
        selectedItemElement.classList.remove('selected');
        selectedItemElement = null;
        removeNodeHighlights();
        updateCounter();
    }

    function returnItemToPool(item){
        const pool = document.getElementById('source-pool');
        const btn = item.querySelector('.remove-btn');
        if(btn) btn.remove();

        pool.appendChild(item);
        item.dataset.trainedCategory = "";

        item.classList.add("item-return");
        setTimeout(()=>item.classList.remove("item-return"),200);
        updateCounter();
    }

    function dropToPool() {
        if (!selectedItemElement) return;

        const pool = document.getElementById('source-pool');
        pool.appendChild(selectedItemElement);
        selectedItemElement.dataset.trainedCategory = "";
        selectedItemElement.classList.remove('selected');

        selectedItemElement.classList.add("item-return");
        setTimeout(()=>selectedItemElement.classList.remove("item-return"),200);
        selectedItemElement = null;

        removeNodeHighlights();
        updateCounter();
    }

    function updateCounter() {
        const remainingInPool = document.getElementById('source-pool').children.length;
        placedItems = totalItemsNeeded - remainingInPool;
        document.getElementById('data-counter').innerText = `Data Terkumpul: ${placedItems} / ${totalItemsNeeded}`;

        const btnCompile = document.getElementById('btn-compile');
        const statusDot = document.getElementById('status-dot');
        const statusText = document.getElementById('status-text');

        if(placedItems === totalItemsNeeded) {
            btnCompile.classList.remove('disabled-style');
            btnCompile.disabled = false;
            statusDot.className = 'dot active';
            statusText.innerText = 'STATUS: DATA SIAP DIPROSES';
            statusText.style.color = 'var(--success)';
            speakText("Seluruh data latih terkumpul. Siap diproses.");
        } else {
            btnCompile.classList.add('disabled-style');
            btnCompile.disabled = true;
            statusDot.className = 'dot';
            statusText.innerText = 'STATUS: MENUNGGU DATA TEKS';
            statusText.style.color = 'var(--text-muted)';
        }
    }

    function toggleSound() {
        soundEnabled = !soundEnabled;
        const icon = document.querySelector('#btn-sound i');
        icon.className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        if(soundEnabled) speakText("Sistem audio diaktifkan");
        else window.speechSynthesis.cancel();
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

    function typeWriter(text, elementId, speed = 20) {
        const el = document.getElementById(elementId);
        el.innerHTML = '';
        let i = 0;
        return new Promise(resolve => {
            function type() {
                if (i < text.length) {
                    el.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    function startTraining() {
        if (placedItems < totalItemsNeeded) {
            const btn = document.getElementById('btn-compile');
            btn.classList.add('shake');
            setTimeout(() => btn.classList.remove('shake'), 400);
            alert(`⚠️ TUNGGU DULU: Masih ada data yang belum dimasukkan!`);
            return;
        }

        ['BahasaIndonesia','IPS','Matematika'].forEach(cat => {
            const container = document.getElementById('node-' + cat);
            if (container) {
                const items = container.children;
                Array.from(items).forEach(el => {
                    aiModel[el.dataset.name] = cat === 'BahasaIndonesia' ? 'B. Indonesia' : cat;
                });
            }
        });

        document.getElementById('screen-train').classList.add('hidden');
        document.getElementById('screen-processing').classList.remove('hidden');

        document.getElementById('status-dot').className = 'dot active';
        document.getElementById('status-text').innerText = 'STATUS: MELATIH DATA...';
        document.getElementById('status-text').style.color = 'var(--primary)';
        speakText("Memulai penyimpanan data latih ke memori.");

        const logTexts = [
            "Membaca dataset teks...",
            "Mengekstraksi bobot tiap kosakata...",
            "Menyimpan referensi pelajaran...",
            "Data Latih Berhasil Disimpan!"
        ];

        let logIndex = 0;
        const logEl = document.getElementById('training-log');
        const logInterval = setInterval(() => {
            logIndex++;
            if(logIndex < logTexts.length) {
                logEl.innerText = logTexts[logIndex];
            } else {
                clearInterval(logInterval);
            }
        }, 800);

        const canvas = document.getElementById('neuralCanvas');
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const nodes = Array.from({length: 40}, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2.5,
            vy: (Math.random() - 0.5) * 2.5,
        }));

        let frameId;
        function animateNeural() {
            ctx.fillStyle = '#f8fafc';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            nodes.forEach(n => {
                n.x += n.vx; n.y += n.vy;
                if(n.x < 0 || n.x > canvas.width) n.vx *= -1;
                if(n.y < 0 || n.y > canvas.height) n.vy *= -1;

                ctx.beginPath();
                ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#2563eb';
                ctx.fill();
            });

            for(let i=0; i<nodes.length; i++) {
                for(let j=i+1; j<nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx*dx + dy*dy);

                    if(dist < 80) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(37, 99, 235, ${1 - dist/80})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            frameId = requestAnimationFrame(animateNeural);
        }
        animateNeural();

        setTimeout(() => {
            cancelAnimationFrame(frameId);
            if(currentPhase === 1) {
                currentPhase = 2; // Ke Test 1
                setupTestingPhase();
            } else if (currentPhase === 3) {
                currentPhase = 4; // Ke Test 2
                setupTestingPhase();
            } else if (currentPhase === 5) {
                currentPhase = 6; // Ke Test 3
                setupTestingPhase();
            }
        }, 3500);
    }

    function setupTestingPhase() {
        document.getElementById('screen-processing').classList.add('hidden');
        document.getElementById('screen-test').classList.remove('hidden');

        document.getElementById('status-dot').className = 'dot warning';
        document.getElementById('status-text').innerText = 'STATUS: MENGUJI DATA LATIH';
        document.getElementById('status-text').style.color = 'var(--warning)';

        const pool = document.getElementById('test-pool');
        pool.innerHTML = '';
        itemsTested = 0;
        document.getElementById('analytics-panel').style.display = 'none';
        document.getElementById('ai-text').innerText = "Menunggu klik pada kalimat untuk dianalisis berdasarkan data latih...";

        let activeSentences = [];

        if(currentPhase === 2) {
            document.getElementById('test-title').innerText = "Fase Uji Coba 1";
            document.getElementById('test-notice').innerHTML = `<i class="fas fa-info-circle" style="font-size: 1.5em;"></i><span><b>Klik dan uji ketiga kalimat ini berurutan!</b> Sistem akan memprediksi berdasarkan data latih pertama. Perhatikan kalimat campuran dan kalimat anomali.</span>`;
            document.getElementById('test-notice').style.background = 'var(--warning-light)';
            document.getElementById('test-notice').style.borderColor = '#fed7aa';
            document.getElementById('test-notice').style.color = '#9a3412';
            speakText("Uji coba tahap satu siap.");
            
            // 3 Kalimat uji (Fase 1)
            activeSentences = [
                { text: "Sebuah rumus digunakan untuk menghitung luas dan pecahan angka secara tepat.", anomaly: false },
                { text: "Menghitung dampak cuaca terhadap kondisi ekonomi di sekitar candi bersejarah.", anomaly: false },
                { text: "Mencari probabilitas kemunculan matriks pada sudut sebuah bangun segitiga.", anomaly: true } // Akan gagal
            ];
            
        } else if (currentPhase === 4) {
            document.getElementById('test-title').innerText = "Fase Uji Coba 2";
            document.getElementById('test-notice').innerHTML = `<i class="fas fa-info-circle" style="font-size: 1.5em;"></i><span>Kamu telah menambahkan kata Matriks, Segitiga, dan Probabilitas. Uji kalimat pertama lagi, pasti berhasil! Lalu uji dua kalimat selanjutnya yang mengandung anomali baru.</span>`;
            speakText("Uji coba tahap dua siap.");

            // 3 Kalimat uji (Fase 2)
            activeSentences = [
                { text: "Mencari probabilitas kemunculan matriks pada sudut sebuah bangun segitiga.", anomaly: false }, // Sekarang berhasil
                { text: "Membuat paragraf cerita tentang sejarah penemuan rumus probabilitas.", anomaly: false }, // Campuran B.Indo, IPS, MTK
                { text: "Menganalisis majas personifikasi di dalam sebuah teks pantun dan puisi.", anomaly: true } // Akan gagal
            ];
            
        } else if (currentPhase === 6) {
            document.getElementById('test-title').innerText = "Fase Pengujian Final";
            document.getElementById('test-notice').innerHTML = `<i class="fas fa-check-circle" style="font-size: 1.5em;"></i><span>Data latih sudah jauh lebih lengkap. Sekarang sistem pasti bisa mengklasifikasi berbagai pola kalimat dengan akurat! Klik semua kalimatnya.</span>`;
            document.getElementById('test-notice').style.background = 'var(--success-light)';
            document.getElementById('test-notice').style.borderColor = '#bbf7d0';
            document.getElementById('test-notice').style.color = '#166534';
            speakText("Pengujian final siap.");

            // 3 Kalimat uji (Fase 3)
            activeSentences = [
                { text: "Menganalisis majas personifikasi di dalam sebuah teks pantun dan puisi.", anomaly: false }, // Sekarang berhasil
                { text: "Dalam cerita tersebut, terdapat variabel angka dan matriks yang memengaruhi ekonomi.", anomaly: false }, // Campuran B.Indo, MTK, IPS
                { text: "Membaca kalimat sinonim untuk memahami sejarah cuaca di suatu wilayah.", anomaly: false } // Campuran B.Indo, IPS
            ];
        }

        document.getElementById('test-progress').innerText = `Kalimat teruji: 0 / ${activeSentences.length}`;

        activeSentences.forEach(item => {
            const el = document.createElement('div');
            el.className = 'w-full text-left p-4 md:p-5 bg-white border-2 border-slate-200 rounded-xl mb-3 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all relative overflow-hidden scanner-box text-slate-800 font-medium text-lg leading-relaxed';

            if(item.anomaly) {
                el.style.borderStyle = "dashed";
                el.style.borderColor = "var(--warning)";
            }

            el.innerHTML = `
            <div class="scanner-line"></div>
            <span class="relative z-10">"${item.text}"</span>
            `;

            el.onclick = () => runInference(item.text, el, activeSentences.length);
            pool.appendChild(el);
        });
    }

    function animateBar(barId, valId, targetPercentage) {
        document.getElementById(barId).style.width = targetPercentage + '%';
        let current = 0;
        const interval = setInterval(() => {
            if(current >= targetPercentage) {
                document.getElementById(valId).innerText = targetPercentage + '%';
                clearInterval(interval);
            } else {
                current += 2;
                if(current > targetPercentage) current = targetPercentage;
                document.getElementById(valId).innerText = current + '%';
            }
        }, 30);
    }

    async function runInference(sentenceText, element, totalToTest) {
        if(element.classList.contains('tested')) return;
        element.classList.add('tested');
        element.style.opacity = '0.6';
        element.style.cursor = 'default';

        const aiIcon = document.getElementById('ai-icon');
        aiIcon.classList.add('processing');
        element.querySelector('.scanner-line').style.display = 'block';

        const analytics = document.getElementById('analytics-panel');
        analytics.style.display = 'block';

        ['bindo', 'ips', 'mtk'].forEach(id => {
            document.getElementById(`bar-${id}`).style.width = '0%';
            document.getElementById(`val-${id}`).innerText = '0%';
        });
        document.getElementById('ai-conclusion').innerHTML = '';

        await typeWriter(`>> Mencari irisan kata dengan Data Latih...\n>> Mengakumulasi persentase kecocokan...`, 'ai-text', 15);
        speakText(`Menganalisis kalimat.`);

        setTimeout(() => {
            element.querySelector('.scanner-line').style.display = 'none';
            aiIcon.classList.remove('processing');
            calculateProbabilities(sentenceText, totalToTest);
        }, 1500);
    }

    async function calculateProbabilities(sentenceText, totalToTest) {
        let words = sentenceText.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
        let catMatches = {'B. Indonesia': 0, 'IPS': 0, 'Matematika': 0};
        let matchDetailsBindo = [];
        let matchDetailsIPS = [];
        let matchDetailsMTK = [];
        let allMatchedWords = [];

        words.forEach(w => {
            let trainedKey = Object.keys(aiModel).find(k => k.toLowerCase() === w);
            if(trainedKey) {
                let cat = aiModel[trainedKey];
                catMatches[cat]++;
                allMatchedWords.push(trainedKey);
                if(cat === 'B. Indonesia') matchDetailsBindo.push(trainedKey);
                if(cat === 'IPS') matchDetailsIPS.push(trainedKey);
                if(cat === 'Matematika') matchDetailsMTK.push(trainedKey);
            }
        });

        let totalMatch = catMatches['B. Indonesia'] + catMatches['IPS'] + catMatches['Matematika'];
        let probBindo = 0, probIPS = 0, probMTK = 0;
        let finalCategory = "";
        let isHallucinating = false;
        let isMixed = false;
        let conclusionHTML = "";
        let speakOutput = "";

        let noiseSplit = [6, 7, 7];
        noiseSplit = shuffleArray(noiseSplit); 

        if (totalMatch > 0) {
            let baseConf = 80;
            probBindo = Math.floor((catMatches['B. Indonesia'] / totalMatch) * baseConf) + noiseSplit[0];
            probIPS = Math.floor((catMatches['IPS'] / totalMatch) * baseConf) + noiseSplit[1];
            probMTK = Math.floor((catMatches['Matematika'] / totalMatch) * baseConf) + noiseSplit[2];

            let maxScore = Math.max(probBindo, probIPS, probMTK);
            if(maxScore === probBindo) finalCategory = "B. Indonesia";
            else if(maxScore === probIPS) finalCategory = "IPS";
            else finalCategory = "Matematika";

            let activeCats = 0;
            if(catMatches['B. Indonesia'] > 0) activeCats++;
            if(catMatches['IPS'] > 0) activeCats++;
            if(catMatches['Matematika'] > 0) activeCats++;
            if(activeCats > 1) isMixed = true;

            conclusionHTML = `
            <div class="mb-2">
                <span class="text-success font-bold text-lg">
                    ${isMixed ? "⚠️ Konteks Campuran Terdeteksi!" : "✅ Konteks Berhasil Dikenali!"}
                </span>
            </div>
            <div class="mb-3 leading-relaxed text-slate-700">
                Prediksi Model: Condong ke <b>Pelajaran ${finalCategory}</b>.<br>
                Kata yang dikenali dari data latih: <b class="text-indigo-600">${allMatchedWords.join(', ')}</b>
            </div>
            <div class="bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm text-slate-800 mb-4">
                <p class="font-bold mb-2 text-blue-900"><i class="fas fa-lightbulb"></i> Ilustrasi Tingkat Keyakinan (Confidence Level):</p>
                <p class="mb-2">Angka persentase <b>(B. Indo: ${probBindo}%, IPS: ${probIPS}%, MTK: ${probMTK}%)</b> adalah ilustrasi dari probabilitas keyakinan sistem.</p>
                <p>Nilai ini dihitung dari kecocokan jumlah kata dalam kalimat dengan data latih yang ada di memori sistem, kemudian ditambahkan sedikit margin acak untuk meniru sifat ketidakpastian persentase pada model algoritma asli.</p>
            </div>
            `;
            speakOutput = isMixed 
                ? `Konteks campuran terdeteksi. Condong ke pelajaran ${finalCategory}.`
                : `Konteks dikenali berdasarkan data latih. Prediksi tertinggi: ${finalCategory}.`;

        } else {
            isHallucinating = true;
            probBindo = Math.floor(Math.random() * 40) + 15; 
            probIPS = Math.floor(Math.random() * 40) + 15;
            probMTK = 100 - (probBindo + probIPS);

            let maxScore = Math.max(probBindo, probIPS, probMTK);
            if(maxScore === probBindo) finalCategory = "B. Indonesia";
            else if(maxScore === probIPS) finalCategory = "IPS";
            else finalCategory = "Matematika";

            conclusionHTML = `
            <div class="mb-2"><span class="text-danger font-bold text-lg">⚠️ KATA TIDAK DIKENALI (OUT OF VOCABULARY)!</span></div>
            <div class="mb-3 leading-relaxed text-slate-700">
                Tidak ada kata dalam kalimat ini yang cocok dengan <b>Data Latih</b> sistem.
            </div>
            <div class="bg-warning-light border border-warning p-4 rounded-xl text-sm text-slate-800 mb-4">
                <p class="font-bold mb-2 text-warning"><i class="fas fa-lightbulb"></i> Ilustrasi Kegagalan Model:</p>
                <p class="mb-2">Sistem terpaksa memberikan persentase acak (B. Indo: ${probBindo}%, IPS: ${probIPS}%, MTK: ${probMTK}%).</p>
                <p>Ini adalah ilustrasi untuk menunjukkan bahwa sistem klasifikasi akan memunculkan nilai yang sembarangan dan tebakan yang salah apabila kita belum pernah memasukkan informasi (Data Latih) tersebut sebelumnya.</p>
            </div>
            `;
            speakOutput = `Peringatan. Kosakata tidak ditemukan dalam data latih. Sistem tidak dapat menentukan kecocokan secara akurat.`;
        }

        animateBar('bar-bindo', 'val-bindo', probBindo);
        animateBar('bar-ips', 'val-ips', probIPS);
        animateBar('bar-mtk', 'val-mtk', probMTK);

        document.getElementById('ai-conclusion').innerHTML = conclusionHTML;
        await typeWriter(`>> Analisis Selesai.\n>> Prediksi terbesar: ${finalCategory}`, 'ai-text', 30);
        speakText(speakOutput);

        itemsTested++;
        document.getElementById('test-progress').innerText = `Kalimat teruji: ${itemsTested} / ${totalToTest}`;

        if(itemsTested >= totalToTest) {
            if(currentPhase === 6) {
                document.getElementById('btn-retrain').classList.add('hidden');
                document.getElementById('btn-reflect').classList.remove('hidden');
            } else {
                document.getElementById('btn-retrain').classList.remove('hidden');
            }
        }
    }

    function setupRetraining() {
        if(currentPhase === 2) {
            currentPhase = 3;
            document.getElementById('train-title').innerText = "Fase Latih Data Ke-2 (Fine-Tuning 1)";
            document.getElementById('train-desc').innerHTML = `<b>Tambah Data Latih:</b> Sistem gagal mengklasifikasi kalimat yang berisi kata <b>Matriks, Segitiga, dan Probabilitas</b> karena datanya belum diajarkan! Ayo kelompokkan kata-kata baru ini ke kotak <b>Matematika</b>! (Kata-kata lama masih tersimpan di memori).`;
            activeDataset = dataLatih2;
        } else if (currentPhase === 4) {
            currentPhase = 5;
            document.getElementById('train-title').innerText = "Fase Latih Data Ke-3 (Fine-Tuning 2)";
            document.getElementById('train-desc').innerHTML = `<b>Tambah Data Latih:</b> Sistem kembali gagal mengenali konteks seperti <b>Majas, Pantun, Personifikasi</b>. Masukkan data latih tersebut ke <b>B. Indonesia</b> agar akurasi sistem meningkat!`;
            activeDataset = dataLatih3;
        }

        document.getElementById('screen-test').classList.add('hidden');
        document.getElementById('btn-retrain').classList.add('hidden');
        document.getElementById('screen-train').classList.remove('hidden');

        totalItemsNeeded = activeDataset.length;
        loadItemsToPool(shuffleArray([...activeDataset]));
        updateCounter();

        speakText("Mengakses mode penambahan data latih.");
    }

    function showReflection() {
        document.getElementById('screen-test').classList.add('hidden');
        document.getElementById('screen-reflection').classList.remove('hidden');

        document.getElementById('status-dot').className = 'dot active';
        document.getElementById('status-text').innerText = 'STATUS: EVALUASI SISTEM';
        document.getElementById('status-text').style.color = 'var(--primary)';
        speakText("Memasuki panel evaluasi simulasi.");
    }

    function answer(qNumber, isCorrect, btnEl) {
        const container = document.getElementById('q' + qNumber);
        const btns = container.querySelectorAll('button');

        btns.forEach(b => {
            b.disabled = true;
            b.style.cursor = 'default';
        });

        if(isCorrect) {
            btnEl.classList.add('correct');
        } else {
            btnEl.classList.add('wrong');
            btns.forEach(b => {
                if(b.getAttribute('onclick').includes('true')) b.classList.add('correct');
            });
        }

        const feedEl = document.getElementById('feed-' + qNumber);
        feedEl.style.display = 'block';

        if(qNumber === 1) {
            feedEl.innerHTML = isCorrect ? 
            "<span style='color:var(--success)'><i class='fas fa-check-circle'></i> Tepat Sekali!</span> Algoritma pada sistem hanya akan memproses kosa kata yang pernah dimasukkan ke memori sebelumnya. Kata baru yang tidak ada di <b>Data Latih</b> awal akan membuat model menghasilkan skor yang acak atau gagal diklasifikasi dengan baik." : 
            "<span style='color:var(--danger)'><i class='fas fa-times-circle'></i> Kurang Tepat.</span> Sistem klasifikasi ini tidak diprogram untuk menolak panjang kalimat ataupun mendiskriminasi mata pelajaran. Masalahnya murni ada pada ketiadaan kata referensi di dalam basis datanya.";
        } else {
            feedEl.innerHTML = isCorrect ? 
            "<span style='color:var(--success)'><i class='fas fa-check-circle'></i> Super!</span> Inilah prinsip fundamental pengembangan sistem klasifikasi. Kualitas, akurasi, dan kemampuan prediksi algoritma apapun sangat bergantung pada <b>Kuantitas dan Kualitas Data Latih</b> yang disiapkan oleh pengembang." : 
            "<span style='color:var(--danger)'><i class='fas fa-times-circle'></i> Kurang Tepat.</span> Sistem tidak terkoneksi ke internet selama simulasi, dan tidak punya kemampuan memahami makna kalimat secara mandiri. Peningkatan akurasi murni terjadi karena <i>Fine-Tuning</i> (penambahan kosa kata baru ke Data Latih) yang baru saja kamu lakukan.";
        }

        if(document.querySelectorAll('.options-grid button:disabled').length >= 6) {
            const btnFinish = document.getElementById('btn-finish');
            btnFinish.classList.remove('disabled-style');
            btnFinish.disabled = false;
        }
    }

    function finishLab() {
        const btnFinish = document.getElementById('btn-finish');
        if(btnFinish.classList.contains('disabled-style')) return;

        speakText("Praktikum Data Latih selesai. Terima kasih.");
        confetti({
            particleCount: 200,
            spread: 160,
            origin: { y: 0.6 },
            colors: ['#2563eb', '#16a34a', '#ea580c']
        });
        document.getElementById('btn-finish').innerHTML = "Mulai Ulang Lab <i class='fas fa-redo'></i>";
        document.getElementById('btn-finish').setAttribute('onclick', 'location.reload()');
    }

 
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