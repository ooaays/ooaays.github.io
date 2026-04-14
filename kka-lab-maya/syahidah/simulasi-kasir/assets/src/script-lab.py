from browser import window, document
import sys

class MyOutput:
    def write(self, data):
        if data and data.strip():
            out = document["output"]
            out.text += "\n✅ [PYTHON OUTPUT] " + data.strip()
            out.scrollTop = out.scrollHeight

sys.stdout = MyOutput()

def run_dynamic_code(*args):
    code = document["hiddenPythonCode"].value
    try:
        exec_globals = {}
        exec(code, exec_globals)
    except Exception as e:
        out = document["output"]
        out.text += f"\n❌ [PYTHON ERROR] {str(e)}"
        out.scrollTop = out.scrollHeight

window.executePythonLogic = run_dynamic_code
</script>

<!-- JAVASCRIPT LOGIC -->
<script type="text/javascript">
// ================= SISTEM SVG & CALLOUT =================
const grupPembeli = document.getElementById('grup-pembeli');
const grupKasir = document.getElementById('grup-kasir');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');

// Fungsi Update Teks SVG (Mendukung Enter/Line-break)
function updateSVGCallout(text) {
    const calloutGrup = document.getElementById('calloutGrup');
    const textNode = document.getElementById('calloutText');
    
    if(!text || text === "") {
        calloutGrup.setAttribute('display', 'none');
        return;
    }
    
    calloutGrup.setAttribute('display', 'block');
    textNode.innerHTML = ''; // Kosongkan
    
    const lines = text.split('\n');
    lines.forEach((line, index) => {
        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.setAttribute('x', '25');
        tspan.setAttribute('y', 40 + (index * 24)); // Jarak antar baris
        tspan.textContent = line;
        textNode.appendChild(tspan);
    });
}

// ================= SISTEM ALUR (8 LANGKAH) =================
let currentStep = 1;
const consoleOut = document.getElementById("output");

function printConsole(msg, isError = false) {
    const time = new Date().toLocaleTimeString('id-ID', {hour12:false});
    consoleOut.textContent += `\n[${time}] ${isError ? "❌" : "✅"} ${msg}`;
    consoleOut.scrollTop = consoleOut.scrollHeight;
}

const clickables = document.querySelectorAll('.clickable-var');
const pastezones = document.querySelectorAll('.pastezone');
let activeVar = null; 
let defaultText = {};
pastezones.forEach(z => defaultText[z.id] = z.textContent);

// Event Listener Blok Kode (Tap untuk pilih, Tap ke Pastezone untuk pasang)
clickables.forEach(item => {
    item.addEventListener('click', () => {
        if(item.classList.contains('locked')) return;
        clickables.forEach(c => c.classList.remove('selected'));
        activeVar = item.dataset.var; 
        item.classList.add('selected');
    });
});

pastezones.forEach(zone => {
    zone.addEventListener('click', () => {
        if (activeVar && !zone.closest('.code-section').classList.contains('locked')) {
            zone.textContent = activeVar; 
            zone.dataset.val = activeVar; 
            zone.classList.add('filled'); 
            
            // Auto unselect var after placing to make it fluid
            clickables.forEach(c => c.classList.remove('selected'));
            activeVar = null;
        } else if (!activeVar && zone.classList.contains('filled') && !zone.closest('.code-section').classList.contains('locked')) {
            // Tap kembali pastezone yang terisi untuk menghapusnya (pengganti double-click)
            zone.textContent = defaultText[zone.id]; 
            zone.dataset.val = ""; 
            zone.classList.remove('filled'); 
        }
    });
});

