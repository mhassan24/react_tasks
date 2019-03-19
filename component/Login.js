import React from 'react'
import { Button,View, Text, TouchableOpacity, TextInput, StyleSheet ,Image} from 'react-native'
import firebase from 'firebase'
import login from '../images/login.png'
import { Spinner} from './Spinner';

export default class LoginScreen extends React.Component {

   state = { email: '', password: '', errorMessage: null,
   loading : false
}

renderButton(){
   if(this.state.loading){
       return <Spinner size="small" />;
   }

   return (
      <Button 
      onPress={this.handleLogin} title="Login" color="black"
      disabled={!this.state.email && !this.state.password}
      >
  </Button>
   );
}


   handleLogin = () => {
      const { email, password } = this.state

      this.setState({ error : '' , loading : true})

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ loading : false, errorMessage: error.message }))
}

   render() {
      return (
      <View style = {styles.container}>


<View style={{alignItems:"center"}}>

      <Image source={login} style={styles.login}></Image>
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
               autoCapitalize = "none" 
               onChangeText={password => this.setState({ password })}
               value={this.state.password}
             />

      <View style={{width:"80%", alignItems:"flex-end",marginBottom:"5%"}}>

      <TouchableOpacity>
        <Text style={{fontSize:13, marginLeft:30, fontWeight:"bold"}}>Forgot password?</Text>
      </TouchableOpacity>
      </View>

      {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

         {this.renderButton()}

         <TouchableOpacity style = {styles.bottomView}
         onPress={()=>this.props.navigation.navigate('Signup')}
         >
         <Text style={{paddingTop:"3%"}}>Don't have an account? 
         <Text style={{fontWeight:"bold", color:"black"}}>Sign up.</Text>
         </Text>
         </TouchableOpacity>

         </View>

   )
   }
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
   },
   insta:{
      width:220, 
      height:75,
      marginTop:30
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
      color: 'white',
   },
   bottomView:{ 
      width:"100%", 
      justifyContent:"flex-start", 
      alignItems:"center" 
   }
 
})


