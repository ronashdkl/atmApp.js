import { CoreComponent } from './core'
import { toggleButtonActive } from './../app'
const view = require('./../views/welcome.html')
export class WelcomeComponent extends CoreComponent {
  constructor (selector) {
    super(view)
    this.selector = selector
    toggleButtonActive()
  }
}
