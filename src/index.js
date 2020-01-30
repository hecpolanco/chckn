import React from 'react'

import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/Ionicons'
Icon.loadFont()

import Home from './components/Home';
import Transaction from './components/Transaction';
import CreateTransaction from './components/CreateTransaction';
import UpdateAccount from './components/UpdateAccount';
import ExportData from './components/ExportData';
import About from './components/About';

const HomeNav = createStackNavigator({
    Home: { screen: Home }
})

const TransactionsNav = createStackNavigator({
    Transaction: { screen: Transaction },
    CreateTransaction: { screen: CreateTransaction }
})

const ProfileNav = createStackNavigator({
    UpdateAccount: { screen: UpdateAccount },
    ExportData: { screen: ExportData },
    About: { screen: About }
})

const BottomNav = createBottomTabNavigator({
    Home: { 
        screen: HomeNav,
        navigationOptions: {
            tabBarLabel:'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" color={tintColor} size={30} />
            )
        } 
    },
    Transactions: { 
        screen: TransactionsNav, 
        navigationOptions: {
            tabBarLabel:'Transactions',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-card" color={tintColor} size={30} />
            )
        }
    },
    Profile: { 
        screen: ProfileNav,
        navigationOptions: {
            tabBarLabel:'Profile',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-contact" color={tintColor} size={30} />
            )
        }    
    }
}, {
    tabBarOptions: {
        activeTintColor: '#6558F5',
        inactiveTintColor: '#788896', 
        showIcon: true,
        tabStyle: { margin: 3, top: 9 }
    }
})

export default BottomNav