// requestMap
interface Rm {
  httpMethod: string,
  constructor: any,
  handler: string,
  schema: Schema
}
interface Rms {
  [propName: string]: Rm[]
}

export interface Schema {
  type: string,
  properties?: object
  required?: string[]
  oneOf?: object[]
}

class RequestMap {
  router: Rms = {} // 用于保存路由的映射关系

  registerRouter(url: string, routerMap: Rm) {
    const _router = this.router[url]
    if (_router) {
      // 检查http method 是否冲突
      for (const index in _router) {
        const object = _router[index]
        if (object.httpMethod === routerMap.httpMethod) {
          console.info(`address ${object.httpMethod} ${url} has existed`)
          return
        }
      }
      // 不冲突则注册
      this.router[url].push(routerMap)
    } else {
      this.router[url] = []
      this.router[url].push(routerMap)
    }
  }

  /**
   * 用法@instance.get('/')
   * @param url
   */
  get(url: string, schema: Schema) {
    return (target: any, propertyKey: string) => {
      this.registerRouter(url, {
        httpMethod: 'get',
        constructor: target.constructor,
        handler: propertyKey,
        schema
      })
    }
  }

  /**
   * 用法@instance.post('/')
   * @param url
   */
  post(url: string, schema: Schema) {
    return (target: any, propertyKey: string) => {
      this.registerRouter(url, {
        httpMethod: 'post',
        constructor: target.constructor,
        handler: propertyKey,
        schema
      })
    }
  }

  /**
   * 用法@instance.put('/')
   * @param url
   */
  put(url: string, schema: Schema) {
    return (target: any, propertyKey: string) => {
      this.registerRouter(url, {
        httpMethod: 'put',
        constructor: target.constructor,
        handler: propertyKey,
        schema
      })
    }
  }

  /**
  * 用法@instance.put('/')
  * @param url
  */
  delete(url: string, schema: Schema) {
    return (target: any, propertyKey: string) => {
      this.registerRouter(url, {
        httpMethod: 'delete',
        constructor: target.constructor,
        handler: propertyKey,
        schema
      })
    }
  }

  /**
   * 返回路由
   */
  getRoute() {
    return this.router
  }
}

export const RequestMapping = new RequestMap
