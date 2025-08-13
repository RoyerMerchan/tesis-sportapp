import session from 'express-session';
import bcrypt from 'bcrypt'


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
    db.exe("security", "getUser",[req.body.user]).then(async r=>{
        // console.log("respuesta de la base de datos", r);
        // console.log( req.body.password);
        console.log(r.rows);
        
        if(r.rows.length > 0){
            const {user_id, na_user, pa_user, profile_id, profile_de} = r.rows[0]
            if(!(await bcrypt.compare(req.body.password, pa_user))){

                return sendToCli({status: 403, msg: "credenciales invalidas"})
            }
            req.session.userId = user_id;
            req.session.userName = na_user;
            req.session.profileId = profile_id;
            req.session.profileDe = profile_de;
            // hacer otra consulta para obtener del profile_id los permisos del usuario para devolselo en data al momento de hacer login
            sendToCli({status: 200, msg: "login exitoso", data: {}})
            
        }else{
            
            sendToCli({status: 403, msg: "credenciales invalidas"})
        }
    }).catch(e=>{
        console.error("error en la consulta",e);
        sendToCli({"status":500, "msg":"error en la base de datos..."});
    });
}


}

export default Session;

