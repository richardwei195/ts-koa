import { Controller } from './base'
import { RequestMapping } from '../router'

export class Export extends Controller{
  @RequestMapping.get('/hello-world', {
    type: 'object',
    properties: {
    }
  })
  async exportResources () {
    this.ctx.body = 'Hello World!'
  }
}
