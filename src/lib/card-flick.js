import Hammer from "hammerjs"

class CardFlick {

  #cardContainer
  #hammerManager = null
  #cardThreshold = 100
  #transitionDuration = 250

  #isSwiping = false
  #isExpanded = false

  #onSwipeRight = () => {}
  #onSwipeLeft = () => {}
  #onSwipe = () => {}
  #onHandleFlyOffCard = null
  #onExpand = () => {}
  #onCardCollapsed = () => {}
  #onSwipeCycleStart = () => {}
  #onSwipeCycleEnd = () => {}
  #onSwipeStep = () => {}

  constructor(cardContainer, options = {}) {

    if (!cardContainer) {
      throw new Error("cardContainer is required")
    }

    this.#cardContainer = cardContainer

    if (options.cardThreshold) this.#cardThreshold = options.cardThreshold
    if (options.transitionDuration) this.#transitionDuration = options.transitionDuration

    if (options.onSwipeRight) this.#onSwipeRight = options.onSwipeRight
    if (options.onSwipeLeft) this.#onSwipeLeft = options.onSwipeLeft
    if (options.onSwipe) this.#onSwipe = options.onSwipe
    if (options.onHandleFlyOffCard) this.#onHandleFlyOffCard = options.onHandleFlyOffCard
    if (options.onExpand) this.#onExpand = options.onExpand
    if (options.onCardCollapsed) this.#onCardCollapsed = options.onCardCollapsed
    if (options.onSwipeCycleStart) this.#onSwipeCycleStart = options.onSwipeCycleStart
    if (options.onSwipeCycleEnd) this.#onSwipeCycleEnd = options.onSwipeCycleEnd
    if (options.onSwipeStep) this.#onSwipeStep = options.onSwipeStep

    this.#initHammer()
  }

  getTopCard() {
    return this.#getTopCard()
  }

