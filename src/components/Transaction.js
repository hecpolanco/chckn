import React from 'react'

import {
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

export default class Transaction extends React.Component {

    render() {
        const { income, expense, renderDollars, renderDayName, renderDayNumber } = this.props.screenProps
        const { navigate } = this.props.navigation

        return(
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.transactionsHeader}>Transactions</Text>
                    <Text style={styles.dateHeader}>February 2020</Text>
                </View>
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.incomeSubHeader}>Income</Text>
                    <Text style={styles.expensesSubHeader}>Expenses</Text>
                    <TouchableOpacity 
                        style={styles.addTransactionsButton} 
                        onPress={() => {navigate('CreateTransaction')}}
                    >
                        <Text style={styles.transactionButtonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.incomeTotalValue}>{renderDollars(income)}</Text>
                    <Text style={styles.expensesTotalValue}>{renderDollars(expense)}</Text>
                </View>

                <ScrollView style={styles.transactionItemContainer}>

                    <View>
                        {   
                            this.props.screenProps.transactionData.filter(transaction => new Date(transaction.date) >= this.props.screenProps.today && new Date(transaction.date) <= this.props.screenProps.endMonth).map((transaction, index) => (
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
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        top: 0,
        margin: 20
    },
    transactionsHeader: {
        fontSize: 25,
        fontWeight: 'bold'
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
        fontSize: 15,
        fontWeight: 'bold'
    },
    expensesSubHeader: {
        top: -18,
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 153
    },
    addTransactionsButton: {
        top: -33,
        marginLeft: 340,
        height: 40,
        width: 50,
        backgroundColor: '#6558F5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    transactionButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    incomeTotalValue: {
        top: -53,
        marginLeft: 20,
        fontSize: 15
    },
    expensesTotalValue: {
        top: -71,
        marginLeft: 153,
        fontSize: 15
    },
    transactionItemContainer: {
        top: -59,
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
        marginLeft: 307,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#6558F5'
    }
})