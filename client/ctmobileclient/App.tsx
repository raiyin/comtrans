import React from 'react';
import type { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Pressable
} from 'react-native';
import { Button } from "@react-native-material/core";
import Login from './src/screens/user/Login'
import Start from './src/screens/Start'

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            </Stack.Navigator>
            {/* <View
                style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    flex: 1
                }}
            >
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}>
                    <Button variant="outlined" title="Пользователь" color="#333" style={{ alignSelf: "center", marginTop: 'auto', width: 160, height: 40, borderRadius: 5 }} />
                    <Button variant="outlined" title="Водитель" color="#333" style={{ alignSelf: "center", marginTop: 'auto', width: 160, height: 40, borderRadius: 5 }} />
                </View>

            </View> */}
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
