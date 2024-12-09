import * as passport from 'passport';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import { UserModel } from './model/UserModel'; 
import { TripModel } from './model/TripModel';

dotenv.config();
let GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;

// Creates a Passport configuration for Google
class GooglePassport {

    clientId: string;
    secretId: string;
    public Users: UserModel;
    public Trips: TripModel;
     
    constructor(Users: UserModel, Trips: TripModel) {
        this.clientId = process.env.OAUTH_ID;
        this.secretId = process.env.OAUTH_SECRET;
        this.Users = Users;
        this.Trips = Trips;
        console.log('Google Passport configured with Client ID:', process.env.OAUTH_ID);


        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "/auth/google/callback"
            },
            (accessToken, refreshToken, profile, done) => {
                process.nextTick( async() => {
                    try{
                        console.log("inside new password google strategy");
                        console.log("userId:" + profile.id);
                        // console.log("displayName: " + profile.displayName);
                        // console.log(profile.emails[0].value);
    
                        const existingUser = await this.Users.model.findOne({userId: profile.id});
    
                        if(existingUser){
                            console.log('user existed');
                            return done(null, existingUser);
                        }
    
                        const newUser = {
                            userId: profile.id,
                            userName: profile.displayName,
                            email: profile.emails[0].value,
                            authorization: 'general'
                        };
                        const createUser = await this.Users.model.create(newUser);
                        const id = crypto.randomBytes(16).toString("hex");
                        const newTrip = {
                            tripId: id,
                            userId: profile.id,
                            tripName: 'Default',
                            scenes: []
                        }

                        await this.Trips.model.create(newTrip);
                        // console.log('create Trip:'+createTrip);
                        
                        // console.log(createUser);
    
                        // Call done with the newly saved user
                        return done(null, createUser);
    
                    } catch(error){
                        return done(error, null);
                    }
                }); 
            }
        ));

        passport.serializeUser(function(user, done) {
            console.log('serializeUserId: '+user.id);
            done(null, user.id);
        });

        passport.deserializeUser(async(id, done)=> {
            console.log('deserializeUser id:'+ id);
            try {
                const user = await Users.model.findById(id);
                done(null, user);
            } catch (error) {
                console.log('error occur here');
                done(error, null);
            }
        });
    }
}
export default GooglePassport;