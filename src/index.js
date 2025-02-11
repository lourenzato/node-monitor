export default class NodeMonitor {
  constructor(callback) {
    this.callback = callback

    this.init()
  }

  init = () => {
    this.handleEvents()
  }

  handleEvents = () => {
    history.pushState = (f =>
      function pushState() {
        var ret = f.apply(this, arguments)
        window.dispatchEvent(new Event('pushstate'))
        window.dispatchEvent(new Event('locationchange'))
        return ret
      })(history.pushState)

    history.replaceState = (f =>
      function replaceState() {
        var ret = f.apply(this, arguments)
        window.dispatchEvent(new Event('replacestate'))
        window.dispatchEvent(new Event('locationchange'))
        return ret
      })(history.replaceState)

    window.addEventListener('popstate', () => {
      window.dispatchEvent(new Event('locationchange'))
    })

    window.addEventListener('locationchange', function() {
      console.log('location changed!')
    })

    window.addEventListener('hashchange', () => {
      console.log('location changed!')
    })
  }
}
