/**
 * Created by kyle on 9/26/17.
 */
import express from 'express';
import config from './config';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log('noticeme me senpai');
    res.render('index', {status: 200});
});
app.listen(config.port, () => {
    console.log(config);

});
