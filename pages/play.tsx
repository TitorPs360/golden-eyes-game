import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import GameOverCard from '../components/GamerOverCard';

const Game: NextPage = () => {
  const [solution, setSolution] = useState('#ffffff');
  const [answer, setAnswer] = useState(0);
  const [answerTable, setAnswerTable] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const MAX_ATTEMPTS = 10;

  const checkColorValid = (value: number) => {
    if (value < 0) {
      return 0;
    }
    if (value > 255) {
      return 255;
    }
    return value;
  };

  const rgbtohex = (r: number, g: number, b: number) => {
    var red = checkColorValid(r).toString(16);
    var green = checkColorValid(g).toString(16);
    var blue = checkColorValid(b).toString(16);
    return (
      '#' +
      (red.length == 1 ? '0' + red : red) +
      (green.length == 1 ? '0' + green : green) +
      (blue.length == 1 ? '0' + blue : blue)
    );
  };

  const gensolution = () => {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    const return_value = {
      red,
      green,
      blue,
      hex: rgbtohex(red, green, blue),
    };

    return return_value;
  };

  const gentable = (solution: { red: any; green: any; blue: any; hex: any }) => {
    const correctPosition = Math.floor(Math.random() * 36);

    const offset = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];

    const table: string[] = [];

    for (let i = 0; i < 36; i++) {
      if (i != correctPosition) {
        const r = solution.red + offset[Math.floor(Math.random() * 9)];
        const g = solution.green + offset[Math.floor(Math.random() * 9)];
        const b = solution.blue + offset[Math.floor(Math.random() * 9)];

        table.push(rgbtohex(r, g, b));
      } else {
        table.push(solution.hex);
      }
    }

    return { correctPosition, table };
  };

  const checkAnswer = (index: number) => {
    if (index == answer) {
      setScore(score + 1);
      setTimer(timer + 10);
      skip();
    } else {
      setAttempts(attempts + 1);

      const newAnswerTable = answerTable;
      newAnswerTable[index] = '#FFFFFF';

      setAnswerTable(newAnswerTable);

      if (attempts == MAX_ATTEMPTS - 1) {
        hard_skip();
      }
    }
  };

  const skip = () => {
    const solution = gensolution();
    const answerTable = gentable(solution);
    setSolution(solution.hex);
    setAnswerTable(answerTable.table);
    setAnswer(answerTable.correctPosition);
    setAttempts(0);
  };

  const hard_skip = () => {
    const table: string[] = [];

    for (let i = 0; i < 36; i++) {
      if (i != answer) {
        table.push('#ffffff');
      } else {
        table.push(solution);
      }
    }

    setAnswerTable(table);

    const handler = (e: any) => {
      e.stopPropagation();
      e.preventDefault();
    };

    document.addEventListener('click', handler, true);

    setTimeout(() => {
      document.removeEventListener('click', handler, true);
      skip();
    }, 1500);
  };

  const reset = () => {
    setGameOver(false);
    setTimer(60);
    setScore(0);
    setAttempts(0);
    const solution = gensolution();
    const answerTable = gentable(solution);
    setSolution(solution.hex);
    setAnswerTable(answerTable.table);
    setAnswer(answerTable.correctPosition);
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearTimeout(countdown);
    } else {
      setGameOver(true);
    }
  }, [timer]);

  useEffect(() => {
    const solution = gensolution();
    const answerTable = gentable(solution);
    setSolution(solution.hex);
    setAnswerTable(answerTable.table);
    setAnswer(answerTable.correctPosition);
  }, []);

  return (
    <div className="flex overflow-hidden h-screen flex-col items-center justify-center bg-theme-dark-red font-kanit">
      <GameOverCard gameOver={gameOver} score={score} name={'Testing'} reset={reset} />

      <main className="flex w-full sm:w-full md:w-1/2 xl:w-1/3 flex-1 flex-col items-center justify-center text-center p-4">
        <div className="h-min w-full bg-theme-foreground p-8 rounded-lg drop-shadow-lg">
          <div className="flex flex-row">
            <div className="basis-1/4">
              <div className="h-full w-full rounded-lg" style={{ background: solution }}></div>
            </div>
            <div className="basis-2/4">
              <p className="text-3xl right-0">{timer}</p>
              {/* <p className="text-3xl right-0">hint: {answer}</p> */}
            </div>
            <div className="basis-1/4">
              <p className="text-lg right-0">score</p>
              <p className="text-xl right-0">{score}</p>
            </div>
          </div>

          <div className="grid grid-cols-6 my-8" style={{ cursor: 'pointer' }}>
            {answerTable.map((color_code, i) => {
              return (
                <div
                  className="h-12"
                  style={{ background: color_code }}
                  key={i}
                  onClick={() => {
                    checkAnswer(i);
                  }}
                >
                  {i}
                </div>
              );
            })}
          </div>

          <div className="flex flex-row">
            <div className="basis-1/4">
              <p
                className="text-lg underline"
                onClick={() => {
                  reset();
                }}
              >
                reset
              </p>
            </div>
            <div className="basis-2/4">
              <p>
                Attemp: {attempts}/{MAX_ATTEMPTS}
              </p>
            </div>
            <div className="basis-1/4">
              <p
                className="text-lg underline"
                onClick={() => {
                  hard_skip();
                }}
              >
                skip
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Game;
