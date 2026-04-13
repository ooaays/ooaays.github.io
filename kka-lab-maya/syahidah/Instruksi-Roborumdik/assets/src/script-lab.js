    // ================= ENGINE STATE =================
    let isRunning = false; let currentRunId = 0; 
    let activeSprite = 'robot'; let idCounter = 0;
    
    let globalVars = { battery: 90, answer: "" };
    let messagesFired = {}; let messageResolvers = []; // Untuk sinkronisasi event
    const appData = { robot: { scripts: [] }, battery: { scripts: [] } }; 
    
    const initialSpriteState = {
        robot: { x: 0, y: 0, visible: true },
        battery: { x: 100, y: 100, visible: true }
    };
    let spriteState = JSON.parse(JSON.stringify(initialSpriteState));

    const scriptArea = document.getElementById('script-area');
    const blocksContainer = document.getElementById('blocks-container');
    const elSprites = { robot: document.getElementById('sprite-robot'), battery: document.getElementById('sprite-battery') };
    const elBubbles = { robot: document.getElementById('bubble-robot'), battery: document.getElementById('bubble-battery') };
    
    const defaultVals = {
        whenReceive: { val: 'pesan 1' }, broadcast: { val: 'pesan 1' },
        changeX: { mode: 'number', value: 10 }, changeY: { mode: 'number', value: 10 },
        say: { mode: 'text', value: "Halo" }, ask: { mode: 'text', value: "Siapa namamu?" },
        setBattery: { mode: 'number', value: 90 }, changeBattery: { mode: 'number', value: 10 },
        repeat: { mode: 'number', value: 10 },
        condition: { type: 'touching', target: 'robot', left: { mode: 'variable', value: 'VAR_battery' }, op: '==', right: { mode: 'number', value: 100 } } 
    };

    // ALUR BARU: #, Aa, var, opr, ab
    const inputModes = [
        { id: 'number', label: '#', type: 'number' },
        { id: 'text', label: 'Aa', type: 'text' },
        { id: 'variable', label: 'v', type: 'variable' },
        { id: 'operator', label: 'opr', type: 'operator', op: '+' }, 
        { id: 'join', label: 'ab', type: 'join' }
    ];

    function resolveValue(valObj, targetSprite) {
        if (!valObj) return 0;
        if (typeof valObj !== 'object') return valObj; 

        if (valObj.mode === 'number') return parseFloat(valObj.value) || 0;
        if (valObj.mode === 'text') return String(valObj.value);
        if (valObj.mode === 'variable') {
            if (valObj.value === 'VAR_battery') return globalVars.battery;
            if (valObj.value === 'VAR_answer') return globalVars.answer;
            if (valObj.value === 'VAR_posX') return Math.round(spriteState[targetSprite].x);
            if (valObj.value === 'VAR_posY') return Math.round(spriteState[targetSprite].y);
        }
        if (valObj.mode === 'operator') {
            let left = parseFloat(resolveValue(valObj.left, targetSprite)) || 0;
            let right = parseFloat(resolveValue(valObj.right, targetSprite)) || 0;
            switch (valObj.op) { 
                case '+': return left+right; case '-': return left-right; case '*': return left*right; 
                case '/': return right!==0?left/right:0; case 'mod': return left%right; 
                case '==': return left==right; case '!=': return left!=right;
                case '>': return left>right; case '<': return left<right;
            }
        }
        if (valObj.mode === 'join') {
            return String(resolveValue(valObj.left, targetSprite)) + String(resolveValue(valObj.right, targetSprite));
        }
        return 0;
    }

    // ================= TUTORIAL ENGINE =================
    function hasBlock(sprite, type) { return appData[sprite].scripts.some(b => b.type === type); }
    function hasBlockWithValue(sprite, type, field, expectedVal) {
        return appData[sprite].scripts.some(b => {
            if (b.type !== type) return false;
            let val = resolveValue(b[field], sprite);
            if (typeof b[field] === 'string') return b[field] === expectedVal; 
            if (typeof expectedVal === 'string') return String(val).toLowerCase().includes(expectedVal.toLowerCase());
            return val == expectedVal;
        });
    }

    const experiments = [
        {
            title: "Percobaan 1 – Menggerakkan Robot",
            steps: [
                { text: "Susun blok untuk menggerakkan robot ke kanan.<br><br>Gunakan blok <b>(➔ Ubah X sebesar 10)</b><br>Kemudian klik <b>▶ Jalankan</b>.<br>Amati perubahan posisi robot.", requireRun: true, check: () => hasBlockWithValue('robot', 'changeX', 'val', 10) },
                { text: "Coba ubah value <b>ubah X</b> menjadi <b>100</b><br><br>Kemudian klik <b>▶ Jalankan</b>.", requireRun: true, check: () => hasBlockWithValue('robot', 'changeX', 'val', 100) },
                { text: "Sekarang coba gunakan blok <b>(⬆ Ubah Y sebesar 10)</b><br><br>Kemudian klik <b>▶ Jalankan</b>.", requireRun: true, check: () => hasBlockWithValue('robot', 'changeY', 'val', 10) },
                { text: "Coba ubah value <b>ubah Y</b> menjadi <b>100</b><br><br>Kemudian klik <b>▶ Jalankan</b>.", requireRun: true, check: () => hasBlockWithValue('robot', 'changeY', 'val', 100) }
            ]
        },
        {
            title: "Percobaan 2 - Interaksi Baterai",
            steps: [
                { text: "<b>1.</b> Klik <b>🔋 Skrip baterai</b>.", check: () => activeSprite === 'battery' },
                { text: "<b>2.</b> Pasang Blok <b>🔁 Selamanya</b>.", check: () => hasBlock('battery', 'forever') },
                { text: "<b>3.</b> Pasang blok <b>🔀 Jika [kondisi] maka</b> di dalamnya.", check: () => hasBlock('battery', 'if') },
                { text: "<b>4.</b> Buat menjadi <b>jika menyentuh robot maka</b>.", check: () => appData.battery.scripts.some(b => b.type === 'if' && b.condition.type === 'touching' && b.condition.target === 'robot') },
                { text: "<b>5.</b> Pasang Blok <b>Sembunyikan</b> di dalam Jika.", check: () => hasBlock('battery', 'hide') },
                { text: "<b>6.</b> Pasang blok <b>Ubah baterai sebesar 10</b>.", check: () => hasBlockWithValue('battery', 'changeBattery', 'val', 10) },
                { text: "<b>7.</b> Pasang blok <b>📢 Kirim pesan [pesan 1]</b> (sebelum akhiri jika).", check: () => hasBlockWithValue('battery', 'broadcast', 'val', 'pesan 1') },
                { text: "<b>8.</b> Pasang blok <b>Akhiri Jika</b>.", check: () => hasBlock('battery', 'endIf') },
                { text: "<b>9.</b> Pasang Blok <b>Akhiri Selamanya</b>.<br><i>(Jalankan program untuk mengetes)</i>", requireRun: true, check: () => hasBlock('battery', 'endForever') }
            ]
        },
        {
            title: "Percobaan 3 - Sinkronisasi Pesan",
            steps: [
                { text: "<b>1.</b> Klik <b>🤖 Skrip Robot</b>.", check: () => activeSprite === 'robot' },
                { text: "<b>2.</b> Pasang blok <b>🚩 Ketika menerima pesan [pesan 1]</b> agar robot menunggunya.", check: () => hasBlockWithValue('robot', 'whenReceive', 'val', 'pesan 1') },
                { text: "<b>3.</b> Pasang blok <b>🔀 Jika [kondisi] Maka</b> di bawahnya.", check: () => hasBlock('robot', 'if') },
                { text: "<b>4.</b> Pilih Jika (operator) agar otomatis masuk isian <b>(Baterai) == 100</b>.", check: () => appData.robot.scripts.some(b => b.type === 'if' && b.condition.type === 'operator' && b.condition.left.value === 'VAR_battery' && b.condition.right.value == 100) },
                { text: "<b>5.</b> Pasang blok <b>Katakan [\"Halo\"]</b> di dalam Jika.", check: () => hasBlock('robot', 'say') },
                { text: "<b>6 & 7.</b> Klik tombol <b>[ # ]</b> pada blok Katakan. Klik terus siklusnya (#, Aa, v, opr) sampai menemukan tombol <b>ab (gabung)</b>.", check: () => appData.robot.scripts.some(b => b.type === 'say' && b.val.mode === 'join') },
                { text: "<b>8.</b> Tuliskan <b>\"Status Baterai \"</b> pada kolom Aa kiri.", check: () => appData.robot.scripts.some(b => b.type === 'say' && b.val.mode === 'join' && b.val.left.mode === 'text' && String(b.val.left.value).toLowerCase().includes('status')) },
                { text: "<b>9 & 10.</b> Klik Tombol Aa terakhir (kolom kanan) sampai menjadi <b>[ v ]</b>. Pilih Variabel <b>Baterai</b>.", check: () => appData.robot.scripts.some(b => b.type === 'say' && b.val.mode === 'join' && b.val.right.mode === 'variable' && b.val.right.value === 'VAR_battery') },
                { text: "<b>11.</b> Pasang blok <b>Akhiri Jika</b> di paling bawah (setelah blok Katakan).", check: () => hasBlock('robot', 'endIf') },
                { text: "<b>12.</b> Klik <b>⏹ Reset</b> terlebih dahulu untuk memunculkan baterai kembali, kemudian klik <b>▶ Jalankan</b>. (Robot akan berdiam menunggu sinyal baterai tersentuh!)", requireRun: true, check: () => true }
            ]
        },
        {
            title: "Percobaan 4 - Tanya Nama",
            steps: [
                { text: "<b>1.</b> Tambahkan <b>Katakan [\"Terimakasih\"]</b>.", check: () => hasBlockWithValue('robot', 'say', 'val', "Terima") },
                { text: "<b>2.</b> Masukkan <b>❓ Tanya & tunggu</b>.", check: () => hasBlock('robot', 'ask') },
                { text: "<b>3.</b> Masukkan Blok Katakan lagi, Klik tombol siklus hingga menjadi <b>ab (gabung)</b>.", check: () => appData.robot.scripts.filter(b => b.type === 'say' && b.val.mode === 'join').length > 0 },
                { text: "<b>4.</b> Tuliskan <b>\"Halo \"</b> pada kolom Aa pertama.", check: () => appData.robot.scripts.some(b => b.type === 'say' && b.val.mode === 'join' && String(b.val.left.value).toLowerCase().includes('halo')) },
                { text: "<b>5.</b> Klik kolom Aa kedua sampai menjadi <b>[ v ]</b>. Pilih Variabel <b>\"Jawaban\"</b>.", check: () => appData.robot.scripts.some(b => b.type === 'say' && b.val.mode === 'join' && b.val.right.value === 'VAR_answer') },
                { text: "<b>6.</b> Klik <b>⏹ Reset</b> terlebih dahulu, kemudian klik <b>▶ Jalankan</b>. Selamat bereksperimen!", requireRun: true, check: () => true }
            ]
        }
    ];

    let currentExpIndex = 0; let currentStepIndex = 0; let unlockedExpIndex = 0;
    const tutorialPanel = document.getElementById('tutorial-panel');
    const tutorialMinimizedBar = document.getElementById('tutorial-minimized-bar');
    const btnNextTut = document.getElementById('btn-next-tut');
    let tutorialRunTriggered = false;
    let tutorialMinimized = false;
    let tutorialAutoMinimized = false;

    function minimizeTutorialPanel() {
        if (!tutorialPanel || !tutorialMinimizedBar) return;
        tutorialPanel.classList.add('hidden');
        tutorialMinimizedBar.classList.remove('hidden');
        tutorialMinimized = true;
        tutorialAutoMinimized = false;
    }

    function restoreTutorialPanel() {
        if (!tutorialPanel || !tutorialMinimizedBar) return;
        tutorialMinimizedBar.classList.add('hidden');
        tutorialPanel.classList.remove('hidden');
        tutorialMinimized = false;
        tutorialAutoMinimized = false;
    }

    function autoMinimizeTutorialPanel() {
        if (!tutorialPanel || !tutorialMinimizedBar || tutorialMinimized) return;
        tutorialPanel.classList.add('hidden');
        tutorialMinimizedBar.classList.remove('hidden');
        tutorialMinimized = true;
        tutorialAutoMinimized = true;
    }

    function autoRestoreTutorialPanel() {
        if (!tutorialAutoMinimized) return;
        restoreTutorialPanel();
        tutorialAutoMinimized = false;
    }

    function renderDots() {
        const dotsContainer = document.getElementById('dots-container');
        dotsContainer.innerHTML = '<div class="absolute top-1/2 left-6 right-6 h-1 bg-white/20 -mt-0.5 z-0"></div>';
        
        experiments.forEach((exp, index) => {
            const btn = document.createElement('button');
            if (index === currentExpIndex) {
                btn.className = "w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center shadow-md"; btn.innerText = index + 1;
            } else if (index <= unlockedExpIndex) {
                btn.className = "w-8 h-8 rounded-full bg-slate-200 text-slate-500 font-bold flex items-center justify-center"; btn.innerText = "✓"; btn.onclick = () => switchExp(index);
            } else {
                btn.className = "w-8 h-8 rounded-full bg-slate-200 text-slate-500 font-bold flex items-center justify-center"; btn.innerText = index + 1;
            }
            dotsContainer.appendChild(btn);
        });
    }

    function switchExp(index) {
        if (index > unlockedExpIndex) return; 
        currentExpIndex = index; currentStepIndex = 0; tutorialRunTriggered = false;
        renderDots(); tutorialPanel.classList.remove('hidden'); renderTutorialStep();
    }

    function renderTutorialStep() {
        const exp = experiments[currentExpIndex]; const step = exp.steps[currentStepIndex];
        document.getElementById('tutorial-title-text').innerHTML = exp.title;
        document.getElementById('tutorial-content').innerHTML = step.text;
        document.getElementById('tutorial-counter').innerText = `Langkah ${currentStepIndex + 1} / ${exp.steps.length}`;
        tutorialRunTriggered = false;
        checkStepValidation();
        tutorialPanel.classList.remove('tutorial-anim'); void tutorialPanel.offsetWidth; tutorialPanel.classList.add('tutorial-anim');
    }

    function checkStepValidation() {
        if (tutorialPanel.classList.contains('hidden') && !tutorialMinimized) return;
        const step = experiments[currentExpIndex].steps[currentStepIndex];
        let isValid = step.check();
        
        if (step.requireRun && !tutorialRunTriggered) isValid = false;

        if (isValid) {
            btnNextTut.disabled = false;
            btnNextTut.className = "px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold shadow-md transition-all animate-pulse";
            const nextText = (currentStepIndex === experiments[currentExpIndex].steps.length - 1) ? "Selesai Tahap Ini ✔" : "Benar! Lanjut ➔";
            btnNextTut.innerText = nextText;
            if (tutorialMinimized && nextText.includes('Benar! Lanjut')) {
                restoreTutorialPanel();
            }
        } else {
            btnNextTut.disabled = true;
            btnNextTut.className = "px-5 py-2 bg-slate-300 text-slate-500 rounded-lg font-bold transition-all cursor-not-allowed";
            btnNextTut.innerText = step.requireRun ? "Tunggu Dijalankan..." : "Susun Blok...";
        }
    }

    function nextStep() {
        if (currentStepIndex < experiments[currentExpIndex].steps.length - 1) {
            currentStepIndex++; renderTutorialStep();
        } else {
            if (currentExpIndex < experiments.length - 1) {
                unlockedExpIndex = Math.max(unlockedExpIndex, currentExpIndex + 1);
                switchExp(currentExpIndex + 1);
            } else {
                unlockedExpIndex = 4; renderDots();
                document.getElementById('success-overlay').classList.remove('hidden');
            }
        }
    }

    // ================= RICH INPUT SYSTEM =================
    function createRichInput(valObj, onChange, isChild = false) {
        if (!valObj || typeof valObj !== 'object') valObj = { mode: 'number', value: typeof valObj === 'number' ? valObj : 0 };

        const container = document.createElement('div');
        container.className = 'inline-flex items-center bg-black/10 rounded-full pl-1 pr-1.5 py-0.5 gap-1 shadow-inner border border-black/5 mx-1 relative';

        const modeBtn = document.createElement('button');
        modeBtn.className = 'bg-white hover:bg-gray-100 rounded-full h-5 px-2 shadow-sm text-[11px] font-black text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 z-10 shrink-0';
        
        if (['operator', 'join'].includes(valObj.mode)) {
            modeBtn.classList.remove('bg-white', 'hover:bg-gray-100', 'text-slate-700');
            modeBtn.classList.add('bg-yellow-300', 'hover:bg-yellow-400', 'text-yellow-900', 'border-2', 'border-yellow-500', 'scale-110');
            modeBtn.title = "Klik untuk ganti mode";
        }

        let currentModeId = 'number';
        if (valObj.mode === 'text') currentModeId = 'text';
        if (valObj.mode === 'variable') currentModeId = 'variable';
        if (valObj.mode === 'join') currentModeId = 'join';
        if (valObj.mode === 'operator') currentModeId = 'operator';
        
        const availableModes = isChild 
            ? inputModes.filter(m => ['text', 'variable', 'number'].includes(m.type))
            : inputModes;

        let currentModeObj = availableModes.find(m => m.id === currentModeId) || availableModes[0];
        modeBtn.innerText = currentModeObj.label;

        modeBtn.onclick = () => {
            let idx = availableModes.findIndex(m => m.id === currentModeId);
            let next = availableModes[(idx + 1) % availableModes.length];
            
            let newVal = { mode: next.type };
            if (next.type === 'operator') {
                newVal.op = next.op; newVal.left = { mode: 'number', value: 0 }; newVal.right = { mode: 'number', value: 0 };
            } else if (next.type === 'join') {
                newVal.left = { mode: 'text', value: "Halo " }; newVal.right = { mode: 'text', value: "Dunia" };
            } else if (next.type === 'variable') { newVal.value = "VAR_battery";
            } else if (next.type === 'number') { newVal.value = 0;
            } else if (next.type === 'text') { newVal.value = ""; }
            
            onChange(newVal, true); 
        };

        container.appendChild(modeBtn);

        if (valObj.mode === 'operator' || valObj.mode === 'join') {
            const bodyContainer = document.createElement('div');
            bodyContainer.className = "flex items-center bg-white/50 rounded-full px-1 py-0.5 border border-black/10 shadow-sm ml-0.5";
            
            bodyContainer.appendChild(createRichInput(valObj.left, (n, r) => onChange({...valObj, left: n}, r), true));
            
            if (valObj.mode === 'operator') {
                const opSel = document.createElement('select');
                opSel.className = "text-[12px] font-black text-slate-800 bg-transparent outline-none cursor-pointer mx-1 appearance-none text-center px-1 border-b-2 border-slate-400";
                ['+', '-', '*', '/', 'mod', '==', '!=', '>', '<'].forEach(op => {
                    const opt = document.createElement('option');
                    opt.value = op; opt.innerText = op;
                    if(valObj.op === op) opt.selected = true;
                    opSel.appendChild(opt);
                });
                opSel.onchange = e => onChange({...valObj, op: e.target.value}, true);
                bodyContainer.appendChild(opSel);
            } else {
                const opLabel = document.createElement('span');
                opLabel.className = "text-[11px] font-black text-slate-700 mx-1.5 drop-shadow-sm uppercase tracking-wide";
                opLabel.innerText = 'gabung';
                bodyContainer.appendChild(opLabel);
            }
            
            bodyContainer.appendChild(createRichInput(valObj.right, (n, r) => onChange({...valObj, right: n}, r), true));
            container.appendChild(bodyContainer);
        } else {
            if (valObj.mode === 'number') {
                const inp = document.createElement('input'); inp.type = 'number'; inp.value = valObj.value;
                inp.className = 'w-12 text-xs h-5 rounded-full px-2 text-slate-800 outline-none font-mono font-bold shadow-inner';
                inp.oninput = e => onChange({ ...valObj, value: parseFloat(e.target.value)||0 }, false);
                container.appendChild(inp);
            } else if (valObj.mode === 'text') {
                const inp = document.createElement('input'); inp.type = 'text'; inp.value = valObj.value;
                inp.className = 'w-24 text-xs h-5 rounded-full px-2 text-slate-800 outline-none font-sans font-bold shadow-inner';
                inp.oninput = e => onChange({ ...valObj, value: e.target.value }, false);
                container.appendChild(inp);
            } else if (valObj.mode === 'variable') {
                const sel = document.createElement('select');
                sel.className = 'text-[11px] h-5 rounded-full px-2 text-white bg-orange-500 hover:bg-orange-600 outline-none cursor-pointer font-bold appearance-none shadow-sm';
                sel.innerHTML = `<option value="VAR_battery" ${valObj.value==='VAR_battery'?'selected':''}>Baterai</option><option value="VAR_answer" ${valObj.value==='VAR_answer'?'selected':''}>Jawaban</option><option value="VAR_posX" ${valObj.value==='VAR_posX'?'selected':''}>Pos X</option><option value="VAR_posY" ${valObj.value==='VAR_posY'?'selected':''}>Pos Y</option>`;
                sel.onchange = e => onChange({ ...valObj, value: e.target.value }, true); 
                container.appendChild(sel);
            }
        }
        return container;
    }

    // ================= SCRIPT MANAGEMENT =================
    function switchSprite(spriteId) {
        activeSprite = spriteId;
        document.getElementById('tab-robot').className = spriteId === 'robot' ? 'flex-1 py-3 font-bold text-sm tab-active-robot' : 'flex-1 py-3 font-bold text-sm tab-inactive';
        document.getElementById('tab-battery').className = spriteId === 'battery' ? 'flex-1 py-3 font-bold text-sm tab-active-battery' : 'flex-1 py-3 font-bold text-sm tab-inactive';
        scriptArea.className = spriteId === 'robot' ? 'flex-1 overflow-y-auto overflow-x-auto p-4 bg-script-robot pb-10 transition-colors relative scroll-smooth' : 'flex-1 overflow-y-auto overflow-x-auto p-4 bg-script-battery pb-10 transition-colors relative scroll-smooth';
        document.getElementById('active-sprite-name').innerText = spriteId === 'robot' ? 'Robot' : 'Baterai';
        tutorialRunTriggered = false;
        renderScript(); checkStepValidation();
    }

    function addBlock(type) {
        let block = { id: idCounter++, type: type };
        if(defaultVals[type]) block.val = typeof defaultVals[type] === 'object' && defaultVals[type] !== null ? JSON.parse(JSON.stringify(defaultVals[type])) : defaultVals[type];
        if(type === 'if') { block.condition = JSON.parse(JSON.stringify(defaultVals.condition)); block.condition.target = activeSprite === 'battery' ? 'robot' : 'battery'; }
        if(type === 'broadcast') block.val = 'pesan 1';
        if(type === 'whenReceive') block.val = 'pesan 1';
        
        appData[activeSprite].scripts.push(block);
        tutorialRunTriggered = false;
        renderScript(); setTimeout(() => scriptArea.scrollTop = scriptArea.scrollHeight, 50);
    }

    function removeBlock(id) { appData[activeSprite].scripts = appData[activeSprite].scripts.filter(b => b.id !== id); tutorialRunTriggered = false; renderScript(); }
    function clearScript() { appData[activeSprite].scripts = []; tutorialRunTriggered = false; renderScript(); }
    
    function updateBlockVal(id, field, value, shouldRender = true) { 
        const block = appData[activeSprite].scripts.find(b => b.id === id); 
        if(block) block[field] = value; 
        tutorialRunTriggered = false; 
        checkStepValidation(); 
        if (shouldRender) renderScript(); 
    }

    function moveBlock(index, direction) {
        const scripts = appData[activeSprite].scripts;
        if (direction === -1 && index > 0) [scripts[index], scripts[index - 1]] = [scripts[index - 1], scripts[index]];
        else if (direction === 1 && index < scripts.length - 1) [scripts[index], scripts[index + 1]] = [scripts[index + 1], scripts[index]];
        renderScript();
    }

    function getMessageDropdown(val, onChangeFn) {
        const sel = document.createElement('select');
        sel.className = 'text-xs rounded-full px-2 py-0.5 outline-none font-bold text-yellow-900 bg-white shadow-sm ml-1 cursor-pointer';
        ['pesan 1', 'pesan 2', 'pesan 3'].forEach(m => {
            const opt = document.createElement('option'); opt.value = m; opt.innerText = m;
            if(val === m) opt.selected = true;
            sel.appendChild(opt);
        });
        sel.onchange = onChangeFn;
        return sel;
    }

    function renderScript() {
        blocksContainer.innerHTML = ''; let indentLevel = 0;
        appData[activeSprite].scripts.forEach((block, index) => {
            if (['endIf', 'endForever', 'endRepeat', 'else'].includes(block.type)) indentLevel = Math.max(0, indentLevel - 1);

            const wrapper = document.createElement('div'); wrapper.style.marginLeft = `${indentLevel * 24}px`;
            const el = document.createElement('div'); el.id = `block-ui-${block.id}`; el.className = `code-block flex justify-between relative`;
            
            if (['changeX', 'changeY'].includes(block.type)) el.classList.add('block-motion');
            else if (['say', 'show', 'hide'].includes(block.type)) el.classList.add('block-looks');
            else if (['setBattery', 'changeBattery'].includes(block.type)) el.classList.add('block-data');
            else if (['forever', 'endForever', 'if', 'endIf', 'else', 'repeat', 'endRepeat'].includes(block.type)) el.classList.add('block-control');
            else if (['ask'].includes(block.type)) el.classList.add('block-sensing');
            else if (['broadcast', 'whenReceive'].includes(block.type)) el.classList.add('block-events');

            const leftContent = document.createElement('div'); leftContent.className = "flex items-center gap-1 flex-wrap flex-grow py-0.5";

            if (block.type === 'changeX') { leftContent.append(`➔ Ubah X sbsr `); leftContent.appendChild(createRichInput(block.val, (v, r) => updateBlockVal(block.id, 'val', v, r))); } 
            else if (block.type === 'changeY') { leftContent.append(`⬆ Ubah Y sbsr `); leftContent.appendChild(createRichInput(block.val, (v, r) => updateBlockVal(block.id, 'val', v, r))); } 
            else if (block.type === 'setBattery') { leftContent.append(`⚡ Set Baterai ke `); leftContent.appendChild(createRichInput(block.val, (v, r) => updateBlockVal(block.id, 'val', v, r))); } 
            else if (block.type === 'changeBattery') { leftContent.append(`⚡ Ubah Baterai sbsr `); leftContent.appendChild(createRichInput(block.val, (v, r) => updateBlockVal(block.id, 'val', v, r))); } 
            else if (block.type === 'repeat') { leftContent.append(`🔄 Ulangi `); leftContent.appendChild(createRichInput(block.val, (v, r) => updateBlockVal(block.id, 'val', v, r))); leftContent.append(` kali`); }
            else if (block.type === 'say') { leftContent.append(`💬 Katakan `); leftContent.appendChild(createRichInput(block.val, (v, r) => updateBlockVal(block.id, 'val', v, r))); } 
            else if (block.type === 'ask') { leftContent.append(`❓ Tanya `); leftContent.appendChild(createRichInput(block.val, (v, r) => updateBlockVal(block.id, 'val', v, r))); leftContent.append(` & tunggu`); } 
            else if (block.type === 'show') leftContent.innerHTML = `👁️ Tampilkan`; else if (block.type === 'hide') leftContent.innerHTML = `👻 Sembunyikan`; 
            else if (block.type === 'forever') leftContent.innerHTML = `🔁 Selamanya`; else if (block.type === 'endForever') leftContent.innerHTML = `↩ Akhiri Selamanya`; 
            else if (block.type === 'endRepeat') leftContent.innerHTML = `↩ Akhiri Ulangi`; else if (block.type === 'else') leftContent.innerHTML = `🔀 Jika Tidak`; else if (block.type === 'endIf') leftContent.innerHTML = `↩ Akhiri Jika`;
            else if (block.type === 'broadcast') { leftContent.append(`📢 Kirim Pesan`); leftContent.appendChild(getMessageDropdown(block.val, e => updateBlockVal(block.id, 'val', e.target.value, true))); }
            else if (block.type === 'whenReceive') { leftContent.append(`🚩 Ketika menerima pesan`); leftContent.appendChild(getMessageDropdown(block.val, e => updateBlockVal(block.id, 'val', e.target.value, true))); }
            else if (block.type === 'if') {
                leftContent.innerHTML = `🔀 Jika `;
                const condWrap = document.createElement('div'); condWrap.className = "condition-wrapper ml-1 flex items-center";
                
                const typeSel = document.createElement('select'); typeSel.className = "bg-transparent text-white font-bold outline-none cursor-pointer";
                typeSel.innerHTML = `<option class="text-black" value="touching" ${block.condition.type==='touching'?'selected':''}>Menyentuh</option><option class="text-black" value="operator" ${block.condition.type==='operator'?'selected':''}>Operator</option>`;
                typeSel.onchange = (e) => { 
                    if(e.target.value === 'operator') updateBlockVal(block.id, 'condition', { type: 'operator', op: '==', left: { mode: 'variable', value: 'VAR_battery' }, right: { mode: 'number', value: 100 } }, true); 
                    else updateBlockVal(block.id, 'condition', { type: 'touching', target: activeSprite === 'battery' ? 'robot' : 'battery' }, true);
                };
                condWrap.appendChild(typeSel);

                if (block.condition.type === 'touching') {
                    const targetSel = document.createElement('select'); targetSel.className = "bg-transparent text-white font-bold outline-none cursor-pointer";
                    targetSel.innerHTML = `<option class="text-black" value="robot" ${block.condition.target==='robot'?'selected':''}>Robot</option><option class="text-black" value="battery" ${block.condition.target==='battery'?'selected':''}>Baterai</option>`;
                    targetSel.onchange = (e) => { updateBlockVal(block.id, 'condition', {...block.condition, target: e.target.value}, true); };
                    condWrap.appendChild(targetSel);
                } else if (block.condition.type === 'operator') {
                    condWrap.appendChild(createRichInput(block.condition.left, (n, r) => updateBlockVal(block.id, 'condition', {...block.condition, left: n}, r), true));
                    const opSel = document.createElement('select'); opSel.className = "bg-transparent text-yellow-300 font-bold outline-none cursor-pointer mx-1 border-b-2 border-yellow-300";
                    ['==', '!=', '>', '<'].forEach(op => {
                        const opt = document.createElement('option'); opt.className = "text-black"; opt.value = op; opt.innerText = op;
                        if(block.condition.op === op) opt.selected = true;
                        opSel.appendChild(opt);
                    });
                    opSel.onchange = (e) => { updateBlockVal(block.id, 'condition', {...block.condition, op: e.target.value}, true); };
                    condWrap.append(opSel, createRichInput(block.condition.right, (n, r) => updateBlockVal(block.id, 'condition', {...block.condition, right: n}, r), true));
                }
                leftContent.appendChild(condWrap); leftContent.append(` Maka`);
            }

            const actionBtns = document.createElement('div'); actionBtns.className = 'flex items-center gap-0.5 ml-auto flex-shrink-0 bg-black/10 rounded-lg p-0.5';
            const upBtn = document.createElement('button'); upBtn.innerHTML = '▲'; upBtn.className = 'text-white/80 hover:text-white px-1 py-0.5 rounded text-xs'; upBtn.onclick = () => moveBlock(index, -1);
            const downBtn = document.createElement('button'); downBtn.innerHTML = '▼'; downBtn.className = 'text-white/80 hover:text-white px-1 py-0.5 rounded text-xs'; downBtn.onclick = () => moveBlock(index, 1);
            const delBtn = document.createElement('button'); delBtn.innerHTML = '✖'; delBtn.className = 'text-white/80 hover:text-red-300 px-1 py-0.5 rounded text-xs ml-1'; delBtn.onclick = () => removeBlock(block.id);
            actionBtns.append(upBtn, downBtn, delBtn); el.append(leftContent, actionBtns); wrapper.appendChild(el); blocksContainer.appendChild(wrapper);

            if (['if', 'forever', 'repeat', 'else'].includes(block.type)) indentLevel++;
        });
        checkStepValidation();
    }

    // ================= EXECUTION ENGINE =================
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function buildAST(flatScript) {
        let root = []; let stack = [{ children: root }]; 
        for (let i = 0; i < flatScript.length; i++) {
            let block = Object.assign({}, flatScript[i]);
            if (block.type === 'if') {
                block.childrenTrue = []; block.childrenFalse = []; block.children = block.childrenTrue; 
                stack[stack.length - 1].children.push(block); stack.push({ node: block, children: block.childrenTrue });
            } else if (block.type === 'else') {
                if (stack.length > 1) { let p = stack[stack.length - 1]; if (p.node.type === 'if') p.children = p.node.childrenFalse; }
            } else if (['forever', 'repeat'].includes(block.type)) {
                block.children = []; stack[stack.length - 1].children.push(block); stack.push({ node: block, children: block.children });
            } else if (['endIf', 'endForever', 'endRepeat'].includes(block.type)) {
                if (stack.length > 1) stack.pop(); 
            } else { stack[stack.length - 1].children.push(block); }
        }
        return root;
    }

    function evaluateCondition(cond, targetSprite) {
        if (!cond) return false;
        if (cond.type === 'touching') {
            const el1 = elSprites[targetSprite]; const el2 = elSprites[cond.target];
            if (!el1 || !el2 || !spriteState[targetSprite].visible || !spriteState[cond.target].visible) return false;
            const r1 = el1.getBoundingClientRect(); const r2 = el2.getBoundingClientRect();
            return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
        } else if (cond.type === 'operator') {
            const leftVal = resolveValue(cond.left, targetSprite); const rightVal = resolveValue(cond.right, targetSprite);
            if (cond.op === '==') return leftVal == rightVal; if (cond.op === '!=') return leftVal != rightVal; 
            if (cond.op === '>') return parseFloat(leftVal) > parseFloat(rightVal); if (cond.op === '<') return parseFloat(leftVal) < parseFloat(rightVal);
        }
        return false;
    }

    function updateVisuals(spriteId) {
        const state = spriteState[spriteId];
        elSprites[spriteId].style.transform = `translate(${state.x}px, ${-state.y}px)`;
        elSprites[spriteId].style.opacity = state.visible ? 1 : 0;
        document.getElementById('var-posx').innerText = Math.round(spriteState.robot.x);
        document.getElementById('var-posy').innerText = Math.round(spriteState.robot.y);
        document.getElementById('var-battery').innerText = globalVars.battery;
        document.getElementById('var-answer').innerText = globalVars.answer || '-';
    }

    function stopProgram() {
        isRunning = false; currentRunId++; 
        messageResolvers.forEach(r => r.resolve());
        messageResolvers = []; messagesFired = {};

        spriteState = JSON.parse(JSON.stringify(initialSpriteState)); globalVars = { battery: 90, answer: "" };
        elBubbles.robot.classList.add('hidden'); elBubbles.battery.classList.add('hidden'); document.getElementById('ask-ui').classList.add('hidden');
        updateVisuals('robot'); updateVisuals('battery');
        document.querySelectorAll('.active-block').forEach(el => el.classList.remove('active-block'));
    }

    async function runProgram() {
        if (isRunning) return; stopProgram(); isRunning = true; const myRunId = currentRunId;
        autoMinimizeTutorialPanel();
        tutorialRunTriggered = true; checkStepValidation();
        await Promise.all([ executeAST(buildAST(appData.robot.scripts), 'robot', myRunId), executeAST(buildAST(appData.battery.scripts), 'battery', myRunId) ]);
        if (myRunId === currentRunId) {
            isRunning = false;
            document.querySelectorAll('.active-block').forEach(el => el.classList.remove('active-block'));
            await sleep(3000);
            autoRestoreTutorialPanel();
        }
    }

    async function executeAST(nodes, targetSprite, expectedRunId) {
        if(!nodes) return;
        for (let node of nodes) {
            if (!isRunning || expectedRunId !== currentRunId) break;
            
            // Highlight khusus sprite aktif
            if (targetSprite === activeSprite) {
                document.querySelectorAll('.active-block').forEach(el => el.classList.remove('active-block'));
                const uiEl = document.getElementById(`block-ui-${node.id}`);
                if(uiEl) { 
                    uiEl.classList.add('active-block'); 
                    // Scroll dengan aman tanpa memengaruhi keseluruhan halaman
                    scriptArea.scrollTo({ top: uiEl.offsetTop - (scriptArea.clientHeight / 2) + (uiEl.clientHeight / 2), behavior: 'smooth' });
                }
            }

            const val = resolveValue(node.val, targetSprite); const numVal = parseFloat(val) || 0;

            if (node.type === 'changeX') { spriteState[targetSprite].x += numVal; updateVisuals(targetSprite); await sleep(300); } 
            else if (node.type === 'changeY') { spriteState[targetSprite].y += numVal; updateVisuals(targetSprite); await sleep(300); }
            else if (node.type === 'show') { spriteState[targetSprite].visible = true; updateVisuals(targetSprite); await sleep(200); }
            else if (node.type === 'hide') { spriteState[targetSprite].visible = false; updateVisuals(targetSprite); await sleep(200); }
            else if (node.type === 'setBattery') { globalVars.battery = numVal; updateVisuals(targetSprite); await sleep(200); }
            else if (node.type === 'changeBattery') { globalVars.battery += numVal; updateVisuals(targetSprite); await sleep(200); }
            else if (node.type === 'broadcast') {
                const msg = node.val;
                messagesFired[msg] = true; 
                messageResolvers.filter(r => r.msg === msg).forEach(r => r.resolve());
                await sleep(100);
            }
            else if (node.type === 'whenReceive') {
                const msg = node.val;
                if (!messagesFired[msg]) {
                    await new Promise(resolve => messageResolvers.push({ msg: msg, resolve: resolve }));
                }
                if (!isRunning || expectedRunId !== currentRunId) break; 
            }
            else if (node.type === 'say') { 
                elBubbles[targetSprite].innerText = val; elBubbles[targetSprite].classList.remove('hidden'); 
                setTimeout(() => { if(currentRunId === expectedRunId) elBubbles[targetSprite].classList.add('hidden'); }, 3000); await sleep(500);
            }
            else if (node.type === 'ask') {
                elBubbles[targetSprite].innerText = val; elBubbles[targetSprite].classList.remove('hidden');
                document.getElementById('ask-ui').classList.remove('hidden'); 
                const askInput = document.getElementById('ask-input'); 
                askInput.value = ''; 
                // Mencegah browser scroll otomatis ketika form di-focus
                askInput.focus({ preventScroll: true }); 
                await new Promise(resolve => {
                    const handleSubmit = () => { globalVars.answer = askInput.value; updateVisuals(targetSprite); document.getElementById('ask-ui').classList.add('hidden'); elBubbles[targetSprite].classList.add('hidden'); document.getElementById('ask-btn').removeEventListener('click', handleSubmit); askInput.removeEventListener('keypress', handleKey); resolve(); };
                    const handleKey = e => { if(e.key === 'Enter') handleSubmit(); };
                    document.getElementById('ask-btn').addEventListener('click', handleSubmit); askInput.addEventListener('keypress', handleKey);
                });
            }
            else if (node.type === 'if') {
                if (evaluateCondition(node.condition, targetSprite)) await executeAST(node.childrenTrue, targetSprite, expectedRunId);
                else if (node.childrenFalse && node.childrenFalse.length > 0) await executeAST(node.childrenFalse, targetSprite, expectedRunId);
            }
            else if (node.type === 'repeat') { for (let i = 0; i < numVal; i++) { if (!isRunning || expectedRunId !== currentRunId) break; await executeAST(node.children, targetSprite, expectedRunId); } }
            else if (node.type === 'forever') { while (isRunning && expectedRunId === currentRunId) { await executeAST(node.children, targetSprite, expectedRunId); await sleep(50); } }
            
            await sleep(50);
        }
    }

    // INIT
    updateVisuals('robot'); switchExp(0);