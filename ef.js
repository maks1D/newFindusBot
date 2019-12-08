const { Client } = require("discord.js")
require('dotenv').config();
var json = require('edit-json-file')

class ef extends Client {
    constructor(bot){
        super(bot)

        global.ef = this

        this.files = [
            'releasenotes',
            'colors',
            'prefixes',
            'roles',
            'emotes',
            'channelsdb'
        ]

        this.files.forEach(file => {
            this[file] = require(`./files/${file}.json`)
        })

        this.tokens = []

        this.color = this.colors.green

        this.tokens.secrets = [
            'fortniteapi',
            'MONGO_ID',
            'youtubeapi',
            'badoszapi',
            'maindiscordapi',
            'betadiscordapi'
        ]

        this.tokens.secrets.forEach(secret =>
            this.tokens[secret] = process.env[secret]
        )

        this.types = ['main', 'beta']

        if(!this.types.includes(process.argv[2])){
            console.log(`Frozen own process (version argument needed (${this.types.join(", ")}))`)
            while(true){}
        }

        this.type = process.argv[2]

        this.dbcli = new (require('mongodb').MongoClient)(this.tokens['MONGO_ID'], { useNewUrlParser: true , useUnifiedTopology: true })
        this.dbcli.connect(async err => {
            if(err) {
                console.log(err)
                console.log("Frozen own process (error on connection with DB)") 
                while(true){}
            }

            this.db = require("./database")

            this.db.collections = [
                'fortnite',
                'botinfo',
                'servers'
            ]

            this.db.collections.forEach(collection => {
                this.db[collection] = this.dbcli.db("findusbotdata").collection(collection)
            })

            this.db.cache = json('./cache.json')

            for(var i = 0; i < this.db.collections.length; i++){
                this.db.cache.set(`${this.db.collections[i]}`, await this.db.findDocMongo(`${this.db.collections[i]}`))
            }
            this.db.cache.save()

            this.http = require('snekfetch')

            this.eventHandler = new (require('./handlers/events.js'))(this)

            this.models = require("./models")

            this.prefix = this.prefixes[this.type]

            this.utils = require('./utils')

            await this.login(this.tokens[this.type + 'discordapi'])
        })
    }
}

new ef({})
