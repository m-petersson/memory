/**
 * Plays the whole game.
 */
function memoryGame() {
  const cardsUrl = ['src/memoryIMG/bernese.png', 'src/memoryIMG/briard.png', 'src/memoryIMG/dalmatian.png', 'src/memoryIMG/german shepherd.png', 'src/memoryIMG/husky.png',
    'src/memoryIMG/maltese.png', 'src/memoryIMG/pekingese.png', 'src/memoryIMG/schnauzer.png']

  let cards = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]
  // shuffle cards array
  cards.sort(() => Math.random() - 0.5)

  const backsideUrl = 'src/memoryIMG/memoryBack.png'
  const clearUrl = 'src/memoryIMG/memoryClear.png'
  let two = false // true if we want to play a 2x2 grid
  let nCards = 0 // the number of cards based on grid size
  let time = 0 // the time you will have to look at the flipped cards

  // get the grid
  let grid = document.getElementById('memorygrid')
  const gridSize = document.getElementById('gridSize')
  const grid4x4Button1 = document.getElementById('fourXfour')
  const grid2x4Button1 = document.getElementById('twoXfour')
  const grid2x2Button1 = document.getElementById('twoXtwo')

  // if choosing 4x4 create a 4x4 grid
    grid4x4Button1.addEventListener('click', function () {
    gridSize.removeChild(grid4x4Button1)
    gridSize.removeChild(grid2x4Button1)
    gridSize.removeChild(grid2x2Button1)
    nCards = 16
  }) // if choosing 2x4 create a 2x4 grid
  grid2x4Button1.addEventListener('click', function () {
    gridSize.removeChild(grid4x4Button1)
    gridSize.removeChild(grid2x4Button1)
    gridSize.removeChild(grid2x2Button1)
    cards = [0, 0, 1, 1, 2, 2, 3, 3]
    // shuffle cards array
    cards.sort(() => Math.random() - 0.5)
    nCards = 8
  }) // if choosing 2x2 create a 2x2 grid
  grid2x2Button1.addEventListener('click', function () {
    gridSize.removeChild(grid4x4Button1)
    gridSize.removeChild(grid2x4Button1)
    gridSize.removeChild(grid2x2Button1)
    cards = [0, 0, 1, 1]
    // shuffle cards array
    cards.sort(() => Math.random() - 0.5)
    two = true
    nCards = 4
  })
 
  const text1 = document.getElementById('text')
  const easy1 = document.getElementById('easyButton')
  const middle1 = document.getElementById('middleButton')
  const hard1 = document.getElementById('hardButton')
  const difficultLevel = document.getElementById('difficultLevel')
  const game= document.getElementById('game')
  const welcome= document.getElementById('welcome')


  // if you have chosen easy you will have 1200 ms to look at the flipped cards
  easy1.addEventListener('click', function () {
    difficultLevel.removeChild(easy1)
    game.removeChild(text1)
    game.removeChild(welcome)
    difficultLevel.removeChild(middle1)
    difficultLevel.removeChild(hard1)
    time = 1200
    // create the grid with the chosen size
    createGrid(nCards)
  })
  // if you have chosen middle you will have 800 ms to look at the flipped cards
  middle1.addEventListener('click', function () {
    difficultLevel.removeChild(middle1)
    game.removeChild(text1)
    game.removeChild(welcome)
    difficultLevel.removeChild(hard1)
    difficultLevel.removeChild(easy1)
    time = 800
    createGrid(nCards)
  })
  // if you have chosen hard you will have 300 ms to look at the flipped cards
  hard1.addEventListener('click', function () {
    difficultLevel.removeChild(hard1)
    game.removeChild(text1)
    game.removeChild(welcome)
    difficultLevel.removeChild(middle1)
    difficultLevel.removeChild(easy1)
    time = 300
    createGrid(nCards)
  })
  /**
   * Creates the grid containing the images.
   *
   * @param {number} numOfCards - The number of cards.
   */
  function createGrid (numOfCards) {
    const grid1 = []
    // go through and add the images to the grid
    for (let i = 0; i < numOfCards; i++) {
      grid1[i] = document.createElement('input')
      grid1[i].type = 'image'
      grid1[i].src = backsideUrl
      grid1[i].id = i
      grid1[i].addEventListener('click', flip)

      if(two){
        grid1[i].className = 'memoryimgtwo'
      }else{
        grid1[i].className = 'memoryimg'
      }
      grid.appendChild(grid1[i])
    }
  }

  let flippedCards = [] // keep the two flipped cards
  let flippedCardsId = [] // keep the two flipped cards
  let flippedCardCount = 0 // counter for how many cards you have flipped
  let cardCount = 0 // counter for the total number of cards matched
  let attemptCounter = 0 // count number of attemts
  let startAgain = document.getElementById('startAgain')

startAgain.addEventListener('click', function () {
  window.location.reload()
})
  
  /**
   * Flips the cards, check for matches and print the number of attempts.
   *
   */
  function flip () {
    flippedCardCount = flippedCardCount + 1
    const id = this.id
    // get the cards we have chosen
    flippedCards.push(cards[id])
    flippedCardsId.push(id)
    this.setAttribute('src', cardsUrl[cards[id]])
    // if we have flipped two cards, check for a match
    if (flippedCardCount === 2) {
      setTimeout(() => {
        flippedCardCount = 0
        attemptCounter = attemptCounter + 1
        // get all the images
        const card = document.getElementById("game").querySelectorAll('input')
        // found a match and you have not clicked the same card twice
        if (flippedCards[0] === flippedCards[1] && flippedCardsId[0] !== flippedCardsId[1]) {
          // remove these cards from the grid
          card[flippedCardsId[0]].src = clearUrl
          card[flippedCardsId[1]].src = clearUrl
          card[flippedCardsId[0]].removeEventListener('click', flip)
          card[flippedCardsId[1]].removeEventListener('click', flip)
          cardCount = cardCount + 2
        } else {
          // flip the cards back
          card[flippedCardsId[0]].src = backsideUrl
          card[flippedCardsId[1]].src = backsideUrl
        }
        // clear the arrays for the next attempt
        flippedCards = []
        flippedCardsId = []
        // if we have matched all cards
        if (cardCount === cards.length) {
          grid.textContent = 'Congratulations! You made it in ' + `${attemptCounter}` + ' attempts.'
          startAgain.style.display = 'block'
        }
      }, time)
    }
  }
}

memoryGame()
