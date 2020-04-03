import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../styles/Common";

export default function NoDataRenderer() {

  return (
    <View>
      <Text style={style.text}>
        No tasks here
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  text: {
    ...colors.light,
    fontSize: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})
