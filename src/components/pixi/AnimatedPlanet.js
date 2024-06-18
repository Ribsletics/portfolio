import gsap from "gsap";
import { Container, Graphics, Sprite, TilingSprite } from "pixi.js";

export class AnimatedPlanet extends Container {
  #active = false
  #tween = null
  constructor({ texture, glowTexture, shadowTexture, revSpeed = 5, app, rotates, angle = 45 }) {
    super()
    this.revSpeed = revSpeed
    this.rotates = rotates
    this.x = app.renderer.screen.width / 2
    this.y = app.renderer.screen.height / 2
    this.scale.set(0.2)
    this.alpha = 0
    this.angle = angle

    const glow = new Sprite(glowTexture)
    glow.width = 1480
    glow.height = 1480
    glow.anchor.set(0.5)
    this.addChild(glow)

    let img = this.img = new TilingSprite(texture)
    img.width = rotates ? 2880 : 1440
    img.height = 1480
    img.anchor.set(0.5)
    this.addChild(img)

    let mask = new Graphics()
    mask.circle(0, 0, 720)
    mask.fill({ color: 0xffffff })
    this.addChild(mask)

    const shadow = new Sprite(shadowTexture)
    shadow.width = 1440
    shadow.height = 1440
    shadow.anchor.set(0.5)
    this.addChild(shadow)

    img.mask = mask
    app.stage.addChild(this)

    this.tweener = 0
    this.#tween = gsap.to(this, {
      tweener: 1, duration: 1, ease: 'none', repeat: -1, paused: !this.rotates, onUpdate: this.update
    })
  }

  get active() {
    return this.#active
  }
  set active(value) {
    this.#tween.paused(!value && !this.rotates)
    this.#active = value
  }

  update = () => {
    if (!this.active || !this.rotates) return
    this.img.tilePosition.x += this.revSpeed
  }
}