import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Linking } from 'expo';
import t from "react-native-tailwindcss/tailwind";
import { colors } from "../styles/Common";
import { statuses } from "../styles/TaskStatuses";
import { Entypo } from "@expo/vector-icons";
import { getFormattedAddress } from "../methods/Common";
import React from "react";

export default function Item({ details, children, showContact, isCreator }) {

  const styles = StyleSheet.create({
    wrap: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: 'white',
      margin: 10,
    },
    container: {
      paddingVertical: 10,
      paddingHorizontal: 5
    },
    requestActions: {
      paddingVertical: 5,
      paddingHorizontal: 5
    },
    addressWrap: {
      paddingHorizontal: 5
    }
  });

  let contactDetails = <></>;
  if (showContact) {
    if (isCreator) {
      if (details.assignedTo !== null) {
        contactDetails = (
          <View>
            <Text>Assigned To - {details.assignedTo.name}</Text>
            <Text onPress={() => Linking.openURL(`tel:${details.assignedTo.phone}`)}>{details.assignedTo.phone}</Text>
          </View>
        )
      }
    } else {
      contactDetails = (
          <View>
            <Text>Created By - {details.createdBy.name}</Text>
            <Text onPress={() => Linking.openURL(`tel:${details.createdBy.phone}`)}>{details.createdBy.phone}</Text>
          </View>
        )
    }
  }

  getMapsLink = (location) => {
    return `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
  }


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
        <Text onPress={() => {
          Linking.openURL(getMapsLink(details.address.location));
        }}>
          <Entypo
            name="location-pin"
            size={30}
            style={{ marginBottom: -3 }}
          />
          {getFormattedAddress(details.address)}
        </Text>
      </View>
      <View style={styles.requestActions}>
        {children}
      </View>
      {contactDetails}
    </View>
  );
}
