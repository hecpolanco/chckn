/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createAppContainer } from 'react-navigation';
import BottomNav from './src/index';

const AppContainer = createAppContainer(BottomNav);


class App extends React.Component {
  state = {
    transactionData: []
  }

  async componentDidMount() {
    await fetch('http://localhost:3000/cashflows')
      .then(res => res.json())
      .then(transactionData => {
        this.setState({ transactionData }, () => console.log(this.state.transactionData))
      })
  }
  render() {
    return (
      <AppContainer screenProps={this.state.transactionData} />
    )
  }
}

export default App;
