import * as React from 'react';
import {View} from "react-native";
import {Button} from "react-native-web";

export default function HomeScreen(props) {
    return (
        <View>
            <Button title="Register to Volunteer"
                    onPress={() => props.navigation.navigate('Login')}
            />
        </View>
    )
}

HomeScreen.navigationOptions = {
    header: null,
};
