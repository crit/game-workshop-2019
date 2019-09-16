class Characters {
  static entity(x = 0, y = 0, imgPath) {
    const entity = new Entity()

    entity.set(Components.active())
    entity.set(Components.position(x, y))
    entity.set(Components.size(64, 64))
    entity.set(Components.type('character'))
    // todo: add velocity
    // todo: add health

    entity.set(Components.renderer(context => {
      const pos = entity.com('position')
      const size = entity.com('size')
      const image = assets.get(imgPath)
      const frame = {x: 0, y: 0}

      context.drawImage(image, frame.x, frame.y, size.w, size.h, pos.x, pos.y, size.w, size.h)
    }))

    // todo: add hitbox
    // todo: add collision
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
