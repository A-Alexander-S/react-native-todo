import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

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

export type TodoListNavigationProps = NativeStackNavigationProp<
  RootStackParamsType,
  'TodoList'
>;

export type TodoDetailsRoutePropType = RouteProp<RootStackParamsType, 'TodoDetails'>;
export type TodoDetailsNavigationPropType = NativeStackNavigationProp<
  RootStackParamsType,
  'TodoDetails'
>;

export type ImgFullRoutePropType = RouteProp<RootStackParamsType, 'ImgFull'>;
export type ImgFullNavigationPropType = NativeStackNavigationProp<
  RootStackParamsType,
  'ImgFull'
>;