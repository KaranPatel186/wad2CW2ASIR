const Datastore = require("nedb");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new Datastore({ filename: dbFilePath,
            autoload: true });
        } else {
            this.db = new Datastore();
        }
    }

    init() {
        this.db.insert({
            user: 'admin',
            password:
            '$2a$10$VPu3DvzK.Y4KyRkl8cMW/.l0pulc/44lIrodNMFEL4i86o0Z05ZHK'
        });
    
        return this;
    }

    lookup(user, cb) {
        this.db.find({'user': user}, function (err, entries) {
        if (err) {
         return cb(null, null);
        } else {
        if (entries.length == 0) {
         return cb(null, null);
         }
        return cb(null, entries[0]);
         }
        });
         } 
}
const dao = new UserDAO();
dao.init();

module.exports = dao;