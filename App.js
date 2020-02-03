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
    transactionData: [],
    totals: [],
    income: '',
    expense: '',
    futureTransactions: []
  }

  renderTotal = (flowtype) => this.state.transactionData.filter(object => object.flowtype === flowtype).map(object => object.amount).reduce((acc, val) => ( acc + val ), 0)

  componentDidMount() {
    fetch('http://localhost:3000/cashflows')
    .then(res => res.json())
    .then(transactionData => {
      this.setState({ transactionData }, () => this.computeTotals())
    })
  }
  
  computeTotals = () => {
    this.setState({
      totals: [(((this.renderTotal("Income")-this.renderTotal("Expense"))/this.renderTotal("Income"))), ((this.renderTotal("Expense")/this.renderTotal("Income")))],
      income: this.renderTotal("Income"),
      expense: this.renderTotal("Expense"),
      }, () => (this.futureTransactions(), console.log('test: ', this.state.totals, this.state.income, this.state.expense)))
  }

  updateTransactionData = (newTransactionObj) => {
    this.setState({
      transactionData: [...this.state.transactionData, newTransactionObj]
    })
  }

  futureTransactions = () => {
    const today = new Date();
    const endMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
    console.log(this.state.transactionData, today, endMonth)
    this.setState({
      futureTransactions: this.state.transactionData.filter(transaction => new Date(transaction.date) >= today && new Date(transaction.date) <= endMonth)
    }, () => console.log('futureTransactions: ', this.state.futureTransactions))
  }

  render() {
    return (
      <AppContainer screenProps={{
        transactionData: this.state.transactionData, 
        updateTransactionData: this.updateTransactionData,
        computeTotals: this.computeTotals,
        totals: this.state.totals,
        income: this.state.income,
        expense: this.state.expense,
        futureTransactions: this.state.futureTransactions
      }} />
    )
  }
}

export default App;
