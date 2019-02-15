import * as Koa from 'koa'
import { Loader  } from './loader'
import * as bodyParser from 'koa-bodyparser'
import * as config from 'config'
import { App } from './types'

const app = new Koa()

app.use(require('koa-cors')({ credentials: true }))
app.use(bodyParser())

const loader = new Loader(<App>app)
app.use(loader.loadRouter())

export const server = app.listen(process.env.PORT || config.APP.PORT, function () {
  console.info(`Server listen on ${process.env.PORT || config.APP.PORT}`)
})
