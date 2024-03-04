var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require('bcryptjs');
var mysql = require('mysql');

// Create a MySQL connection pool
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'your_mysql_user',
    password        : 'your_mysql_password',
    database        : 'your_mysql_database'
});

module.exports = function(passport){

    passport.use(new LocalStrategy(async function(username, password, done){
        try {
            // Query the MySQL database to find the user
            pool.query('SELECT * FROM users WHERE username = ?', [username], async function (error, results, fields) {
                if (error) {
                    return done(error);
                }
                if (!results || results.length === 0) {
                    return done(null, false, { message: 'No user found' });
                }
                const user = results[0];
                // Compare passwords using bcrypt
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Wrong password' });
                }
            });
        } catch(err) {
            console.error(err);
            return done(err);
        }
    }));

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        // Query the MySQL database to deserialize the user
        pool.query('SELECT * FROM users WHERE id = ?', [id], function (error, results, fields) {
            if (error) {
                return done(error);
            }
            if (!results || results.length === 0) {
                return done(null, false, { message: 'No user found' });
            }
            const user = results[0];
            done(null, user);
        });
    });
};
