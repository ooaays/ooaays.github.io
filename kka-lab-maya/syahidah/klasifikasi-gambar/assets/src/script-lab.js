// === Palet Warna Realistis Hewan ===
const colorsKucing = ["#f97316", "#94a3b8", "#475569", "#fcd34d", "#d1d5db", "#fb923c"];
const colorsAnjing = ["#d97706", "#78716c", "#292524", "#fef3c7", "#8b4513", "#a8a29e"];
const colorsKuda = ["#57534e", "#78716c", "#44403c", "#d6d3d1", "#8b4513", "#292524"];
const colorsSinga = ["#fbbf24", "#f59e0b", "#d97706", "#eab308", "#b45309", "#fcd34d"];

// === Generator SVG Hewan ===
function getCatSVG(color, pose) {
    let p = pose; let inner = '';
    
    if (p === 0) {
        inner = `<path d="M 130 160 C 170 160 180 110 160 90" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"/><ellipse cx="100" cy="145" rx="40" ry="45" fill="${color}" /><polygon points="55,40 50,90 95,70" fill="${color}" /><polygon points="145,40 150,90 105,70" fill="${color}" /><ellipse cx="100" cy="90" rx="50" ry="42" fill="${color}" /><circle cx="75" cy="85" r="8" fill="#fff" /><circle cx="75" cy="85" r="4" fill="#1e293b" /><circle cx="125" cy="85" r="8" fill="#fff" /><circle cx="125" cy="85" r="4" fill="#1e293b" /><polygon points="95,100 105,100 100,106" fill="#fda4af" />`;
    } else if (p === 1) {
        inner = `<g transform="translate(10, 10) rotate(15, 100, 100)"><path d="M 130 160 C 170 160 180 110 160 90" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"/><ellipse cx="100" cy="145" rx="40" ry="45" fill="${color}" /><polygon points="55,40 50,90 95,70" fill="${color}" /><polygon points="145,40 150,90 105,70" fill="${color}" /><ellipse cx="100" cy="90" rx="50" ry="42" fill="${color}" /><circle cx="75" cy="85" r="8" fill="#fff" /><circle cx="75" cy="85" r="4" fill="#1e293b" /><circle cx="125" cy="85" r="8" fill="#fff" /><circle cx="125" cy="85" r="4" fill="#1e293b" /><polygon points="95,100 105,100 100,106" fill="#fda4af" /></g>`;
    } else if (p === 2) {
        inner = `<path d="M 140 160 C 180 160 185 120 150 110" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"/><ellipse cx="105" cy="155" rx="50" ry="30" fill="${color}" /><ellipse cx="65" cy="145" rx="40" ry="35" fill="${color}" /><polygon points="35,120 30,80 65,110" fill="${color}" /><polygon points="85,110 95,70 65,100" fill="${color}" /><path d="M 45 145 Q 55 155 65 145" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/><path d="M 75 145 Q 85 155 95 145" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="155" r="3" fill="#fda4af" />`;
    } else if (p === 3) {
        inner = `<path d="M 130 100 Q 150 40 160 30" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round"/><rect x="50" y="90" width="80" height="45" rx="22" fill="${color}" /><rect x="60" y="120" width="12" height="40" rx="6" fill="${color}" /><rect x="80" y="120" width="12" height="40" rx="6" fill="${color}" /><rect x="110" y="120" width="12" height="40" rx="6" fill="${color}" /><ellipse cx="50" cy="90" rx="35" ry="30" fill="${color}" /><polygon points="25,70 20,30 50,55" fill="${color}" /><polygon points="75,70 80,30 50,55" fill="${color}" /><circle cx="40" cy="85" r="5" fill="#fff" /><circle cx="40" cy="85" r="2.5" fill="#1e293b" /><circle cx="65" cy="85" r="5" fill="#fff" /><circle cx="65" cy="85" r="2.5" fill="#1e293b" /><polygon points="50,95 56,95 53,100" fill="#fda4af" />`;
    } else if (p === 4) {
        inner = `<path d="M 130 160 C 170 160 180 110 160 90" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"/><ellipse cx="100" cy="145" rx="40" ry="45" fill="${color}" /><polygon points="55,40 50,90 95,70" fill="${color}" /><polygon points="145,40 150,90 105,70" fill="${color}" /><ellipse cx="100" cy="90" rx="50" ry="42" fill="${color}" /><ellipse cx="140" cy="120" rx="12" ry="18" fill="#fff" opacity="0.9" transform="rotate(45, 140, 120)" /><ellipse cx="85" cy="180" rx="12" ry="15" fill="#fff" opacity="0.9"/><circle cx="75" cy="85" r="8" fill="#fff" /><circle cx="75" cy="85" r="4" fill="#1e293b" /><circle cx="125" cy="85" r="8" fill="#fff" /><circle cx="125" cy="85" r="4" fill="#1e293b" /><polygon points="95,100 105,100 100,106" fill="#fda4af" />`;
    } else {
        inner = `<g transform="translate(0, 30)"><path d="M 100 120 C 140 120 150 90 140 60" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"/><ellipse cx="100" cy="100" rx="40" ry="30" fill="${color}" /><polygon points="55,0 50,50 95,30" fill="${color}" /><polygon points="145,0 150,50 105,30" fill="${color}" /><ellipse cx="100" cy="50" rx="50" ry="42" fill="${color}" /><circle cx="75" cy="45" r="8" fill="#fff" /><circle cx="75" cy="45" r="4" fill="#1e293b" /><circle cx="125" cy="45" r="8" fill="#fff" /><circle cx="125" cy="45" r="4" fill="#1e293b" /><polygon points="95,60 105,60 100,66" fill="#fda4af" /></g>`;
    }
    
    if (pose >= 4) {
        return `<svg viewBox="0 0 200 200" class="w-[85px] h-[85px] drop-shadow-sm"><circle cx="100" cy="100" r="90" fill="${color}" opacity="0.1" /><g transform="translate(200, 0) scale(-1, 1)">${inner}</g></svg>`;
    }
    return `<svg viewBox="0 0 200 200" class="w-[85px] h-[85px] drop-shadow-sm"><circle cx="100" cy="100" r="90" fill="${color}" opacity="0.1" />${inner}</svg>`;
}

