import { StyleSheet, Text, View } from "react-native";
import params from "../params";

export default ({ mined, opened, nearMines }) => {
  const styleField = [styles.field];
  // Outros estilos aqui!
  if (opened) styleField.push(styles.opened);
  if (styleField.length === 1) styleField.push(styles.regular);

  let color = null;
  if (nearMines > 0) {
    if (nearMines === 1) color = "#008000";
    if (nearMines === 2) color = "#003566";
    if (nearMines > 2 && nearMines < 6) color = "#fdcb11";
    if (nearMines >= 6) color = "#c90606";
  }

  return (
    <View style={styleField}>
      {!mined && opened && nearMines > 0 ? (
        <Text style={[styles.label, { color: color }]}>{nearMines}</Text>
      ) : (
        false
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    height: params.blockSize,
    width: params.blockSize,
    borderWidth: params.borderSize,
  },
  regular: {
    backgroundColor: "#999",
    borderLeftColor: "#CCC",
    borderTopColor: "#CCC",
    borderRightColor: "#333",
    borderBottomColor: "#333",
  },
  opened: {
    backgroundColor: "#999",
    borderColor: "#777",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: params.fontSize,
  },
});