import express from 'express';
import cors from  'cors'
import Session from './Session.js';
import Db from './Db.js';
import Security from './Security.js';

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
  console.log(req.body)

});

global.sendToCli = (j)=>{
  let d = {
    status : 200,
    msg : 'ok'
  }
  if(typeof j==='string') {d.msg = j.msg}
  else{
    for(let attr in j){
      d[attr] = j[attr];
    }
  }
  RESP.send(JSON.stringify(d));
}



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});