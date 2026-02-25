let peso = 5;
const AUMENTO = 2;
const BAJADA = 2;

const etapas = [
    { min: 0, gif: 'assets/img/gato-atletico.gif', audio: 'assets/audio/gato-atletico.mp3', estado: '⚡ ATLETICO', msg: '¡Gato olímpico!', color: '#4dffb4' },
    { min: 8, gif: 'assets/img/gato-normal.gif', audio: 'assets/audio/gato-normal.mp3', estado: '✅ NORMAL', msg: 'Peso ideal', color: '#00f5ff' },
    { min: 14, gif: 'assets/img/gato-gordito.gif', audio: 'assets/audio/gato-gordito.mp3', estado: '😋 GORDITO', msg: 'Un poco relleno...', color: '#ffe94d' },
    { min: 22, gif: 'assets/img/gato-gordo.gif', audio: 'assets/audio/gato-gordo.mp3', estado: '🍔 GORDO', msg: 'Demasiadas hamburguesas', color: '#ff8c42' },
    { min: 32, gif: 'assets/img/gato-muygordo.gif', audio: 'assets/audio/gato-muygordo.mp3', estado: '😰 MUY GORDO', msg: '¡Para de comer!!', color: '#ff6644' },
    { min: 45, gif: 'assets/img/gato-obeso.gif', audio: 'assets/audio/gato-obeso.mp3', estado: '💀 OBESO', msg: 'El gato necesita ayuda', color: '#ff4466' },
];

let audioActual = new Audio();
audioActual.loop = true;
audioActual.volume = 0.6;
let audioMuted = false;
let etapaActualIdx = -1;

function cambiarAudio(src) {
    if (audioMuted) return;
    if (audioActual.src.endsWith(src)) return;
    audioActual.pause();
    audioActual.src = src;
    audioActual.currentTime = 0;
    audioActual.play().catch(() => { });
}

function toggleAudio() {
    const btn = document.querySelector('#btn-audio');
    audioMuted = !audioMuted;
    if (audioMuted) {
        audioActual.pause();
        btn.textContent = '🔇 SONIDO OFF';
        btn.classList.add('muted');
    } else {
        const etapa = obtenerEtapa();
        audioActual.src = etapa.audio;
        audioActual.play().catch(() => { });
        btn.textContent = '🔊 SONIDO ON';
        btn.classList.remove('muted');
    }
}

const elPeso = document.querySelector('#peso');
const elTotal = document.querySelector('#total');
const elCatEmoji = document.querySelector('#cat-emoji');
const elCatStatus = document.querySelector('#cat-status-text');
const elMensaje = document.querySelector('#mensaje');
const elBarFit = document.querySelector('#bar-fit');
const elBarFat = document.querySelector('#bar-fat');
const elHistorial = document.querySelector('#historial');

function obtenerEtapa() {
    let etapa = etapas[0];
    for (const e of etapas) {
        if (peso >= e.min) etapa = e;
    }
    return etapa;
}

function actualizarDOM() {
    const etapa = obtenerEtapa();
    const idx = etapas.indexOf(etapa);

    elPeso.innerHTML = peso;
    elTotal.innerHTML = peso + ' kg';

    elCatEmoji.src = etapa.gif;

    elCatStatus.innerHTML = etapa.estado;
    elCatStatus.style.color = etapa.color;
    elCatStatus.style.textShadow = `0 0 8px ${etapa.color}`;
    elMensaje.innerHTML = etapa.msg;

    elTotal.style.color = etapa.color;
    elTotal.style.textShadow = `0 0 20px ${etapa.color}`;

    const maxPeso = 60;
    const fatPct = Math.min((peso / maxPeso) * 100, 100);
    const fitPct = Math.max(100 - fatPct, 4);
    elBarFat.style.width = fatPct + '%';
    elBarFit.style.width = fitPct + '%';

    elTotal.classList.remove('pulse');
    void elTotal.offsetWidth;
    elTotal.classList.add('pulse');

    if (idx !== etapaActualIdx) {
        etapaActualIdx = idx;
        cambiarAudio(etapa.audio);
    }
}

function agregarHistorial(texto) {
    const li = document.createElement('li');
    li.innerHTML = texto;
    elHistorial.prepend(li);
    if (elHistorial.children.length > 8) {
        elHistorial.removeChild(elHistorial.lastChild);
    }
}

function comer() {
    peso += AUMENTO;
    elCatEmoji.classList.remove('shake', 'bounce');
    void elCatEmoji.offsetWidth;
    elCatEmoji.classList.add('shake');
    agregarHistorial(`🍔 +${AUMENTO}kg → ${peso}kg`);
    actualizarDOM();
}

function ejercitar() {
    if (peso - BAJADA < 2) {
        agregarHistorial('🥗 ¡Ya no puedes bajar más!');
        return;
    }
    peso -= BAJADA;
    elCatEmoji.classList.remove('shake', 'bounce');
    void elCatEmoji.offsetWidth;
    elCatEmoji.classList.add('bounce');
    agregarHistorial(`🥗 -${BAJADA}kg → ${peso}kg`);
    actualizarDOM();
}

function reiniciar() {
    peso = 5;
    etapaActualIdx = -1;
    elHistorial.innerHTML = '';
    elCatEmoji.classList.remove('shake', 'bounce');
    void elCatEmoji.offsetWidth;
    elCatEmoji.classList.add('bounce');
    agregarHistorial('🔄 ¡Reiniciado!');
    actualizarDOM();
}

actualizarDOM();