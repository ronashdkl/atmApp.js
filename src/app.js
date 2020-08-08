import { WelcomeComponent } from './components/welcome'
import { KeypadComponent } from './components/keypad'
import { FastCashComponent } from './components/fastcash'
import { ModalComponent } from './components/modal'
import ServiceLocator from './injector'
ServiceLocator.add('selector', '#screen-content')
ServiceLocator.addAll([
  WelcomeComponent,
  FastCashComponent,
  KeypadComponent,
  ModalComponent
])
function toggleButtonActive (element = null) {
  document.querySelectorAll('button.active').forEach(ele => {
    ele.classList.remove('active')
  })
  if (element) { element.classList.add('active') }
}
class App {
  constructor () {
    ServiceLocator.get('WelcomeComponent').render()
    document.querySelectorAll('.fastcash').forEach(element => {
      element.addEventListener('click', (event) => {
        toggleButtonActive(element)
        ServiceLocator.get('FastCashComponent').setPrice(event.target.dataset.price).render()
      })
    })
    document.querySelectorAll('.action-buttons').forEach(element => {
      element.addEventListener('click', (event) => {
        toggleButtonActive(element)
        switch (event.target.dataset.action) {
          case 'withdraw':
            ServiceLocator.get('KeypadComponent').render()
            break
          case 'balance':
            ServiceLocator.get('ModalComponent').setContent('Your balance is NPR 5000.', 'success').display()
            break
          case 'statment':
            ServiceLocator.get('ModalComponent').setContent('This Feature is coming soon.').display()
            break
          default:
            ServiceLocator.get('WelcomeComponent').render()
            break
        }
      })
    })
  }
}

export { ServiceLocator, App, toggleButtonActive }
