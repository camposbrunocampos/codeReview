import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 64,
    backgroundColor: "#E9794B",
  },
  title: {
    fontSize: 11,
    color: "white",
    fontWeight: "bold",
    fontFamily: "gotham-medium",
    textTransform: "uppercase",
  },
});

interface ButtonProps {
  title: string;
}

const Button = (props: TouchableOpacityProps & ButtonProps) => (
  <TouchableOpacity {...props} style={styles.button}>
    <Text style={styles.title}>{props.title}</Text>
  </TouchableOpacity>
);

export default Button;
