import { Controller } from './base'
import { RequestMapping } from '../router'
import Hello from '../blls/hello'

export class Export extends Controller{
  @RequestMapping.get('/hello-world', {
    type: 'object',
    properties: {
    }
  })
  exportResources () {
    const helloBll = new Hello('Hello', 'World!')
    this.ctx.body = helloBll.join().print()
  }
}
