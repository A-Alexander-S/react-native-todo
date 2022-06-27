import React from "react";
import { TouchableOpacity } from "react-native";
import { BackButtonPropsType } from "./BackButton.types";
import Icon from "react-native-vector-icons/FontAwesome";

export const BackButton = ({ onPress }: BackButtonPropsType) => (
  <TouchableOpacity onPress={onPress}>
    <Icon
      name="chevron-left"
      size={24} />
  </TouchableOpacity>
);