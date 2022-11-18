const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const port = 3500;
const articles = []
app.use(express.json())
app.get('/', (req,res)=>{
    res.json(`welcome to fifa 2022`)
})
app.get('/match',(req,res)=>{
    axios
      .get('https://en.wikipedia.org/wiki/2022_FIFA_World_Cup#Round_of_16')
      .then((response) => {
       const html = response.data;
       const $ = cheerio.load(html);
       $('.footballbox', html).each(function () {
         const match = $(this, '.fdate').text();
         articles.push({ match });
       });
       res.json(articles)
      });
      
})
 

app.listen(port,()=>{
    console.log(`listening to the port: ${port}`)
})