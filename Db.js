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

    async runTransaction(callback) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            await callback(client);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }



}

module.exports = Db;