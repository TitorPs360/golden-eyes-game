import { animated, useSpring } from 'react-spring';

type Props = {
  gameOver: boolean;
  score: number;
  name: string;
  reset: () => void;
};

const GameOverCard = ({ gameOver, score, name, reset }: Props) => {
  const gameEnd = useSpring({
    display: gameOver ? '' : 'none',
    opacity: gameOver ? 1 : 0,
    y: gameOver ? '0' : '100%',
  });
  return (
    <animated.div
      style={gameEnd}
      className=" flex flex-col pb-32 justify-end items-center z-10 absolute w-screen h-screen bg-zinc-800/50"
    >
      <div className="w-4/5 max-w-sm h-44 md:h-64 gap-6 flex flex-col justify-center items-center rounded-xl shadow-xl bg-white">
        <h1 className="text-xl font-semibold">SCORE</h1>
        <h1 className="text-5xl font-semibold">{score}</h1>
        <button
          onClick={reset}
          className="border-2 border-neutral-800 px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-800 text-white shadow-md font-semibold transition-colors"
        >
          Play Again
        </button>
      </div>
    </animated.div>
  );
};

export default GameOverCard;
