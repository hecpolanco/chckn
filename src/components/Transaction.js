import React from 'react'
import Swipeout from 'react-native-swipeout'

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
        const { income, expense, renderDollars, renderDayName, renderDayNumber, transactionData } = this.props.screenProps
        const { navigate } = this.props.navigation

        return(
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.transactionsHeader}>Transactions</Text>
                    <Text style={{opacity: 0}}>{this.props.screenProps.selectedMonth}</Text>
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

                    <View style={styles.transactionMargin}>
                        {   
                            transactionData.map((transaction, index) => (
                                swipeoutBtns = [
                                    {
                                        text: 'Edit',
                                        backgroundColor: '#6558F5',
                                        onPress: () => (console.log("add edit functionality here"))
                                    },
                                    {
                                        text: 'Delete',
                                        backgroundColor: 'red',
                                        onPress: () => (this.props.screenProps.swipeOnPress(transaction.id), console.log(transaction.id))
                                    }
                                ],
                                <View key={index}>
                                    <Swipeout right={swipeoutBtns} style={{backgroundColor: "#F2F2F2"}}>
                                    <TouchableWithoutFeedback>
                                        <View style={styles.transactionItem}>
                                        <Text style={styles.transactionItemDateNumber}>{renderDayNumber(transaction.date)}</Text>
                                            <Text style={styles.transactionItemDateName}>{renderDayName(transaction.date)}</Text>
                                            <Text style={styles.transactionItemName}>{transaction.name}</Text>
                                            {transaction.flowtype === 'Income' ? <Text style={styles.transactionIncomeItem}>{renderDollars(transaction.amount)}</Text>: <Text style={styles.transactionExpenseItem}>{renderDollars(transaction.amount)}</Text>}
                                        </View>
                                    </TouchableWithoutFeedback>
                                    </Swipeout>
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
        left: -6,
        marginBottom: 40,
        margin: 20,
        width: 385,
        borderBottomWidth: 1,
        paddingVertical: 7.5
    },
    transactionsHeader: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    // dateHeader: {
    //     fontSize: 25,
    //     top: -29.5,
    //     marginLeft: 210,
    //     textAlign: 'right',
    // },
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
        marginLeft: 344,
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
        fontSize: 18
    },
    expensesTotalValue: {
        top: -74,
        marginLeft: 153,
        fontSize: 18
    },
    transactionItemContainer: {
        top: -66,
    },
    transactionMargin: {
        marginBottom: 170
    },
    transactionItem: {
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: -1,
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