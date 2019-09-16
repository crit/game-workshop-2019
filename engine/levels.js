class Levels {
  constructor(player) {
    this.player = player

    this.items = {
      'square1': Levels.SquareIsland1,
      'why1': Levels.WhyIsland1
    }
  }

  select(name, game) {
    const level = this.items[name]

    if (!level) throw `unknown level ${name}`

    return level(game)
  }

  static SquareIsland1(game) {
    const entities = Maps.SquareIsland()

    // temporary wall
    const wall = new Entity()
    wall.set(Components.active())
    wall.set(Components.type('wall'))
    wall.set(Components.hitbox(() => {
      return {
        x: game.width / 2 - 32,
        y: game.height / 2 - 32,
        w: 64,
        h: 64
      }
    }))
    entities.push(wall)

    // todo: add enemies to the level

    game.player.com('position').x = 32
    game.player.com('position').y = 32
    // todo: reset player animations

    entities.push(game.player)

    return entities
  }

  static WhyIsland1(game) {
    const entities = Maps.WhyIsland()

    // todo: add enemies to the level

    game.player.com('position').x = 13 * 32
    game.player.com('position').y = 32
    // todo: reset player animations

    entities.push(game.player)

    return entities
  }
}
