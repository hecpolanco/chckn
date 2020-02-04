import React from 'react'

import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import * as d3 from 'd3'
import { ART } from 'react-native'

export default class Home extends React.Component {

    render() {
        const { balance, income, expense, totals, daysLeft, renderDollars, renderDayName, renderDayNumber, futureTransactions } = this.props.screenProps
        const { navigate } = this.props.navigation
        const { Surface, Group, Shape } = ART
        const sectionAngles = d3.pie()(totals)
        const path = d3.arc().outerRadius(100).innerRadius(80)
        const colors = d3.scaleLinear().domain([0, totals.length]).range([100, 255])

        return(
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.transactionsHeader}>Hi, Hector!</Text>
                    <Text style={styles.dateHeader}>February 2020</Text>
                </View>
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.incomeSubHeader}>Income</Text>
                    <Text style={styles.expensesSubHeader}>Expenses</Text>
                    <Text style={styles.incomeTotalValue}>{renderDollars(income)}</Text>
                    <Text style={styles.expensesTotalValue}>{renderDollars(expense)}</Text>
                </View>

                <View style={styles.chartContainer}>
                <Surface width={500} height={500}>
                    <Group x={500/2} y={500/2}>
                        {
                        sectionAngles.map(section => {
                            if (balance < 0 ) {
                                return <Shape
                                            key={section.index}
                                            d={path(section)} 
                                            fill={`rgb(101,88,245,${colors(section.index)/250})`}
                                        /> 
                            } else {
                                return <Shape
                                    key={section.index}
                                    d={path(section)}
                                    fill={`rgb(0,128,0,${colors(section.index)/250})`}
                                />
                            }
                        })
                        }  
                    </Group>
                </Surface>
                {income-expense < 0 ? <Text style={styles.availableAmountNegative}>{renderDollars(balance)}</Text> : <Text style={styles.availableAmount}>{renderDollars(balance)}</Text>}
                <Text style={styles.available}>Available</Text>
                <View style={styles.spendAllowanceContainer}>
                    <Text style={styles.spendAllowance}>Spend Allowance</Text>
                    {balance < 0 ? <Text style={styles.spendAllowanceAmountNegative}>{renderDollars((balance)/daysLeft)} per day</Text> : <Text style={styles.spendAllowanceAmount}>{renderDollars((balance)/daysLeft)} per day</Text>}
                </View>
                <View style={styles.futureTransactionsContainer}>
                    <Text style={styles.futureTransactionsText}>Future Transactions</Text>
                    <TouchableOpacity 
                        style={styles.transactionsButton} 
                        onPress={() => {navigate('CreateTransaction')}}
                    >
                        <Text style={styles.transactionButtonText}>+</Text>
                    </TouchableOpacity>
                    <ScrollView style={styles.transactionItemContainer}>
                    <View style={styles.transactionMargin}>
                        {
                            futureTransactions.length === 0 ? <Text style={styles.newTransaction} onPress={() => {navigate('CreateTransaction')}}>Click here to add a new transaction</Text> : 
                            futureTransactions.map((transaction, index) => (
                                <View key={index}>
                                    <TouchableWithoutFeedback>
                                        <View style={styles.transactionItem}>
                                        <Text style={styles.transactionItemDateNumber}>{renderDayNumber(transaction.date)}</Text>
                                            <Text style={styles.transactionItemDateName}>{renderDayName(transaction.date)}</Text>
                                            <Text style={styles.transactionItemName}>{transaction.name}</Text>
                                            {transaction.flowtype === 'Income' ? <Text style={styles.transactionIncomeItem}>{renderDollars(transaction.amount)}</Text>: <Text style={styles.transactionExpenseItem}>{renderDollars(transaction.amount)}</Text>}
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
                </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        top: 0,
        left: -6,
        marginBottom: 40,
        margin: 20,
        width: 385,
        borderBottomWidth: 1
    },
    transactionsHeader: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    dateHeader: {
        fontSize: 25,
        top: -29.5,
        marginLeft: 210,
        textAlign: 'right'
    },
    subHeaderContainer: {
        top: -20
    },
    incomeSubHeader: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    expensesSubHeader: {
        top: -24,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 300
    },
    transactionsButton: {
        top: -92,
        marginLeft: 343,
        height: 25,
        width: 30,
        backgroundColor: '#6558F5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    transactionButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    },
    incomeTotalValue: {
        top: -15,
        marginLeft: 20,
        fontSize: 30
    },
    expensesTotalValue: {
        top: -51,
        textAlign: 'right',
        right: 21,
        fontSize: 30
    },
    chartContainer: {
        top: -190,
        alignItems: 'center'
    },
    availableAmount: {
        top: -275,
        color: '#008000',
        fontSize: 25,
        fontWeight: 'bold'
    },
    availableAmountNegative: {
        top: -275,
        color: '#6558F5',
        fontSize: 25,
        fontWeight: 'bold'
    },
    available: {
        top: -275,
        fontSize: 17,
        fontWeight: 'bold'
    },
    spendAllowanceContainer: {
        top: -165,
        alignItems: 'center',
        borderBottomWidth: 1
    },
    spendAllowance: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    spendAllowanceAmount: {
        margin: 5,
        marginBottom: 30,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#008000',
        width: 375
    },
    spendAllowanceAmountNegative: {
        margin: 5,
        marginBottom: 30,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#6558F5',
        width: 375
    },
    newTransaction: {
        top: 30,
        alignItems: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#6558F5'
    },
    futureTransactionsContainer: {
        alignItems: 'center',
        top: -73
    },
    futureTransactionsText: {
        top: -68,
        marginLeft: -185,
        fontSize: 20,
        fontWeight: 'bold'
    },
    transactionItemContainer: {
        top: -79
    },
    transactionMargin: {
        marginBottom: 2060
    },
    transactionItem: {
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 1
    },
    transactionItem: {
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 1,
    },
    transactionItemDateNumber: {
        top: 17,
    },
    transactionItemDateName: {
        top: 17,
    },
    transactionItemName: {
        top: -10,
        marginLeft: 87,
        fontWeight: 'bold'
    },
    transactionIncomeItem: {
        top: -27,
        marginLeft: 303,
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'green'
    },
    transactionExpenseItem: {
        top: -27,
        marginLeft: 300,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#6558F5'
    }
})