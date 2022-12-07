import express from 'express'
import { getDirTree  } from './functions.js'

const app = express()
app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/:id?', async (req, res)=>{
  const json = await getDirTree(req.params.id)
  console.log(json.children)

  res.render('index', {title: 'Selam', json: json.children})
})

app.listen(3000, ()=>{
  console.log('listening on port 3000')
})
