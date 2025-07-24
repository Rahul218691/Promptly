import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store with the middleware
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check if needed
    }).concat(sagaMiddleware)
})
  
  // Run the root saga
  sagaMiddleware.run(rootSaga);
  
export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
