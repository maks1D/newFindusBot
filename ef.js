const { Client } = require("discord.js")
require('dotenv').config();

class ef extends Client {
    constructor(bot){
        super(bot)

        global.ef = this

        this.files = [
            'release-notes',
            'devs'
        ]

        this.files.forEach(file => {
            this[file] = require(`./files/${file}.json`)
        })

        this.secrets = [
            'fortnite',
            'MONGO_ID',
            'api',
            'badosz',
            'token'
        ]

        this.secrets.forEach(secret =>
            this[secret] = process.env[secret]
        )

        this.dbcli = new (require('mongodb').MongoClient)(this['MONGO_ID'], { useNewUrlParser: true , useUnifiedTopology: true })
        this.dbcli.connect(async err => {
            if(err) {
                console.log(err)
                console.log("Frozen own process (error on connection with DB)") 
                while(true){}
            }

            this.collections = [
                'fortnite',
                'botinfo'
            ]

            this.collections.forEach(collection => {
                this['db' + collection] = this.dbcli.db("findusbotdata").collection(collection)
            })

            this.db = require("./database")

            
        })
    }
}

new ef({})