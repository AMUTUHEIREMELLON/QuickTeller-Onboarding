import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authStore from './reducers/authSlice'
import formDataStore from './reducers/formSlice'
import agentDataStore from './reducers/agentSlice'
import ninDataStore from "./reducers/ninSlice"
import smileIdentityStore from './reducers/smileIdentitySlice';
import iciStore from './reducers/cardOnboardingSlice';
import signatureSlice from './reducers/signSlice' 

const rootReducer = combineReducers({ 
  authStore,
  formDataStore,
  agentDataStore,
  ninDataStore,
  smileIdentityStore,
  iciStore,
  signatureSlice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
console.log('InitialState', store.getState());
store.subscribe(() => {
  console.log('UpdatedState', store.getState()); 
});
export default store;
