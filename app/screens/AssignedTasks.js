import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, RefreshControl } from "react-native";
import { connect } from "react-redux";
import { getAssignedTasks, takeActionOnTask } from "../redux/actions/Actions";
import Item from "../components/TaskItem";

function AssignedTasks(props) {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    props.getAssignedTasks();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    setRefreshing(true);    
    props.getAssignedTasks();
    setRefreshing(false);
  }, [props.actionTakenOnTask]);

  _handleRefresh = () =>{
    setRefreshing(true);
    props.getAssignedTasks();
    setRefreshing(false);
  }

  const { assignedTasks } = props;
  const { tasks } = assignedTasks || {};

  return (
    <SafeAreaView>
      <FlatList
      refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={_handleRefresh}
          />
        }
        data={tasks}
        renderItem={({ item }) => <Item details={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    assignedTasks: state.apisResp.assignedTasks,
    actionTakenOnTask: state.apisResp.actionTakenOnTask
  }
};

export default connect(mapStateToProps, { getAssignedTasks, takeActionOnTask })(AssignedTasks);
