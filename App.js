import React from 'react';
import { createAppContainer } from 'react-navigation';
import BottomNav from './src/index';

const AppContainer = createAppContainer(BottomNav);

export default class App extends React.Component {
  state = {
    transactionData: [],
    selectedTransactions: [],
    futureTransactions: [],
    totals: [],
    income: '',
    expense: '',
    daysLeft: '',
    balance: '',
    dropdown: [],
    dropdownKeys: [],
    selectedMonth: '2-1-2020'
  }

  renderTotal = (flowtype) => {
    formattedDate = new Date(this.state.selectedMonth)
    firstDay = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), 1)
    lastDay = new Date(formattedDate.getFullYear(), formattedDate.getMonth() + 1, 0)
    const dates = this.state.transactionData.map(transaction => new Date(transaction.date))
      .map(date => { return date.getMonth()+1 + '-1-' + date.getFullYear()
      })
    this.setState({
      dropdownKeys: [...new Set (dates)],
      dropdown: this.state.transactionData
        .sort((t1, t2) => t1.date > t2.date)
        .filter(transaction => Date.parse(transaction.date) >= firstDay && Date.parse(transaction.date) <= lastDay)
    }, () => { 
      if (flowtype === "Income") {
        this.setState({ income: this.state.dropdown
          .filter(object => object.flowtype === "Income")
          .map(object => object.amount)
          .reduce((acc, val) => ( acc + val ), 0) })
      } else if (flowtype === "Expense") {
        this.setState({ expense: this.state.dropdown
          .filter(object => object.flowtype === "Expense")
          .map(object => object.amount)
          .reduce((acc, val) => ( acc + val ), 0) }, () => this.setState({ balance: this.state.income - this.state.expense }))
      }
  
    })
  }

  renderDollars = (amount) => {
    return '$' + parseFloat(amount/100).toFixed(2)
  }

  componentDidMount() {
    fetch('http://localhost:3000/cashflows')
    .then(res => res.json())
    .then(transactionData => {
      this.setState({ transactionData }, () => this.computeTotals())
    })
  }
  
  computeTotals = () => {
    this.setState({
      totals: [((this.renderTotal("Income")-this.renderTotal("Expense"))/this.renderTotal("Income")), (this.renderTotal("Expense")/this.renderTotal("Income"))],
      income: this.renderTotal("Income"),
      expense: this.renderTotal("Expense"),
      daysLeft: this.daysLeft(),
      balance: this.renderTotal("Income")-this.renderTotal("Expense"),
      }, 
      () => (this.findFirstLast(this.state.selectedMonth), this.futureTransactions())
    )
  }

  updateTransactionData = () => {
    fetch('http://localhost:3000/cashflows')
    .then(res => res.json())
    .then(transactionData => {
      this.setState({ transactionData }, () => this.computeTotals())
    })
  }

  daysLeft = () => {
    today=new Date();
    endMonth=new Date(today.getFullYear(), today.getMonth()+1, 0);
    oneDay=1000*60*60*24; //1000ms is 1second - 60seconds is 1minute - 60minutes is 1hour - 24hours is 1day 
    return Math.ceil((endMonth.getTime()-today.getTime())/(oneDay));
  }

  futureTransactions = () => {
    const today = new Date(Date.parse(this.state.selectedMonth));
    const formatToday = today.setDate(today.getDate() - 1);
    const endMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const formatEndMonth = endMonth.setDate(endMonth.getDate() + 1);
    console.log(this.state.transactionData, today, endMonth)
    this.setState({
      today: today,
      endMonth: endMonth,
      futureTransactions: this.state.dropdown
        .sort((t1, t2) => Date.parse(t1.date) > Date.parse(t2.date))
        .filter(transaction => Date.parse(transaction.date) >= formatToday && Date.parse(transaction.date) <= formatEndMonth)
    }, () => console.log('futureTransactions: ', this.state.futureTransactions))
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

  findFirstLast = () => {
    formattedDate = new Date(this.state.selectedMonth)
    firstDay = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), 1)
    lastDay = new Date(formattedDate.getFullYear(), formattedDate.getMonth() + 1, 0)
    const dates = this.state.transactionData.map(transaction => new Date(transaction.date))
      .map(date => { return date.getMonth()+1 + '-1-' + date.getFullYear()
      })
    this.setState({
      dropdownKeys: [...new Set (dates)],
      dropdown: this.state.transactionData
        .sort((t1, t2) => t1.date > t2.date)
        .filter(transaction => Date.parse(transaction.date) >= firstDay && Date.parse(transaction.date) <= lastDay)
    }, () => console.log('selected month: ', this.state.selectedMonth, ' dropdown after fetch: ', this.state.dropdown, 'future: ', this.state.futureTransactions))  
  }

  selected = (value) => {
    this.setState({
      selectedMonth: value
    }, () => this.findFirstLast(this.state.selectedMonth), this.futureTransactions())
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
        dropdown: this.state.dropdown,
        dropdownKeys: this.state.dropdownKeys,
        findFirstLast: this.findFirstLast,
        selected: this.selected,
        selectedMonth: this.state.selectedMonth
      }} />
    )
  }
}