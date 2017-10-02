/**
 * Created by kyle on 9/26/17.
 */
import express from 'express';
import config from './config';
import serverRender from 'renderers/serverRenderer';
import {data} from './testData';
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

const emptyInitialMockupAndDate = {
    articles: [],
    authors: []
};
app.get('/',  (req, res) => {
    serverRender()
        .then(initialMockupAndData => {
            res.render('index', {...initialMockupAndData} );
        })
        .catch(err => { res.render('index', {...emptyInitialMockupAndDate})})
            .catch(console.log("LORD HELP ME"));
});

app.get('/v1/data', (req, res) =>{
   res.send(data);
});
app.listen(config.port, () => {
    console.log(config);
});
