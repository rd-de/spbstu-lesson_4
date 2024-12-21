// Задание 1 - Имитация работы с сервером - Promise
function getList() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: 'Task 1', isDone: false },
                { id: 2, title: 'Task 2', isDone: true }
            ]);
        }, 2000);
    });
}

getList()
    .then(tasks => {
        console.log('Список задач:');
        tasks.forEach(task => {
            console.log(`${task.id}. ${task.title} - ${task.isDone ? 'Выполнено' : 'Не выполнено'}`);
        });
    })
    .catch(error => {
        console.error(error);
    });

// Задание 2 - Чейнинг промисов
function concatenateWords() {
    const words = ["Я", "использую", "цепочки", "обещаний"];
    let promise = Promise.resolve("");

    words.forEach((word, index) => {
        promise = promise.then(result => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(result + (index > 0 ? " " : "") + word);
                }, 1000);
            });
        });
    });

    promise.then(result => {
        console.log(result);
    });
}

concatenateWords();

// Задание 3 - Параллельные обещания
function parallelPromises() {
    const words = [
        { word: "Я", delay: 1000 },
        { word: "использую", delay: 800 },
        { word: "вызов", delay: 1200 },
        { word: "обещаний", delay: 700 },
        { word: "параллельно", delay: 500 }
    ];

    const promises = words.map(item => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(item.word);
            }, item.delay);
        });
    });

    Promise.all(promises).then(results => {
        console.log(results.join(" "));
    });
}

parallelPromises();

// Задание 4 - Функция delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

delay(2000).then(() => console.log('Это сообщение вывелось через 2 секунды'));

// Задание 5 - Решение задачи 3 с использованием delay
function parallelPromisesWithDelay() {
    const words = [
        { word: "Я", delay: 1000 },
        { word: "использую", delay: 800 },
        { word: "вызов", delay: 1200 },
        { word: "обещаний", delay: 700 },
        { word: "параллельно", delay: 500 }
    ];

    const promises = words.map(item => {
        return delay(item.delay).then(() => item.word);
    });

    Promise.all(promises).then(results => {
        console.log(results.join(" "));
    });
}

parallelPromisesWithDelay();

// Задание 6 - Получить данные о фильме с планетой Татуин
async function getMovieWithTatooine() {
    try {
        const response = await fetch('https://www.swapi.tech/api/planets/?name=Tatooine');
        const data = await response.json();
        
        const tatooine = data.result?.[0]?.properties;

        if (!tatooine) {
            console.log('Данные о планете Татуин не найдены.');
            return;
        }

        console.log('Данные о планете:', tatooine);

        const planetDetailsResponse = await fetch(tatooine.url);
        const planetDetails = await planetDetailsResponse.json();

        const films = planetDetails.result?.properties?.films;

        if (films?.length > 0) {
            const filmResponse = await fetch(films[0]);
            const filmData = await filmResponse.json();
            console.log(`Фильм с планетой Татуин: ${filmData.result.properties.title}`);
        } else {
            console.log('Фильмы с планетой Татуин не найдены.');
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}
getMovieWithTatooine();

// Задание 7 - Транспортное средство Анакина Скайуокера
async function getAnakinTransport() {
    try {
        const response = await fetch('https://www.swapi.tech/api/people/?name=Anakin Skywalker');
        const data = await response.json();

        const anakin = data.result?.[0]?.properties;

        if (!anakin) {
            console.log('Данные о Анакине Скайуокере не найдены.');
            return;
        }

        console.log('Данные о Анакине:', anakin);

        if (!anakin.vehicles || anakin.vehicles.length === 0) {
            console.log('Транспортные средства Анакина не найдены.');
            return;
        }

        const vehicleResponse = await fetch(anakin.vehicles[0]);
        const vehicleData = await vehicleResponse.json();

        console.log(`Транспортное средство Анакина: ${vehicleData.result?.properties?.name || 'Название отсутствует'}`);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

getAnakinTransport();

// Задание 8 - Эхо-сервер и запрос
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

postData('http://localhost:3000/echo', { message: "Привет сервис, я жду от тебя ответа" })
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));

