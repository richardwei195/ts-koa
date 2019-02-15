import * as fs from 'fs'
import * as Router from 'koa-router'
import { Context } from 'koa'
import { logger, catcher } from './service/logger'
import { App } from './types'
import { RequestMapping } from './router'
import { AjvService } from './service/ajv'
import * as config from 'config'

export class Loader {
  router: Router = new Router
  app: App

  constructor (app: App) {
    this.app = app
  }

  loadController() {
    const dirs = fs.readdirSync(__dirname + '/controller')
    dirs.forEach((filename) => {
      require(__dirname + '/controller/' + filename).default
    })
  }

  loadConfig() {
    // this.app.db = db
  }

  loadRouter() {
    let ajv
    this.loadController()
    this.loadConfig()

    const _routes = RequestMapping.getRoute()

    this.router.use(logger, catcher)

    Object.keys(_routes).forEach((url) => {
      _routes[url].forEach((object) => {
        this.router[object.httpMethod](`${config.APP.ROUTE}${url}`, async (ctx: Context) => {
          if (object.schema) {
            ajv = new AjvService(ctx, object.schema)
            ajv.validator()
          }
          const instance = new object.constructor(ctx, this.app)
          await instance[object.handler]()
        })
      })
    })

    this.router.all('*', (ctx: Context) => {
      ctx.throw(404)
    })
    return this.router.routes()
  }
}
