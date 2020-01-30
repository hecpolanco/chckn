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
        city: '',
        country: '',
        chosenDate: new Date(),
        flowtype:''
    }

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    setDate = (newDate) => {
        this.setState({chosenDate: newDate});
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.heading}>Add New Transaction</Text>
                <DatePickerIOS
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                    mode="date"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                />
                <SegmentedControlIOS
                    values={['Income', 'Expense']}
                    selectedIndex={this.state.selectedIndex}
                    onChange={(event) => {
                        this.setState({flowtype: event.nativeEvent.selectedSegmentIndex});
                    }}
                />
                {/* <TextInput 
                    placeholder='Name'
                    value={this.state.city}
                    onChangeText={value => this.onChangeText('city', value)}
                    style={styles.input}
                />
                <TextInput 
                    placeholder='Country name'
                    value={this.state.country}
                    onChangeText={value => this.onChangeText('country', value)}
                    style={styles.input}
                /> */}
                {/* <TouchableOpacity onPress={this.submit}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Add City</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        margin: 10,
        paddingHorizontal: 8,
        height: 50
    },
    button: {
        height: 50,
        backgroundColor: '#666',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
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
        margin: 10,
        color: 'white'
    }
})