function getDogSVG(color, pose) {
    let p = pose; let inner = '';
    if (p === 0) {
        inner = `<path d="M 60 180 C 60 120, 140 120, 140 180 Z" fill="${color}" /><ellipse cx="100" cy="95" rx="45" ry="40" fill="${color}" /><path d="M 65 75 C 30 70, 30 140, 50 135 C 65 130, 70 100, 70 85 Z" fill="${color}" /><path d="M 135 75 C 170 70, 170 140, 150 135 C 135 130, 130 100, 130 85 Z" fill="${color}" /><ellipse cx="100" cy="110" rx="28" ry="22" fill="#fff" opacity="0.9" /><ellipse cx="100" cy="100" rx="12" ry="8" fill="#1e293b" /><ellipse cx="80" cy="80" rx="6" ry="9" fill="#1e293b" /><ellipse cx="120" cy="80" rx="6" ry="9" fill="#1e293b" />`;
    } else if (p === 1) {
        inner = `<g transform="translate(0, 5) rotate(-5, 100, 100)"><path d="M 60 180 C 60 120, 140 120, 140 180 Z" fill="${color}" /><ellipse cx="100" cy="95" rx="45" ry="40" fill="${color}" /><path d="M 65 75 C 20 60, 10 90, 30 110 C 50 120, 70 100, 70 85 Z" fill="${color}" /><path d="M 135 75 C 180 60, 190 90, 170 110 C 150 120, 130 100, 130 85 Z" fill="${color}" /><ellipse cx="100" cy="110" rx="28" ry="22" fill="#fff" opacity="0.9" /><ellipse cx="100" cy="100" rx="12" ry="8" fill="#1e293b" /><ellipse cx="80" cy="80" rx="6" ry="9" fill="#1e293b" /><ellipse cx="120" cy="80" rx="6" ry="9" fill="#1e293b" /></g>`;
    } else if (p === 2) {
        inner = `<path d="M 60 180 C 60 120, 140 120, 140 180 Z" fill="${color}" /><ellipse cx="100" cy="95" rx="45" ry="40" fill="${color}" /><path d="M 65 75 C 30 40, 40 10, 50 35 C 60 50, 70 80, 70 85 Z" fill="${color}" /><path d="M 135 75 C 170 70, 170 140, 150 135 C 135 130, 130 100, 130 85 Z" fill="${color}" /><ellipse cx="100" cy="110" rx="28" ry="22" fill="#fff" opacity="0.9" /><path d="M 90 120 C 90 140, 110 140, 110 120 Z" fill="#f43f5e" /><ellipse cx="100" cy="100" rx="12" ry="8" fill="#1e293b" /><circle cx="80" cy="80" r="10" fill="#fff" /><circle cx="80" cy="80" r="6" fill="#1e293b" /><circle cx="120" cy="80" r="10" fill="#fff" /><circle cx="120" cy="80" r="6" fill="#1e293b" />`;
    } else if (p === 3) {
        inner = `<ellipse cx="100" cy="160" rx="60" ry="25" fill="${color}" /><ellipse cx="35" cy="165" rx="20" ry="12" fill="${color}" /><ellipse cx="165" cy="165" rx="20" ry="12" fill="${color}" /><ellipse cx="100" cy="115" rx="40" ry="35" fill="${color}" /><path d="M 65 100 C 30 95, 30 140, 50 135 C 65 130, 70 115, 70 105 Z" fill="${color}" /><path d="M 135 100 C 170 95, 170 140, 150 135 C 135 130, 130 115, 130 105 Z" fill="${color}" /><ellipse cx="100" cy="125" rx="22" ry="16" fill="#fff" opacity="0.9" /><ellipse cx="100" cy="118" rx="10" ry="6" fill="#1e293b" /><path d="M 80 100 Q 85 95 90 100" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/><path d="M 110 100 Q 115 95 120 100" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>`;
    } else if (p === 4) {
        inner = `<ellipse cx="100" cy="140" rx="35" ry="50" fill="${color}" /><ellipse cx="70" cy="180" rx="16" ry="12" fill="${color}" /><ellipse cx="130" cy="180" rx="16" ry="12" fill="${color}" /><ellipse cx="85" cy="130" rx="12" ry="20" fill="${color}" transform="rotate(30, 85, 130)" /><ellipse cx="115" cy="130" rx="12" ry="20" fill="${color}" transform="rotate(-30, 115, 130)" /><ellipse cx="100" cy="85" rx="45" ry="40" fill="${color}" /><path d="M 65 65 C 30 60, 30 130, 50 125 C 65 120, 70 90, 70 75 Z" fill="${color}" /><path d="M 135 65 C 170 60, 170 130, 150 125 C 135 120, 130 90, 130 75 Z" fill="${color}" /><ellipse cx="100" cy="100" rx="28" ry="22" fill="#fff" opacity="0.9" /><ellipse cx="100" cy="90" rx="12" ry="8" fill="#1e293b" /><ellipse cx="80" cy="70" rx="6" ry="9" fill="#1e293b" /><ellipse cx="120" cy="70" rx="6" ry="9" fill="#1e293b" />`;
    } else {
        inner = `<g transform="rotate(-15, 100, 150)"><path d="M 60 160 C 60 100, 140 80, 140 140 Z" fill="${color}" /><ellipse cx="55" cy="160" rx="16" ry="12" fill="${color}" /><ellipse cx="145" cy="140" rx="16" ry="12" fill="${color}" /><ellipse cx="100" cy="120" rx="45" ry="40" fill="${color}" /><path d="M 65 100 C 30 95, 30 165, 50 160 C 65 155, 70 125, 70 110 Z" fill="${color}" /><path d="M 135 100 C 170 95, 170 165, 150 160 C 135 155, 130 125, 130 110 Z" fill="${color}" /><ellipse cx="100" cy="135" rx="28" ry="22" fill="#fff" opacity="0.9" /><ellipse cx="100" cy="125" rx="12" ry="8" fill="#1e293b" /><ellipse cx="80" cy="105" rx="6" ry="9" fill="#1e293b" /><ellipse cx="120" cy="105" rx="6" ry="9" fill="#1e293b" /></g>`;
    }
    
    if (pose >= 4) {
        return `<svg viewBox="0 0 200 200" class="w-[85px] h-[85px] drop-shadow-sm"><circle cx="100" cy="100" r="90" fill="${color}" opacity="0.1" /><g transform="translate(200, 0) scale(-1, 1)">${inner}</g></svg>`;
    }
    return `<svg viewBox="0 0 200 200" class="w-[85px] h-[85px] drop-shadow-sm"><circle cx="100" cy="100" r="90" fill="${color}" opacity="0.1" />${inner}</svg>`;
}

