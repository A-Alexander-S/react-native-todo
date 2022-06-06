import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist'
// import { AsyncStorage } from 'react-native'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer); // <TodosStateType,ActionType>

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store); 