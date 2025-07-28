// Reproduz som ao pressionar uma tecla do teclado
document.body.addEventListener('keydown', (event) => {
    PlaySound(event.code.toLowerCase());
});

// Reproduz som ao clicar no botão com o mouse
document.querySelectorAll('.tecla').forEach(tecla => { // Seleciona todos os botões com a classe 'tecla' e para cada um deles adiciona 
    tecla.addEventListener('click', () => {            // um evento de clique.
        const key = tecla.dataset.key;                 // Obtém o valor do atributo data-key do botão clicado.
        PlaySound(key);                        // Chama a função playSound passando o som correspondente à tecla.
    });
});

document.querySelector('#play').addEventListener('click', () => {
    let song = document.querySelector('#search').value; // Seleciona o valor do input de texto para o nome da música.
    if (song !== '') { // Verifica se o campo de texto não está vazio
        let songArray = song.split(''); // Divide o texto em um array usando a string vazia como separador
        PlayComposition(songArray); // Chama a função playComposition passando o array de caracteres
    }
});

// Função principal que toca o som
function PlaySound(sound) {           // Recebe o nome do som a ser reproduzido
    const audioElement = document.querySelector(`#s_${sound}`); // Seleciona o elemento de áudio correspondente ao som
    let keyElement = document.querySelector(`button[data-key="${sound}"]`); // Seleciona o elemento da tecla correspondente ao som
    if (audioElement) {               // Verifica se o elemento de áudio existe
        audioElement.currentTime = 0; // Reinicia o áudio do começo
        audioElement.play();          // Reproduz o áudio
    }
    if (keyElement) {                // Verifica se o elemento da tecla existe
        keyElement.classList.add('active'); // Adiciona a classe 'active' para aplicar o estilo visual
        setTimeout(() => {           // Define um tempo para remover a classe 'active' após 200ms
            keyElement.classList.remove('active'); // Remove a classe 'active'
        }, 200);
    }
}

function PlayComposition(songArray) {
    let wait = 0; // Inicializa o tempo de espera
    for(let songItem of songArray) {
        setTimeout(() => { // Define um tempo para tocar cada som
            PlaySound(`key${songItem}`); // Chama a função PlaySound passando o som correspondente ao item do array
        }, wait); // O tempo de espera é incrementado a cada iteração
        wait += 300; // Incrementa o tempo de espera em 280ms para o próximo som
    }
}


