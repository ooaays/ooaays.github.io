
let selectedValue = null;
        let selectedType = null; // 'keyword', 'string', 'status'
        let activeTimers = [];
        let simSuccess = false; // Menyimpan status apakah simulasi berhasil berjalan

        function selectBlock(val, type, el) {
        	selectedValue = val;
        	selectedType = type;
        	document.querySelectorAll('.block').forEach(b => b.classList.remove('selected'));
        	el.classList.add('selected');
        }

        function placeBlock(slot) {
        	if (!selectedValue) {
			logToTerminal("<i class=\"fa-solid fa-triangle-exclamation\"></i> Ups! Kamu harus mengeklik (memilih) salah satu alat di atas terlebih dahulu!", "error");
        	}

            // Tampilan teks berdasarkan tipe (tambahkan kutip jika string)
        	let displayVal = selectedValue;
        	if (selectedType === 'string') {
        		displayVal = `"${selectedValue}"`;
        	}

        	slot.innerText = displayVal;

            // Hapus kelas warna sebelumnya
        	slot.className = "slot";

            // Tambahkan kelas warna baru sesuai tipe
        	if (selectedType === 'status') {
        		slot.classList.add(selectedValue === 'ON' ? 'placed-on' : 'placed-off');
        	} else if (selectedType === 'keyword') {
        		slot.classList.add('placed-keyword');
        	} else if (selectedType === 'string') {
        		slot.classList.add('placed-string');
        	}

        	slot.setAttribute('data-val', selectedValue);
            checkProgress(); // Cek indikator tugas setiap kali meletakkan blok
        }

        function logToTerminal(msg, type = "") {
        	const term = document.getElementById('terminal');
        	const colorClass = type === "error" ? "log-error" : (type === "success" ? "log-success" : (type === "info" ? "log-info" : ""));
        	const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

        	const newLog = document.createElement("div");
        	newLog.style.marginTop = "6px";
        	newLog.innerHTML = `<span class="log-time">[${timestamp}]</span> <span class="${colorClass}">${msg}</span>`;

        	term.appendChild(newLog);
        	term.scrollTop = term.scrollHeight;
        }

        function resetSimulation() {
        	activeTimers.forEach(clearInterval);
        	activeTimers = [];

        	document.querySelectorAll('.slot').forEach(slot => {
        		slot.innerText = "???";
        		slot.className = "slot"; 
        		slot.removeAttribute('data-val');
        	});

        	document.getElementById('input-tamu').value = 3;
        	document.getElementById('input-tidur').value = 5;
        	document.getElementById('input-dapur').value = 2;
        	document.getElementById('input-mandi').value = 4;

        	document.querySelectorAll('.room').forEach(r => r.classList.remove('active'));
        	document.querySelectorAll('.countdown').forEach(c => c.innerText = "");

        	selectedValue = null;
        	selectedType = null;
        	document.querySelectorAll('.block').forEach(b => b.classList.remove('selected'));

        	const term = document.getElementById('terminal');
        	term.innerHTML = `<span class="log-info"><i class="fa-solid fa-hand-wave"></i> Simulasi berhasil di-reset. Mari kita susun kode dari awal lagi!</span>`;

            simSuccess = false; // Kembalikan status ke gagal
            checkProgress(); // Perbarui indikator UI
        }

        function runSimulation() {
        	activeTimers.forEach(clearInterval);
        	activeTimers = [];
            simSuccess = false; // Reset terlebih dahulu
            checkProgress();
            
            const term = document.getElementById('terminal');
            term.innerHTML = ""; 
            logToTerminal("<i class=\"fa-solid fa-rocket\"></i> Menjalankan kodemu...", "info");

            // Validasi: Apakah ada slot "???" yang belum diisi?
            const allSlots = Array.from(document.querySelectorAll('.slot'));
            const emptySlots = allSlots.filter(s => !s.getAttribute('data-val'));
            
            if (emptySlots.length > 0) {
			logToTerminal(`<i class=\"fa-solid fa-xmark\"></i> Gagal: Masih ada ${emptySlots.length} kotak '???' yang belum kamu isi! Lengkapi dulu ya.`, "error");
			return;
            }

            // Ambil data puzzle logika di LANGKAH 2
            const valFor = document.getElementById('slot-for').getAttribute('data-val');
            const valIf1 = document.getElementById('slot-if1').getAttribute('data-val');
            const valIf2 = document.getElementById('slot-if2').getAttribute('data-val');
            const valElse = document.getElementById('slot-else').getAttribute('data-val');
            
            const valKey1 = document.getElementById('slot-key1').getAttribute('data-val');
            const valKey2 = document.getElementById('slot-key2').getAttribute('data-val');
            const valKey3 = document.getElementById('slot-key3').getAttribute('data-val');

            const logicLampu = document.getElementById('logic-if-lampu').getAttribute('data-val');
            const logicTimer = document.getElementById('logic-if-timer').getAttribute('data-val');

            // Cek kesesuaian syntax python (for, if, else)
            if (valFor !== 'for' || valIf1 !== 'if' || valIf2 !== 'if' || valElse !== 'else') {
			logToTerminal("<i class=\"fa-solid fa-xmark\"></i> Syntax Error: Penempatan Logika (for / if / else) ada yang keliru posisinya. Coba perhatikan lagi strukturnya!", "error");
			return;
            }

            // Cek kesesuaian nama Dictionary Keys ("lampu", "timer", "s")
            if (valKey1 !== 'lampu' || valKey2 !== 'timer' || valKey3 !== 's') {
			logToTerminal("<i class=\"fa-solid fa-xmark\"></i> Key Error: Kunci pencarian di spek[...] kurang tepat. Harusnya memanggil 'lampu', 'timer', lalu 's'.", "error");
			return;
            }

            // Jika lulus semua validasi puzzle
            simSuccess = true;
            checkProgress(); // Perbarui indikator bahwa simulasi berjalan sukses
            
            let adaYangNyala = false;

            document.querySelectorAll('div[data-room]').forEach(row => {
            	const id = row.getAttribute('data-room');
            	const slots = row.querySelectorAll('.slot');
            	const dataLampu = slots[0].getAttribute('data-val'); 
            	const dataTimer = slots[1].getAttribute('data-val'); 
            	const detik = parseInt(row.querySelector('input').value) || 0;

            	const roomEl = document.getElementById('room-' + id);
            	const cdEl = document.getElementById('cd-' + id);
            	cdEl.innerText = "";

            	if (dataLampu === logicLampu && dataLampu === 'ON') {
            		adaYangNyala = true;
            		roomEl.classList.add('active');
            	logToTerminal(`<i class=\"fa-solid fa-circle-check\"></i> Yey! Lampu <b>${id}</b> berhasil MENYALA.`, "success");
            			let count = detik;
            			cdEl.innerText = count + " detik";
            		logToTerminal(`<i class=\"fa-solid fa-hourglass-half\"></i> Menyalakan timer ${id} selama ${detik} detik...`);
            			let t = setInterval(() => {
            				count--;
            				if(count > 0) {
            					cdEl.innerText = count + " detik";
            				} else {
            					clearInterval(t);
            					roomEl.classList.remove('active');
            					cdEl.innerText = "";
            					logToTerminal(`<i class=\"fa-solid fa-moon\"></i> Waktu habis! Lampu <b>${id}</b> otomatis DIMATIKAN.`, "info");
            				}
            			}, 1000);
            			activeTimers.push(t);
            		}
            	} else {
            		roomEl.classList.remove('active');
            		logToTerminal(`<i class=\"fa-solid fa-minus\"></i> Lampu <b>${id}</b> tetap padam sesuai logika kode.`);
            	}
            });

            if (!adaYangNyala) {
            	logToTerminal("<i class=\"fa-solid fa-lightbulb\"></i> Tips: Coba atur status di LANGKAH 1 dan LANGKAH 2 menjadi 'ON' agar ada lampu yang menyala!", "info");
            }
        }

        // --- SISTEM INDIKATOR PROGRES (BARU) ---
        function checkProgress() {
            // Task 1: Cek apakah SEMUA slot di Langkah 1 (Dictionary config) sudah diisi
        	const task1Done = Array.from(document.querySelectorAll('div[data-room] .slot'))
        	.every(slot => slot.getAttribute('data-val') !== null);

            // Task 2: Cek apakah SEMUA slot di Langkah 2 (Logika) sudah diisi
        	const step2Slots = ['slot-for', 'slot-if1', 'slot-if2', 'slot-else', 'slot-key1', 'slot-key2', 'slot-key3', 'logic-if-lampu', 'logic-if-timer'];
        	const task2Done = step2Slots.every(id => document.getElementById(id).getAttribute('data-val') !== null);

            // Task 3: Cek apakah simulasi berhasil dijalankan tanpa error
        	const task3Done = simSuccess;

        	let tasksDone = (task1Done ? 1 : 0) + (task2Done ? 1 : 0) + (task3Done ? 1 : 0);

            // Update UI Progress Bar & Text
        	document.getElementById('progressFill').style.width = `${(tasksDone / 3) * 100}%`;
        	document.getElementById('progressText').innerText = `${tasksDone}/3 Selesai`;

            // Update Status Ikon Checklist
        	updateTaskUI('task1', task1Done);
        	updateTaskUI('task2', task2Done);
        	updateTaskUI('task3', task3Done);

            // Ganti highlight state (bold) sesuai task yang sedang berjalan
        	document.querySelectorAll('.task-item').forEach(el => el.classList.remove('active'));
        	if (!task1Done) document.getElementById('task1').classList.add('active');
        	else if (!task2Done) document.getElementById('task2').classList.add('active');
        	else if (!task3Done) document.getElementById('task3').classList.add('active');
        }

        function updateTaskUI(taskId, isDone) {
        	const el = document.getElementById(taskId);
        	const icon = el.querySelector('.task-icon');
        	if (isDone) {
        		el.classList.add('completed');
        		icon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        	} else {
        		el.classList.remove('completed');
        		icon.innerHTML = '<i class="fa-solid fa-circle"></i>';
        	}
        }

        // Jalankan pengecekan progres untuk pertama kali saat halaman dimuat
        checkProgress();



