import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/Footer';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { animated, useSpring } from 'react-spring';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Howto: NextPage = () => {
  const fadeIn = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: -100 }, delay: 0 });

  const router = useRouter();
  const { t } = useTranslation('common');

  const changeLanguage = (language: string) => {
    router.replace(router.pathname, router.pathname, { locale: language });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-theme-dark-red font-kanit">
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
        <meta property="og:image" content="https://golden-eyes-game.vercel.app/preview.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://golden-eyes-game.vercel.app" />
        <meta property="twitter:title" content="Golden Eyes Game" />
        <meta
          property="twitter:description"
          content="Let's test the abilities of your eyes. How good at distinguishing colors!"
        />
        <meta property="twitter:image" content="https://golden-eyes-game.vercel.app/preview.png" />
      </Head>

      <main className="flex sm:w-full md:w-1/2 xl:w-1/3 flex-1 flex-col items-center justify-center text-center overflow-y-auto">
        <div className="sm:h-1/2 md:h-3/4 bg-theme-foreground p-8 rounded-lg drop-shadow-lg overflow-y-auto">
          <div className="flex items-center justify-center">
            <div className="inline-flex mb-10" role="group">
              <a
                className="
                  rounded-l-xl
                  shadow-md
                  px-6
                  py-2.5
                  bg-theme-dark-cream
                  text-white
                  font-medium
                  text-lg
                  leading-tight
                  uppercase
                  hover:bg-theme-red
                  focus:bg-theme-red focus:outline-none focus:ring-0
                  active:bg-theme-dark-red
                  transition
                  duration-150
                  ease-in-out
                  cursor-pointer
                "
                onClick={() => changeLanguage('th')}
              >
                ภาษาไทย
              </a>

              <a
                className="
                  rounded-r-xl
                  shadow-md
                  px-6
                  py-2.5
                  bg-theme-dark-cream
                  text-white
                  font-medium
                  text-lg
                  leading-tight
                  uppercase
                  hover:bg-theme-red
                  focus:bg-theme-red focus:outline-none focus:ring-0
                  active:bg-theme-dark-red
                  transition
                  duration-150
                  ease-in-out
                  cursor-pointer
                "
                onClick={() => changeLanguage('en')}
              >
                ENGLISH
              </a>
            </div>
          </div>

          <animated.h1 style={fadeIn} className="text-4xl font-bold mb-10 border-neutral-800">
            {t('howtoplay')}
          </animated.h1>

          <div className="flex flex-wrap justify-center w-1/2 mx-auto">
            <Image
              src={require('../assets/startgame.png')}
              className="max-w-sm h-auto shadow-lg"
              alt="Start playing game"
            />
          </div>

          <p className="my-4">{t('startgame')}</p>

          <div className="flex flex-wrap justify-center w-1/2 mx-auto">
            <Image
              src={require('../assets/inside.png')}
              className="max-w-sm h-auto shadow-lg"
              alt="Start playing game"
            />
          </div>

          <p className="my-4">{t('basic.title')}</p>
          <p className="my-2 text-left text-sm">&bull; {t('basic.1')}</p>
          <p className="my-2 text-left text-sm">&bull; {t('basic.2')}</p>
          <p className="my-2 text-left text-sm">&bull; {t('basic.3')}</p>
          <p className="my-2 text-left text-sm">&bull; {t('basic.4')}</p>
          <p className="mt-2 mb-4 text-left text-sm">&bull; {t('basic.5')}</p>

          <div className="flex flex-wrap justify-center w-1/2 mx-auto">
            <Image
              src={require('../assets/play.png')}
              className="max-w-sm h-auto shadow-lg"
              alt="Start playing game"
            />
          </div>

          <p className="my-4">{t('component.title')}</p>
          <p className="my-2 text-left text-sm">&bull; {t('component.1')}</p>
          <p className="my-2 text-left text-sm">&bull; {t('component.2')}</p>
          <p className="my-2 text-left text-sm">&bull; {t('component.3')}</p>
          <p className="my-2 text-left text-sm">&bull; {t('component.4')}</p>
          <p className="my-2 text-left text-sm">&bull; {t('component.5')}</p>
          <p className="my-2 text-left text-sm">&bull; {t('component.6')}</p>
          <p className="mt-2 mb-4 text-left text-sm">&bull; {t('component.7')}</p>

          <div className="flex flex-wrap justify-center w-1/2 mx-auto">
            <Image
              src={require('../assets/gameover.png')}
              className="max-w-sm h-auto shadow-lg"
              alt="Start playing game"
            />
          </div>

          <p className="my-4">{t('gameover')}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

export default Howto;
