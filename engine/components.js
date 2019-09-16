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

  static type(value) {
    return {
      name: 'type',
      value: value
    }
  }

  static position(x = 0, y = 0) {
    return {
      name: 'position',
      x: x,
      y: y
    }
  }

  static size(w = 0, h = 0) {
    return {
      name: 'size',
      w: w,
      h: h
    }
  }
}