// ================= INTERAKSI LAYAR SENTUH (KLIK SVG) =================
grupPembeli.addEventListener('click', () => {
    if (currentStep === 1) {
        popupText.innerHTML = "<b>KERANJANG KOSONG!</b><br><br>Belum ada data barang.<br>Uang Pembeli: Rp 0";
        popup.style.display = 'block';
    } 
    else if (currentStep === 4) {
        let jr = document.getElementById('val_jr').value; 
        let js = document.getElementById('val_js').value;
        let uang = document.getElementById('val_uang').value;
        popupText.innerHTML = `<b>DATA KERANJANG TERSIMPAN:</b><br><br>🍞 Roti: ${jr} bungkus<br>🥛 Susu: ${js} kotak<br>💵 Uang Bawaan: Rp ${uang}`;
        popup.style.display = 'block';
    }
});

grupKasir.addEventListener('click', () => {
    if (currentStep === 6) {

        let hr = parseInt(document.getElementById('val_hr').value);
        let hs = parseInt(document.getElementById('val_hs').value);
        let jr = parseInt(document.getElementById('val_jr').value);
        let js = parseInt(document.getElementById('val_js').value);
        let sapaan = document.getElementById('val_sapa').value;

        let total = (jr*hr) + (js*hs);

        updateSVGCallout(
        `"${sapaan}"
        Total Belanja:
        Rp ${total}`
        );

        printConsole("Kasir membaca fungsi total! Lanjut Step 7.");

        setTimeout(() => {
            currentStep = 7;
            applyLogic();
        }, 2500);

    }
    else if (currentStep === 8) {
        document.getElementById('runCodeBtn').click();
    }
});

document.getElementById('popup-btn').addEventListener('click', () => {
    popup.style.display = 'none';
    if(currentStep === 1) { printConsole("Inspeksi selesai. Editor Tahap 2 Terbuka."); currentStep = 2; applyLogic(); }
    if(currentStep === 4) { printConsole("Isi keranjang berhasil dibaca! Buka Editor Tahap 5."); currentStep = 5; applyLogic(); }
});

function validateEditor() {
    if (currentStep === 2) {
        let hr = parseInt(document.getElementById('val_hr').value); let uang = parseInt(document.getElementById('val_uang').value);
        if (hr > 0 && uang > 0) { printConsole("Data variabel berhasil disetup."); return true; }
        printConsole("Gagal: Harga / Uang harus lebih dari 0!", true); return false;
    }
    if (currentStep === 3) {

        let d1=document.getElementById('dz_def0').dataset.val
        let d2=document.getElementById('dz_func0').dataset.val
        let d3=document.getElementById('dz_ret0').dataset.val

        let txt=document.getElementById('val_sapa').value.trim()

        if(d1!=='def' || d2!=='menyapa():' || d3!=='return'){
        printConsole("Gagal: Susunan 'def menyapa():' salah!",true)
        return false
        }

        if(txt===""){
        printConsole("Sapaan tidak boleh kosong!",true)
        return false
        }

        printConsole("Fungsi Sapaan berhasil dirakit!")

        updateSVGCallout(
        `"${txt}"
        `
        )

        return true
        }
    if (currentStep === 5) {
        let d1=document.getElementById('dz_def1').dataset.val, d2=document.getElementById('dz_func1').dataset.val, d3=document.getElementById('dz_ret1').dataset.val;
        if(d1!=='def' || d2!=='total():' || d3!=='return') { printConsole("Gagal: Susunan 'def total():' atau 'return' salah!", true); return false; }
        
        let z1=document.getElementById('dz1').dataset.val || "", z2=document.getElementById('dz2').dataset.val || "", z3=document.getElementById('dz3').dataset.val || "", z4=document.getElementById('dz4').dataset.val || "";
        let p1 = (z1.includes('roti') && z2.includes('roti')) || (z1.includes('susu') && z2.includes('susu'));
        let p2 = (z3.includes('roti') && z4.includes('roti')) || (z3.includes('susu') && z4.includes('susu'));
        
        if (p1 && p2 && z1!==z3) { printConsole("Fungsi Total berhasil dirakit!"); return true; }
        printConsole("Gagal: Pastikan rumus kalinya (jumlah_roti*harga_roti) + (jumlah_susu*harga_susu)", true); return false;
    }
    if (currentStep === 7) {

        let d1=document.getElementById('dz_def2').dataset.val
        let d2=document.getElementById('dz_func2').dataset.val
        let d3=document.getElementById('dz_param').dataset.val
        let d4=document.getElementById('dz_ret2').dataset.val

        if(d1!=='def' || d2!=='kembalian' || d3!=='total_bayar' || d4!=='return'){
            printConsole("Gagal: Susunan fungsi kembalian salah!", true)
            return false
        }

        let ifz=document.getElementById('dz_if').dataset.val
        let elifz=document.getElementById('dz_elif').dataset.val
        let elsez=document.getElementById('dz_else').dataset.val

        if(ifz!=='if' || elifz!=='elif' || elsez!=='else:'){
            printConsole("Susunan IF ELSE salah!",true)
            return false
        }

        printConsole("Fungsi Kembalian berhasil dirakit!")

        // ===== tampilkan balon hasil kembalian =====

        let hr = parseInt(document.getElementById('val_hr').value)
        let hs = parseInt(document.getElementById('val_hs').value)
        let jr = parseInt(document.getElementById('val_jr').value)
        let js = parseInt(document.getElementById('val_js').value)
        let uang = parseInt(document.getElementById('val_uang').value)

        let total = (jr*hr)+(js*hs)

        let info=""

        if(uang>total){
            info=`Kembalian Anda:
    Rp ${uang-total}`
        }
        else if(uang<total){
            info=`Uang Anda kurang:
    Rp ${total-uang}`
        }
        else{
            info=`Uang Anda pas.
    Terima kasih!`
        }

        updateSVGCallout(
    `Transaksi Dihitung...

    Total Belanja:
    Rp ${total}

    ${info}`
    )

        return true
    }
    return true;
}

