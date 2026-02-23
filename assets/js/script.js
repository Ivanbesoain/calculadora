let peso = 5;          
const AUMENTO = 2;  
const BAJADA = 2;     

const etapas = [
    { min: 0, emoji: '🐱', estado: '⚡ ATLÉTICO', msg: '¡Gato olímpico! 🏅', color: '#4dffb4' },
    { min: 8, emoji: '😺', estado: '✅ NORMAL', msg: 'Peso ideal 😌', color: '#00f5ff' },
    { min: 14, emoji: '😸', estado: '😋 GORDITO', msg: 'Un poco relleno... 🍩', color: '#ffe94d' },
    { min: 22, emoji: '🐈', estado: '🍔 GORDO', msg: 'Demasiadas hamburguesitas 😅', color: '#ff8c42' },
    { min: 32, emoji: '😿', estado: '😰 MUY GORDO', msg: '¡Para de comer!! 😱', color: '#ff6644' },
    { min: 45, emoji: '🙀', estado: '💀 OBESO', msg: 'El gato necesita ayuda 🆘', color: '#ff4466' },
];


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

    elPeso.innerHTML = peso;
    elTotal.innerHTML = peso + ' kg';

    const tamano = Math.min(4 + (peso / 10), 9); 
    elCatEmoji.innerHTML = etapa.emoji;
    elCatEmoji.style.fontSize = tamano + 'rem';

    elCatStatus.innerHTML = etapa.estado;

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

actualizarDOM();