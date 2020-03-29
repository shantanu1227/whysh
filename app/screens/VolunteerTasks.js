import {FlatList, SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Button} from "react-native";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import getPendingTasksForPincode from "../redux/actions/Actions";
import {t} from 'react-native-tailwindcss';
import {statuses} from "../styles/TaskStatuses";
import {colors} from "../styles/Common";
import {Entypo} from '@expo/vector-icons';
import openMap from 'react-native-open-maps';
import {getFormattedAddress} from "../methods/Common";

function Item({details}) {

  const styles = StyleSheet.create({
    wrap: {
      paddingVertical: '10px',
      paddingHorizontal: '15px',
      backgroundColor: 'white',
      margin: '10px'
    },
    container: {
      borderRadius: '4px',
      paddingVertical: '10px',
      paddingHorizontal: '5px'
    },
    acceptRequest: {
      paddingVertical: '5px',
      paddingHorizontal: '30px'
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
      <View>
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
      <View style={styles.acceptRequest}>
        <Button
          title="Accept Request"
        />
      </View>
    </View>
  );
}

function VolunteerTasks(props) {
  useEffect(() => {
    props.getPendingTasksForPincode(560076);
  }, []);

  useEffect(() => {
  }, [props.pendingTasks]);

  const {pendingTasks} = props;
  const {tasks} = pendingTasks || {};

  return (
    <SafeAreaView>
      <FlatList
        data={tasks}
        renderItem={({item}) => <Item details={item}/>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    pendingTasks: state.apisResp.pendingTasksForPincode
  }
};

export default connect(mapStateToProps, {getPendingTasksForPincode})(VolunteerTasks);
