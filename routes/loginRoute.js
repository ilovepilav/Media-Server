import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { User } from '../models/User.js'


export const loginPost = async (req, res) => {
  const { username, password } = req.body
  if (!(username && password)) return res.render('error', { message: 'Username and Password required' })
  const user = await User.findOne({ username: username }).exec()
  if (!user) return res.send('User not found')

  const result = await bcrypt.compare(password, user.password)
  if (!result) return res.status(403).render('error', { message: 'Password is incorrect' })

  const token = jwt.sign({ username: user.username, role: user.role }, process.env.TOKEN_KEY, { expiresIn: '7 days' })

  res.cookie('access_token', token, { httpOnly: true, secure: false }).redirect('/')
}

