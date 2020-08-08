const view = require('./../views/modal.html')
export class ModalComponent {
  constructor () {
    this._render()
  }

  setContent (body, type = null) {
    document.querySelector('.modal > .modal-content > p').innerHTML = body
    if (type != null) {
      document.querySelector('.modal > .modal-content').classList.add(type)
    }
    return this
  }

  display () {
    this.modal.style.display = 'block'
  }

  _render () {
    document.getElementById('modal').innerHTML = view
    this._script()
  }

  _script () {
    // Get the modal
    this.modal = document.getElementById('myModal')
    var modalContent = document.querySelector('.modal > .modal-content')
    // Get the <span> element that closes the modal
    document.getElementsByClassName('close')[0].addEventListener('click', event => {
      this.modal.style.display = 'none'
      modalContent.classList.remove('error')
      modalContent.classList.remove('success')
    })
  }
}
