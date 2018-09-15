const mongoose = require('mongoose');
mongoose.Promise = Promise;
const GuildWarnings = require('./models/warnings');
const funfacts = require('./models/funfacts');
const {
    Client
} = require('discord.js');

module.exports = class mongo {


    /**
     * @typedef MongoConnectionOptions
     * @property {string} url
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

        mongoose.connect(this.db.url, {
            useNewUrlParser: true
        });
        mongoose.model('guildWarnings', GuildWarnings);
        mongoose.model("funfacts", funfacts);
        mongoose.connection
            .once('open', (db) => {
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
        await mongoose.model('guildWarnings').create(options);
        console.log(`created: ${options}`)
        return this;
    }


    /**
     * @param {string} guild - GuildID
     * @param {string} user - Id of user
     * @returns {string[]}
     */
    async fetchAllWarnings(guild, user) {

        //Validation
        if (!guild) return new Error("Invalid/Missing guild in mongo.fetchAllWarnings");
        if (!user) return new Error("Invalid/Missing user in mongo.fetchAllWarnings");
        var data = [];
        var list = await mongoose.model('guildWarnings').find({
            user: user,
            guild: guild
        });
        list.forEach(doc => {
            data.push(doc);
        });
        return data;
    }



    /**
     * @typedef MongoFunFactOptions
     * @property {String[]} flags
     */

    /**
     * @typedef MongoFunFactQueryOptions
     * @property {boolean} random
     * @property {String[]|String} flag
     */


    /**
     * @typedef FunFactQueryData
     * @property {String} text
     * @property {Number} like
     * @property {Number} dislike
     * @property {String[]|String} flags
     */

    /**
     * @typedef MongoFactVoteOptions
     * @property {String} id
     * @property {boolean} [like=false]
     * @property {boolean} [dislike=false]
     */

    /**
     * 
     * @param {String} text 
     * @param {MongoFunFactOptions} options 
     * @returns {mongo}
     */
    async createFact(text, options) {

        if (!text) return new Error("Text is missing from funfact use : mongo.createFact(text, options)");

        if (!options || !Array.isArray(options.flags)) {
            await mongoose.model('funfacts').create({
                text: text,
                created_at: Date.now()
            })
            return this;
        } else {
            await mongoose.model('funfacts').create({
                text: text,
                tags: options.flags,
                created_at: Date.now()
            })
            return this;
        }
    }


    /**
     * 
     * @param {MongoFunFactQueryOptions} options
     * @returns {FunFactQueryData} 
     */
    async fetchFacts(options) {
        if (options.random) {
            var res = await mongoose.model('funfacts').aggregate().sample(1).exec();
            if (!res) return new Error("Unable to find anything with that tags");
            return {
                text: res[0].text,
                like: res[0].like,
                dislike: res[0].dislike,
                flags: res[0].tags,
                id: res[0]._id
            };
        } else {
            if (Array.isArray(options.flag)) {
                var res = await mongoose.model('funfacts').findOne({
                    tags: {
                        "$in": [options.flag]
                    }
                });
                if (!res) return new Error("Unable to find anything with that tags");
                return {
                    text: res.text,
                    like: res.like,
                    dislike: res.dislike,
                    flags: res.flags,
                    id: res[0]._id
                };
            }
        }
    }


    /**
     * @param {MongoFactVoteOptions} options
     * @returns {Object{text: String}}
     */
    async giveVote(options) {

        if (!options.id) return new Error('Id of that fact is invalid');
        if (!options.like && !options.dislike) return new Error('One vote [like/dislike] must be true');

        
        if (options.like) {

            await mongoose.model('funfacts').findOneAndUpdate({_id: options.id}, {"$inc": {like: 1}});
            return {text: ":thumbsup:"}

        } else {

            await mongoose.model('funfacts').findOneAndUpdate({_id: options.id}, {"$inc": {dislike: 1}});
            return {text: ":thumbsup:"}
        }

    }



}