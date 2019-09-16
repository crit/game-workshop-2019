class Game {
  constructor(config) {
    this.showHitboxes = false

    this.entities = []

    const element = config.stage
    this.width = element.width
    this.height = element.height
    this.stage = element.getContext('2d')

    assets.download(() => this.loop())
  }

  loop() {
    this.entities.forEach((entity, i) => {
      // todo: movement, animation, etc
    })

    this.render()

    window.requestAnimationFrame(() => this.loop())
  }

  render() {
    const updates = []

    this.entities.forEach(entity => {
      if (entity.has(['active', 'render'])) updates.push(entity.com('renderer'))
    })

    if (!updates.length) return

    this.stage.clearRect(0, 0, this.width, this.height)
    updates.forEach(update => update.run(this.stage))
  }
}
