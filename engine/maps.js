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

    // walls
    entities.push(
      Maps.wall(0, 0, 512, 5), // top
      Maps.wall(0, 0, 15, 512), // left
      Maps.wall(0, 490, 512, 15), // bottom
      Maps.wall(497, 0, 15, 512), // right
    )

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

    // walls
    entities.push(
      Maps.wall(0, 0, 512, 5), // top
      Maps.wall(0, 0, 15, 512), // left
      Maps.wall(0, 497, 512, 15), // bottom
      Maps.wall(497, 0, 15, 512), // right

      // Lower Left water
      Maps.wall(0, 268, 110, 224),

      // upper middle water
      Maps.wall(118, 0, 278, 160),
      Maps.wall(160, 160, 128, 29),

      // lower right water
      Maps.wall(403, 332, 96, 148),
    )

    return entities
  }

  static wall(x = 0, y = 0, w = 0, h = 0) {
    const entity = new Entity()
    const box = {x: x, y: y, w: w, h: h}

    entity.set(Components.active())
    entity.set(Components.type('wall'))
    entity.set(Components.hitbox(() => box))

    return entity
  }
}
