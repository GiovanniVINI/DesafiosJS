function searchWeather() {
    let cityInput = document.querySelector('#city'); // Pega a referência do input
    let city = cityInput.value; // Pega o valor digitado
    let output = document.querySelector('.weather-card'); // Pega a referência do output

    if (city !== '') {
        getWeatherData(city)
            .then(data => {
                console.log(data)
                showWeather(data);
            })
            .catch(error => {
                console.error(error);
                document.querySelector('.alert').textContent = 'Erro ao buscar clima.';
                
                // Limpa os dados anteriores exibidos, sem remover os elementos
                document.querySelector('.img-weather').innerHTML = '';
                document.querySelector('#weather-result h1').textContent = '';
                document.querySelector('.weather-temp').innerHTML = '';
                document.querySelector('.weather-condition').innerHTML = '';
                document.querySelector('.hour').innerHTML = '';
            })
            .finally(() => {
                cityInput.value = ''; // Limpa o campo de entrada no final, independentemente do sucesso/erro
            });
    }
}

// Listener para o botão de clique
document.querySelector('#get-weather').addEventListener('click', searchWeather);

// Listener para a tecla Enter no campo de entrada
document.querySelector('#city').addEventListener('keyup', (event) => {
    // Verifica se a tecla pressionada foi "Enter"
    if (event.key === 'Enter') {
        searchWeather(); // Chama a mesma função que o botão usa
    }
});


async function getWeatherData(city) {
    const apiKey = '6d8c8af912f2ce0c2203d8c9053a5f7d'; // Sua chave da OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const response = await fetch(url);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro: ${response.status}`);
    }

    const data = await response.json();
    return data;
}


function showWeather(json) {
    const temperatura = Math.round(json.main.temp);
    const descricao = json.weather[0].description;
    const iconCode = json.weather[0].icon;
    const horarioFormatado = calculateLocalHour(json.timezone)

    // Atualiza a imagem do clima
    let containerImg = document.querySelector('.img-weather');
    containerImg.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${descricao}">`;

    // Atualiza o nome da cidade
    let cityName = document.querySelector('#weather-result h1');
    cityName.textContent = json.name;

    // Atualiza os detalhes (temperatura)
    let weatherTemp = document.querySelector('.weather-temp');
    weatherTemp.innerHTML = `<p>${temperatura}°C</p>`;

    let weatherCondition = document.querySelector('.weather-condition')
    weatherCondition.innerHTML = `<p>${descricao}</p>`

    let hourContainer = document.querySelector('.hour');
    hourContainer.innerHTML = `<p>${horarioFormatado}</p>`;

    document.querySelector('.alert').textContent = '';
}

function calculateLocalHour(offset) {
    const agoraUTC = new Date().getTime(); // timestamp atual em milissegundos
    const localTime = new Date(agoraUTC + offset * 1000);

    const horas = localTime.getUTCHours().toString().padStart(2, '0');
    const minutos = localTime.getUTCMinutes().toString().padStart(2, '0');

    return `${horas}:${minutos}`;
}



