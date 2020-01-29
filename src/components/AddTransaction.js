import React from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

export default class AddTransaction extends React.Component {
    render() {
        return(
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.transactionsHeader}>Cash Flow</Text>
                    <Text style={styles.dateHeader}>January 2020</Text>
                </View>
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.incomeSubHeader}>Income</Text>
                    <Text style={styles.expensesSubHeader}>Expenses</Text>
                    <TouchableOpacity style={styles.addTransactionsButton}>
                        <Text style={styles.transactionButtonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.incomeTotalValue}>$3,750.00</Text>
                    <Text style={styles.expensesTotalValue}>$937.50</Text>
                </View>

                {}
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
    }
})