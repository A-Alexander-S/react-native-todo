import React from "react";
import {
  NavigationContainer,
  createNavigationContainerRef
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TodoList } from "../screens/TodoList/TodoList";
import { RootStackParamsType } from "./Navigation.types";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TodoDetails } from "../screens/TodoDetails/TodoDetails";
import { BackButton } from "../components/BackButton/BackButton";
import { ImgFull } from "../components/ImgFull/ImgFull";

const RootStack = createNativeStackNavigator<RootStackParamsType>();
export const navRef = createNavigationContainerRef();

const Tab = createBottomTabNavigator();

export const Navigation = () => (
  <NavigationContainer ref={navRef}>
    <RootStack.Navigator initialRouteName="TodoList">
      <RootStack.Group>
        <RootStack.Screen name="TodoList" component={TodoList} />
        <RootStack.Screen
          options={({ navigation }) => ({
            title: 'Details',
            headerTitleStyle: { fontSize: 25 },
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerLeft: () => <BackButton onPress={navigation.goBack} />
          })}
          name="TodoDetails"
          component={TodoDetails}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'containedModal' }}>
        <RootStack.Screen name="ImgFull" component={ImgFull} />
      </RootStack.Group>
    </RootStack.Navigator>
  </NavigationContainer>
);

{/* <NavigationContainer>
  <RootStack.Navigator initialRouteName="TodoList">
    <RootStack.Screen name="TodoList" component={TodoList} />
  </RootStack.Navigator>
</NavigationContainer> */}


  //   <NavigationContainer>
  //   <Tab.Navigator initialRouteName="TodoList">
  //     <Tab.Screen name="TodoList" component={TodoList} />
  //     <Tab.Screen name="Ура" component={TodoList} />
  //   </Tab.Navigator>
  // </NavigationContainer>

  /////////////////////////////
  // <NavigationContainer>
  //   <Tab.Navigator >
  //     <Tab.Screen name="TodoList" component={() => (
  //       <RootStack.Navigator initialRouteName="TodoList">
  //         <RootStack.Screen name="TodoList" component={TodoList} />
  //       </RootStack.Navigator>
  //     )} />
  //   </Tab.Navigator>
  // </NavigationContainer>