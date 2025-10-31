type BannerProps = {
    userWon: boolean;
    resetGame: () => void;
    secretWord: string;
}

const Banner = ({ userWon, resetGame, secretWord }: BannerProps) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-90 z-50">
      <h1 className="text-4xl font-bold mb-4">
        {userWon ? "🎉 You Won!" : "Game Over"}
      </h1>
        <p className="text-2xl mb-4">The secret word was: {secretWord}</p>
      <button
        onClick={resetGame}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Play Again
      </button>
    </div>
  );
};

export default Banner;