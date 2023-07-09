import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    StyleSheet,
} from 'react-native';
import Login from './src/screens/Login';
import Start from './src/screens/Start';
import Signup from './src/screens/Signup';
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1
    },
    button: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: 'white',
        width: 150
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
});

export default App;
