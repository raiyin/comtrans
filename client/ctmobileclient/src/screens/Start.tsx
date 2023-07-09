import React from 'react';
import {
    StyleSheet,
    useColorScheme,
    View
} from 'react-native';
import { Button } from "@react-native-material/core";
import Login from './Login';
import Signup from './Signup';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';


function App({ navigation }): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (

        <View
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
                <Button
                    variant="outlined"
                    title="Log in"
                    onPress={() => navigation.navigate('Login')}
                    style={{
                        backgroundColor: "#ddd",
                        alignSelf: "center",
                        marginTop: 'auto',
                        width: 160,
                        height: 40,
                        borderRadius: 5
                    }}
                />
                <Button
                    variant="outlined"
                    title="Sign up"
                    onPress={() => navigation.navigate('Signup')}
                    style={{
                        backgroundColor: "#ddd",
                        alignSelf: "center",
                        marginTop: 'auto',
                        width: 160,
                        height: 40,
                        borderRadius: 5
                    }} />
            </View>

        </View>

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
