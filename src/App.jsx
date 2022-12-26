import { useState, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("gg");
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="w-full h-screen bg-[#0B2434] p-10 flex flex-col justify-center items-center">
      <main className="bg-[#F5F5F5] h-96 max-w-md rounded-md flex flex-col justify-center items-center">
        {tenzies && <Confetti />}
        <h1 className="font-bold text-4xl text-slate-800">Tenzies</h1>
        <p className="font-medium px-5 md:px-10 text-justify leading-5 md:leading-none tracking-tighter md:tracking-normal md:text-lg">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="grid grid-cols-5 gap-4 m-4 md:m-8 md:gap-7 ">
          {diceElements}
        </div>
        <button
          className="rounded-md relative curson-pointer text-2xl inline-flex group items-center justify-center px-3.5 py-1 m-1 border-b-4 border-l-2 active:border-green-600 active:shadow-none shadow-lg bg-gradient-to-tr from-green-600 to-green-500 border-green-700 text-white"
          onClick={rollDice}
        >
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-xl md:group-hover:w-20 md:group-hover:h-10 opacity-10"></span>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}
