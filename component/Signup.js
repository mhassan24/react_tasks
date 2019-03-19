import React from 'react'
import {Button, View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import firebase from 'firebase';
import sign from '../images/signup1.png'
import { Spinner} from './Spinner';

export default class SignupScreen extends React.Component {
   state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      cellnumber: '',
      errorMessage: null,
      loading : false
   }

   renderButton(){
      if(this.state.loading){
          return <Spinner size="small" />;
      }
      return (
         <Button 
         onPress={this.handleSignUp} title="Signup" color="black"
         disabled={!this.state.email && !this.state.password && !this.state.firstname
         && !this.state.lastname && !this.state.cellnumber}
         >
     </Button>

   );
}

handleSignUp = () => {

   this.setState({ error : '' , loading : true})

 firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
 
      firebase.database().ref('users')
      .set(
         {
            email: this.state.email,
            password: this.state.password,
             firstname: this.state.firstname,
             lastname: this.state.lastname,
             cellnumber: this.state.cellnumber
         }
         )   
         .then(() => this.props.navigation.navigate('Login'))
         .catch(error => this.setState({ loading : false,errorMessage: error.message }))
   
   }


   render() {
      return (
         <View style = {styles.container}>

      {this.state.errorMessage &&
         <Text style={{ color: 'red' }}>
         {this.state.errorMessage}
         </Text>}  

      <View style={{alignItems:"center"}}>
      <Image source={sign} style={styles.sign}></Image>
      </View> 

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Email"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText={email => this.setState({ email })}
               value={this.state.email}
             />
            
            <TextInput style = {styles.input}
            secureTextEntry={true}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Password"
               placeholderTextColor = "black"
               onChangeText={password => this.setState({ password })}
               value={this.state.password}
           />
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter First Name"
               placeholderTextColor = "black"
               onChangeText={firstname => this.setState({ firstname })}
               value={this.state.firstname}
           />
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Last Name"
               placeholderTextColor = "black"
               onChangeText={lastname => this.setState({ lastname })}
               value={this.state.lastname}
           />
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Cell Number"
               placeholderTextColor = "black"
               onChangeText={cellnumber => this.setState({ cellnumber })}
               value={this.state.cellnumber}
           />
            
         {this.renderButton()}

            <TouchableOpacity style = {styles.bottomView}
         onPress={()=>this.props.navigation.navigate('Login')}
         >
         <Text style={{paddingTop:"3%"}}>Already have an account?
         <Text style={{fontWeight:"bold", color:"black"}}>Login</Text>
         </Text>
         </TouchableOpacity>

         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: 'black',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: 'black',
      padding: 10,
      margin: 15,
      height: 40,
      alignItems:"center", 
   },
   submitButtonText:{
      color: 'white'
   },
   bottomView:{ 
      width:"100%", 
      justifyContent:"flex-start", 
      alignItems:"center" 
   }

})
