import { Middleware } from 'koa'
import * as log4js from 'log4js'
import { Context } from '../types'

log4js.configure({
  appenders: { cheese: { type: 'console' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})

const _logger = log4js.getLogger('cheese')

export const logger: Middleware = async (ctx: Context, next) => {
  const startTime = Date.now()

  await next()
  // 测试不输出日志
  if (process.env.NODE_ENV !== 'test_ci' && process.env.NODE_ENV !== 'test') {
    _logger.info({
      url: ctx.url,
      ip: ctx.get('x-real-ip') || ctx.get('x-forwarded-for') || ctx.ip,
      method: ctx.method,
      status: ctx.status,
      durantion: Date.now() - startTime,
    })
  }
}

export const catcher: Middleware = async (ctx: Context, next: any) => {
  try {
    await next()
  } catch (e) {
    ctx.status = e.status || 400

    ctx.body = {
      code: ctx.status,
      error: ctx.status >= 500 ? 'internal server error' : e.message
    }

    if (ctx.status >= 400) {
      _logger.error(e)
    }
  }
}