  #getTopCard() {
    const cards = this.#cardContainer.querySelectorAll(".card")
    return cards.length ? cards[0] : null
  }

  #isCardExpanded(card) {
    return card && card.classList.contains('expanded')
  }

  #initHammer() {

    this.#hammerManager = new Hammer.Manager(this.#cardContainer, {
      recognizers: [
        [Hammer.Tap, { event: "tap", pointers: 1 }],
        [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],
        [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL, threshold: 5 }]
      ]
    })

    let currentCard = null
    let startX = 0
    let isDragging = false

    this.#hammerManager.on("tap", () => {

      if (this.#isSwiping) return

      currentCard = this.#getTopCard()
      if (!currentCard) return

      if (this.#isCardExpanded(currentCard)) return

      this.#expandCard(currentCard)

    })

    this.#hammerManager.on("panstart", (e) => {

      if (this.#isSwiping) return

      currentCard = this.#getTopCard()
      if (!currentCard) return

      if (this.#isCardExpanded(currentCard)) return

      isDragging = true
      startX = e.center.x

      currentCard.classList.add("dragging")

    })

    this.#hammerManager.on("panmove", (e) => {

      if (!isDragging || !currentCard) return

      if (this.#isCardExpanded(currentCard)) return

      const diffX = e.center.x - startX
      const rotate = diffX * 0.1

      currentCard.style.transform =
        `translateX(${diffX}px) rotate(${rotate}deg)`

    })

    this.#hammerManager.on("panend", (e) => {

      if (!currentCard) return

      if (this.#isCardExpanded(currentCard)) return

      isDragging = false
      currentCard.classList.remove("dragging")

      const diffX = e.deltaX
      const velocity = e.velocityX
      const screenWidth = window.innerWidth
      const swipeThreshold = Math.max(this.#cardThreshold, screenWidth * 0.15)

      if (Math.abs(diffX) > swipeThreshold || Math.abs(velocity) > 0.3) {

        this.#swipeCard(currentCard, diffX > 0 ? "right" : "left")

      } else {

        currentCard.style.transition = "transform 250ms ease"
        currentCard.style.transform = "translateX(0) rotate(0)"

        setTimeout(() => {
          if(currentCard) currentCard.style.transition = ""
        }, 250)

      }

      currentCard = null

    })

    this.#hammerManager.on("swipe", (e) => {

      if (this.#isSwiping) return

      const card = this.#getTopCard()
      if (!card) return

      if (this.#isCardExpanded(card)) return

      const direction =
        e.direction === Hammer.DIRECTION_RIGHT ? "right" : "left"

      this.#swipeCard(card, direction)

    })

  }

  #swipeCard(card, direction) {

    if (this.#isSwiping) return
    if (this.#isCardExpanded(card)) return
    
    this.#isSwiping = true

    card.classList.add(direction === "right" ? "swipe-right" : "swipe-left")

    if (direction === "right") this.#onSwipeRight(card)
    else this.#onSwipeLeft(card)

    this.#onSwipe(card)

    setTimeout(() => {

      card.classList.remove("swipe-right", "swipe-left")
      card.style.transform = ""

      if (this.#onHandleFlyOffCard) {
        this.#onHandleFlyOffCard(card, direction)
      }

      this.#isSwiping = false

    }, this.#transitionDuration)

  }
  
    
    #expandCard(card) {
        if (this.#isCardExpanded(card)) return

        // First: Record initial position
        const firstRect = card.getBoundingClientRect()

        this.#isExpanded = true

        // Last: Add expanded class (position changes to fixed)
        card.classList.add('expanded')

        // Invert: Calculate the difference
        const lastRect = card.getBoundingClientRect()
        const deltaX = firstRect.left - lastRect.left
        const deltaY = firstRect.top - lastRect.top
        const scaleX = firstRect.width / lastRect.width
        const scaleY = firstRect.height / lastRect.height
        // Apply inverse transform
        card.animate([
            { transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})` },
            { transform: 'translate(0, 0) scale(1)' }
        ], {
          duration: 300, 
            easing: 'ease-in-out'
        })

        // Call expand callback
        this.#onExpand(card)
    }

    collapseCard(card) {
        if (!this.#isCardExpanded(card)) return

        // First: Record current (expanded) position
        const firstRect = card.getBoundingClientRect()

        // Remove expanded class (position will change back to absolute)
        card.classList.remove('expanded')

        // Last: Get the final position after class removal
        const lastRect = card.getBoundingClientRect()

        // Invert: Calculate the difference
        const deltaX = firstRect.left - lastRect.left
        const deltaY = firstRect.top - lastRect.top
        const scaleX = firstRect.width / lastRect.width
        const scaleY = firstRect.height / lastRect.height

        // Play: Animate from current state to final state
        card.animate([
            { transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})` },
            { transform: 'translate(0, 0) scale(1)' }
        ], {
          duration: 300,
            easing: 'ease-in-out'
        })

        // Reset state after animation
        setTimeout(() => {
            this.#isExpanded = false
            this.#onCardCollapsed(card)
        }, 300)
    }

  destroy() {

    if (this.#hammerManager) {
      this.#hammerManager.destroy()
      this.#hammerManager = null
    }

  }

  async swipeToCard(targetIndex, direction = 'right') {
    if (typeof targetIndex !== 'number' || targetIndex < 0) {
      throw new Error('Invalid target index')
    }

    if (this.#onSwipeCycleStart) this.#onSwipeCycleStart()

    const topCard = this.getTopCard()
    if (topCard && this.#isCardExpanded(topCard)) {
      this.collapseCard(topCard)
      await this.#delay(320)
    }

    await this.#waitForSwipe()

    const allCards = this.#cardContainer.querySelectorAll('.card')
    if (targetIndex >= allCards.length) {
      if (this.#onSwipeCycleEnd) this.#onSwipeCycleEnd(this.getTopCard())
      return
    }

    if (targetIndex === 0) {
      if (this.#onSwipeCycleEnd) this.#onSwipeCycleEnd(this.getTopCard())
      return
    }

    const swipesNeeded = targetIndex
    for (let i = 0; i < swipesNeeded; i++) {
      await this.#waitForSwipe()

      const currentTop = this.getTopCard()
      if (!currentTop) break

      this.#swipeCard(currentTop, direction)

      if (this.#onSwipeStep) {
        this.#onSwipeStep(i + 1, swipesNeeded, currentTop)
      }

      await this.#delay(this.#transitionDuration + 50)
      await this.#delay(50)
    }

    if (this.#onSwipeCycleEnd) this.#onSwipeCycleEnd(this.getTopCard())
  }

  #waitForSwipe() {
    if (!this.#isSwiping) return Promise.resolve()
    return new Promise(resolve => {
      const tick = () => {
        if (!this.#isSwiping) {
          resolve()
        } else {
          setTimeout(tick, 50)
        }
      }
      tick()
    })
  }

  #delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

}

export default CardFlick