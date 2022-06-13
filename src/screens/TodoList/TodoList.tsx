import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  Button,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  SectionList
} from 'react-native';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { TextField } from '../../components/TextField/TextField';
import { TodoItem } from '../../components/TodoItem/TodoItem';
import {
  changeTodoAction,
  deleteTodoAction,
  getTodosThunk
} from '../../store/actions';
import { selectTodos } from '../../store/selectors';
import { selectStatus } from '../../store/selectors';
import { FETCH_STATUSES } from '../../utils/constants';
import { styles } from './TodoList.styles';
import { TodoItemType } from './TodoList.types';

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

  const handleAddTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      completed: false,
      title: text
    }

    dispatch(changeTodoAction(newTodo));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodoAction(id));
  }

  const renderTodo = ({ item, index }: ListRenderItemInfo<TodoItemType>) => {
    return <TodoItem
      todo={item}
      i={index}
      key={item.id}
      onComplete={handlePressTodo}
      onDelete={handleDeleteTodo} />
  };

  const section = useMemo(() => {
    return Object.values(todos).reduce<{ completed: TodoItemType[]; notCompleted: TodoItemType[] }>(
      (acc, el) => {
        if (el.completed) {
          acc.completed.push(el);
        } else {
          acc.notCompleted.push(el);
        }
        return acc;
      },
      { completed: [], notCompleted: [] },
    );
  }, [todos]);

  useEffect(() => {
    // @ts-ignore
    dispatch(getTodosThunk());
  }, [dispatch]);

  return (
    <>
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
      <SectionList
        style={styles.root}
        contentContainerStyle={styles.container}
        ListHeaderComponent={() => <TextField onSubmit={handleAddTodo} />}
        sections={[
          { title: 'Not completed', data: section.notCompleted },
          { title: 'Completed', data: section.completed },
        ]}
        renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
        renderItem={renderTodo}
      // keyExtractor={(item: TodoItemType) => item.id + ''}
      />
    </>
  );
}


{/* <SectionList
  style={styles.root}
  contentContainerStyle={styles.container}
  ListHeaderComponent={() => <TextField onSubmit={handleAddTodo} />}
  sections={[{ title: 'Title1', data: Object.values(todos) }]}
  renderItem={renderTodo}
// keyExtractor={(item: TodoItemType) => item.id + ''}
/> */}


// <>
    //   <FlatList
    //     style={styles.root}
    //     contentContainerStyle={styles.container}
    //     ListHeaderComponent={() => <TextField onSubmit={handleAddTodo} />}
    //     data={Object.values(todos)}
    //     renderItem={renderTodo}
    //   // keyExtractor={(item: TodoItemType) => item.id + ''}
    //   />

    // </>

    // <ScrollView
    //   style={styles.root}
    //   contentContainerStyle={styles.container} >
    //   {status == FETCH_STATUSES.request && <ActivityIndicator />}
    //   {
    //     status == FETCH_STATUSES.failure &&
    //     <>
    //       <Text>Ошибка получения данных, нажмите на кнопку чтобы отправить запрос еще раз</Text>
    //       <Button
    //         title="Получить список задач"
    //         onPress={getTodos} />
    //     </>
    //   }
    //   <TextField
    //     onSubmit={handleAddTodo} />
    //   {Object.values(todos).map((el, i) => (
    //     <TodoItem
    //       todo={el}
    //       i={i}
    //       key={el.id}
    //       onComplete={handlePressTodo}
    //       onDelete={handleDeleteTodo} />
    //   ))}
    // </ScrollView>