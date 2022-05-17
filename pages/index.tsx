import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { animated, useTransition, useSpring } from 'react-spring';

type BtnProps = {
  y: number;
  delay: number;
  href: string;
  label: string;
};

const Home: NextPage = () => {
  const router = useRouter();
  const fadeIn = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: -100 }, delay: 0 });
  const [buttons, setButtons] = useState<BtnProps[]>([]);
  const transitions = useTransition(buttons, {
    from: { x: -100, y: 800, opacity: 0 },
    enter: (button) => (next) => next({ x: 0, y: button.y, delay: button.delay, opacity: 1 }),
    leave: (button) => (next) => next({ x: 100, y: 800, delay: button.delay, opacity: 0 }),
  });

  useEffect(() => {
    setButtons([
      {
        href: '/play',
        label: 'Play game',
        y: 0,
        delay: 150,
      },
      {
        href: '/howto',
        label: 'How to play',
        y: 0,
        delay: 300,
      },
    ]);
  }, []);

  const goTo = (url: string) => {
    setButtons([]);
    setTimeout(() => {
      router.push(url);
    }, 600);
  };

  return (
    <div className="flex overflow-hidden h-screen flex-col items-center justify-center bg-theme-dark-red font-kanit">
      <main className="flex sm:w-full md:w-1/2 xl:w-1/3 flex-1 flex-col items-center justify-center text-center">
        <div className="h-min bg-theme-foreground p-8 rounded-lg drop-shadow-lg">
          <animated.h1 style={fadeIn} className="text-4xl font-bold mb-20 border-neutral-800">
            Golden Eyes Game
          </animated.h1>

          <div className="flex flex-col gap-6">
            {transitions((style, button) =>
              button ? (
                <animated.button
                  onClick={() => goTo(button.href)}
                  style={style}
                  className="border-2 border-neutral-800 px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-800 text-white shadow-md font-semibold transition-colors"
                >
                  {button.label}
                </animated.button>
              ) : (
                ''
              )
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;