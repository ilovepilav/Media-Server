import express from 'express'
import { getDirTree } from './utilities/functions.js'
import { engine } from 'express-handlebars'
import dotenv from 'dotenv'
import auth from './middlewares/auth.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { loginPost } from './routes/loginRoute.js'
import mongoose from 'mongoose'
import { commandExec } from './utilities/torrent.js'

dotenv.config()
const app = express()

mongoose
  .set('strictQuery', false)
  .connect(process.env.MONGODB, { dbName: 'media-auth' })
  .then(() => {
    console.log('Connected to production DB.');
  })
  .catch((err) => {
    console.log('Error', err);
  });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', 'views/')
app.use(express.static('public'))

app.post('/login', loginPost)

app.get('/login', async (req, res) => {
  res.render('login')
})

app.post('/exec', async (req, res) => {
  const { command } = req.body
  const result = await commandExec(command)
  res.render('demo', { output: result.split('\n') })
})

app.get('/demo', (req, res) => {
  res.render('demo')
})

app.use(auth)

app.get('/', async (req, res) => {
  res.render('home')
})

app.get('/getfolders', async (req, res) => {
  const json = await getDirTree()
  res.json(json.children)
})


app.listen(3000, () => {
  console.log('listening on port 3000')
})
