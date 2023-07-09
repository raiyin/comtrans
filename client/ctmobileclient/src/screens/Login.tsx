import React from 'react';
import {
    useColorScheme,
    View
} from 'react-native';
import Signup from './Signup';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button } from "@react-native-material/core";

const Login = ({ navigation }) => {
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
                    onPress={() => navigation.navigate('Signup')}
                />
            </View>

        </View>
    );
};

export default Login;
