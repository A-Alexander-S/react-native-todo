import React from "react";
import { View } from "react-native";
import { styles } from "./checkbox.styles";
import { CheckboxPropsType } from "./checkbox.types";

export const Checkbox = ({ checked }: CheckboxPropsType) => (
  <View style={[
    styles.box,
    checked && styles.filled
  ]} />
)