import React from "react";
import Moment from 'moment';
import { StyleSheet, View, Button } from "react-native";
import {Card, Text, ListItem} from 'react-native-elements';
import { Linking } from 'expo';
import t from "react-native-tailwindcss/tailwind";
import { colors } from "../styles/Common";
import { statuses } from "../styles/TaskStatuses";
import { Entypo } from "@expo/vector-icons";
import { getFormattedAddress } from "../methods/Common";

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
            <ListItem key={1} title={`Assigned To - ${details.assignedTo.name}`}/>
            <ListItem key={2} title={<Button style="clear" title={details.assignedTo.phone} onPress={() => Linking.openURL(`tel:${details.assignedTo.phone}`)}/>}/>
          </View>
        )
      }
    } else {
      contactDetails = (
          <View>
            <ListItem key={1} title={`Created By - ${details.createdBy.name}`}/>
            <ListItem key={2} title={<Button style="clear" title={details.createdBy.phone} onPress={() => Linking.openURL(`tel:${details.createdBy.phone}`)}/>}/>
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
        <View style={[t.w3_5]}>
          <Text style={[colors.light]}>#{details.id}</Text>
          <Text style={[colors.light]}>Added on {Moment(details.createdAt).format('d MMM HH:mm')}</Text>
          <Text h4>{details.task}</Text>
        </View>
        <Text style={[statuses.common, statuses[details.status], t.w2_5]}>{details.status}</Text>
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
