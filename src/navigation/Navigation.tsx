import React from "react";
import {
  NavigationContainer,
  createNavigationContainerRef
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TodoList } from "../screens/TodoList/TodoList";
import {
  RootStackParamsType,
  MainStackParamsType,
  RootTabParamsType
} from "./Navigation.types";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TodoDetails } from "../screens/TodoDetails/TodoDetails";
import { BackButton } from "../components/BackButton/BackButton";
import { ImgFull } from "../components/ImgFull/ImgFull";
import { Settings } from "../screens/Settings/Settings";
import Icon from 'react-native-vector-icons/FontAwesome'

const MainStack = createNativeStackNavigator<MainStackParamsType>();
const RootTabs = createBottomTabNavigator<RootTabParamsType>();
export const navRef = createNavigationContainerRef();

const Tab = createBottomTabNavigator();

const MainStackNavigation = () => {
  return (<MainStack.Navigator initialRouteName="TodoList">
    <MainStack.Group>
      <MainStack.Screen name="TodoList" component={TodoList} />
      <MainStack.Screen
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
    </MainStack.Group>
    <MainStack.Group screenOptions={{ presentation: 'containedModal' }}>
      <MainStack.Screen name="ImgFull" component={ImgFull} />
    </MainStack.Group>
  </MainStack.Navigator>)
}

const RootTabNavigator = () => (
  <RootTabs.Navigator screenOptions={{
    tabBarActiveTintColor: 'darkred',
    tabBarInactiveTintColor: 'grey',
    tabBarShowLabel: false
  }}>
    <RootTabs.Screen
      name="Main"
      options={{ headerShown: false, tabBarIcon: props => <Icon name="th-list" {...props} /> }}
      component={MainStackNavigation} />
    <RootTabs.Screen
      name="Settings"
      options={{ tabBarIcon: props => <Icon name="gear" {...props} /> }}
      component={Settings} />
  </RootTabs.Navigator>
)

export const Navigation = () => (
  <NavigationContainer ref={navRef}>
    <RootTabNavigator />
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