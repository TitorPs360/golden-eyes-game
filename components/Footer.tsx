const Footer = () => {
  return (
    <footer className="flex flex-col h-12 w-full text-white items-center justify-center border-t font-kanit bg-theme-dark-red">
      <h1>
        Code is available on{' '}
        <a
          href="https://github.com/TitorPs360/golden-eyes-game"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          Github
        </a>{' '}
        |
        <a href="https://www.youtube.com/c/TitorPs360" target="_blank" rel="noreferrer">
          {' '}
          TitorPs360
        </a>
      </h1>
    </footer>
  );
};

export default Footer;
