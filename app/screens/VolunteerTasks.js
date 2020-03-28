import {FlatList, SafeAreaView, View, Text} from "react-native";
import React from "react";

const DATA = [
    {
        id: 'test id',
        request: {
            name: 'request from',
            status: 'request status'
        }
    }
];

function Item({details}) {
    return (
        <View>
            <Text>{details.name}</Text>
            <Text>{details.status}</Text>
        </View>
    );
}

export default function VolunteerTasks() {
    return (
        <SafeAreaView>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item details={item.request}/>}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}
