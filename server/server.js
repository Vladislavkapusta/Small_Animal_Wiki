//Всегда делал на парах node такой порт надеюсь не занят
const express = require('express')
const app = express()
const port = 3000

// Импортируем модуль для работы с CORS и добавляем его в приложение
const cors = require('cors')
app.use(cors())

// Импортируем модуль для обработки тела запросов в формате JSON и urlencoded
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Объект с ссылками на различные породы животных
let objectURL = {
    cat: [['Бразильский', 'https://en.wikipedia.org/wiki/Brazilian_Shorthair'],['Персидский', 'https://en.wikipedia.org/wiki/Persian_cat'],
    ['Корниш рекс', 'https://en.wikipedia.org/wiki/Cornish_Rex'],['Сфинкс (да но нет)', 'https://en.wikipedia.org/wiki/Sphinx'],
    ['Бенгальская','https://en.wikipedia.org/wiki/Bengal_cat'],['Бобтейл','https://en.wikipedia.org/wiki/Japanese_Bobtail']],
    dog: [['Джек Рассел', 'https://en.wikipedia.org/wiki/Jack_Russell_Terrier'],['Шиба Ину', 'https://en.wikipedia.org/wiki/Shiba_Inu'],
    ['Динго','https://en.wikipedia.org/wiki/Dingo'],['Доберман','https://en.wikipedia.org/wiki/Dobermann'],
    ['Лабрадор Ретривер','https://en.wikipedia.org/wiki/Labrador_Retriever'],['Спаниэлька','https://en.wikipedia.org/wiki/Russian_Spaniel']],
    parrot: [['Волнистый', 'https://en.wikipedia.org/wiki/Lovebird'],['Какаду', 'https://en.wikipedia.org/wiki/Cockatoo'],['Жако (нет но да)', 'https://en.wikipedia.org/wiki/Jaco_Pastorius']],
    noLink: [['такого ключегого слова нет, либо для него отсутствует ссылка', 'no link']]
}

// Массив ключевых слов
const keyWords = ['cat', 'dog', 'parrot']

// Обработчик GET-запроса на главную страницу
app.get('/', (req, res) => {
    res.send(`app is running on port ${port}`)
})

// Обработчик POST-запроса на адрес '/'
app.post('/', (req, res) => {
    let sentWord = req.body.text    
    if (keyWords.includes(sentWord)) { 
        for (let i of Object.entries(objectURL)) {
            if (i[0] == sentWord) {
                // Отправляем массив ссылок по заданному ключевому слову
                res.send({
                    'links': i[1]
                })
                break
            }
        }
    } else {
        // Если ключевое слово не известно, то отправляем массив без ссылок
        res.send({
            'links': objectURL.noLink
        })
    }

})

// Обработчик POST-запроса на адрес '/links'
app.post('/links', (req, res) => {
    var request = require('request');
    var URL = req.body.text;
    // Запрашиваем содержимое страницы по заданному URL
    request(URL, function (err, resp, body) {
        if (err) throw err;
        // Отправляем ответ с содержимым страницы
        res.send({"result": body})
    });
})

// Запускаем сервер на указанном порту
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})
