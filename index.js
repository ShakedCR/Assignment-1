const express = require('express')
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
res.send('Hello World!')
});

app.get('/movie' , (req, res) => {
res.send("Movie get request")
});

app.use(express.json());
const moviesRouter = require('./routes/moviesRoute');
app.use('/movies', moviesRouter);

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
});
