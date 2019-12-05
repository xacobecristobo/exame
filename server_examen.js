const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let events = [{
    name: [],
    tipo: [],
    fecha: [],
    lugar: []
}];
app.get('/events', (req, res) => {
    const key = req.query['key'];

    if (key === undefined){
        res.status(403).send();
        return;
    }

    res.send(events);
});

app.post('/events', function (req, res) {
    let name = req.body['name'];
    let tipo = req.body['tipo'];
    let fecha = req.body['fecha'];
    let lugar = req.body['lugar'];

    if (name === undefined || tipo === undefined ||
        fecha === undefined || lugar === undefined) {
        res.status(400).send();
        return;
    }
    name = name.toLowercase();
    tipo = tipo.toLowercase();
    fecha = fecha.toLowercase();
    lugar = lugar.toLowercase();

    if (name.length === 0 || tipo.length === 0 ||
        fecha.length === 0 || lugar.length === 0) {
        res.status(400).send();
        return;
    }

    if (events[name] !== undefined) {
        res.status(409).send();
        return;
    }

    events[name] = [];
    events[tipo] = [];
    events[fecha] = [];
    events[lugar] = [];
    res.send()



});







app.listen(3000, function () {
    console.log('sevidor arrancado');
});