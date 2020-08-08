
export class CoreComponent {
  constructor (template) {
    this.view = template
  }

  render () {
    document.querySelector(this.selector).innerHTML = this.view
  }

  set dependancy (di) {
    // eslint-disable-next-line new-cap
    this[di.name] = new di()
  }
}
