const express = require('express')
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
res.send('Hello World!')
});
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));   

app.get("/movie", (req, res) => {
  res.send("movie Created");
});
app.use(express.json());

const moviesRoute = require("./routes/moviesRoute");
app.use("/movie", moviesRoute);


app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
});
