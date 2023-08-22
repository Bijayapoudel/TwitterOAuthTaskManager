const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy;
const { use, serializeUser, deserializeUser } = require('passport');


passport.use(new TwitterStrategy({
    consumerKey: "PJl7kHKhcWUG9l7n1D7obzmcJ",
    consumerSecret: "jS9d89D8Jy5T1nHPfgk9tDaYYz91TjA9Tq6Hzwyb8F8DKy2YAE",    // `${process.env.consumer_Secret}`,
    callbackURL: "http://localhost:4000/auth/twitter/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // accessToken = 1248453083140509707 - vs42TBXNswiBIxvD7veUyvNROEnBRh,
        //     AccessTokenSecret = ZAskva2t0SsEHoZInL9SP3yt6Wx88bfzR449yT6J7HmpK
        done(null, profile);

    }
)
);


passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})


