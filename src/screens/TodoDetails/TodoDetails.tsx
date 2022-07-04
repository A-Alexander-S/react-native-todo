import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Gallery } from "../../components/Gallery/Gallery";
import { SaveButton } from "../../components/SaveButton/SaveButton";
import { TextField } from "../../components/TextField/TextField";
import { changeTodoAction } from "../../store/actions";
import { selectTodoById } from "../../store/selectors";
import { TodoDetailsPropsType } from "./TodoDetails.types";

export const TodoDetails = ({ route, navigation }: TodoDetailsPropsType) => {
  const dispatch = useDispatch();
  const todo = useSelector(selectTodoById(route.params.todoId));
  const [editedTitle, setEditedTitle] = useState(todo.title);

  useEffect(() => {
    navigation.setOptions({
      title: todo.title
    });
  }, [navigation, todo]);

  const handleChangeTodo = () => {
    const newTodo = {
      ...todo,
      title: editedTitle
    }
    dispatch(changeTodoAction(newTodo));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton
          disabled={editedTitle === todo.title}
          onPress={handleChangeTodo} />)
    });
  }, [navigation, todo.title, editedTitle]);

  const handlePress = () => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
    }, ({ assets }) => {
      if (assets) {
        const newTodo = {
          ...todo,
          imgs: [...todo.imgs, ...assets]
        };
        dispatch(changeTodoAction(newTodo));
      }
    })
  }

  const handleImagePross = (imgUri?: string) => {
    navigation.navigate('ImgFull', { uri: imgUri || '', todoId: todo.id })
  }

  return (
    <ScrollView>
      <TextField
        initialValue={todo.title}
        onChangeText={setEditedTitle} />
      <Text style={{ fontSize: 20 }}>todo.title: {todo.title}</Text>
      <Gallery
        imgs={todo.imgs}
        onPress={handleImagePross} />
      <Button onPress={handlePress} title="Select Image" />
    </ScrollView>
  );
};