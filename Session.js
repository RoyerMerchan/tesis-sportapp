import session from 'express-session';


const Session = class{
constructor(app){
    this.Session = session;
    app.use(this.Session({
        "secret": "appdeport123_flex",
        "resave": false,
        "saveUninitialized": true,
        "duration": 1800000,
        "activeDuration": 900000,
        "cookie":{
            "expires": 1800000,
            "secure": false,
            "sameSite": true
        }
    }));
}

sessionExist(req){
    if(req.session){
        if(req.session.userId){
            return true;        
        }else return false;
    }else return false;
}

getSessionObj(req){
    return {
         userId : req.session.userId,
         userName : req.session.userName,
         profileId : req.session.profileId,
         profileDe : req.session.profileDe
    }
}

createSession(req, res){
    db.exe("security", "getUser",[req.body.user, req.body.password]).then(r=>{
        // console.log("respuesta de la base de datos", r);
        // console.log( req.body.password);
        
        if(r.rows.length > 0){
            req.session.userId = r.rows[0].id_us;
            req.session.userName = r.rows[0].na_us;
            req.session.profileId = r.rows[0].id_pro;
            req.session.profileDe = r.rows[0].de_pro;
            
            sendToCli("sesion creada..!")
        }else{
            sendToCli({"status":500, "msg":"error en los datos..."});
        }
    }).catch(e=>{
        console.error("error en la consulta",e);
        sendToCli({"status":500, "msg":"error en la base de datos..."});
    });
}


}

export default Session;

