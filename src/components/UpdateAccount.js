import React from 'react'

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

export default class UpdateAccount extends React.Component {
    render() {
        return(
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.transactionsHeader}>My Profile</Text>
                </View>
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.incomeSubHeader}>Income</Text>
                    <Text style={styles.expensesSubHeader}>Expenses</Text>
                    <TouchableOpacity 
                        style={styles.addTransactionsButton} 
                        onPress={() => {this.props.navigation.navigate('CreateTransaction')}}
                    >
                        <Text style={styles.transactionButtonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.incomeTotalValue}>{'$'+parseFloat(this.props.screenProps.income/100).toFixed(2)}</Text>
                    <Text style={styles.expensesTotalValue}>{'$'+parseFloat(this.props.screenProps.expense/100).toFixed(2)}</Text>
                </View>
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
        marginLeft: 210
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
    addTransactionsButton: {
        top: -33,
        marginLeft: 340,
        height: 40,
        width: 50,
        backgroundColor: '#6558F5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        opacity: 0
    },
    transactionButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    incomeTotalValue: {
        top: -53,
        marginLeft: 20,
        fontSize: 30
    },
    expensesTotalValue: {
        top: -89,
        right: -260,
        fontSize: 30
    },
    chartContainer: {
        top: -220,
        alignItems: 'center'
    },
    availableAmount: {
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
        top: -160,
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
        marginLeft: 177,
        alignItems: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#6558F5',
        width: 375
    },
    futureTransactionsContainer: {
        alignItems: 'center',
        top: -57
    },
    futureTransactionsText: {
        top: -70,
        fontSize: 20,
        fontWeight: 'bold'
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
        color: 'green'
    },
    transactionExpenseItem: {
        top: -27,
        marginLeft: 308,
        fontWeight: 'bold'
    }
})