function applyLogic() {
    // Navigasi Tampilan Dot Step
    for(let i=1; i<=8; i++) {
        const dw = document.getElementById('dw'+i);
        if(dw) {
            if(i < currentStep) { dw.className = 'dot-wrapper done'; dw.querySelector('.dot').className = 'dot done'; }
            else if(i === currentStep) { dw.className = 'dot-wrapper active'; dw.querySelector('.dot').className = 'dot active'; }
            else { dw.className = 'dot-wrapper'; dw.querySelector('.dot').className = 'dot'; }
        }
        const sc = document.getElementById('stage'+i);
        if(sc) {
            if(i < currentStep) sc.className = 'stage-card done';
            else if(i === currentStep) sc.className = 'stage-card active';
            else sc.className = 'stage-card';
        }
    }

    // Navigasi Kontrol UI & Panel Kanan
    const btnNext = document.getElementById('btnNext');
    const btnAction = document.getElementById('btnAction');
    const runCodeBtn = document.getElementById('runCodeBtn');
    const sec1 = document.getElementById('sec-1');
    const sec2 = document.getElementById('sec-2');
    const sec3 = document.getElementById('sec-3');
    const sec4 = document.getElementById('sec-4');

    btnNext.style.display = 'none';
    btnAction.style.display = 'none';
    runCodeBtn.style.display = 'none';

    if (currentStep === 1) {
        btnAction.style.display = 'block';
        btnAction.textContent = 'Sentuh Pembeli di Kiri...';
        grupPembeli.classList.add('glow-active');
    } else if (currentStep === 2) {
        grupPembeli.classList.remove('glow-active');
        sec1.classList.remove('locked');
        sec1.classList.add('active');
        btnNext.style.display = 'block';
    } else if (currentStep === 3) {
        sec1.classList.remove('active');
        sec2.classList.remove('locked');
        sec2.classList.add('active');
        btnNext.style.display = 'block';
    } else if (currentStep === 4) {
        sec2.classList.remove('active');
        btnAction.style.display = 'block';
        btnAction.textContent = '⏳ Sentuh Keranjang di Kiri...';
        grupPembeli.classList.add('glow-active');
    } else if (currentStep === 5) {
        grupPembeli.classList.remove('glow-active');
        sec3.classList.remove('locked');
        sec3.classList.add('active');
        btnNext.style.display = 'block';
    } else if (currentStep === 6) {
        sec3.classList.remove('active');
        btnAction.style.display = 'block';
        btnAction.textContent = '⏳ Sentuh Kasir di Kiri...';
        grupKasir.classList.add('glow-active');
    } else if (currentStep === 7) {
        grupKasir.classList.remove('glow-active');
        sec4.classList.remove('locked');
        sec4.classList.add('active');
        btnNext.style.display = 'block';
    } else if (currentStep === 8) {
        sec4.classList.remove('active');
        btnAction.style.display = 'block';
        btnAction.textContent = '⏳ Sentuh Kasir (Eksekusi)...';
        grupKasir.classList.add('glow-active');
        runCodeBtn.style.display = 'block';
    }
}

