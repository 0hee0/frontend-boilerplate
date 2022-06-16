import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Alert, Image, Platform } from 'react-native';
import { FormControl, Input, Button, Stack, VStack, Text } from 'native-base';
import { emailValidator, passwordValidator, nameValidator } from '../core/utils';
import type { Navigation } from '../types';
import { theme } from '../core/theme';

export default function JoinScreen({ navigation }: Navigation) {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
  	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	const [usernameError, setUsernameError] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");
	const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

	useEffect(() => {
		if (email) {
			setEmailError(emailValidator(email));
		}
	}, [email])

  	useEffect(() => {
		if (password && !confirmPassword) {
			setPasswordError(passwordValidator(password));
		}
    	else if (password && confirmPassword) {
			if (password !== confirmPassword) {
				setConfirmPasswordError("Password and Confirm Password does not match.");
			}
			else {
				setConfirmPasswordError("");
			}
		}
  	}, [password, confirmPassword]);

	const errorAlert = (error: string) =>
		Alert.alert(                    
			"Join Failed",                 
			error,                      
			[
				{ text: "OK", onPress: () => console.log("OK Pressed") }
			]
		);

	const onJoinPressed = () => {
		const usernameError = nameValidator(username);

		if (!email || !password || !confirmPassword || !username) {
			errorAlert("Please fill in all the blanks!");
			return;
		}

		Alert.alert(
			"Success",
			"Congratulations, your account has been successfully created."
		)
		navigation.navigate('Login');
	};

	const onLoginPressed = () => {
		navigation.navigate('Login');
	}

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<View style={styles.topView}>
				<Image
				style={styles.loginImage}
				source={require('../assets/images/favicon.png')}
				/>
						<Text fontFamily="heading" fontWeight={700} fontStyle="normal" fontSize="4xl" pt={5}>Sign up</Text>
			</View>

      		<View style={styles.bottomView}>
        		<VStack space={1}>
					<FormControl isRequired>
						<Input 
						size="md"
						placeholder="Username"
						value={username}
						onChangeText={(text) => setUsername(text)}
						autoFocus
						autoCapitalize="none"
						returnKeyType={"next"}
						/>
						{usernameError && 
							<FormControl.ErrorMessage>{usernameError}</FormControl.ErrorMessage>
						}					
					</FormControl>
					<FormControl isRequired isInvalid>
						<Input 
						size="md"
						placeholder="Email"
						value={email}
						onChangeText={(text) => setEmail(text)}
						autoCapitalize="none"
						returnKeyType={"next"}
						/>
						{emailError && 
							<FormControl.ErrorMessage>{emailError}</FormControl.ErrorMessage>
						}
					</FormControl>
					<FormControl isRequired isInvalid>
						<Input 
						size="md"
						placeholder="Password"
						type="password" 
						value={password}
						onChangeText={(text) => setPassword(text)}
										returnKeyType={"next"}
						/>
						{passwordError && 
							<FormControl.ErrorMessage>{passwordError}</FormControl.ErrorMessage>
						}
					</FormControl>
					<FormControl isRequired isInvalid>
						<Input 
						size="md"
						placeholder="Confirm Password"
						type="password" 
						value={confirmPassword}
						onChangeText={(text) => setConfirmPassword(text)}
										returnKeyType={"next"}
						/>
						{confirmPasswordError && 
							<FormControl.ErrorMessage>{confirmPasswordError}</FormControl.ErrorMessage>
						}
					</FormControl>
				</VStack>
				<Button size="lg" mt="8" onPress={onJoinPressed}>
					Sign up
				</Button>

				<Button 
					onPress={onLoginPressed}
					variant="ghost"
				>
					<Stack direction={{ base: 'row' }}>
						<Text>Already have an account? </Text>
						<Text fontWeight={700} color="primary.500">Login</Text>
					</Stack>
				</Button>
      		</View>
    	</KeyboardAvoidingView>
	);
}

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
    flex: 3,
    paddingBottom: 40
  },
  loginImage: {
    width: 50,
    height: 50,
  },
});