class Characters {
  static entity(x = 0, y = 0, imgPath) {
    const entity = new Entity()

    entity.set(Components.active())
    entity.set(Components.position(x, y))
    entity.set(Components.size(64, 64))
    entity.set(Components.type('character'))
    entity.set(Components.velocity(0, 0))
    entity.set(Components.health(100))

    entity.set(Components.renderer(context => {
      const pos = entity.com('position')
      const size = entity.com('size')
      const image = assets.get(imgPath)
      const animation = entity.com('animation')
      const frame = animation.frames[animation.frame]

      context.drawImage(image, frame.x, frame.y, size.w, size.h, pos.x, pos.y, size.w, size.h)

      context.strokeStyle = 'darkred'
      context.fillStyle = 'red'
      const width = (entity.com('health').value / 100) * 30
      context.strokeRect(pos.x + 16, pos.y, 32, 5)
      context.fillRect(pos.x + 17, pos.y + 1, width, 4)
    }))

    entity.set(Components.hitbox(() => {
      return {
        x: entity.com('position').x + 15,
        y: entity.com('position').y + 15,
        w: entity.com('size').w - 30,
        h: entity.com('size').h - 15
      }
    }))

    entity.set(Components.collision(target => {
      if (target.is('wall')) return true // collided
      if (target.is('enemy')) return true // collided

      return false
    }))

    // todo: add death handler

    return entity
  }

  static Player(x = 0, y = 0) {
    const entity = Characters.entity(x, y, 'assets/player.png')

    entity.set(Components.type('player'))
    entity.set(Characters.walk('down'))

    return entity
  }

  static walk(dir) {
    switch (dir) {
      case 'up':
        return Components.animation(8, [1, 8], 70, 64, Components.repeat())
      case 'down':
        return Components.animation(10, [1, 8], 70, 64, Components.repeat())
      case 'left':
        return Components.animation(9, [1, 8], 70, 64, Components.repeat())
      case 'right':
        return Components.animation(11, [1, 8], 70, 64, Components.repeat())
    }

    throw `Characters.walk unknown direction: ${dir}`
  }

  static Skeleton(dir, x, y) {
    const entity = Characters.entity(x, y, 'assets/skeleton.png')

    entity.set(Components.type('enemy'))
    entity.set(Components.direction(dir))

    // set initial movement direction and animation
    switch (dir) {
      case 'left':
        entity.set(Components.velocity(-1, 0))
        entity.set(Characters.walk('left'))
        break
      case 'right':
        entity.set(Components.velocity(1, 0))
        entity.set(Characters.walk('right'))
        break
      case 'up':
        entity.set(Components.velocity(0, -1))
        entity.set(Characters.walk('up'))
        break
      case 'down':
        entity.set(Components.velocity(0, 1))
        entity.set(Characters.walk('down'))
        break
    }

    entity.set(Components.collision(target => {
      const redirect = target.is('wall') || target.is('enemy') || target.is('player')

      if (!redirect) return false // no collision

      // change direction and animation
      switch (entity.com('direction').value) {
        case 'left':
          entity.set(Components.direction('right'))
          entity.set(Components.velocity(1, 0))
          entity.set(Characters.walk('right'))
          break
        case 'right':
          entity.set(Components.direction('left'))
          entity.set(Components.velocity(-1, 0))
          entity.set(Characters.walk('left'))
          break
        case 'up':
          entity.set(Components.direction('down'))
          entity.set(Components.velocity(0, 1))
          entity.set(Characters.walk('down'))
          break
        case 'down':
          entity.set(Components.direction('up'))
          entity.set(Components.velocity(0, -1))
          entity.set(Characters.walk('up'))
          break
      }

      return true // collided
    }))

    return entity
  }
}
