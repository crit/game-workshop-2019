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

  static velocity(vx = 0, vy = 0) {
    return {
      name: 'velocity',
      vx: vx,
      vy: vy
    }
  }

  static hitbox(callback) {
    return {
      name: 'hitbox',
      run: callback
    }
  }

  static collision(callback) {
    return {
      name: 'collision',
      run: callback
    }
  }

  static animation(row = 1, range = [0, 0], delay = 70, size = 64, next) {
    if (!next) next = () => {}

    const component = {
      name: 'animation',
      tick: 0,
      frame: 0,
      frames: [],
      delay: delay,
      next: next
    }

    const animationRow = row * size

    for (let i = range[0]; i < range[1]; i++) {
      component.frames.push({x: i * size, y: animationRow})
    }

    return component
  }

  static repeat() {
    return {
      name: 'repeat'
    }
  }
}
