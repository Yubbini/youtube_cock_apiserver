const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; //oauth말고 local에서도 사용하기 위함
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use('local-login', new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'password',
    passReqToCallback: true
}, (req, userId, password, done) => {
    console.log('passport의 local-login : ', userId, password)

    if (userId != 'test' || password != '12345') {
        console.log('비밀번호 불일치');
        return done(null, false, req.flash('loginMessage', '비밀번호 불일치'))
    }

    console.log('비밀번호 일치')
    return done(null, {
        userId: userId,
        password: password
    })
}))

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_PASSWORD,
            callbackURL: "https://youtube-cock-apiserver.herokuapp.com/auth/google/callback",
            passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            console.log(profile);
            console.log(accessToken);

            return done(null, profile);
        }
    )
);

passport.serializeUser(function (user, done) {
    console.log('serializeUser() 호출됨.');
    console.log(user);

    done(null, user);
})

module.exports = passport