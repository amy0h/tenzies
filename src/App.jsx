import React from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [isShaking, setIsShaking] = React.useState(false)
  const [rollsCount, setRollsCount] = React.useState(0)
  const [timer, setTimer] = React.useState(null) 


  React.useEffect(() => {
    const checkTenziesStatus = dice.every((die) => {
      return die.isHeld === true && die.value === dice[0].value;
    });
    if (checkTenziesStatus) {
      setTenzies(true)
    } 
  }, [dice]);

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
    console.log(rollsCount)
    console.log(tenzies)
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
      setRollsCount(0)
      setTenzies(false)
      setDice(allNewDice)
    }
  }

  function holdDice(id) {
    setDice(dice.map((die) => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
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
          Roll until all dice are the same.<br/>
          Click each die to freeze it at its current value between rolls.
          </p>
{          <div className='records-container'>
            <span className='left'>Rolls: {rollsCount}</span> 
            <span>Timer: </span> 
          </div>}
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