function getHorseSVG(color, pose) {
    let p = pose; let inner = '';
    if (p === 0) {
        inner = `<path d="M 50 140 C 50 110, 130 110, 140 140 C 140 160, 50 160, 50 140 Z" fill="${color}" /><rect x="60" y="140" width="10" height="35" rx="4" fill="${color}" /><rect x="80" y="140" width="10" height="35" rx="4" fill="${color}" /><rect x="110" y="140" width="10" height="35" rx="4" fill="${color}" /><rect x="130" y="140" width="10" height="35" rx="4" fill="${color}" /><path d="M 120 115 C 140 70, 160 50, 155 40 C 135 30, 115 70, 110 110 Z" fill="${color}" /><ellipse cx="155" cy="55" rx="14" ry="26" fill="${color}" transform="rotate(30, 155, 55)" /><polygon points="125,40 135,20 145,40" fill="${color}" /><path d="M 115 95 C 105 75, 120 40, 130 35" fill="none" stroke="#292524" stroke-width="8" stroke-linecap="round" /><circle cx="145" cy="50" r="3" fill="#fff" /><circle cx="145" cy="50" r="2" fill="#1e293b" />`;
    } else if (p === 1) {
        inner = `<g transform="translate(-5, 0)"><path d="M 50 140 C 50 110, 130 110, 140 140 C 140 160, 50 160, 50 140 Z" fill="${color}" /><rect x="60" y="140" width="10" height="35" rx="4" fill="${color}" transform="rotate(20, 60, 140)" /><rect x="80" y="140" width="10" height="35" rx="4" fill="${color}" /><rect x="110" y="140" width="10" height="35" rx="4" fill="${color}" /><rect x="130" y="140" width="10" height="35" rx="4" fill="${color}" transform="rotate(-15, 130, 140)" /><path d="M 120 115 C 140 70, 160 50, 155 40 C 135 30, 115 70, 110 110 Z" fill="${color}" /><ellipse cx="155" cy="55" rx="14" ry="26" fill="${color}" transform="rotate(30, 155, 55)" /><polygon points="125,40 135,20 145,40" fill="${color}" /><path d="M 115 95 C 105 75, 120 40, 130 35" fill="none" stroke="#292524" stroke-width="8" stroke-linecap="round" /><circle cx="145" cy="50" r="3" fill="#fff" /><circle cx="145" cy="50" r="2" fill="#1e293b" /></g>`;
    } else if (p === 2) {
        inner = `<path d="M 50 140 C 50 110, 130 110, 140 140 C 140 160, 50 160, 50 140 Z" fill="${color}" /><rect x="60" y="140" width="10" height="35" rx="4" fill="${color}" /><rect x="80" y="140" width="10" height="35" rx="4" fill="${color}" /><rect x="110" y="140" width="10" height="35" rx="4" fill="${color}" /><rect x="130" y="140" width="10" height="35" rx="4" fill="${color}" /><g transform="translate(15, 40) rotate(55, 120, 115)"><path d="M 120 115 C 140 70, 160 50, 155 40 C 135 30, 115 70, 110 110 Z" fill="${color}" /><ellipse cx="155" cy="55" rx="14" ry="26" fill="${color}" transform="rotate(30, 155, 55)" /><polygon points="125,40 135,20 145,40" fill="${color}" /><path d="M 115 95 C 105 75, 120 40, 130 35" fill="none" stroke="#292524" stroke-width="8" stroke-linecap="round" /><circle cx="145" cy="50" r="3" fill="#fff" /><circle cx="145" cy="50" r="2" fill="#1e293b" /></g>`;
    } else if (p === 3) {
        inner = `<g transform="translate(-10, 40) rotate(-25, 100, 150)"><path d="M 50 140 C 50 110, 130 110, 140 140 C 140 160, 50 160, 50 140 Z" fill="${color}" /><rect x="60" y="140" width="10" height="35" rx="4" fill="${color}" /><rect x="80" y="140" width="10" height="35" rx="4" fill="${color}" /><path d="M 115 140 L 115 160 L 125 165 L 125 140 Z" fill="${color}" /><path d="M 135 140 L 135 160 L 145 165 L 145 140 Z" fill="${color}" /><path d="M 120 115 C 140 70, 160 50, 155 40 C 135 30, 115 70, 110 110 Z" fill="${color}" /><ellipse cx="155" cy="55" rx="14" ry="26" fill="${color}" transform="rotate(30, 155, 55)" /><polygon points="125,40 135,20 145,40" fill="${color}" /><path d="M 115 95 C 105 75, 120 40, 130 35" fill="none" stroke="#292524" stroke-width="8" stroke-linecap="round" /><circle cx="145" cy="50" r="3" fill="#fff" /><circle cx="145" cy="50" r="2" fill="#1e293b" /></g>`;
    } else if (p === 4) {
        inner = `<path d="M 60 200 C 60 120, 140 120, 140 200 Z" fill="${color}" /><path d="M 100 150 C 140 70, 160 40, 150 30 C 120 10, 90 70, 80 130 Z" fill="${color}" /><ellipse cx="150" cy="50" rx="18" ry="35" fill="${color}" transform="rotate(35, 150, 50)" /><polygon points="110,30 125,5 140,30" fill="${color}" /><path d="M 100 110 C 85 80, 110 30, 125 20" fill="none" stroke="#292524" stroke-width="12" stroke-linecap="round" /><circle cx="135" cy="45" r="5" fill="#fff" /><circle cx="135" cy="45" r="3" fill="#1e293b" />`;
    } else {
        inner = `<path d="M 40 160 C 40 130, 140 130, 150 160 Z" fill="${color}" /><rect x="50" y="150" width="30" height="10" rx="4" fill="${color}" transform="rotate(-20, 50, 150)" /><rect x="110" y="150" width="30" height="10" rx="4" fill="${color}" /><path d="M 140 140 C 160 100, 170 80, 160 70 C 140 60, 120 100, 110 130 Z" fill="${color}" /><ellipse cx="160" cy="85" rx="10" ry="20" fill="${color}" transform="rotate(30, 160, 85)" /><polygon points="140,65 150,45 160,65" fill="${color}" /><path d="M 135 115 C 125 95, 140 65, 150 60" fill="none" stroke="#292524" stroke-width="6" stroke-linecap="round" /><circle cx="155" cy="75" r="3" fill="#fff" /><circle cx="155" cy="75" r="2" fill="#1e293b" />`;
    }
    
    if (pose >= 4) {
        return `<svg viewBox="0 0 200 200" class="w-[85px] h-[85px] drop-shadow-sm"><circle cx="100" cy="100" r="90" fill="${color}" opacity="0.1" /><g transform="translate(200, 0) scale(-1, 1)">${inner}</g></svg>`;
    }
    return `<svg viewBox="0 0 200 200" class="w-[85px] h-[85px] drop-shadow-sm"><circle cx="100" cy="100" r="90" fill="${color}" opacity="0.1" />${inner}</svg>`;
}

