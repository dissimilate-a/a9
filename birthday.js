navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
        // Создаем анализатор звука
        var audioContext = new AudioContext();
        var analyser = audioContext.createAnalyser();
        var microphone = audioContext.createMediaStreamSourcer(stream);
        microphone.connect(analyser);

        // Устанавливаем порог для громкости звука
        var threshold = 30; // Регулируйте значение по своему усмотрению

        // Обработка аудиоданных
        setInterval(function() {
            // Получаем данные анализатора звука
            var dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);

            // Получаем среднюю громкость звука
            var average = 0;
            for (var i = 0; i < dataArray.length; i++) {
                average += dataArray[i];
            }
            average /= dataArray.length;

            // Проверяем громкость и выполняем действие
            if (average > 60) {
                // Ваше действие, например, отправка запроса на сервер
                const button = document.getElementById('flame');
                const result = button.classList.replace('lit', 'out');
                button.classList.remove('lit');
            }
        }, 1000); // Проверяем громкость каждую секунду
    })
    .catch(function(err) {
        console.error('Ошибка доступа к микрофону: ' + err);
    });