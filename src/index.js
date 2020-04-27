const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const axios = require('axios')
const Finance = require('./Finance')
var cron = require('node-cron');

mongoose.connect('mongodb+srv://migrate:migrate@cluster0-caszl.mongodb.net/testenew?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true });


app.use(express.json());
app.use(cors());

app.get('/finance', async (req, res) => {
  const finances = await Finance.find();
  return res.json(finances);
});

cron.schedule('* * * * *', () => {
  axios
    .get('https://api.hgbrasil.com/finance')
    .then(async res => {
      await Finance.create(res.data.results.currencies);
      console.log("Created currencies at " + Date(Date.now().toString()));
    }).catch(function (error) {
      console.log(error);
    })
});

app.listen(process.env.PORT || 3000);

