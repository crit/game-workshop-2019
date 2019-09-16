class Game {
  constructor(config) {
    this.showHitboxes = false

    this.entities = []

    const element = config.stage
    this.width = element.width
    this.height = element.height
    this.stage = element.getContext('2d')

    this.player = Characters.Player(32, 32)
    this.input = new Input(this.player, this)

    this.selectLevel = config.level
    this.levels = new Levels(this)

    assets.download(() => this.loop())
  }

  loop() {
    this.changeLevel()

    this.entities.forEach((entity, i) => {
      // todo: movement, animation, etc
      if (entity.has(['active', 'position', 'velocity'])) this.move(entity)
    })

    this.render()

    if (this.showHitboxes) this.drawHitboxes()
    window.requestAnimationFrame(() => this.loop())
  }

  render() {
    const updates = []

    this.entities.forEach(entity => {
      if (entity.has(['active', 'renderer'])) updates.push(entity.com('renderer'))
    })

    if (!updates.length) return

    this.stage.clearRect(0, 0, this.width, this.height)
    updates.forEach(update => update.run(this.stage))
  }

  move(entity) {
    if (!entity.com('velocity').vx && !entity.com('velocity').vy) return // not moving

    // todo: collision detection with interactions

    entity.com('position').x += entity.com('velocity').vx
    entity.com('position').y += entity.com('velocity').vy
  }

  changeLevel() {
    if (!this.selectLevel) return
    this.entities = this.levels.select(this.selectLevel, this)
    this.selectLevel = undefined
  }

  drawHitboxes() {
    this.stage.strokeStyle = '#f44336'
    this.entities.forEach(entity => {
      if (entity.missing(['hitbox', 'active'])) return

      const hitbox = entity.com('hitbox').run()
      this.stage.strokeRect(hitbox.x, hitbox.y, hitbox.w, hitbox.h)
    })
  }
}
