const passport = require('passport');
const oauth = require('passport-oauth2');

passport.use(new oauth({
    //options for the strategy
    clientID: "0oa9shzfkbWYzis6o5d5",
    clientSecret: "OU25Grm_emB4X75ltjk2bcCC9SFXydIQPCwUCQ_t",
    callbackURL: "/login"
}),()=>{
    //passport callback function
}
)
