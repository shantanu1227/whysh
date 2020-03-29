import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import t from "react-native-tailwindcss/tailwind";
import {colors} from "../styles/Common";
import {statuses} from "../styles/TaskStatuses";
import openMap from "react-native-open-maps";
import {Entypo} from "@expo/vector-icons";
import {getFormattedAddress} from "../methods/Common";
import React from "react";

export default function Item({details, children}) {

  const styles = StyleSheet.create({
    wrap: {
      paddingVertical: '10px',
      paddingHorizontal: '15px',
      backgroundColor: 'white',
      margin: '10px',
      borderRadius: '4px'
    },
    container: {
      paddingVertical: '10px',
      paddingHorizontal: '5px'
    },
    requestActions: {
      paddingVertical: '5px',
      paddingHorizontal: '5px'
    },
    addressWrap: {
      paddingHorizontal: '5px'
    }
  });

  return (
    <View style={styles.wrap}>
      <View style={[styles.container, t.flex, t.flexRow]}>
        <View style={[t.w3_4]}>
          <Text style={[colors.light]}>#{details.id}</Text>
          <Text>{details.task}</Text>
        </View>
        <Text style={[statuses.common, statuses[details.status], t.w1_4]}>{details.status}</Text>
      </View>
      <View style={styles.addressWrap}>
        <Text>
          <TouchableOpacity onPress={() => {
            openMap({latitude: 37.865101, longitude: -119.538330});
          }}>
            <Entypo
              name="location-pin"
              size={30}
              style={{marginBottom: -3}}
            />
          </TouchableOpacity>
          {getFormattedAddress(details.address)}
        </Text>
      </View>
      <View style={styles.requestActions}>
        {children}
      </View>
    </View>
  );
}
