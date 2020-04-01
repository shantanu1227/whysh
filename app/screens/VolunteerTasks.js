import React, { useEffect, useState } from "react";
import { Button, FlatList, SafeAreaView, RefreshControl, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { getPendingTasksForPincode, takeActionOnTask } from "../redux/actions/Actions";
import Item from "../components/TaskItem";
import { USER_PINCODE_KEY } from '../constants/Storage';
import ListRenderer from "../components/ListRenderer";

function VolunteerTasks(props) {
  const [refreshing, setRefreshing] = useState(false);

  const _handleRefresh = () => {
    setRefreshing(true);
    if (props.pincode) {
      props.getPendingTasksForPincode(props.pincode);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    _handleRefresh();
  }, [props.pincode, props.actionTakenOnTask]);

  useEffect(() => {
    _handleRefresh();
  }, [props.actionTakenOnTask]);

  const { pendingTasks } = props;
  const { tasks } = pendingTasks || {};

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <ListRenderer listLength={(tasks || []).length}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_handleRefresh}
            />
          }
          data={tasks}
          renderItem={({item}) =>
            <Item details={item}>
              <Button
                title="Accept Request"
                onPress={() => {
                  props.takeActionOnTask(item.id, 'assign')
                }}
              />
            </Item>
          }
          keyExtractor={item => item.id}
        />
      </ListRenderer>
    </SafeAreaView >
  );
}

const mapStateToProps = (state) => {
  return {
    pendingTasks: state.apisResp.pendingTasksForPincode,
    pincode: state.apisResp.pincode,
    actionTakenOnTask: state.apisResp.actionTakenOnTask
  }
};

export default connect(mapStateToProps, {
  getPendingTasksForPincode,
  takeActionOnTask
})(VolunteerTasks);
