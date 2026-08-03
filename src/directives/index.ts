import type { App, Directive } from 'vue'
import ripple from './ripple'
import draggable from './draggable'
import hover from './hover'
import ellipsis from './ellipsis'

const directives: Record<string, Directive> = {
  ripple,
  draggable,
  hover,
  ellipsis,
}

export function registerDirectives(app: App) {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
  })
}

export { ripple, draggable, hover, ellipsis }
