import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TodoItemPropsType } from "./TodoItem.types";
import { styles } from "./TodoItem.styles";
import { Checkbox } from "../checkbox/checkbox";
import Icon from 'react-native-vector-icons/FontAwesome'

export const TodoItem = ({ todo, i, onComplete, onDelete }: TodoItemPropsType) => {
  const handlePress = () => {
    onComplete(todo.id);
  };

  const handleDletePress = () => {
    onDelete(todo.id);
  };
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={handlePress} style={styles.root}>
        <Checkbox checked={todo.completed} onPress={handlePress} />
        <Text style={styles.todoText}>
          {i + 1}: {todo.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDletePress}>
        <Icon name="remove" color="red" size={24} />
      </TouchableOpacity>
    </View>
  )
}