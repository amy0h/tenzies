import React from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {
  const bestRollsElement = document.getElementById('best-rolls')
  const bestTimeElement = document.getElementById('best-time')

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [isShaking, setIsShaking] = React.useState(false)
  const [rollsCount, setRollsCount] = React.useState(0)
  
  const [bestRolls, setBestRoll] = React.useState(
    JSON.parse(localStorage.getItem('bestRolls')) || 0
  )
  const [bestTime, setBestTime] = React.useState(
    JSON.parse(localStorage.getItem('bestTime')) || 0
  )

  const [isRunning, setIsRunning] = React.useState(false)
  const [time, setTime] = React.useState(0)

  // Start the timer when rollesCOunt is 0
  React.useEffect(() => {
    if (rollsCount === 0 && !isRunning) {
      setIsRunning(true);
    }
  }, [rollsCount, isRunning]);

  // Check for the win condition
  React.useEffect(() => {
    const checkTenziesStatus = dice.every((die) => {
      return die.isHeld === true && die.value === dice[0].value;
    });
    if (checkTenziesStatus) {
      setTenzies(true)
      setIsRunning(false)
      setBestRecord()
    } 
  }, [dice]);

  // Store best rolls and best time in localStorage
  React.useEffect(() => {
    localStorage.setItem('bestRolls', JSON.stringify(bestRolls))
  }, [bestRolls])

  React.useEffect(() => {
    localStorage.setItem('bestTime', JSON.stringify(bestTime))
  }, [bestTime])

  // Timer interval setup
  React.useEffect(() => {
    let intervalId
    if (isRunning) {
      // Update time every 10ms
      intervalId = setInterval(() => setTime(time + 1), 10)
    }
    return () => clearInterval(intervalId)
  }, [isRunning, time])

    // reset the timer
    const resetTimer = () => {
      setTime(0);
    };

    // Format the timer display as "mm:ss"
    function getFormattedTime(time) {
      const seconds = Math.floor((time % 6000) / 100)
      const milliseconds = time % 100

      return (
        seconds.toString().padStart(2, "0") +
        ":" +
        milliseconds.toString().padStart(2, "0")
      )
    }

  // Generate a new die object with random value and unique ID
  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
  }
  }

  // Generate an array of 10 new dice objects
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
    }
    return newDice
}

// Roll the dices (that are not held) when "Roll" button is clicked
  function rollDice() {
    if (!tenzies) {
      setRollsCount(prevCount => prevCount + 1)
      setDice(dice.map((die) => {
        return die.isHeld === true ?
        die :
        generateNewDie()
      }))

      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);

    } else {
        resetGame()
    }
  }

  // Toggle "isHeld" property of a die when clicked
  function holdDice(id) {
    setDice(dice.map((die) => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }

  // Reset the game
  function resetGame() {
    setTenzies(false)
    setRollsCount(0)
    setDice(allNewDice)
    resetTimer()
  }

  // Update the best rolls and best time
  // when current value is better than the stored value
  function setBestRecord() {
    const animationClassName = 'update-best-record'
    if (!bestRolls || rollsCount < bestRolls) {
      setBestRoll(rollsCount)
      addAndRemoveClass(bestRollsElement, animationClassName)
    } 
    if (!bestTime || time < bestTime) {
      setBestTime(time)
      addAndRemoveClass(bestTimeElement, animationClassName)
    } 
  }

  // Add and remove CSS class for animation
  function addAndRemoveClass(element, className) {
    element.classList.add(className)
    setTimeout(() => {
      element.classList.remove(className)
    }, 300);
  }

  // Render the individual Die components 
  const diceComponents = dice.map((die) => (
    <Die
      key={die.id} value={die.value} isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      isShaking={isShaking}
     />
  ))

  return (
    <div>
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
        {tenzies
          ? <p className='winner-text'>you won!</p>
          : (
            <>
              Roll until all dice are the same.<br />
              Click each die to freeze it at its current value between rolls.
            </>
          )}
        </p>
        <div className='records-container'>
          <p>
            <span className='bold'>Rolls: </span>
            {rollsCount}
          </p>
          <p>
            <span className='bold'>Time: </span>
            {getFormattedTime(time)}
          </p>
        </div>
        <div className='records-container'>
          <p id='best-rolls'>
            <span className='bold'>Best Rolls: </span>
            {bestRolls}
          </p>
          <p id='best-time'>
          <span className='bold'>Best Time: </span>
            {getFormattedTime(bestTime)}
          </p>
        </div>

        <div className='dice-container'>
          {diceComponents}
        </div>
        <button className='roll-dice' onClick={rollDice}>{tenzies ? `New Game` : `Roll`}</button>
        {tenzies && 
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
          />}
      </main>
    </div>
  )
}

export default App
