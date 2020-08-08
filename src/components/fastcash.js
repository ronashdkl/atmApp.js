import { CoreComponent } from './core'
import { WelcomeComponent } from './welcome'
const view = require('./../views/fastcash.html')
export class FastCashComponent extends CoreComponent {
  constructor (selector, ModalComponent) {
    super(view)
  }

  setPrice (price) {
    this.price = price
    return this
  }

  event () {
    document.querySelectorAll('#fastCashScreen #actions button').forEach(element => {
      element.addEventListener('click', (event) => {
        const confirm = parseInt(event.target.dataset.confirm)
        if (confirm === 1 && this.checkBalance()) {
          document.querySelector('#fastCashScreen').innerHTML = 'Your account has been debited by ' + this.price + ' successfuly!'
        } else {
          document.querySelector('#fastCashScreen').innerHTML = 'Transaction Aborted! <br/>'
        }
        this.goHome()
      })
    })
  }

  goHome (timeout = 1000) {
    setTimeout(() => {
      new WelcomeComponent(this.selector).render()
    }, timeout)
  }

  render () {
    super.render()
    document.querySelector('#fastCashScreen #price').innerHTML = this.price
    this.event()
  }

  checkBalance () {
    if (this.price > 5000) {
      this.ModalComponent.setContent('Insufficent Balance !!!', 'error').display()
      return false
    }
    return true
  }
}
