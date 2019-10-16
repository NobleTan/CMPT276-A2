const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: "postgres://ojtgwjevopsgpy:c95ccd7c981e539177e03ae2e7fed9b20f202fb1b54cf5034cf177738ee47ea7@ec2-54-197-241-96.compute-1.amazonaws.com:5432/d2pdc5c0scapib",
  ssl: true
});

express()
  .use(express.urlencoded())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/here'))
  .post('/tokimon/new', (req, res) => {
    console.log(req.body);
    let body = req.body;
    var getUsersQuery = "INSERT INTO tokimon ("+
      `${body.trainer ? "trainer, " : ''}` +
      `${body.tokimon ? "name, " : ''}` +
      `${body.weight ? "weight, " : ''}` +
      `${body.height ? "height, " : ''}` +
      `${body.level ? "level, " : ''}` +
      `${body.evolution ? "evolution, " : ''}` +
      `${body.legendary ? "legendary, " : ''}` +
      `${body.fly ? "fly, " : ''}` +
      `${body.fight ? "fight, " : ''}` +
      `${body.fire ? "fire, " : ''}` +
      `${body.water ? "water, " : ''}` +
      `${body.electric ? "electric, " : ''}` +
      `${body.earth ? "earth, " : ''}` +
      `${body.grass ? "grass, " : ''}` +
      `${body.normal ? "normal, " : ''}` +
      `${body.poison ? "posion, " : ''}` +
      `${body.telepathy ? "telepathy, " : ''}` +
      `${body.rock ? "rock, " : ''}` +
      `${body.bug ? "bug, " : ''}` +
      `${body.dark ? "dark, " : ''}` +
      `${body.dragon ? "dragon, " : ''}` +
      `${body.ice ? "ice, " : ''}` +
      `${body.total ? "total, " : ''}`; 
    getUsersQuery = getUsersQuery.substring(0, getUsersQuery.length - 2) + ") VALUES (" +
      `${body.trainer ? `'${body.trainer}'`+', ' : ''}` +
      `${body.tokimon ? `'${body.tokimon}'`+', ' : ''}` +
      `${body.weight ? body.weight+', ' : ''}` +
      `${body.height ? body.height+', ' : ''}` +
      `${body.level ? body.level+', ' : ''}` +
      `${body.evolution ? body.evolution+', ' : ''}` +
      `${body.legendary ? body.legendary+', ' : ''}` +
      `${body.fly ? body.fly+', ' : ''}` +
      `${body.fight ? body.fight+', ' : ''}` +
      `${body.fire ? body.fire+', ' : ''}` +
      `${body.water ? body.water+', ' : ''}` +
      `${body.electric ? body.electric+', ' : ''}` +
      `${body.earth ? body.earth+', ' : ''}` +
      `${body.grass ? body.grass+', ' : ''}` +
      `${body.normal ? body.normal+', ' : ''}` +
      `${body.poison ? body.posion+', ' : ''}` +
      `${body.telepathy ? body.telepathy+', ' : ''}` +
      `${body.rock ? body.rock+', ' : ''}` +
      `${body.bug ? body.bug+', ' : ''}` +
      `${body.dark ? body.dark+', ' : ''}` +
      `${body.dragon ? body.dragon+', ' : ''}` +
      `${body.ice ? body.ice+', ' : ''}` +
      `${body.total ? body.total+', ' : ''}`;
    getUsersQuery = getUsersQuery.substring(0, getUsersQuery.length - 2) + ");";
    console.log(body.total);
    console.log(getUsersQuery);
    pool.query(getUsersQuery,(error, result)=>{
      if (error){
        res.send("error");
        console.log(error);
      }
      res.render("pages/return");
    })
    // res.render("Tokimon");
    // res.send("success").status(200);
  })
  .post('/tokimon/change', (req,res) => {
    let body = req.body;
    var queryString = "UPDATE tokimon SET "+
      `${body.trainer ? `trainer = '${body.trainer}', ` : ''}` +
      `${body.weight ? `weight = ${body.weight}, ` : ''}` +
      `${body.height ? `height = ${body.height}, ` : ''}` +
      `${body.level ? `level = ${body.level}, ` : ''}` +
      `${body.evolution ? `evolution = ${body.evolution}, ` : ''}` +
      `${body.legendary ? `legendary = ${body.legendary}, ` : ''}` +
      `${body.fly ? `fly = ${body.fly}, ` : ''}` +
      `${body.fight ? `fight = ${body.fight}, ` : ''}` +
      `${body.fire ? `fire = ${body.fire}, ` : ''}` +
      `${body.water ? `water = ${body.water}, ` : ''}` +
      `${body.electric ? `electric = ${body.electric}, ` : ''}` +
      `${body.earth ? `earth = ${body.earth}, ` : ''}` +
      `${body.grass ? `grass = ${body.grass}, ` : ''}` +
      `${body.normal ? `normal = ${body.normal}, ` : ''}` +
      `${body.poison ? `posion = ${body.poison}, ` : ''}` +
      `${body.telepathy ? `telepathy = ${body.telepathy}, ` : ''}` +
      `${body.rock ? `rock = ${body.rock}, ` : ''}` +
      `${body.bug ? `bug = ${body.bug}, ` : ''}` +
      `${body.dark ? `dark = ${body.dark}, ` : ''}` +
      `${body.dragon ? `dragon = ${body.dragon}, ` : ''}` +
      `${body.ice ? `ice = ${body.ice}, ` : ''}` +
      `${body.total ? `total = ${body.total}, ` : ''}`;
    queryString = queryString.substring(0, queryString.length - 2) + " WHERE " +
      `${body.tokimon ? `name = '${body.tokimon}';` : ''}`;
    console.log(queryString);
    pool.query(queryString,(error, result)=>{
      if (error){
        res.send("error");
        console.log(error);
      }
      res.render("pages/return");
    })
  })
  .post('/tokimon/delete', (req,res) => {
    // console.log(req.b.name);
    var queryString = `DELETE FROM tokimon WHERE name='${req.body.name}'`;
    pool.query(queryString, (error, result) => {
      if (error){
        res.send(error);
      }
      res.render("pages/return");
    })
  })
  .get('/tokimon/get', (req,res) => {
    var tokimon = `SELECT * FROM tokimon;`;
    console.log(tokimon);
    pool.query(tokimon, (error, result) => {
      if (error)
        res.end(error);
      var results = {'rows': result.rows };
      console.log(results);
      res.render('pages/all', results);
    })
  })
  .get('/tokimon/getTokimon', (req,res) => {
    var queryString = `SELECT * FROM tokimon WHERE name='${req.query.name}';`
    pool.query(queryString, (error, result) => {
      if (error)
        res.send(error);
      console.log(result.rows);
      res.render('pages/toki', {'result': result.rows});
    })
  })
.listen(PORT, () => console.log(`Listening on ${ PORT }`))