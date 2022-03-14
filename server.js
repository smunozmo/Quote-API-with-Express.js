const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    let quoteObject = {
        quote: '',
    };

    quoteObject['quote'] = getRandomElement(quotes)
    
    res.send(quoteObject);
})

app.get('/api/quotes', (req, res, next) => {
    
    let quoteObject = {
        quotes: '',
    };
    
    if (Object.keys(req.query).length > 0) {
        const authorQuotes = [];
        
        quotes.forEach(element => {
            if (element['person'] === req.query['person']) {
                authorQuotes.push(element)
            }
        });
        quoteObject['quotes'] = authorQuotes;
        res.send(quoteObject);
        
    } else {
        quoteObject['quotes'] = quotes;
        res.send(quoteObject);
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

// console.log(quotes);
