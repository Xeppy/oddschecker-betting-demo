import express from 'express';
import cors from 'cors';
import data from './data/data.js'; 
const app = express();
app.use(cors());

const odds = data.bets;

function filterOddsOnMoreThan( array, filteredValue , moreThan ) {
    const filteredArray = array.map(arr => {
        return {   
            name: arr.name,
            odds: arr.odds.filter( x => 
                    moreThan === true ? 
                        x.oddsDecimal > filteredValue
                        :
                        x.oddsDecimal < filteredValue,
            )
        }
    });
    
    return filteredArray.filter( player => 
        player.odds.length > 0
    )
}

app.get('/decimalOddsMoreThanTwo', (req, res) => {
    res.json(filterOddsOnMoreThan(odds, 2, true));
});

app.get('/decimalOddsLessThanTwo', (req, res) => {
    res.json(filterOddsOnMoreThan(odds, 2, false));
});

app.listen(4000, () => {
  console.log('App listening on port 4000!');
});