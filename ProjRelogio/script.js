const sElement = document.querySelector('.p_s');
const mElement = document.querySelector('.p_m');
const hElement = document.querySelector('.p_h');

// Função para atualizar o relógio digital e analógico
function atualizarRelogio() {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    const horario = `${horas}:${minutos}:${segundos}`;
    
    document.querySelector('.digital').textContent = horario;

    let segundosDeg = ((segundos / 60) * 360) - 90; // -90 para alinhar o ponteiro de segundos corretamente
    let minutosDeg = ((minutos / 60) * 360) - 90; 
    let horasDeg = ((horas / 12) * 360) - 90; 

    sElement.style.transform = `rotate(${segundosDeg}deg)`;
    mElement.style.transform = `rotate(${minutosDeg}deg)`;
    hElement.style.transform = `rotate(${horasDeg}deg)`;
}

// Atualiza o relógio a cada segundo
setInterval(atualizarRelogio, 1000);

// Chama a função uma vez para não demorar 1 segundo pra aparecer
atualizarRelogio();

// Usando Arrow Function
// setInterval(() => {
//     const agora = new Date();
//     const horas = agora.getHours().toString().padStart(2, '0');
//     const minutos = agora.getMinutes().toString().padStart(2, '0');
//     const segundos = agora.getSeconds().toString().padStart(2, '0');

//     const horario = `${horas}:${minutos}:${segundos}`;
//     document.querySelector('.digital').textContent = horario;
// }, 1000);

