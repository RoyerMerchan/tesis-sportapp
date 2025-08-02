const Security = class{
constructor(){
    this.loadSentences();
    this.permission = new Map();
    this.getAllPermission();
}

loadSentences(){
    let fs = require("fs");
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

getAllPermission(res, r){
    this.permission.clear();
    for(let i = 0; i < r.rows.length; i++){
       let k = r.rows[i].profile_na+"_"+r.rows[i].action_de+"_"+r.rows[i].endpoint_de;
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