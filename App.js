import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MineField from "./src/components/MineField";
import Header from "./src/components/Header";
import LevelSelection from "./src/screens/LevelSelection";
import {
  cloneBoard,
  createMinedBoard,
  flagsUsed,
  hadExplosion,
  invertFlag,
  openField,
  showMines,
  wonGame,
} from "./src/functions";
import params from "./src/params";

export default function App() {
  const [state, setState] = useState({ board: [[]] });

  const minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  const createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMinedBoard(rows, cols, minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    };
  };

  const onOpenField = (row, column) => {
    const board = cloneBoard(state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert("Perdeeeeeu!", "Que buuuuuuurro!");
    }

    if (won) {
      Alert.alert("Parabéns", "Você venceu!");
    }

    setState((prevState) => ({ ...prevState, board, lost, won }));
  };

  const onSelectField = (row, column) => {
    const board = cloneBoard(state.board);
    invertFlag(board, row, column);
    const won = wonGame(board);

    if (won) {
      Alert.alert("Parabéns", "Você Venceu!");
    }

    setState((prevState) => ({ ...prevState, board, won }));
  };

  const onLevelSelected = (level) => {
    params.difficultLevel = level;

    setState(createState());
  };

  useEffect(() => setState(createState()), []);

  return (
    <View style={styles.container}>
      <LevelSelection
        isVisible={state.showLevelSelection}
        onLevelSelected={onLevelSelected}
        onCancel={() => setState((prevState) => ({ ...prevState, showLevelSelection: false }))}
      />

      <Header
        flagsLeft={minesAmount() - flagsUsed(state.board)}
        onNewGame={() => setState(createState())}
        onFlagPress={() => setState((prevState) => ({ ...prevState, showLevelSelection: true }))}
      />

      <View style={styles.board}>
        <MineField board={state.board} onOpenField={onOpenField} onSelectField={onSelectField} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  board: {
    alignItems: "center",
    backgroundColor: "#AAA",
  },
});
