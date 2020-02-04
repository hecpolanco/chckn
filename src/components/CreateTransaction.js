import React from 'react'

import {
    DatePickerIOS,
    SegmentedControlIOS,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

export default class CreateTransaction extends React.Component {

    state = {
        name: '',
        amount: '',
        chosenDate: new Date(),
        flowtype:'',
        buttonState: true
    }

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    setDate = (newDate) => {
        this.setState({chosenDate: newDate});
    }

    buttonText = () => {
        if (this.state.flowtype === 1) {
            return 'Add Expense'
        } else if (this.state.flowtype === 0) {
            return 'Add Income'
        } else {
            return 'Button Disabled'
        }
    }

    submit = () => {
        if (this.state.flowtype === 0) {
            let flowtype = "Income"
            fetch('http://localhost:3000/cashflows', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ account_id: 1, batch_id: 1, name: this.state.name, date: this.state.chosenDate, amount: this.state.amount*100, flowtype: flowtype })
            })
            .then(res => res.json())
            .then(newTransactionObj => (
                this.props.screenProps.updateTransactionData(newTransactionObj),
                this.props.navigation.navigate('Transaction')
                )
            )
        } else if (this.state.flowtype === 1) {
            let flowtype = "Expense"
            fetch('http://localhost:3000/cashflows', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ account_id: 1, batch_id: 1, name: this.state.name, date: this.state.chosenDate, amount: this.state.amount*100, flowtype: flowtype })
            })
            .then(res => res.json())
            .then(newTransactionObj => (
                this.props.navigation.navigate('Transaction'),
                fetch('http://localhost:3000/cashflows')
                .then(res => res.json())
                .then(transactionData => {
                this.setState({ transactionData }, () => (this.props.screenProps.computeTotals(), this.props.screenProps.updateTransactionData(newTransactionObj)))
                })
            ))
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.heading}>Add New Transaction</Text>
                <DatePickerIOS
                    style={styles.datePicker}
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                    mode="date"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                />
                <SegmentedControlIOS
                    style={styles.segmentedControl}
                    values={['Income', 'Expense']}
                    selectedIndex={this.state.selectedIndex}
                    onChange={(event) => {
                        this.setState({
                            flowtype: event.nativeEvent.selectedSegmentIndex,
                            buttonState: false
                        });
                    }}
                />
                <TextInput 
                    placeholder='Transaction Name                      (Example: Car Payment)'
                    value={this.state.name}
                    onChangeText={value => this.onChangeText('name', value)}
                    style={styles.input}
                />
                <TextInput 
                    placeholder='Transaction Amount                             (Example: 100.00)'
                    value={this.state.amount}
                    onChangeText={value => this.onChangeText('amount', value)}
                    style={styles.input}
                /> 
                <TouchableOpacity onPress={() => this.submit()} disabled={this.state.buttonState}>
                    <View style={this.state.buttonState === true ? styles.buttonDisabled : styles.button}>
                        <Text style={styles.buttonText}>{
                        this.buttonText()
                        }</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        top: -60,
        margin: 20,
        paddingHorizontal: 8,
        height: 50
    },
    button: {
        height: 50,
        top: -30,
        backgroundColor: '#6558F5',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5
    },
    buttonDisabled: {
        height: 50,
        top: -30,
        backgroundColor: '#788896',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        opacity: 0
    },
    buttonText: {
        color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        fontSize: 40,
        textAlign: 'center',
        top: -200,
        margin: 10,
        color: 'black'
    },
    datePicker: {
       top: -50 
    },
    segmentedControl: {
        top: -330, 
        width: 300,
        marginLeft: 50,
        justifyContent: 'center'
     }
})