const express = require("express");
const path = require('path');
const app = express();
const convert = require("./lib/convert");
const apiBCB = require('./lib/apiBCB');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const cotation = await apiBCB.getCotation();
    res.render('home', {
        cotation
    });
})
app.get('/cotacao', (req, res) => {
    const { cotation, amount } = req.query;
    if (cotation && amount) {

        const convertion = convert.convert(cotation, amount)
        res.render("cotacao", {
            err: false,
            convertion: convert.toMoney(convertion),
            cotation: convert.toMoney(cotation),
            amount: convert.toMoney(amount)
        });
    } else {
        res.render('cotacao', {
            err: 'Invalid values'
        })
    }
})

app.listen(3000, (err) => {
    if (err) {

        console.log('Não foi possivel iniciar');
    } else {
        console.log('Server running');
    }
})