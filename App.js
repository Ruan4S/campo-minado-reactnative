import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MineField from "./src/components/MineField";
import { createMinedBoard } from "./src/functions";
import params from "./src/params";

export default function App() {
  const [board, setBoard] = useState([]);

  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return createMinedBoard(rows, cols, minesAmount());
  };

  useEffect(() => setBoard(createState()), []);

  return (
    <View style={styles.container}>
      <Text>Iniciando o Mines!</Text>
      <Text>
        Tamanho da grade:
        {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>

      <View style={styles.board}>
        <MineField board={board} />
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