/* PAGE SWITCH */

    	function showPage(id){

    		document.querySelectorAll('.page')
    		.forEach(p=>p.classList.remove('active'));

    		document.getElementById(id)
    		.classList.add('active');

    		window.scrollTo({top:0,behavior:'smooth'});

    	}

    	function animateSmartHome(){

    		const lamps=[
    			document.getElementById("lamp1"),
    			document.getElementById("lamp2"),
    			document.getElementById("lamp3"),
    			document.getElementById("lamp4")
    			]

    		let index=0

    		setInterval(()=>{

    			lamps.forEach(l=>l.classList.remove("on"))

    			lamps[index].classList.add("on")

    			index++
    			if(index>=lamps.length)index=0

    		},1200)

    	}

    	animateSmartHome()

// =========================
    // MODALS
    // =========================
    	const cpModal = document.getElementById('cpModal');
    	function openCPModal(){ cpModal.classList.remove('hidden'); document.body.style.overflow='hidden'; }
    	function closeCPModal(){ cpModal.classList.add('hidden'); document.body.style.overflow='auto'; }

    	const bioModal = document.getElementById('bioModal');
    	function openBioModal(){ bioModal.classList.remove('hidden'); document.body.style.overflow='hidden'; }
    	function closeBioModal(){ bioModal.classList.add('hidden'); document.body.style.overflow='auto'; }

    	const refleksiModal = document.getElementById('refleksiModal');
    	function openRefleksiModal(){ refleksiModal.classList.remove('hidden'); document.body.style.overflow='hidden'; }
    	function closeRefleksiModal(){ refleksiModal.classList.add('hidden'); document.body.style.overflow='auto'; }

    	const freeModeModal = document.getElementById('freeModeModal');
    	function openFreeModeModal(){ freeModeModal.classList.remove('hidden'); document.body.style.overflow='hidden'; }
    	function closeFreeModeModal(){ freeModeModal.classList.add('hidden'); document.body.style.overflow='auto'; }

    // =========================
    // CARA PENGGUNAAN SLIDES
    // =========================
    	const caraModal = document.getElementById('caraModal');
    	let currentSlide = 0;
    	const totalSlides = 5;

    	function openCaraModal() {
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

    		const contentArea = caraModal.querySelector('.overflow-y-auto');
    		if(contentArea) contentArea.scrollTop = 0;

    		updateSlideView();
    	}

    	function updateSlideView() {
    		for (let i = 0; i < totalSlides; i++) {
    			document.getElementById('slide-' + i).classList.add('hidden-slide');
    			const dot = document.getElementById('dot-' + i);
    			dot.classList.remove('bg-orange-500', 'w-8');
    			dot.classList.add('bg-slate-300', 'w-3');
    		}

    		document.getElementById('slide-' + currentSlide).classList.remove('hidden-slide');
    		const activeDot = document.getElementById('dot-' + currentSlide);
    		activeDot.classList.remove('bg-slate-300', 'w-3');
    		activeDot.classList.add('bg-orange-500', 'w-8');

    		document.getElementById('prevBtn').style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
    		document.getElementById('nextBtn').style.visibility = currentSlide === totalSlides - 1 ? 'hidden' : 'visible';
    	}
