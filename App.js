import React from 'react';
import { createAppContainer } from 'react-navigation';
import BottomNav from './src/index';

const AppContainer = createAppContainer(BottomNav);

export default class App extends React.Component {
  state = {
    selectedMonth: '2-1-2020',
    transactionData: [],
    futureTransactions: [],
    totals: [],
    income: '',
    expense: '',
    daysLeft: '',
    balance: ''
  }
  
  componentDidMount() {
    this.fetchAll('2020-2-1', '2020-2-29')
  }

  fetchTransactions = (startDate, endDate) => {
    fetch(`http://localhost:3000/cashflows/${startDate}&${endDate}`)
    .then(res => res.json())
    .then(transactionData => {
      this.setState({ transactionData }, () => this.futureTransactions())
    })
  }

  fetchIncome = (startDate, endDate) => {
    fetch(`http://localhost:3000/cashflows/income/${startDate}&${endDate}`)
    .then(res => res.json())
    .then(income => {
      this.setState({ income })
    })
  }

  fetchExpense = (startDate, endDate) => {
    fetch(`http://localhost:3000/cashflows/expense/${startDate}&${endDate}`)
    .then(res => res.json())
    .then(expense => {
      this.setState({ expense })
    })
  }

  fetchBalance = (startDate, endDate) => {
    fetch(`http://localhost:3000/cashflows/balance/${startDate}&${endDate}`)
    .then(res => res.json())
    .then(balance => {
      this.setState({ balance })
    })
  }

  fetchSpendAllowance = (startDate, endDate) => {
    fetch(`http://localhost:3000/cashflows/spend_allowance/${startDate}&${endDate}`)
    .then(res => res.json())
    .then(daysLeft => {
      this.setState({ daysLeft })
    })
  }

  fetchAll = (startDate, endDate) => {
    this.fetchTransactions(startDate, endDate)
    this.fetchIncome(startDate, endDate)
    this.fetchExpense(startDate, endDate)
    this.fetchBalance(startDate, endDate)
    this.fetchSpendAllowance(startDate, endDate)
  }

  refetch = (selectedMonth) => {
    this.setState({ selectedMonth })
    const convertedDate = new Date(selectedMonth)
    const convertedFirstDay = new Date(convertedDate.getFullYear(), convertedDate.getMonth(), 1)
    const convertedLastDay = new Date(convertedDate.getFullYear(), convertedDate.getMonth() + 1, 0)
    
    const startDate = convertedFirstDay.getFullYear() + '-' + (parseInt(convertedFirstDay.getMonth())+1) + '-' + convertedFirstDay.getDate()
    const endDate = convertedLastDay.getFullYear() + '-' + (parseInt(convertedLastDay.getMonth())+1) + '-' + convertedLastDay.getDate()
    this.fetchAll(startDate, endDate)
  }

  renderDollars = (amount) => {
    return '$' + parseFloat(amount/100).toFixed(2)
  }


  futureTransactions = () => {
    const today = new Date();
    const formatToday = today.setDate(today.getDate() - 1);
    
    this.setState({
      futureTransactions: this.state.transactionData
        .filter(transaction => Date.parse(transaction.date) >= formatToday)
    })
  }

  renderDayNumber = (datetime) => {
    const day = new Date(datetime);
    return day.getDate();
  }

  renderDayName = (datetime) => {
    let day = new Date(datetime).getDay();
    switch (day) {
        case (0):
            return "SUN"
            break;
        case (1):
            return "MON"
            break;
        case (2):
            return "TUE"
            break;
        case (3):
            return "WED"
            break;
        case (4):
            return "THU"
            break;
        case (5):
            return "FRI"
            break;
        case (6):
            return "SAT"
            break;
        default:
            return "NaN"
            break;
    }
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
        futureTransactions: this.state.futureTransactions,
        daysLeft: this.state.daysLeft,
        today: this.state.today,
        endMonth: this.state.endMonth,
        renderDollars: this.renderDollars,
        renderDayNumber: this.renderDayNumber,
        renderDayName: this.renderDayName,
        balance: this.state.balance,
        selected: this.selected,
        refetch: this.refetch,
        selectedMonth: this.state.selectedMonth
      }} />
    )
  }
}