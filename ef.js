const { Client } = require("discord.js")
require('dotenv').config();

class ef extends Client {
    constructor(bot){
        super(bot)

        global.ef = this

        this.files = []

        this.files.files = [
            'release-notes',
            'devs',
            'colors',
            'prefixes',
            'roles'
        ]

        this.files.files.forEach(file => {
            this.files[file] = require(`./files/${file}.json`)
        })

        this.tokens = []

        this.color = this.files.colors.green

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

            this.http = require('snekfetch')

            this.eventHandler = new (require('./handlers/events.js'))(this)

            this.models = require("./models")

            this.prefix = this.files.prefixes[this.type]

            await this.login(this.tokens[this.type + 'discordapi'])

            //this.models.apibadosz({endpoint: `tweet?text=${encodeURIComponent("this is tome txt")}&username=${encodeURIComponent("Findus")}&url=${encodeURIComponent(this.users.get("512230433782497281").avatarURL)}`})
        })
    }
}

new ef({})