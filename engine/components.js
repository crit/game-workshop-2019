class Components {
  static active() {
    return {
      name: 'active'
    }
  }

  static renderer(callback) {
    return {
      name: 'renderer',
      run: callback
    }
  }
}
