import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TodoList } from "../../screens/TodoList/TodoList";
import { RootStackParamsType } from "./Navigation.types";

const RootStack = createNativeStackNavigator<RootStackParamsType>();

export const Navigation = () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="TodoList">
      <RootStack.Screen name="TodoList" component={TodoList} />
    </RootStack.Navigator>
  </NavigationContainer>
);