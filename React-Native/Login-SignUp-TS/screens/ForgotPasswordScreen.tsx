import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Alert, Image, Platform } from 'react-native';
import { FormControl, Input, Button, Stack, VStack, Text } from 'native-base';
import { emailValidator } from '../core/utils';
import { theme } from '../core/theme';
import type { Navigation } from '../types';


export default function ForgotPasswordScreen({ navigation }: Navigation) {
	const [email, setEmail] = useState<string>('');
  
  const errorAlert = (error: string) =>
    Alert.alert(                    
      "Failed to send code",                 
      error,                      
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  const onSendPressed = () => {
    const emailError = emailValidator(email);

    if (emailError) {
      errorAlert(emailError);
      return;
    }

		// TODO: api
		// TEST
		let status = "success";
		switch (status) {
			case "success": 
				Alert.alert(
					"Code sent successfully",
					"Your temporary password was successfully sent to your email."
				);
				navigation.navigate('Login');
				break;
			case "null": 
				errorAlert("Couldn't find your NotiNote Account.");
				break;
			default:
				errorAlert("Failed to send temporary password. Please try again.")
		}
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.topView}>
        <Image
          style={styles.loginImage}
          source={require('../assets/images/favicon.png')}
        />
				<Text fontFamily="heading" fontWeight={700} fontStyle="normal" fontSize="4xl" pt={5}>
					Password Reset
				</Text>
      </View>

      <View style={styles.bottomView}>
				<FormControl>
					<FormControl.Label>Email address</FormControl.Label>
					<Input 
						size="md"
						value={email}
						onChangeText={(text) => setEmail(text)}
						autoFocus
						autoCapitalize="none"
					/>
				</FormControl>
        <Button size="lg" mt="8" onPress={onSendPressed}>
          Send Code
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: 'column',
  },
  topView: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  bottomView: {
    flex: 1,
    paddingBottom: 40
  },
  loginImage: {
    width: 50,
    height: 50,
  },
});
  