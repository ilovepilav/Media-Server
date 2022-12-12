import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const token = req.cookies && req.cookies.access_token
  if (!token) return res.render('error', { message: 'Auth required, please login' })

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
  } catch (err) {

    return res.status(401).clearCookie('access_token').render('error', { message: 'Token is expired, please login' })
  }
  next()
}

export default auth