function getLionSVG(color, pose) {
    let p = pose; let inner = '';
    if (p === 0) {
        inner = `<ellipse cx="100" cy="145" rx="45" ry="35" fill="${color}" /><path d="M 100 25 C 150 25, 165 60, 155 105 C 145 135, 60 135, 45 105 C 35 60, 50 25, 100 25 Z" fill="#b45309" /><circle cx="100" cy="85" r="35" fill="${color}" /><circle cx="75" cy="65" r="10" fill="${color}" /><circle cx="125" cy="65" r="10" fill="${color}" /><circle cx="85" cy="80" r="5" fill="#fff" /><circle cx="85" cy="80" r="3" fill="#1e293b" /><circle cx="115" cy="80" r="5" fill="#fff" /><circle cx="115" cy="80" r="3" fill="#1e293b" /><polygon points="95,95 105,95 100,103" fill="#451a03" />`;
    } else if (p === 1) {
        inner = `<g transform="translate(5, 0) rotate(10, 100, 100)"><ellipse cx="100" cy="145" rx="45" ry="35" fill="${color}" /><path d="M 100 25 C 150 25, 165 60, 155 105 C 145 135, 60 135, 45 105 C 35 60, 50 25, 100 25 Z" fill="#b45309" /><circle cx="100" cy="85" r="35" fill="${color}" /><circle cx="75" cy="65" r="10" fill="${color}" /><circle cx="125" cy="65" r="10" fill="${color}" /><circle cx="85" cy="80" r="5" fill="#fff" /><circle cx="85" cy="80" r="3" fill="#1e293b" /><circle cx="115" cy="80" r="5" fill="#fff" /><circle cx="115" cy="80" r="3" fill="#1e293b" /><polygon points="95,95 105,95 100,103" fill="#451a03" /></g>`;
    } else if (p === 2) {
        inner = `<ellipse cx="100" cy="145" rx="45" ry="35" fill="${color}" /><path d="M 100 15 C 160 15, 175 60, 165 115 C 150 145, 55 145, 35 115 C 25 60, 40 15, 100 15 Z" fill="#b45309" /><circle cx="100" cy="85" r="35" fill="${color}" /><circle cx="75" cy="65" r="10" fill="${color}" /><circle cx="125" cy="65" r="10" fill="${color}" /><path d="M 75 75 L 90 82" stroke="#1e293b" stroke-width="3" /><path d="M 125 75 L 110 82" stroke="#1e293b" stroke-width="3" /><circle cx="85" cy="85" r="3" fill="#1e293b" /><circle cx="115" cy="85" r="3" fill="#1e293b" /><ellipse cx="100" cy="110" rx="10" ry="14" fill="#451a03" /><path d="M 92 110 Q 100 100 108 110" fill="none" stroke="#fff" stroke-width="3" />`;
    } else if (p === 3) {
        inner = `<ellipse cx="100" cy="155" rx="60" ry="25" fill="${color}" /><ellipse cx="60" cy="165" rx="15" ry="10" fill="${color}" /><ellipse cx="140" cy="165" rx="15" ry="10" fill="${color}" /><path d="M 100 45 C 140 45, 150 75, 140 115 C 130 140, 70 140, 60 115 C 50 75, 60 45, 100 45 Z" fill="#b45309" /><circle cx="100" cy="100" r="30" fill="${color}" /><circle cx="80" cy="80" r="8" fill="${color}" /><circle cx="120" cy="80" r="8" fill="${color}" /><circle cx="90" cy="95" r="4" fill="#fff" /><circle cx="90" cy="95" r="2" fill="#1e293b" /><circle cx="110" cy="95" r="4" fill="#fff" /><circle cx="110" cy="95" r="2" fill="#1e293b" /><polygon points="95,105 105,105 100,110" fill="#451a03" />`;
    } else if (p === 4) {
        inner = `<rect x="50" y="120" width="80" height="40" rx="20" fill="${color}" /><rect x="60" y="150" width="12" height="30" rx="6" fill="${color}" /><rect x="75" y="150" width="12" height="25" rx="6" fill="${color}" /><rect x="110" y="150" width="12" height="30" rx="6" fill="${color}" /><path d="M 50 130 Q 30 130 20 100" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" /><circle cx="130" cy="110" r="35" fill="#b45309" /><circle cx="130" cy="110" r="25" fill="${color}" /><circle cx="115" cy="105" r="4" fill="#fff" /><circle cx="115" cy="105" r="2" fill="#1e293b" /><circle cx="145" cy="105" r="4" fill="#fff" /><circle cx="145" cy="105" r="2" fill="#1e293b" /><polygon points="125,115 135,115 130,120" fill="#451a03" />`;
    } else {
        inner = `<ellipse cx="100" cy="165" rx="55" ry="25" fill="${color}" /><ellipse cx="60" cy="175" rx="15" ry="10" fill="${color}" /><path d="M 140 165 C 160 165, 170 140, 150 130" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round" /><circle cx="90" cy="150" r="35" fill="#b45309" /><circle cx="90" cy="150" r="25" fill="${color}" /><path d="M 75 145 Q 80 150 85 145" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/><path d="M 95 145 Q 100 150 105 145" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/><polygon points="87,155 93,155 90,160" fill="#451a03" />`;
    }
    
    if (pose >= 4) {
        return `<svg viewBox="0 0 200 200" class="w-[85px] h-[85px] drop-shadow-sm"><circle cx="100" cy="100" r="90" fill="${color}" opacity="0.1" /><g transform="translate(200, 0) scale(-1, 1)">${inner}</g></svg>`;
    }
    return `<svg viewBox="0 0 200 200" class="w-[85px] h-[85px] drop-shadow-sm"><circle cx="100" cy="100" r="90" fill="${color}" opacity="0.1" />${inner}</svg>`;
}

