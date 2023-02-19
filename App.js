import React from 'react';
import Navigation from './src/routes/navigation';
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import configureStore from "./src/store/index";
import FlashMessage from "react-native-flash-message";

const { persistor, store } = configureStore();

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigation />
        <FlashMessage position="bottom" />
      </PersistGate>
    </Provider>
  );
}


