import Express from "express"
import cors from "cors"

const app = Express()
const port = 4000

app.set('trust proxy', true)
app.disable('x-powered-by')
app.use(Express.json())
app.use(cors())

// app.use('/v1', require('./v1/ApiRouter'))

app.get('/test', (_, res) => res.status(200).end('Hello lol'))
app.all('*', (_, res) => res.status(404).end())

app.listen(port, () => {
    console.log(`API Server listening at ${port} port`)
})