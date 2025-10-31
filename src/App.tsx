import { useReducer, useEffect, useState } from "react";
import Grid from "./Components/Grid";
import Banner from './Components/Banner';

type CellData = { letter: string; status: string | null };
type GridType = CellData[][];

type ReducerArgs = { col: number; row: number; grid: GridType };
type ReducerAction = { type: string; payload?: string; secretWord?: string, userInput?: string };

function reducer(state: ReducerArgs, action: ReducerAction): ReducerArgs {
  switch (action.type) {
    case "ADD": {
      if (!action.payload) return state;
      console.log("Add: " + state.col);
      const gridCopy: GridType = state.grid.map((row) =>
        row.map((cell) => ({ ...cell }))
      );
      gridCopy[state.row][state.col].letter = action.payload;
      console.log(state.col);
      return { ...state, col: state.col+1, grid: gridCopy };
    }

    case "DELETE": {
      console.log("Delete: " + (state.col-1));
      const gridCopy: GridType = state.grid.map((row) =>
        row.map((cell) => ({ ...cell }))
      );
      gridCopy[state.row][state.col-1].letter = "";
      return { ...state, col: state.col-1, grid: gridCopy };
    }

    case "SUBMIT": {
      if (!action.userInput || !action.secretWord) return state;
      const gridCopy: GridType = state.grid.map((row) =>
        row.map((cell) => ({ ...cell }))
      );

      for (let i = 0; i < 5; i++) {
        const letter = action.userInput[i];
        if (letter === action.secretWord[i]) {
          gridCopy[state.row][i].status = "right";
        } else if (action.secretWord.includes(letter)) {
          gridCopy[state.row][i].status = "present";
        } else {
          gridCopy[state.row][i].status = "wrong";
        }
      }

      return { ...state, row: state.row+1, col: 0, grid: gridCopy };
    }

    case "RESET": {
      const newGrid = Array.from({ length: 6 }, () =>
        Array.from({ length: 5 }, () => ({ letter: "", status: null }))
      );
      return { col: 0, row: 0, grid: newGrid };
    }

    default:
      return state;
  }
}

function App() {
  const initialArgs: ReducerArgs = {
    col: 0,
    row: 0,
    grid: Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({ letter: "", status: null }))
    ),
  };

  const [state, dispatch] = useReducer(reducer, initialArgs);
  const [input, setInput] = useState("");
  const [secretWord, setSecretWord] = useState('');
  const [hasUserWon, setHasUserWon] = useState(false);

  async function fetchSecretWord() {
      const response = await fetch('/words.json');
      const data: string[] = await response.json();
      const secretWord = data[Math.floor(Math.random() * data.length)];
      setSecretWord(secretWord.toLowerCase());
      console.log(secretWord);
  }
 
  useEffect(() => {
    fetchSecretWord();
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (state.row > 5 || hasUserWon) return;
      const key = e.key;
      if (/^[a-zA-Z]$/.test(key) && state.col <= 4) {
        dispatch({ type: "ADD", payload: key.toLowerCase() });
        setInput((prev) => prev + key.toLowerCase());
      } else if (key === "Backspace" && state.col >= 1) {
        dispatch({ type: "DELETE" });
        setInput((prev) => prev.slice(0, -1));
      } else if (key === "Enter") {
        if (state.col <= 4) return; 
        dispatch({ type: "SUBMIT", userInput: input.toLowerCase(), secretWord });
        setInput("");
        if (input === secretWord) {
          setHasUserWon(true);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, state, secretWord, hasUserWon]);

  function restartGame() {
    dispatch({ type: "RESET" });
    setHasUserWon(false);
    setInput('');
    fetchSecretWord();
  }

  return (
    <div>
      {(hasUserWon || state.row > 5)&& <Banner userWon={hasUserWon} resetGame={restartGame} secretWord={secretWord} />}
      <Grid grid={state.grid} />
    </div>
  );
}

export default App;
