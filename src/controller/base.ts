import { App, Context } from '../types'

export class Controller {
  protected ctx: Context
  protected app: App

  constructor (ctx: Context, app: App) {
    this.ctx = ctx
    this.app = app
  }
}