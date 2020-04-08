import React, { useEffect, useState } from "react";
import { Button, FlatList, SafeAreaView, RefreshControl, Text } from "react-native";
import { connect } from "react-redux";
import { getPendingTasksForPincode, takeActionOnTask } from "../redux/actions/Actions";
import Item from "../components/TaskItem";
import NoDataRenderer from "../components/NoDataRenderer";
import ListRenderer from '../components/ListRenderer';

function VolunteerTasks(props) {
  const [refreshing, setRefreshing] = useState(false);
  const {address} = props || {};
  const {pincode} = address || {};
  const { pendingTasks } = props;
  const { tasks } = pendingTasks || {};

  const _handleRefresh = () => {
    setRefreshing(true);
    if (props.address && props.address.pincode) {
      props.getPendingTasksForPincode(props.address.pincode);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    _handleRefresh();
  }, [pincode, props.actionTakenOnTask]);

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <ListRenderer listLength={(tasks || []).length}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_handleRefresh}
            />
          }
          data={tasks}
          renderItem={({ item }) =>
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
          ListEmptyComponent={NoDataRenderer}
        />
      </ListRenderer>
    </SafeAreaView >
  );
}

const mapStateToProps = (state) => {
  return {
    pendingTasks: state.apisResp.pendingTasksForPincode,
    address: state.authentication.address,
    actionTakenOnTask: state.apisResp.actionTakenOnTask
  }
};

export default connect(mapStateToProps, {
  getPendingTasksForPincode,
  takeActionOnTask
})(VolunteerTasks);
