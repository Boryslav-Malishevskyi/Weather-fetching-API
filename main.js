async function fetchAPI() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=jma_seamless";
    const responses = await fetch(url);

    let formatted = await responses.json();
    return formatted;
}

async function UpdateInfo() {
    var info = await fetchAPI();
    var temp = document.querySelector('#temperature');
    var time = document.querySelector("#time");
    let index = 0;
    console.log(info);

    function updateParagraph() {
        temp.textContent = "Temperature: " + info.hourly.temperature_2m[index] + "°C";
        var timeData = info.hourly.time[index].toString();
        var bet = timeData.slice(11);
        time.textContent = "Time: " + bet;
        index = (index + 1) % info.hourly.temperature_2m.length;
    }
    updateParagraph();
    setInterval(updateParagraph, 60000);
}

UpdateInfo();

