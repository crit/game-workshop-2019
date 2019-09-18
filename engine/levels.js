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

    entities.push(
      Characters.Skeleton('down', 256, 32),
      Characters.Skeleton('left', 32, 256)
    )

    game.player.com('position').x = 32
    game.player.com('position').y = 32
    game.player.set(Characters.walk('down'))

    entities.push(game.player)

    return entities
  }

  static WhyIsland1(game) {
    const entities = Maps.WhyIsland()

    entities.push(
      Characters.Skeleton('down', 32, 32),
      Characters.Skeleton('down', 160, 224),
      Characters.Skeleton('left', 128, 400),
    )

    game.player.com('position').x = 13 * 32
    game.player.com('position').y = 32
    game.player.set(Characters.walk('down'))

    entities.push(game.player)

    return entities
  }
}
