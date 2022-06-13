import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TodoList } from "../screens/TodoList/TodoList";
import { RootStackParamsType } from "./Navigation.types";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const RootStack = createNativeStackNavigator<RootStackParamsType>();
const Tab = createBottomTabNavigator();

export const Navigation = () => (
  <NavigationContainer>
    <Tab.Navigator initialRouteName="TodoList">
      <Tab.Screen name="TodoList" component={TodoList} />
      <Tab.Screen name="Ура" component={TodoList} />
    </Tab.Navigator>
  </NavigationContainer>
);
{/* <RootStack.Navigator initialRouteName="TodoList">
      <RootStack.Screen name="TodoList" component={TodoList} />
    </RootStack.Navigator> */}