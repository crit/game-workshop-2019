class Characters {
  static entity(x = 0, y = 0, imgPath) {
    const entity = new Entity()

    entity.set(Components.active())
    entity.set(Components.position(x, y))
    entity.set(Components.size(64, 64))
    entity.set(Components.type('character'))
    entity.set(Components.velocity(0, 0))
    // todo: add health

    entity.set(Components.renderer(context => {
      const pos = entity.com('position')
      const size = entity.com('size')
      const image = assets.get(imgPath)
      const frame = {x: 0, y: 64 * 2}

      context.drawImage(image, frame.x, frame.y, size.w, size.h, pos.x, pos.y, size.w, size.h)
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
    // todo: Add walk down animation

    return entity
  }
}
