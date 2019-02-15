import * as Koa from 'koa'
import { Context } from "koa"

interface App extends Koa {
}

interface Context extends Context {
  state: {
  }
}
