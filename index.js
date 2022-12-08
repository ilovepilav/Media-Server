import express from 'express'
import { getDirTree } from './functions.js'
import { engine } from 'express-handlebars'

const app = express()
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', 'views/')
app.use(express.static('public'))

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