// === GENERATOR HEWAN BARU UNTUK FASE UJI ===
function getRabbitSVG() {
    let inner = `
        <ellipse cx="100" cy="150" rx="40" ry="30" fill="#ffffff" />
        <ellipse cx="70" cy="160" rx="15" ry="10" fill="#ffffff" />
        <ellipse cx="130" cy="160" rx="20" ry="12" fill="#ffffff" />
        <ellipse cx="100" cy="110" rx="25" ry="25" fill="#ffffff" />
        <ellipse cx="90" cy="60" rx="8" ry="30" fill="#ffffff" />
        <ellipse cx="90" cy="60" rx="4" ry="20" fill="#fbcfe8" />
        <ellipse cx="110" cy="60" rx="8" ry="30" fill="#ffffff" />
        <ellipse cx="110" cy="60" rx="4" ry="20" fill="#fbcfe8" />
        <circle cx="90" cy="105" r="4" fill="#1e293b" />
        <circle cx="110" cy="105" r="4" fill="#1e293b" />
        <polygon points="98,115 102,115 100,118" fill="#fca5a5" />
    `;
    return `<svg viewBox="0 0 200 200" class="w-[85px] h-[85px] drop-shadow-sm"><circle cx="100" cy="100" r="90" fill="#cbd5e1" opacity="0.5" />${inner}</svg>`;
}

function getCowSVG() {
    let inner = `
        <rect x="50" y="100" width="90" height="50" rx="20" fill="#fff" />
        <path d="M 70 100 Q 80 120 90 100 Z" fill="#1e293b" />
        <path d="M 110 130 Q 120 150 130 130 Z" fill="#1e293b" />
        <rect x="60" y="140" width="12" height="30" rx="4" fill="#fff" />
        <rect x="110" y="140" width="12" height="30" rx="4" fill="#fff" />
        <rect x="140" y="80" width="40" height="40" rx="15" fill="#fff" />
        <ellipse cx="160" cy="110" rx="15" ry="12" fill="#fca5a5" />
        <circle cx="150" cy="95" r="4" fill="#1e293b" />
        <circle cx="170" cy="95" r="4" fill="#1e293b" />
        <polygon points="140,80 145,65 150,80" fill="#f1f5f9" />
        <polygon points="170,80 175,65 180,80" fill="#f1f5f9" />
        <path d="M 145 75 Q 150 60 155 75" fill="none" stroke="#1e293b" stroke-width="3" />
        <path d="M 165 75 Q 170 60 175 75" fill="none" stroke="#1e293b" stroke-width="3" />
    `;
    return `<svg viewBox="0 0 200 200" class="w-[85px] h-[85px] drop-shadow-sm"><circle cx="100" cy="100" r="90" fill="#4ade80" opacity="0.3" />${inner}</svg>`;
}

function getDuckSVG() {
    let inner = `
        <path d="M 60 140 C 60 170, 140 170, 150 130 C 130 130, 90 120, 60 140 Z" fill="#fde047" />
        <circle cx="140" cy="90" r="25" fill="#fde047" />
        <path d="M 160 90 Q 180 95 160 100 Z" fill="#f97316" />
        <circle cx="145" cy="85" r="4" fill="#1e293b" />
        <path d="M 90 135 C 110 135, 120 145, 110 155 C 90 155, 80 145, 90 135 Z" fill="#fef08a" />
        <rect x="80" y="160" width="6" height="15" fill="#f97316" />
        <rect x="110" y="160" width="6" height="15" fill="#f97316" />
    `;
    return `<svg viewBox="0 0 200 200" class="w-[85px] h-[85px] drop-shadow-sm"><circle cx="100" cy="100" r="90" fill="#22d3ee" opacity="0.3" />${inner}</svg>`;
}

// === KARTU NOISE (Jebakan Benda Mati) ===
function getNoiseSVG(type) {
    let inner = '';
    if (type === 'apple') {
        inner = `
            <path d="M100 35 Q110 20 125 25" stroke="#166534" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path d="M125 25 C100 40 90 20 100 35" fill="#22c55e" />
            <ellipse cx="100" cy="115" rx="45" ry="45" fill="#ef4444" />
            <path d="M75 100 Q65 110 75 125" stroke="#fca5a5" stroke-width="4" stroke-linecap="round" fill="none"/>
        `;
    } else { // Car
        inner = `
            <path d="M 40 110 L 45 80 L 80 60 L 130 60 L 155 80 L 160 110 Z" fill="#ef4444" />
            <path d="M 30 110 L 170 110 L 170 140 L 30 140 Z" fill="#dc2626" />
            <circle cx="65" cy="140" r="15" fill="#1e293b" /><circle cx="65" cy="140" r="6" fill="#cbd5e1" />
            <circle cx="135" cy="140" r="15" fill="#1e293b" /><circle cx="135" cy="140" r="6" fill="#cbd5e1" />
            <polygon points="50,85 80,65 95,65 95,85" fill="#e0f2fe" />
            <polygon points="105,65 125,65 150,85 105,85" fill="#e0f2fe" />
        `;
    }
    return `<svg viewBox="0 0 200 200" class="w-[85px] h-[85px] drop-shadow-sm"><circle cx="100" cy="100" r="90" fill="#f1f5f9" opacity="0.5" />${inner}</svg>`;
}

// === Konfigurasi Kategori ===
const catConfig = { id: 1, name: 'Kucing', icon: '🐱', svg: getCatSVG, colors: colorsKucing, theme: { bg: 'bg-orange-50', border: 'border-orange-100', textLabel: 'text-orange-400', textCount: 'text-orange-600', textTitle: 'text-orange-500', barGradient: 'from-orange-400 to-orange-500', dropClass: 'drop-zone-kucing' } };
const dogConfig = { id: 2, name: 'Anjing', icon: '🐶', svg: getDogSVG, colors: colorsAnjing, theme: { bg: 'bg-rose-50', border: 'border-rose-100', textLabel: 'text-rose-400', textCount: 'text-rose-600', textTitle: 'text-rose-500', barGradient: 'from-rose-400 to-rose-500', dropClass: 'drop-zone-anjing' } };
const horseConfig = { id: 3, name: 'Kuda', icon: '🐴', svg: getHorseSVG, colors: colorsKuda, theme: { bg: 'bg-stone-50', border: 'border-stone-200', textLabel: 'text-stone-500', textCount: 'text-stone-700', textTitle: 'text-stone-600', barGradient: 'from-stone-400 to-stone-500', dropClass: 'drop-zone-kuda' } };
const lionConfig = { id: 4, name: 'Singa', icon: '🦁', svg: getLionSVG, colors: colorsSinga, theme: { bg: 'bg-yellow-50', border: 'border-yellow-200', textLabel: 'text-yellow-500', textCount: 'text-yellow-700', textTitle: 'text-yellow-500', barGradient: 'from-yellow-400 to-yellow-500', dropClass: 'drop-zone-singa' } };

