import fs from 'fs';

const Security = class{
constructor(){
    this.loadSentences();
    this.permission = new Map();
    this.getAllPermission();
}

loadSentences(){
    // let fs = require("fs");
    fs.readFile("./config/sentences.json", 'utf8', (err, data)=>{
        this.sentences = JSON.parse(data);        
    })
}

getSentence(schema, sentencesId){
    return this.sentences[schema][sentencesId];
}

getKey(req, endpoint){
    return req.profile_na+"_" + req.action_de+"_" + endpoint;
}

async getAllPermission(res, r){
    this.permission.clear();
     const rs =  await db.exe("security", "getAllPermission",[]);
    
    for(let i = 0; i < rs.rows.length; i++){
       let k = rs.rows[i].profile_de+"_"+rs.rows[i].de_action+"_"+rs.rows[i].de_endpoint;
        this.permission.set(k, true);         
    }
}

hasPermission(k){
    if(this.permission.has(k)){
        return this.permission.get(k);
    } else {
        return false;
    }
}

}
export default Security;