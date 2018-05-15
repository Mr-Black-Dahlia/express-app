const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('viewengine', 'hbs');


app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log)
    fs.appendFileSync('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append');
        }
    })
next();
});

// app.use((req, res, next) => {
//     res.render('mait.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome Home',
        welcomeMessage: 'Welcome to the express website'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'The Damn About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'This is not the endpoint you are looking for'
    });
});

app.listen(port, () => {
    console.log(`server is up and running on ${port}`)
});