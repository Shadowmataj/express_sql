import passport from "passport"
import local from "passport-local"

import usersManager from "../controller/users.manager.js"
import { isValidPassword } from "../services/utils.js"

const localStrategy = local.Strategy
const um = new usersManager()

const initAuthStrategies = () => {
    passport.use("login", new localStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (username: any, password: any, done: any) => {
            try {
                const user: any = await um.getUserByEmail(username)
                if (user && isValidPassword(user, password)) {
                    const { password, ...filteredUser } = user
                    return done(null, filteredUser)
                } else {
                    return done(null, false, {message: "Invalid email or password."})
                }
            } catch (err) {
                return done(err, false)
            }
        }
    ))
    
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((user: any, done) => {
        done(null, user)
    })
}

export default initAuthStrategies