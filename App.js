
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './component/Login'
import SignupScreen from './component/Signup'
import MainScreen from './component/Main'
import firebase from 'firebase';

firebase.initializeApp({
   apiKey: "AIzaSyBa1qbpL68LE1A8ATCs22G0LGGySQn5TSQ",
   authDomain: "reactnative-24964.firebaseapp.com",
   databaseURL: "https://reactnative-24964.firebaseio.com",
   projectId: "reactnative-24964",
   storageBucket: "reactnative-24964.appspot.com",
   messagingSenderId: "833194066266"
  });

const AppStack = createStackNavigator(   { 
   Main: {
   screen:MainScreen, 
   navigationOptions: {
        header: null
}
},
});

const AuthStack = createStackNavigator({ 
   Login: {
      screen:LoginScreen, 
      navigationOptions: {
           header: null
   }
   },
   Signup: {
      screen:SignupScreen, 
      navigationOptions: {
           header: null
   }
   },
      
      });

export default createAppContainer(createSwitchNavigator(
   {
     App: AppStack,
     Auth: AuthStack,
   },
   {
     initialRouteName: 'Auth',
   }
 ));

 




