import React from 'react';
import { createAppContainer } from 'react-navigation';
import BottomNav from './src/index';

import * as d3 from 'd3';
import { ART } from 'react-native';

const AppContainer = createAppContainer(BottomNav);

export default class App extends React.Component {
  state = {
    selectedMonth: '2020-2-1',
    transactionData: [],
    futureTransactions: [],
    income: '',
    expense: '',
    balance: '',
    daysLeft: ''
  }
  
  componentDidMount() {
    this.fetchAll('2020-2-1')
  }

  fetchTransactions = (startDate) => {
    fetch(`http://localhost:3000/cashflows/date/${startDate}`)
    .then(res => res.json())
    .then(transactionData => {
      this.setState({ transactionData }, () => this.futureTransactions())
    })
  }

  fetchIncome = (startDate) => {
    fetch(`http://localhost:3000/cashflows/income/${startDate}`)
    .then(res => res.json())
    .then(income => {
      this.setState({ income })
    })
  }

  fetchExpense = (startDate) => {
    fetch(`http://localhost:3000/cashflows/expense/${startDate}`)
    .then(res => res.json())
    .then(expense => {
      this.setState({ expense })
    })
  }

  fetchBalance = (startDate) => {
    fetch(`http://localhost:3000/cashflows/balance/${startDate}`)
    .then(res => res.json())
    .then(balance => {
      this.setState({ balance })
    })
  }

  fetchSpendAllowance = (startDate) => {
    fetch(`http://localhost:3000/cashflows/spend_allowance/${startDate}`)
    .then(res => res.json())
    .then(daysLeft => {
      this.setState({ daysLeft }, ()=> console.log('selected: ', this.state.selectedMonth, 'trans: ', this.state.transactionData, 'futuretrans: ', this.state.futureTransactions, 'income: ', this.state.income, 'expense: ', this.state.expense, 'balance: ', this.state.balance, 'days: ', this.state.daysLeft))
    })
  }

  fetchAll = (startDate) => {
    this.fetchTransactions(startDate)
    this.fetchIncome(startDate)
    this.fetchExpense(startDate)
    this.fetchBalance(startDate)
    this.fetchSpendAllowance(startDate)
  }

  refetch = (selectedMonth) => {
    this.setState({ selectedMonth }, ()=> this.fetchAll(selectedMonth))
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
            return ""
            break;
    }
  }

  fetchPie = () => {
    const { Surface, Group, Shape } = ART
    const path = d3.arc().outerRadius(100).innerRadius(80)
    const colors = d3.scaleLinear().domain([0, 1]).range([100, 255])
    if (this.state.income > 0 && this.state.expense > 0) {
      const array = [((this.state.income - this.state.expense)/this.state.income), (this.state.expense/this.state.income)]
      const sectionAngles = d3.pie().startAngle(-2*Math.PI).endAngle(-5*Math.PI)(array)

      return <Surface width={500} height={500}>
              <Group x={500/2} y={500/2}>
                  {
                  sectionAngles.map(section => (
                      <Shape
                          key={section.index}
                          d={path(section)}
                          fill={`rgb(101,88,245,${colors(section.index)/250})`}
                      />
                  ))
                  }  
              </Group>
            </Surface>
    } else {
      const sectionAngles = d3.pie().startAngle(-2*Math.PI).endAngle(-5*Math.PI)([0,1])

      return <Surface width={500} height={500}>
              <Group x={500/2} y={500/2}>
                  {
                    sectionAngles.map(section => (
                      <Shape
                        key={section.index}
                        d={path(section)}
                        fill={`rgb(101,88,245,${colors(section.index)/250})`}
                      />))
                  }  
              </Group>
            </Surface>
    }
  }

  swipeOnPress = (id) => {
    fetch(`http://localhost:3000/cashflows/${id}`, {
      method: 'POST',
      body: JSON.stringify(id)
    })
    .then(res => res.json())
    .then(transactionData => this.refetch(this.state.selectedMonth))
  }

  render() {
    return (
      <AppContainer screenProps={{
        selectedMonth: this.state.selectedMonth,
        transactionData: this.state.transactionData, 
        futureTransactions: this.state.futureTransactions,
        income: this.state.income,
        expense: this.state.expense,
        balance: this.state.balance,
        daysLeft: this.state.daysLeft,
        renderDollars: this.renderDollars,
        renderDayNumber: this.renderDayNumber,
        renderDayName: this.renderDayName,
        refetch: this.refetch,
        fetchPie: this.fetchPie,
        swipeOnPress: this.swipeOnPress
      }} />
    )
  }
}