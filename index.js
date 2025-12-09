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

app.get("/post", (req, res) => {
  res.send("post Created");
});
app.use(express.json());

const postsRoute = require("./routes/postsRoute");
app.use("/post", postsRoute);


app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
});
