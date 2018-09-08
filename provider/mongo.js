const mongoose = require('mongoose');
const GuildWarnings = require('./models/warnings');
const {addToGlobal} = require('./util/addToGlobal');
const {
    Client
} = require('discord.js');

module.exports = class mongo {


    /**
     * @typedef MongoConnectionOptions
     * @property {string} url
     * @property {boolean} 
     */

    /**
     * 
     * @param {MongoConnectionOptions} db 
     */
    constructor(db) {

        /**
         * @type {Map}
         */
        this.liseners = new Map();


        /**
         * @type {MongoConnectionOptions}
         * @private
         */
        this.db = db;

        mongoose.connect(this.db.url, {useNewUrlParser: true});
        mongoose.model('guildWarnings', GuildWarnings);
        mongoose.connection
        .once('open', (db) => {
            addToGlobal('guildWarnings', GuildWarnings);
            addToGlobal('db', db);
            console.log("Mongo connected!");
        })
        .on('error', (err) => {
            console.error(err.stack);
        });

    }


    /**
     * @typedef MongoWarningOptions
     * @property {string} guild - GuildID.
     * @property {string} user - Id of user that is reciving a warning.
     * @property {string} moderator - Id of moderator that is giving warning.
     * @property {string} [reason] - Reason for warning.
     */

    /**
     * 
     * @param {MongoWarningOptions} options
     * @returns {mongo} 
     */
    async giveWarning(options) {

        //Validation
        if (!options.guild) return new Error('GuildID missing from MongoWarningOptions');
        if (!options.user) return new Error('UserID missing from MongoWarningOptions');
        if (!options.moderator) return new Error('ModeratorID missing from MongoWarningOptions');
        if (!options.reason) options.reason = 'No reason provided';
        options.time = Date.now();

        await mongoose.connection
        await mongoose.model('guildWarnings').create(options);
        console.log(`created: ${options}`)
        return this;
    }


    /**
     * @param {string} guild - GuildID
     * @param {string} user - Id of user
     * @returns {string[]}
     */
    async fetchAllWarnings(guild, user){

        //Validation
        if (!guild) return new Error("Invalid/Missing guild in mongo.fetchAllWarnings");
        if (!user) return new Error("Invalid/Missing user in mongo.fetchAllWarnings");

        await mongoose.connection;
        var data = [];
        var list = await mongoose.model('guildWarnings').find({user: user, guild: guild});
        list.forEach(doc => {
            data.push(doc);
        });
        return data;
    }
}