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

    renderTotal = (objectArray, flowtype) => objectArray.filter(object => object.flowtype === flowtype).map(object => object.amount).reduce((acc, val) => ( acc + val ), 0)

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
                    <TouchableOpacity 
                        style={styles.addTransactionsButton} 
                        onPress={() => {this.props.navigation.navigate('CreateTransaction')}}
                    >
                        <Text style={styles.transactionButtonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.incomeTotalValue}>{'$'+parseFloat(this.renderTotal(this.props.screenProps.transactionData, "Income")/100).toFixed(2)}</Text>
                    <Text style={styles.expensesTotalValue}>{'$'+parseFloat(this.renderTotal(this.props.screenProps.transactionData, "Expense")/100).toFixed(2)}</Text>
                </View>

                <ScrollView style={styles.transactionItemContainer}>

                    <View>
                        {
                            this.props.screenProps.transactionData.map((transaction, index) => (
                                <View key={index}>
                                    <TouchableWithoutFeedback>
                                        <View style={styles.transactionItem}>
                                        <Text style={styles.transactionItemDateNumber}>{this.renderDayNumber(transaction.date)}</Text>
                                            <Text style={styles.transactionItemDateName}>{this.renderDayName(transaction.date)}</Text>
                                            <Text style={styles.transactionItemName}>{transaction.name}</Text>
                                            {transaction.flowtype === 'Income' ? <Text style={styles.transactionIncomeItem}>{'$'+parseFloat(transaction.amount/100).toFixed(2)}</Text>: <Text style={styles.transactionExpenseItem}>{'-$'+parseFloat(transaction.amount/100).toFixed(2)}</Text>}
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
        marginLeft: 222
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
        color: 'green'
    },
    transactionExpenseItem: {
        top: -27,
        marginLeft: 308,
        fontWeight: 'bold'
    }
})