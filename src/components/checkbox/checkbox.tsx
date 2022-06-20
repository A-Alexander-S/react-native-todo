import React, { useRef } from "react";
import { View, Animated, TouchableOpacity, Easing } from "react-native";
import { styles } from "./checkbox.styles";
import { CheckboxPropsType } from "./checkbox.types";

export const Checkbox = ({ checked, onPress }: CheckboxPropsType) => {
  const checkboxScale = useRef(new Animated.Value(0));

  const handlePress = () => {
    Animated.spring(checkboxScale.current, {
      toValue: 1,
      useNativeDriver: true
    }).start(() => {
      checkboxScale.current.setValue(0);
      onPress();
    });
    // Animated.timing(checkboxScale.current, {
    //   toValue: 1.3,
    //   duration: 200,
    //   useNativeDriver: true,
    //   easing: Easing.bounce
    // }).start(() => {
    //   Animated.timing(checkboxScale.current, {
    //     toValue: 1,
    //     duration: 400,
    //     useNativeDriver: true
    //   }).start();
    // });
    // const handlePress = () => {
    //   Animated.timing(checkboxScale.current, {
    //     toValue: 1.2,
    //     duration: 400,
    //     useNativeDriver: true
    //   }).start(() => {
    //     checkboxScale.current.setValue(1);
    //   });
    // };
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={[
          styles.box,
          checked && styles.filled,
          {
            transform: [
              {
                scale: checkboxScale.current.interpolate({
                  inputRange: [0, 0.7, 1],
                  outputRange: [1, 1.3, 1],
                }),
              },
            ],
          },
        ]} />
    </TouchableOpacity>
  );
}