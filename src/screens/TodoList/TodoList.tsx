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
import { TodoItemPropsType } from '../../components/TodoItem/TodoItem.types';
import { Navigation } from '../../navigation/Navigation';
import {
  changeTodoAction,
  deleteTodoAction,
  getTodosThunk
} from '../../store/actions';
import { selectTodos } from '../../store/selectors';
import { selectStatus } from '../../store/selectors';
import { FETCH_STATUSES } from '../../utils/constants';
import { styles } from './TodoList.styles';
import { TodoItemType, TodoListPropsType } from './TodoList.types';
import notifee, {
  AndroidImportance,
  EventType,
  TimestampTrigger,
  TriggerType
} from '@notifee/react-native'

export const TodoList = ({ navigation }: TodoListPropsType) => {
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
      title: text,
      imgs: []
    }

    dispatch(changeTodoAction(newTodo));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodoAction(id));
  }

  const toDetails = (id: number) => {
    navigation.navigate('TodoDetails', { todoId: id });
  }

  const renderTodo = ({ item, index }: ListRenderItemInfo<TodoItemType>) => {
    return <TodoItem
      todo={item}
      i={index}
      key={item.id}
      onPress={toDetails}
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

  const isAppOpenedByNotif = async () => {
    const initNotif = await notifee.getInitialNotification();
    if (initNotif) {
      const id = initNotif.notification.data?.id;
      navigation.navigate('TodoDetails', {
        todoId: +(id as string)
      });
    }
    await notifee.cancelNotification(initNotif?.notification.id as string);
    console.log(initNotif);
  };

  useEffect(() => {
    isAppOpenedByNotif();
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
        case EventType.ACTION_PRESS:
          console.log(detail.pressAction?.id);
      }
    });
  }, []);

  const sendPush = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH
    });
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 5000
    };

    await notifee.createTriggerNotification({
      title: 'Notification title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // ongoing: true,
        importance: AndroidImportance.HIGH,
        asForegroundService: true,
        pressAction: {
          id: 'default'
        },
        actions: [
          {
            title: 'Actions',
            icon: 'https://my-cdn.com/icons/snooze.png',
            pressAction: {
              id: 'action1'
            }
          }
        ]
      },
      data: {
        id: '1',
      },
    }, trigger);
  }

  const stopService = () => {
    notifee.stopForegroundService();
  }

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
      <Button
        title="Send push"
        onPress={sendPush} />
      <Button
        title="Stop service"
        onPress={stopService} />
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