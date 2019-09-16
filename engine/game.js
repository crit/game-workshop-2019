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
      if (entity.has(['active', 'animation'])) this.animate(entity)
      if (entity.has(['active', 'velocity', 'position', 'collision', 'hitbox'])) this.move(entity)
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

    const hitbox = entity.com('hitbox').run()
    const future = {
      x: hitbox.x,
      y: hitbox.y,
      w: hitbox.w,
      h: hitbox.h
    }

    // get where the entity would be if we applied the current velocity values
    future.x += entity.com('velocity').vx
    future.y += entity.com('velocity').vy

    for (let i = 0; i < this.entities.length; i++) {
      const target = this.entities[i]
      if (target.id === entity.id) continue
      if (target.missing(['hitbox', 'active'])) continue
      if (!collides(future, target.com('hitbox').run())) continue

      const stop = entity.com('collision').run(target) // interactions

      if (stop) return // collision told us not to move the entity
    }

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

  animate(entity) {
    const animation = entity.com('animation')

    animation.tick += 0.1

    if (animation.tick * 100 >= animation.delay) {
      animation.frame++
      animation.tick = 0
    }

    if (animation.frame >= animation.frames.length) {
      if (!animation.next) return
      if (typeof animation.next === 'function') return animation.next()
      if (animation.next.name === 'repeat') animation.frame = 0
      if (animation.next.name === 'animation') entity.set(animation.next)
    }
  }
}