const levels = {
    1: { title: 'Level 1', cats: [catConfig, dogConfig] },
    2: { title: 'Level 2', cats: [horseConfig, lionConfig] },
    3: { title: 'Level 3', cats: [catConfig, dogConfig, horseConfig, lionConfig] }
};

// === State Variables ===
let selectedCard = null;
let currentLevel = 1;
let trainingAccuracy = {}; 
let globalCardId = 0;
let noiseMistakes = 0;
window.predictionInterval = null;

// === FUNGSI UTAMA ===
function goToLevel(lv) {
    if (!levels[lv]) return;
    currentLevel = lv;
    const currentCats = levels[currentLevel].cats;
    
    document.getElementById('level-badge').innerHTML = `Level ${lv}`;
    document.getElementById('eval-level-num').innerText = currentLevel;
    
    document.getElementById('stats-container').innerHTML = currentCats.map(c => `
        <div id="stat${c.id}-bg" class="${c.theme.bg} px-4 py-2 rounded-xl border ${c.theme.border} text-center flex-1 min-w-[80px]">
            <span class="block text-[10px] sm:text-xs font-bold ${c.theme.textLabel} uppercase tracking-wider">${c.name}</span>
            <span id="count${c.id}" class="text-xl sm:text-2xl font-black ${c.theme.textCount}">0</span>
        </div>
    `).join('');

    const gridCols = currentCats.length > 2 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2';
    document.getElementById('drop-zones-container').className = `grid grid-cols-1 ${gridCols} gap-6 mb-10`;
    document.getElementById('drop-zones-container').innerHTML = currentCats.map(c => `
        <div class="bg-white p-4 rounded-[32px] shadow-sm border border-slate-100 relative">
            <div class="text-center mb-4 mt-2">
                <h3 class="text-xl sm:text-2xl font-bold ${c.theme.textTitle} flex justify-center items-center gap-2">${c.icon} ${c.name}</h3>
            </div>
            <div class="drop-zone ${c.theme.dropClass}" id="kotak${c.id}" onclick="placeCard('${c.id}')"></div>
        </div>
    `).join('');

    document.getElementById('prediction-bars').innerHTML = currentCats.map(c => `
        <div>
            <div class="flex justify-between mb-2">
                <span class="font-bold ${c.theme.textCount}">${c.name}</span>
                <span id="pct${c.id}Text" class="font-bold ${c.theme.textCount}">0%</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-6 overflow-hidden border border-slate-200">
                <div id="bar${c.id}" class="bg-gradient-to-r ${c.theme.barGradient} h-6 rounded-full progress-fill w-0"></div>
            </div>
        </div>
    `).join('');

    resetLevelState();
}

function resetLevelState() {
    trainingAccuracy = {};
    selectedCard = null;
    noiseMistakes = 0;
    if(window.predictionInterval) clearInterval(window.predictionInterval);
    
    document.getElementById('fase-training').style.display = 'block';
    document.getElementById('deteksi-area').classList.add('hidden');
    document.getElementById('hasil-prediksi').classList.add('hidden'); 
    document.getElementById('action-buttons-eval').classList.add('hidden');
    
    setStepper(1);
    initCards();
}

function setStepper(step) {
    for(let i=1; i<=4; i++) {
        let circle = document.getElementById(`step${i}-circle`);
        let text = document.getElementById(`step${i}-text`);
        let line = document.getElementById(`line${i}`);
        
        if (!circle) continue;
        
        if (i < step) {
            circle.className = "step-circle w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold z-10";
            circle.innerHTML = "✓";
            text.className = "text-sm mt-2 text-indigo-600 font-bold text-center";
            if(line) line.classList.add('active');
        } else if (i === step) {
            circle.className = "step-circle w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg ring-4 ring-indigo-50 font-bold z-10 animate-pulse";
            circle.innerHTML = i;
            text.className = "text-sm mt-2 text-indigo-600 font-black text-center";
            if(line) line.classList.remove('active');
        } else {
            circle.className = "step-circle w-10 h-10 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold z-10";
            circle.innerHTML = i;
            text.className = "text-sm mt-2 text-slate-400 text-center";
            if(line) line.classList.remove('active');
        }
    }
}

function initCards() {
    const currentCats = levels[currentLevel].cats;
    const container = document.getElementById('sampleCards');
    container.innerHTML = '';
    
    const cardsPerCat = currentLevel === 3 ? 2 : 4; 
    
    // Training data uses poses 0 to 3
    currentCats.forEach(cat => {
        for(let i=0; i<cardsPerCat; i++) {
            let color = cat.colors[i % cat.colors.length];
            container.innerHTML += `<div id="train-card-${globalCardId++}" class="animal-card" data-type="${cat.id}" onclick="selectCard(this)">${cat.svg(color, i)}</div>`;
        }
    });

    container.innerHTML += `<div id="train-card-${globalCardId++}" class="animal-card" data-type="noise" onclick="selectCard(this)">${getNoiseSVG('apple')}</div>`;
    container.innerHTML += `<div id="train-card-${globalCardId++}" class="animal-card" data-type="noise" onclick="selectCard(this)">${getNoiseSVG('car')}</div>`;

    for (let i = container.children.length; i >= 0; i--) {
        container.appendChild(container.children[Math.random() * i | 0]);
    }
}

