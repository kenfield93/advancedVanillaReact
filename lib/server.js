/**
 * Created by kyle on 9/26/17.
 */
import express from 'express';
import config from './config';
import serverRender from 'renderers/serverRenderer';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const initialContent = serverRender();
    res.render('index', {initialContent} );
});
app.listen(config.port, () => {
    console.log(config);
});