document.getElementById('btnNext').addEventListener('click', () => {
    if (validateEditor()) {
        currentStep++;
        applyLogic();
    }
});

document.getElementById('resetCode').addEventListener('click',()=>{

    document.querySelectorAll('.pastezone').forEach(zone=>{
    zone.textContent=defaultText[zone.id]
    zone.dataset.val=""
    zone.classList.remove('filled')
    })

    document.querySelectorAll('.input-val').forEach(inp=>{
    inp.value=inp.defaultValue
    })

    consoleOut.textContent="Workspace direset. Silakan mulai kembali."

    updateSVGCallout("")

    currentStep=1
    applyLogic()

    })

document.getElementById('runCodeBtn').addEventListener('click', () => {
    if(!validateEditor()) {
        printConsole("Eksekusi digagalkan karena sintaks masih salah.", true);
        return;
    }
    
    grupKasir.classList.remove('glow-active');

    let hr = document.getElementById('val_hr').value;
    let hs = document.getElementById('val_hs').value;
    let jr = document.getElementById('val_jr').value;
    let js = document.getElementById('val_js').value;
    let uang = document.getElementById('val_uang').value;
    let sapa = document.getElementById('val_sapa').value;

    // Script Python Virtual
    const pyCode = `
    harga_roti = ${hr}
    harga_susu = ${hs}
    jumlah_roti = ${jr}
    jumlah_susu = ${js}
    uang_pembeli = ${uang}

    def menyapa():
        return "${sapa}"

    def total():
        return (jumlah_roti * harga_roti) + (jumlah_susu * harga_susu)

    def kembalian(total_bayar):

        if uang_pembeli > total_bayar:
            return f"Kembalian Anda: Rp {uang_pembeli-total_bayar}"

        elif uang_pembeli < total_bayar:
            return f"Uang Anda kurang: Rp {total_bayar-uang_pembeli}"

        else:
            return "Uang Anda pas. Terima kasih!"

    print("--- STRUK VIRTUAL ---")
    print(menyapa())

    t = total()
    print(f"Total Belanja Anda: Rp {t}")

    print(kembalian(t))
    `;

    document.getElementById('hiddenPythonCode').value = pyCode;
    printConsole("Mengeksekusi kode Python...");
    
    if (typeof window.executePythonLogic === "function") {
        window.executePythonLogic();
    } else {
        printConsole("Sistem Python belum siap, mohon tunggu beberapa saat.", true);
    }

    updateSVGCallout("TRANSAKSI\nBERHASIL!\nTerima Kasih!");
    let total=(jr*hr)+(js*hs)
    uang=parseInt(uang)

    let info=""

    if(uang>total){
    info=`Kembalian Anda:
    Rp ${uang-total}`
    }
    else if(uang<total){
    info=`Uang Anda kurang:
    Rp ${total-uang}`
    }
    else{
    info=`Uang Anda pas.
    Terima kasih!`
    }

    updateSVGCallout(
    `TRANSAKSI BERHASIL!

    ${info}`
    )
    popupText.innerHTML = "<b>HEBAT! 🎉</b><br><br>Kamu berhasil menyelesaikan simulasi dan mengeksekusi program Kasir Virtual menggunakan Python!";
    popup.style.display = 'block';
});

// Mulai inisialisasi tampilan
applyLogic();