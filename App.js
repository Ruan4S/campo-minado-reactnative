import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MineField from "./src/components/MineField";
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
} from "./src/functions";
import params from "./src/params";

export default function App() {
  const [state, setState] = useState({});

  useEffect(() => setState(createState()), []);

  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMinedBoard(rows, cols, minesAmount()),
      won: false,
      lost: false,
    };
  };

  onOpenField = (row, column) => {
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

  return (
    <View style={styles.container}>
      <Text>Iniciando o Mines!</Text>
      <Text>
        Tamanho da grade:
        {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>

      <View style={styles.board}>
        <MineField board={state.board} onOpenField={onOpenField} />
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
