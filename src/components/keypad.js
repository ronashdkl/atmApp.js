import { CoreComponent } from './core'
import { ServiceLocator as si } from './../app'
const view = require('./../views/keypad.html')
export class KeypadComponent extends CoreComponent {
  constructor (selector, ModalComponent) {
    super(view)
    this.selector = selector
    this.screenData = []
    this.modal = ModalComponent
  }

  keyEvent () {
    document.querySelectorAll('.keyboard > .key').forEach(element => {
      element.addEventListener('click', event => {
        var key = event.target.dataset.key
        if (key === '.' && this.screenData.includes(key)) {
          return
        }
        this.screenData.push(...key)
        this.display()
      })
    })
  }

  clearEvent () {
    document.querySelectorAll('.keyboard > .clear').forEach(element => {
      element.addEventListener('click', event => {
        if (event.target.dataset.type === 'all') {
          this.resetScreen()
        } else {
          this.screenData.pop()
        }
        this.display()
      })
    })
  }

  enterEvent () {
    document.querySelector('.keyboard .enter').addEventListener('click', event => {
      this.withdrawAmount()
    })
  }

  display () {
    var display = ''
    this.screenData.forEach(data => {
      display += data
    })
    document.querySelector('.atm .screen').innerHTML = display
  }

  render () {
    super.render()
    this.keyEvent()
    this.clearEvent()
    this.enterEvent()
  }

  withdrawAmount () {
    if (this.screenData.length === 0) {
      this.ModalComponent.setContent('Please input amount to withdraw', 'error').display()
      return
    }
    var amount = ''
    this.screenData.forEach(data => {
      amount += data
    })
    amount = parseFloat(amount.trim())

    if (amount % 500 !== 0) {
      this.ModalComponent.setContent('Sorry the amout must be fraction by 500.', 'error').display()
      // window.alert('Sorry the amout must be fraction by 500.')
      return
    }

    if (amount > 25000) {
      this.ModalComponent.setContent('Sorry the amout must not be exceed 25000.', 'error').display()
      return
    }

    // if (this.screenData)
    this.resetScreen()
    si.get('FastCashComponent').setPrice(amount).render()
  }

  resetScreen () {
    this.screenData = []
    this.display()
  }
}
