import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { TodoItemPropsType } from "./TodoItem.types";
import { styles } from "./TodoItem.styles";
import { Checkbox } from "../checkbox/checkbox";

export const TodoItem = ({ todo, i, onComplete }: TodoItemPropsType) => {
  const handlePress = () => {
    onComplete(todo.id);
  }
  return (
    <TouchableOpacity onPress={handlePress} style={styles.root}>
      <Checkbox checked={todo.completed} />
      <Text key={todo.id} style={styles.todoText}>
        {i + 1}: {todo.title}
      </Text>
    </TouchableOpacity>
  )
}