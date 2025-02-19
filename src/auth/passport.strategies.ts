import passport from "passport"

import { User } from "../types.ts"


const initAuthStrategies = () => {
    
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((user: User, done) => {
        done(null, user)
    })
}

export default initAuthStrategies