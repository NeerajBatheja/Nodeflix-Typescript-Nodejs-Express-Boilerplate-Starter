import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import 'dotenv/config' // Import your secret key

const SECRET_KEY = process.env.SECRET_KEY ?? 'adfADFdfadfa334'
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
}

const jwtStrategy = new Strategy(jwtOptions, (payload, done) => {
  const user = { id: 1, username: 'exampleuser' }
  done(null, user)
})

passport.use(jwtStrategy)

export const authenticateUser = passport.authenticate('jwt', { session: false })
