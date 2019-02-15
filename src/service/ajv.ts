import * as _ from 'lodash'
const Ajv = require('ajv')
const debug = require('debug')('app:middleware:ajv')
import { Context } from 'koa'

// useDefaults: 开启`default`关键字
// coerceTypes: 支持数据类型转换
const defaults = { useDefaults: true, coerceTypes: true }

export class AjvService {
  ctx: Context
  schema

  constructor(ctx: Context, schema) {
    this.ctx = ctx
    this.schema = schema
  }

  validator() {
    // 验证数据所在的位置
    const target = this.schema.target || ['params', 'request.body', 'headers', 'query']
    delete this.schema.target

    // 定义 ajv 的实例化参数
    const options = Object.assign({}, defaults, this.schema.ajvOptions || {})
    delete this.schema.ajvOptions

    // 实例化 ajv 及编译 验证函数
    const ajv = new Ajv(options)

    this.registerFormat(ajv)
    // this.addKeyword(ajv)

    const validator = ajv.compile(this.schema)

    let data = {}
    if (target instanceof Array) {
      target.forEach((k) => {
        const v = _.result(this.ctx, k)
        if (v) _.assign(data, v)
      })
    } else {
      data = _.result(this.ctx, target)
    }

    const isValid = validator(data)

    if (!isValid) {
      const fields = this.pickFieldFromErrors(validator.errors).join(',')
      this.ctx.throw(400, `ParamError: ${fields}`)
    }

    this.ctx.state = Object.assign({}, data, this.ctx.state)
    debug('request valid data', data)
  }

  private pickFieldFromErrors(errors) {
    // 属性错误时，会有可能触发多个规则，故会产生重复，使用`_.uniq`去重
    return _.uniq(errors.map((ele) => {
      if (ele.keyword === 'required') {
        return ele.params.missingProperty
      }
      return ele.dataPath.substr(1)
    }))
  }

  registerFormat(ajv) {
    // objectid format
    ajv.addFormat('objectid', /^[a-z0-9]{24}$/)
  }

  // addKeyword(ajv) {}
}
