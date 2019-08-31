class Game {
  constructor(config) {
    this.showHitboxes = config.showHitboxes || false

    const element = config.stage
    this.width = element.width
    this.height = element.height
    this.stage = element.getContext('2d')

    // Temporary Hello World
    this.stage.fillStyle = '#ecf0f1'
    this.stage.textAlign = 'center'
    this.stage.font = '24px sans-serif'
    this.stage.fillText('Stage Set And Ready To Work!', this.width / 2, this.height / 2)
    this.stage.fillStyle = '#95a5a6'
    this.stage.font = '16px sans-serif'
    this.stage.fillText('If everything loaded correctly, we can get started.', this.width / 2, this.height / 2 + 32)
  }
}
