import express from 'express';
import cors from  'cors'
import Session from './Session.js';
import Db from './Db.js';
import Security from './Security.js';
import Institution from './src/BO/Institution.js'

// Import routes
import UserRoute from './src/routes/UserRoute.js';
import ProfileRoute from './src/routes/ProfileRoute.js';
import LineUpRoute from './src/routes/LineUpRoute.js';
import PositionRoute from './src/routes/PositionRoute.js';
import CompetitionRoute from './src/routes/CompetitionRoute.js';
import PersonRoute from './src/routes/PersonRoute.js';
import PlaceEventRoute from './src/routes/PlaceEventRoute.js';
import EventRoute from './src/routes/EventRoute.js';
import InstitutionRoute from './src/routes/InstitutionRoute.js';
import SportRoute from './src/routes/SportRoute.js';
import SportStadisticRoute from './src/routes/SportStadisticRoute.js';
import TeamMemberRoute from './src/routes/TeamMemberRoute.js';
import TeamRoute from './src/routes/TeamRoute.js';
import TypeCompetitionRoute from './src/routes/TypeCompetitionRoute.js';
import TypePersonRoute from './src/routes/TypePersonRoute.js';
import TypeLineUpRoute from './src/routes/TypeLineUpRoute.js';
import { Router } from 'express';


// import pool from './db.js';
const app = express();
// app.use(cors)
app.use(express.static('public'));
app.use("/static", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", inicio);


global.sess = new Session(app);
global.db = new Db();
global.security = new Security();
let RESP = null;
let REQ = null;

app.use((req, res, next)=>{
  RESP = res;
  REQ = req;
  next();
})

function inicio(req, res) {
  res.sendFile(__dirname + '/public/login.html');
}

app.get('/', (req, res) => {
  res.send('¡Hola desde Node.js!');
});

app.post('/sesion',(req, res)=>{
  if(sess.sessionExist(req)){
    res.send("{'status':200, 'msg':'La sesion ya existe'}")
  }
  else{
    if(req.body.user && req.body.password){
      sess.createSession(req,res);
    }
    else{
      res.send("{'status':404, 'msg':'Datos invalidos'}");
    }
  }
});

app.post("/Institution",(req,res)=>{
  let i = new Institution();
  let rs = null;
  if(checkPermission(req, 'Institution')){
    switch (req.body.action) {
    case '1': { 
      try{
        rs = i.insertInstitution(req, res);
        return rs; 
      }  
      catch(e){
        
      }
      finally{
        i = null;
        rs = null;
      }      
    }
    case '2':
      return null

    case '3':
      return null

    case '4':
      return null
      
      default:
        return res.status(400).json({ error: "Acción no válida para tipo_persona" });
        
      }
    }
    else{
      sendToCli({'status':580, 'msg':'No tiene Permiso...'})
    }
    
  })
  
  global.sendToCli = (j)=>{
    let d = {
      status : 200,
      msg : 'ok'
    }
    for(let attr in j)
      {
       
        
      d[attr] = j[attr];
  }
  RESP.status(d.status).send(JSON.stringify(d));
}

global.checkPermission = (req, endpoint)=> {
  return true;
  if(sess.sessionExist(req)){
    let obj = sess.getSessionObj(req);
    let k = security.getKey(req, endpoint);
    return security.hasPermission(k);
  }
  else{
    sendToCli({'status': 578, 'msg' : 'debe hacer sesion...'});
    return false;
  }
}


//use routes
app.use('/api/user', UserRoute);// insert probado
app.use('/api/profile', ProfileRoute);// insert probado
app.use('/api/lineup', LineUpRoute);//
app.use('/api/position', PositionRoute);//
app.use('/api/competition', CompetitionRoute);//
app.use('/api/person', PersonRoute);// insert probado
app.use('/api/placeevent', PlaceEventRoute);// insert probado
app.use('/api/event', EventRoute);// insert probado
app.use('/api/institution', InstitutionRoute);// insert probado
app.use('/api/sport', SportRoute);// insert probado
app.use('/api/sportstadistic', SportStadisticRoute);//
app.use('/api/teammember', TeamMemberRoute);//
app.use('/api/team', TeamRoute);//
app.use('/api/typecompetition', TypeCompetitionRoute);//
app.use('/api/typeperson', TypePersonRoute);// insert probado
app.use('/api/typelineup', TypeLineUpRoute);//

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});