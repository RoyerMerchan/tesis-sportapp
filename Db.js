const Db = class{
    constructor(){
        const {Pool} = require('pg');
        this.pool = new Pool({
            database: "sport_app",
            user: "postgres",
            password: "1234",
            port: 5432,
            ssl: false,
            max: 20,
            idleTimeoutMillis: 1000,
            connectionTimeoutMillis: 1000,
            maxUses: 7500,
        })
    }
    async exe(schema, sentenciaId, params){
        try{
            let client = await this.pool.connect();
            let res = await client.query(security.getSentence(schema, sentenciaId), params);
            client.release();
            return res;
        }
        catch(e){
            console.log(e)
            return null;
        }
    }
}

module.exports = Db;