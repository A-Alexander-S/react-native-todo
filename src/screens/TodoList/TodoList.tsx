import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TodoItem } from '../../components/TodoItem/TodoItem';
import { changeTodoAction, getTodosThunk } from '../../store/actions';
import { selectTodos } from '../../store/selectors';
import { selectStatus } from '../../store/selectors';
import { FETCH_STATUSES } from '../../utils/constants';
import { styles } from './TodoList.styles';

export const TodoList = () => {
  const todos = useSelector(selectTodos);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  const handlePressTodo = (id: number) => {
    const updatedTodo = {
      ...todos[id],
      completed: !todos[id].completed
    };
    dispatch(changeTodoAction(updatedTodo));
  }

  const getTodos = () => {
    // @ts-ignore
    dispatch(getTodosThunk());
    // console.log("dispatch(getTodosThunk())")
  }

  useEffect(() => {
    // @ts-ignore
    dispatch(getTodosThunk());
  }, [dispatch]);

  return (
    <ScrollView style={styles.root} >
      {status == FETCH_STATUSES.request && <ActivityIndicator />}
      {
        status == FETCH_STATUSES.failure &&
        <>
          <Text>Ошибка получения данных, нажмите на кнопку чтобы отправить запрос еще раз</Text>
          <Button
            title="Получить список задач"
            onPress={getTodos} />
        </>
      }
      {Object.values(todos).map((el, i) => (
        <TodoItem todo={el} i={i} onComplete={handlePressTodo} />
      ))}
    </ScrollView>
  )
}