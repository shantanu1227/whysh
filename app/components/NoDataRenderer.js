import {Text} from "react-native";
import React from "react";
import {colors} from "../styles/Common";

export default function NoDataRenderer() {

  return <Text style={colors.light}>
    No tasks here
  </Text>
}
