import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type RootTabParamsType = {
  Main: undefined,
  Settings: undefined
}

export type RootStackParamsType = {
  TodoList: undefined,
  TodoDetails: {
    todoId: number
  },
  ImgFull: {
    uri: string,
    todoId: number
  }
}

export type MainStackParamsType = {
  TodoList: undefined,
  TodoDetails: {
    todoId: number
  },
  ImgFull: {
    uri: string,
    todoId: number
  }
}

export type TodoListNavigationProps = NativeStackNavigationProp<
  MainStackParamsType,
  'TodoList'
>;

export type TodoDetailsRoutePropType = RouteProp<MainStackParamsType, 'TodoDetails'>;
export type TodoDetailsNavigationPropType = NativeStackNavigationProp<
  MainStackParamsType,
  'TodoDetails'
>;

export type ImgFullRoutePropType = RouteProp<MainStackParamsType, 'ImgFull'>;
export type ImgFullNavigationPropType = NativeStackNavigationProp<
  MainStackParamsType,
  'ImgFull'
>;