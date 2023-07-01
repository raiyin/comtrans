import React from 'react'
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
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button } from "@react-native-material/core";

const Login = () => {
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
                    title="Логин"
                    color="#333"
                    style={{ alignSelf: "center", marginTop: 'auto', width: 160, height: 40, borderRadius: 5 }}
                />
            </View>

        </View>
    );
}

export default Login
