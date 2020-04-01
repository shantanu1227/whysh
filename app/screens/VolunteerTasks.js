import React, { useEffect, useState } from "react";
import { Button, FlatList, SafeAreaView, RefreshControl, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { getPendingTasksForPincode, takeActionOnTask } from "../redux/actions/Actions";
import Item from "../components/TaskItem";
import { USER_PINCODE_KEY } from '../constants/Storage';

function VolunteerTasks(props) {
  const [pincode, setPincode] = useState();
  const [refreshing, setRefreshing] = useState(false);

  AsyncStorage.getItem(USER_PINCODE_KEY).then((storedPincode) => {
    setPincode(storedPincode);
    return;
  })

  _handleRefresh = () =>{
    setRefreshing(true);
    if(pincode) {
      props.getPendingTasksForPincode(pincode);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    setRefreshing(true);
    props.getPendingTasksForPincode(pincode);
    setRefreshing(false);
  }, [pincode]);

  useEffect(() => {
    if (pincode) {
      props.getPendingTasksForPincode(pincode);
    }
  }, [props.actionTakenOnTask]);

  const { pendingTasks } = props;
  const { tasks } = pendingTasks || {};

  return (
    <SafeAreaView >
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={_handleRefresh}
          />
        }
        data={tasks}
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