function selectCard(el){
    if(el.classList.contains('disabled')) return;
    document.querySelectorAll('.animal-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    selectedCard = el;
}

function placeCard(categoryId){
    if(!selectedCard){ 
        alert("Pilih satu gambar di atas terlebih dahulu!"); 
        return; 
    }
    
    const originalId = selectedCard.id;
    const cloned = selectedCard.cloneNode(true);
    cloned.classList.remove('selected', 'disabled');
    cloned.classList.add('placed'); 
    cloned.removeAttribute('id');
    cloned.onclick = null; 
    
    const removeBtn = document.createElement('div');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '✕';
    removeBtn.onclick = (e) => {
        e.stopPropagation(); 
        removePlacedCard(originalId, cloned);
    };
    cloned.appendChild(removeBtn);

    const targetBox = document.getElementById(`kotak${categoryId}`);
    targetBox.appendChild(cloned);
    
    selectedCard.dataset.placed = categoryId;
    selectedCard.classList.add('disabled');
    selectedCard.classList.remove('selected');
    selectedCard = null;

    updateCounts();
}

function removePlacedCard(originalId, cloneEl) {
    cloneEl.remove();
    const originalCard = document.getElementById(originalId);
    if(originalCard) {
        originalCard.classList.remove('disabled');
        delete originalCard.dataset.placed;
    }
    updateCounts();
}

function updateCounts() {
    const currentCats = levels[currentLevel].cats;
    currentCats.forEach(c => {
        const count = document.querySelectorAll(`#kotak${c.id} .animal-card.placed`).length;
        document.getElementById(`count${c.id}`).innerText = count;
    });
}

function checkDataBeforeTraining() {
    const cards = document.querySelectorAll('#sampleCards .animal-card');
    let totalPlaced = 0;
    cards.forEach(c => { if(c.dataset.placed) totalPlaced++; });

    if(totalPlaced < (currentLevel === 3 ? 6 : 4)){ 
        alert("Kelompokkan lebih banyak gambar agar KA punya cukup data untuk belajar!"); 
        return; 
    }
    document.getElementById('modal-disclaimer').classList.remove('hidden');
}

function closeDisclaimer() {
    document.getElementById('modal-disclaimer').classList.add('hidden');
}

function startTrainingAnimation() {
    closeDisclaimer();
    setStepper(2); 
    document.getElementById('fase-training').style.display = 'none';
    
    const animModal = document.getElementById('modal-training-anim');
    animModal.classList.remove('hidden');
    
    const desc = document.getElementById('training-anim-desc');
    const bar = document.getElementById('training-progress-bar');
    
    setTimeout(() => { desc.innerText = "Mengubah gambar menjadi angka piksel..."; bar.style.width = '25%'; }, 1000);
    setTimeout(() => { desc.innerText = "Mendeteksi Garis, Pola, & Bentuk Dasar..."; bar.style.width = '50%'; }, 3500);
    setTimeout(() => { desc.innerText = "Menganalisis sebaran Warna & Bentuk..."; bar.style.width = '80%'; }, 6000);
    setTimeout(() => { desc.innerText = "Selesai menyusun kecerdasan matematis!"; bar.style.width = '100%'; }, 8500);
    
    setTimeout(() => {
        animModal.classList.add('hidden');
        processTrainingLogic();
        setStepper(3);
        document.getElementById('deteksi-area').classList.remove('hidden');
    }, 9500);
}

function processTrainingLogic(){
    const currentCats = levels[currentLevel].cats;
    const cards = document.querySelectorAll('#sampleCards .animal-card');
    
    let placedCounts = {};
    let categoryTotals = {};
    noiseMistakes = 0;

    cards.forEach(c => {
        let t = c.dataset.type; 
        if (t !== 'noise') {
            categoryTotals[t] = (categoryTotals[t] || 0) + 1;
        }
        if(c.dataset.placed) {
            if (t === 'noise') {
                noiseMistakes++;
            } else if(c.dataset.placed === t) {
                placedCounts[t] = (placedCounts[t] || 0) + 1;
            }
        }
    });

    currentCats.forEach(cat => {
        let correct = placedCounts[cat.id.toString()] || 0;
        let total = categoryTotals[cat.id.toString()] || 1;
        
        let baseAcc = correct / total;
        let penalty = noiseMistakes * 0.15; 
        let finalAcc = baseAcc - penalty;
        if (finalAcc < 0) finalAcc = 0;
        trainingAccuracy[cat.id] = finalAcc;
    });

    const testContainer = document.getElementById('testCards');
    testContainer.innerHTML = '';
    
    // Generate data testing 
    if (currentLevel === 1) {
        testContainer.innerHTML += `<div class="animal-card" onclick="startPrediction(this, 1)">${getCatSVG(colorsKucing[4], 4)}</div>`;
        testContainer.innerHTML += `<div class="animal-card" onclick="startPrediction(this, 1)">${getCatSVG(colorsKucing[5], 5)}</div>`;
        testContainer.innerHTML += `<div class="animal-card" onclick="startPrediction(this, 2)">${getDogSVG(colorsAnjing[4], 4)}</div>`;
        testContainer.innerHTML += `<div class="animal-card" onclick="startPrediction(this, 'Anomali')">${getRabbitSVG()}</div>`;
    } else if (currentLevel === 2) {
        testContainer.innerHTML += `<div class="animal-card" onclick="startPrediction(this, 3)">${getHorseSVG(colorsKuda[4], 4)}</div>`;
        testContainer.innerHTML += `<div class="animal-card" onclick="startPrediction(this, 4)">${getLionSVG(colorsSinga[4], 4)}</div>`;
        testContainer.innerHTML += `<div class="animal-card" onclick="startPrediction(this, 4)">${getLionSVG(colorsSinga[5], 5)}</div>`;
        testContainer.innerHTML += `<div class="animal-card" onclick="startPrediction(this, 'Anomali')">${getCowSVG()}</div>`;
    } else {
        testContainer.innerHTML += `<div class="animal-card" onclick="startPrediction(this, 1)">${getCatSVG(colorsKucing[4], 4)}</div>`;
        testContainer.innerHTML += `<div class="animal-card" onclick="startPrediction(this, 2)">${getDogSVG(colorsAnjing[5], 5)}</div>`;
        testContainer.innerHTML += `<div class="animal-card" onclick="startPrediction(this, 3)">${getHorseSVG(colorsKuda[4], 4)}</div>`;
        testContainer.innerHTML += `<div class="animal-card" onclick="startPrediction(this, 'Anomali')">${getDuckSVG()}</div>`;
    }
}

function startPrediction(cardEl, actualType) {
    document.querySelectorAll('#testCards .animal-card').forEach(c => c.classList.remove('selected'));
    cardEl.classList.add('selected');

    document.getElementById('hasil-prediksi').classList.remove('hidden');
    document.getElementById('prediction-results').classList.add('hidden');
    document.getElementById('laporanAI').classList.add('hidden');
    document.getElementById('explanation-box').classList.add('hidden');
    document.getElementById('ai-thinking-box').classList.remove('hidden');
    document.getElementById('action-buttons-eval').classList.add('hidden');

    const currentCats = levels[currentLevel].cats;
    currentCats.forEach(c => {
        document.getElementById(`bar${c.id}`).style.width = '0%';
        document.getElementById(`pct${c.id}Text`).innerText = '0%';
    });

    const steps = ['step-feature-1', 'step-feature-2', 'step-feature-3'];
    steps.forEach(s => {
        const el = document.getElementById(s);
        if(el) {
            el.classList.add('opacity-50', 'bg-slate-100');
            el.classList.remove('bg-indigo-100', 'ring-2', 'ring-indigo-400', 'shadow-md', 'scale-110');
        }
    });
    
    if(window.predictionInterval) clearInterval(window.predictionInterval);
    let stepIndex = 0;
    
    window.predictionInterval = setInterval(() => {
        if(stepIndex > 0) {
            let prevEl = document.getElementById(steps[stepIndex-1]);
            if(prevEl) {
                prevEl.classList.remove('bg-indigo-100', 'ring-2', 'ring-indigo-400', 'shadow-md', 'scale-110');
                prevEl.classList.add('bg-slate-100');
            }
        }
        if(stepIndex < steps.length) {
            let el = document.getElementById(steps[stepIndex]);
            if(el) {
                el.classList.remove('opacity-50', 'bg-slate-100');
                el.classList.add('bg-indigo-100', 'ring-2', 'ring-indigo-400', 'shadow-md', 'scale-110');
            }
            stepIndex++;
        } else {
            clearInterval(window.predictionInterval);
            showResult(actualType); 
        }
    }, 700); 
}

function showResult(actualType) {
    document.getElementById('ai-thinking-box').classList.add('hidden');
    document.getElementById('prediction-results').classList.remove('hidden');
    setStepper(4); 

    const currentCats = levels[currentLevel].cats;
    let probabilities = {};

    let isRealAnomaly = (actualType === 'Anomali');
    let baseConfidence = Math.floor(Math.random() * 15) + 75;
    
    if (isRealAnomaly) {
        let closestCat = currentCats[Math.floor(Math.random() * currentCats.length)];
        let anomalyConfidence = Math.floor(Math.random() * 20) + 45; 
        probabilities[closestCat.id] = anomalyConfidence;
        let remaining = 100 - anomalyConfidence;
        let otherCats = currentCats.filter(c => c.id !== closestCat.id);
        otherCats.forEach((c, idx) => {
            if (idx === otherCats.length - 1) probabilities[c.id] = remaining;
            else {
                let val = Math.floor(Math.random() * remaining * 0.7);
                probabilities[c.id] = val;
                remaining -= val;
            }
        });
    } else {
        let multiplier = 0.3 + (0.7 * (trainingAccuracy[actualType] || 0)); 
        let finalMainPct = Math.floor(baseConfidence * multiplier);
        probabilities[actualType] = finalMainPct;
        let remaining = 100 - finalMainPct;

        let otherCats = currentCats.filter(c => c.id !== actualType);
        otherCats.forEach((c, idx) => {
            if (idx === otherCats.length - 1) probabilities[c.id] = remaining;
            else {
                let val = Math.floor(Math.random() * remaining);
                probabilities[c.id] = val;
                remaining -= val;
            }
        });
    }

    let maxPct = -1;
    let maxCatId = null;

    setTimeout(() => {
        currentCats.forEach(c => {
            let pct = probabilities[c.id];
            document.getElementById(`bar${c.id}`).style.width = pct + "%";
            document.getElementById(`pct${c.id}Text`).innerText = pct + "%";
            if(pct > maxPct) { maxPct = pct; maxCatId = c.id; }
        });
        
        const finalDecisionEl = document.getElementById('final-decision');
        let winningCat = currentCats.find(c => c.id === maxCatId);
        
        finalDecisionEl.innerHTML = `<span class='${winningCat.theme.textTitle}'>${winningCat.name.toUpperCase()}</span>`;

        const explainBox = document.getElementById('explanation-box');
        const explainText = document.getElementById('explanation-text');
        
        let alasan = "";
        let sisaPersen = 100 - maxPct;

        if (noiseMistakes > 0) {
            alasan = `Akurasi KA dipengaruhi oleh <b>${noiseMistakes} data tidak relevan </b> yang dimasukkan ke kotak hewan di tahap latih. KA mendeteksi pola dari benda tersebut sebagai ciri-ciri hewan, yang menyebabkan hasil prediksi menjadi tidak akurat.`;
        } else if (isRealAnomaly) {
            alasan = `Gambar ini adalah <b>Data Baru</b> yang belum pernah diajarkan. KA memecah gambar dan mencari pola <b>garis, warna, dan bentuk</b>. Karena pola pada gambar ini tidak memiliki kecocokan yang kuat dengan data latih, KA mendeteksi kemiripan terdekat dengan <b>${winningCat.name}</b> sebesar ${maxPct}%.`;
        } else {
            alasan = `AI mendeteksi gambar ini sebagai <b>${winningCat.name}</b> dengan tingkat kecocokan <b>${maxPct}%</b>. KA membandingkan komposisi <b>pola garis, warna, dan bentuk</b> pada gambar ini dengan data latih yang kamu berikan. Sisa ${sisaPersen}% didistribusikan ke kategori lain karena adanya kemiripan sebagian kecil pola warna atau garis dengan hewan lain.`;
        }
        
        explainText.innerHTML = alasan;
        explainBox.classList.remove('hidden');

        document.getElementById('action-buttons-eval').classList.remove('hidden');
        
        const btnNext = document.getElementById('btn-next-level');
        btnNext.classList.remove('hidden');
        
        if (currentLevel < 3) {
            btnNext.innerHTML = `Lanjut ke Level ${currentLevel + 1}`;
            btnNext.onclick = () => goToLevel(currentLevel + 1);
        } else {
            btnNext.innerHTML = `Selesai & Lihat Refleksi`;
            btnNext.onclick = () => showReflection();
        }

    }, 100);

    const laporanBox = document.getElementById('laporanAI');
    laporanBox.classList.remove('hidden');
    
    const accuracyHtml = currentCats.map(c => {
        let acc = Math.round((trainingAccuracy[c.id] || 0) * 100);
        return `
            <div class="${c.theme.bg} p-4 rounded-2xl border ${c.theme.border} text-center">
                <p class="text-xs ${c.theme.textCount} font-semibold mb-1">Akurasi Latihan ${c.name}</p>
                <p class="text-3xl font-black ${c.theme.textTitle}">${acc}%</p>
            </div>
        `;
    }).join('');
    
    document.getElementById('accuracy-report').innerHTML = accuracyHtml;
}

function resetLevel(){
    const currentCats = levels[currentLevel].cats;
    currentCats.forEach(c => {
        const kotak = document.getElementById(`kotak${c.id}`);
        if(kotak) kotak.innerHTML = ''; 
        const count = document.getElementById(`count${c.id}`);
        if(count) count.innerText = '0';
    });
    resetLevelState();
}

function showReflection() {
    document.getElementById('modal-reflection').classList.remove('hidden');
}

goToLevel(1);