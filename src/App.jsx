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

  React.useEffect(() => {
    localStorage.setItem('bestRolls', JSON.stringify(bestRolls))
  }, [bestRolls])

  React.useEffect(() => {
    localStorage.setItem('bestTime', JSON.stringify(bestTime))
  }, [bestTime])

  React.useEffect(() => {
    let intervalId
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond
      // using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10)
    }
    return () => clearInterval(intervalId)
  }, [isRunning, time])

  React.useEffect(() => {
    if (rollsCount === 0 && !isRunning) {
      setIsRunning(true);
    }
  }, [rollsCount, isRunning]);

    // reset timer
    const resetTimer = () => {
      setTime(0);
    };

    function getFormattedTime(time) {
      const minutes = Math.floor((time % 360000) / 6000)
      const seconds = Math.floor((time % 6000) / 100)
      const milliseconds = time % 100

      return (
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0") +
        ":" +
        milliseconds.toString().padStart(2, "0")
      )
    }

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
  }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
    }
    return newDice
}

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

  function holdDice(id) {
    setDice(dice.map((die) => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }

  function resetGame() {
    setTenzies(false)
    setRollsCount(0)
    setDice(allNewDice)
    resetTimer()
  }

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

  function addAndRemoveClass(element, className) {
    element.classList.add(className)
    setTimeout(() => {
      element.classList.remove(className)
    }, 300);
  }

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
