import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/Footer';
import Image from 'next/image';
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
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Golden Eyes Game</title>
        <meta name="title" content="Golden Eyes Game" />
        <meta
          name="description"
          content="Let's test the abilities of your eyes. How good at distinguishing colors!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://golden-eyes-game.vercel.app" />
        <meta property="og:title" content="Golden Eyes Game" />
        <meta
          property="og:description"
          content="Let's test the abilities of your eyes. How good at distinguishing colors!"
        />
        <meta property="og:image" content="https://golden-eyes-game.vercel.app/preview.jpeg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://golden-eyes-game.vercel.app" />
        <meta property="twitter:title" content="Golden Eyes Game" />
        <meta
          property="twitter:description"
          content="Let's test the abilities of your eyes. How good at distinguishing colors!"
        />
        <meta property="twitter:image" content="https://golden-eyes-game.vercel.app/preview.jpeg" />
      </Head>

      <main className="flex sm:w-full md:w-1/2 xl:w-1/3 flex-1 flex-col items-center justify-center text-center">
        <div className="h-min bg-theme-foreground p-8 rounded-lg drop-shadow-lg">
          <animated.h1 style={fadeIn} className="text-4xl font-bold mb-10 border-neutral-800">
            Golden Eyes Game
          </animated.h1>

          <div className="flex flex-wrap justify-center w-1/2 mx-auto mb-10">
            <Image
              src={require('../public/icon.svg')}
              className="max-w-sm h-auto shadow-lg"
              alt="Start playing game"
            />
          </div>

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
