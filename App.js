import { StyleSheet, Text, View } from "react-native";
import Field from "./src/components/Field";
import Mine from "./src/components/Mine";

import params from "./src/params";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Iniciando o Mines!</Text>
      <Text>
        Tamanho da grade:
        {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>
      <Field />
      <Field opened />
      <Field opened nearMines={1} />
      <Field opened nearMines={2} />
      <Field opened nearMines={5} />
      <Field opened nearMines={8} />
      <Field mined />
      <Field mined opened />
      <Field mined opened exploded />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
