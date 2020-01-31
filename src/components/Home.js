import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import * as d3 from 'd3'
import { ART } from 'react-native'

export default class Home extends React.Component {
    state = {
        totals: []
    }

    renderTotal = (flowtype) => this.props.screenProps.transactionData.filter(object => object.flowtype === flowtype).map(object => object.amount).reduce((acc, val) => ( acc + val ), 0)

    componentDidMount() {
        this.setState({
            totals: [this.renderTotal("Income"), this.renderTotal("Expense")]
        })
    }

    render() {
        const { Surface, Group, Shape } = ART
        const sectionAngles = d3.pie()(this.state.totals)
        const path = d3.arc().outerRadius(100).innerRadius(80)
        const colors = d3.scaleLinear().domain([0, this.state.totals.length]).range([255, 0])

        return(
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.transactionsHeader}>Hi, Hector!</Text>
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
                    <Text style={styles.incomeTotalValue}>{'$'+parseFloat(this.state.totals[0]/100).toFixed(2)}</Text>
                    <Text style={styles.expensesTotalValue}>{'$'+parseFloat(this.state.totals[1]/100).toFixed(2)}</Text>
                </View>


                <View style={styles.chartContainer}>
                <Surface width={500} height={500}>
                    <Group x={500/2} y={500/2}>
                        {
                        sectionAngles.map(section => (
                            <Shape
                            key={section.index}
                            d={path(section)}
                            fill={`rgb(101,88,245,${colors(section.index)/200})`}
                            />
                        ))
                        }  
                    </Group>
                </Surface>
                <Text style={styles.availableAmount}>{'$'+parseFloat((this.state.totals[0]/100)-(this.state.totals[1]/100)).toFixed(2)}</Text>
                <Text style={styles.available}>Available</Text>
                <View style={styles.spendAllowanceContainer}>
                    <Text style={styles.spendAllowance}>Spend Allowance</Text>
                    <Text style={styles.spendAllowanceAmount}>${parseFloat((this.state.totals[0]-this.state.totals[1])/100).toFixed(2)} per day</Text>
                </View>
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
        marginLeft: 222
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
        marginLeft: 275,
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
        alignItems: 'center'
    },
    spendAllowance: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    spendAllowanceAmount: {
        margin: 5,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#6558F5',
        borderBottomWidth: 1,
        borderBottomColor: '#000'
    }
})