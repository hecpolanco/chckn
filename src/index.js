import React from 'react'

import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

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
    Home: { screen: HomeNav },
    CashFlow: { screen: CashFlowNav },
    Profile: { screen: ProfileNav }
})

export default BottomNav