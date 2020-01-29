import React from 'react'

import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/Ionicons'
Icon.loadFont()

import Home from './components/Home';
import AddTransaction from './components/AddTransaction';
import UpdateAccount from './components/UpdateAccount';
import ExportData from './components/ExportData';
import About from './components/About';

const HomeNav = createStackNavigator({
    Home: { screen: Home }
})

const CashFlowNav = createStackNavigator({
    AddTransaction: { screen: AddTransaction }
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
    CashFlow: { 
        screen: AddTransaction, 
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