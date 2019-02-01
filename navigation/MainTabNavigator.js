import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CreateDeckScreen from '../screens/CreateDeckScreen'
import CreateCardScreen from '../screens/CreateCardScreen'
import DeckScreen from '../screens/DeckScreen'
import QuizScreen from '../screens/QuizScreen'
import ResultScreen from '../screens/ResultScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Deck: DeckScreen,
  Quiz: QuizScreen,
  Results: ResultScreen,
  CreateCard: CreateCardScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const CreateDeckStack = createStackNavigator({
  CreateDeck: CreateDeckScreen,
});

CreateDeckStack.navigationOptions = {
  tabBarLabel: 'Create Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  CreateDeckStack,
});
