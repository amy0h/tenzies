import React from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

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
    if (!tenzies) {
      setDice(dice.map((die) => {
        return die.isHeld === true ?
        die :
        generateNewDie()
      }))
    } else {
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
     />
  ))

  return (
    <div>
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same.
          Click each die to freeze it at its current value between rolls.
          </p>
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
