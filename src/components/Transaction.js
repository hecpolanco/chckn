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

    transactions = [
        {id: 1, account_id: 1, batch_id: 1, date: "2020-01-15 00:00:00", flowtype: "Income", name: "Paycheck", amount: 1000, created_at: "2020-01-28 18:58:36", updated_at: "2020-01-28 18:58:36"},
        {id: 2, account_id: 1, batch_id: 1, date: "2020-01-17 00:00:00", flowtype: "Expense", name: "Cellphone", amount: 100, created_at: "2020-01-28 18:58:36", updated_at: "2020-01-28 18:58:36"},
        {id: 2, account_id: 1, batch_id: 1, date: "2020-01-19 00:00:00", flowtype: "Expense", name: "Sushi", amount: 99.73, created_at: "2020-01-28 18:58:36", updated_at: "2020-01-28 18:58:36"},
        {id: 2, account_id: 1, batch_id: 1, date: "2020-01-23 00:00:00", flowtype: "Expense", name: "Car Insurance", amount: 63.54, created_at: "2020-01-28 18:58:36", updated_at: "2020-01-28 18:58:36"},
        {id: 2, account_id: 1, batch_id: 1, date: "2020-01-28 00:00:00", flowtype: "Expense", name: "Hotel", amount: 137.58, created_at: "2020-01-28 18:58:36", updated_at: "2020-01-28 18:58:36"},
        {id: 2, account_id: 1, batch_id: 1, date: "2020-01-24 00:00:00", flowtype: "Expense", name: "Bus", amount: 2.75, created_at: "2020-01-28 18:58:36", updated_at: "2020-01-28 18:58:36"},
        {id: 2, account_id: 1, batch_id: 1, date: "2020-01-25 00:00:00", flowtype: "Expense", name: "Uber", amount: 19.25, created_at: "2020-01-28 18:58:36", updated_at: "2020-01-28 18:58:36"},
        {id: 2, account_id: 1, batch_id: 1, date: "2020-01-26 00:00:00", flowtype: "Expense", name: "Lunch", amount: 9.75, created_at: "2020-01-28 18:58:36", updated_at: "2020-01-28 18:58:36"},
        {id: 2, account_id: 1, batch_id: 1, date: "2020-01-29 00:00:00", flowtype: "Expense", name: "Macy's", amount: 198.48, created_at: "2020-01-28 18:58:36", updated_at: "2020-01-28 18:58:36"},
        {id: 2, account_id: 1, batch_id: 1, date: "2020-01-27 00:00:00", flowtype: "Expense", name: "Bar", amount: 34.73, created_at: "2020-01-28 18:58:36", updated_at: "2020-01-28 18:58:36"}
    ]

    renderTotal = (objectArray, flowtype) => objectArray.filter(object => object.flowtype === flowtype).map(object => object.amount).reduce((acc, val) => { return acc + val }, 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})

    renderDayNumber = (datetime) => {
        const day = new Date(datetime);
        return day.getDate()+1
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
        return(
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.transactionsHeader}>Transactions</Text>
                    <Text style={styles.dateHeader}>January 2020</Text>
                </View>
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.incomeSubHeader}>Income</Text>
                    <Text style={styles.expensesSubHeader}>Expenses</Text>
                    <TouchableOpacity style={styles.addTransactionsButton} onPress={() => {
            this.props.navigation.navigate('CreateTransaction')
        }}>
                        <Text style={styles.transactionButtonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.incomeTotalValue}>{'$'+this.renderTotal(this.props.screenProps, "Income")}</Text>
                    <Text style={styles.expensesTotalValue}>{'$'+this.renderTotal(this.props.screenProps, "Expense")}</Text>
                </View>

                <ScrollView style={styles.transactionItemContainer}>

                    <View>
                        {
                            this.props.screenProps.map((transaction, index) => (
                                <View key={index}>
                                    <TouchableWithoutFeedback>
                                        <View style={styles.transactionItem}>
                                        <Text style={styles.transactionItemDateNumber}>{this.renderDayNumber(transaction.date)}</Text>
                                            <Text style={styles.transactionItemDateName}>{this.renderDayName(transaction.date)}</Text>
                                            <Text style={styles.transactionItemName}>{transaction.name}</Text>
                                            {transaction.flowtype === 'Income' ? <Text style={styles.transactionIncomeItem}>{'$'+(transaction.amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text>: <Text style={styles.transactionExpenseItem}>{'-$'+(transaction.amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text>}
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
        top: 50,
        margin: 20
    },
    transactionsHeader: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    dateHeader: {
        fontSize: 25,
        top: -29.5,
        marginLeft: 222
    },
    subHeaderContainer: {
        top: 15
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
        top: -19,
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