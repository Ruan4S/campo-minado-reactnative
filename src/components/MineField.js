import { StyleSheet, View } from "react-native";
import Field from "./Field";

export default ({ board }) => {
  const rows = board.map((row, r) => {
    const columns = row.map((field, c) => {
      return <Field key={c} {...field} />;
    });

    return (
      <View key={r} style={{ flexDirection: "row" }}>
        {columns}
      </View>
    );
  });

  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEE",
  },
});
