class Maps {
  static tile(x = 0, y = 0, frame) {
    const entity = new Entity()

    entity.set(Components.position(x, y))
    entity.set(Components.size(32,32))
    entity.set(Components.type('tile'))
    entity.set(Components.active())

    entity.set(Components.renderer((context) => {
      const pos = entity.com('position')
      const size = entity.com('size')
      const image = assets.get(frame.src)

      context.drawImage(image, frame.x, frame.y, size.w, size.h, pos.x, pos.y, size.w, size.h)
    }))

    return entity
  }

  static parse(data) {
    const entities = []

    const get = (col, row) => {
      return data.tiles[row * data.cols + col]
    }

    for (let col = 0; col < data.cols; col++) {
      for (let row = 0; row < data.rows; row++) {
        const letters = get(col, row)
        const pos = decode(letters)

        entities.push(Maps.tile(col * data.size, row * data.size, {
          src: data.src, x: pos.x, y: pos.y
        }))
      }
    }

    return entities
  }

  static SquareIsland() {
    const entities = Maps.parse({
      src: 'assets/sandwater.png',
      cols: 16,
      rows: 16,
      size: 32,
      tiles: tilesets.square1
    })

    // todo: boundaries

    return entities
  }

  static WhyIsland() {
    const entities = Maps.parse({
      src: 'assets/sandwater.png',
      cols: 16,
      rows: 16,
      size: 32,
      tiles: tilesets.why1
    })

    // todo: boundaries

    return entities
  }
}
