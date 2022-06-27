import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SaveButtonPropsType } from "./SaveButton.types";

export const SaveButton = ({ onPress, disabled }: SaveButtonPropsType) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}>
    <Icon
      name="check"
      size={24}
      color={disabled ? 'gray' : 'black'} />
  </TouchableOpacity>
);