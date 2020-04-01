import { Button, FlatList, SafeAreaView, View, AsyncStorage } from "react-native";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPendingTasksForPincode, takeActionOnTask } from "../redux/actions/Actions";
import Item from "../components/TaskItem";
import { USER_PINCODE_KEY } from '../constants/Storage';

function VolunteerTasks(props) {
  const [pincode, setPincode] = useState();

  AsyncStorage.getItem(USER_PINCODE_KEY).then((storedPincode) => {
    setPincode(storedPincode);
  })

  useEffect(() => {
    if (pincode) {
      props.getPendingTasksForPincode(pincode);
    }
  }, []);

  useEffect(() => {
    if (pincode) {
      props.getPendingTasksForPincode(pincode);
    }
  }, [props.actionTakenOnTask]);

  const { pendingTasks } = props;
  const { tasks } = pendingTasks || {};

  return (
    <SafeAreaView >
      <FlatList data={tasks}
        renderItem={({ item }) =>
          <Item details={item} >
            <Button
              title="Accept Request"
              onPress={() => { props.takeActionOnTask(item.id, 'assign') }}
            />
          </Item >
        }
        keyExtractor={item => item.id}
      />
    </SafeAreaView >
  );
}

const mapStateToProps = (state) => {
  return {
    pendingTasks: state.apisResp.pendingTasksForPincode,
    actionTakenOnTask: state.apisResp.actionTakenOnTask
  }
};

export default connect(mapStateToProps, {
  getPendingTasksForPincode,
  takeActionOnTask
})(VolunteerTasks);