import React, { useRef } from "react";
import { Animated, PanResponder } from "react-native";

export const GesturedComp = () => {
  const pan = useRef(new Animated.Value(50)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset(0);
      },
      onPanResponderMove: Animated.event([null, { dx: pan }]),
      onPanResponderEnd: () => {
        pan.flattenOffset();
      }
    })
  );

  return (
    <Animated.View
      style={{
        width: 40,
        height: 50,
        backgroundColor: 'pink',
        position: 'absolute',
        transform: [{ translateX: pan }],
        // left: pan,
        top: 100,
        zIndex: 2,
      }}
      {...panResponder.current.panHandlers}
    />
  );
}