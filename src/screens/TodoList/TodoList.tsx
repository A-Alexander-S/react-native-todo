import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TodoItem } from '../../components/TodoItem/TodoItem';
import { changeTodoAction, getTodosThunk } from '../../store/actions';
import { selectTodos } from '../../store/selectors';
import { styles } from './TodoList.styles';

export const TodoList = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const handlePressTodo = (id: number) => {
    const updatedTodo = {
      ...todos[id],
      completed: !todos[id].completed
    };
    dispatch(changeTodoAction(updatedTodo));
  }

  useEffect(() => {
    // @ts-ignore
    dispatch(getTodosThunk());
  }, [dispatch]);

  return (
    <ScrollView style={styles.root} >
      {Object.values(todos).map((el, i) => (
        <TodoItem todo={el} i={i} onComplete={handlePressTodo} />
      ))}
    </ScrollView>
  )
}