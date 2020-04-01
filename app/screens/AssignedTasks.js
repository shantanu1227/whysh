import { FlatList, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAssignedTasks, takeActionOnTask } from "../redux/actions/Actions";
import Item from "../components/TaskItem";

function AssignedTasks(props) {
  useEffect(() => {
    props.getAssignedTasks();
  }, []);

  useEffect(() => {
    props.getAssignedTasks();
  }, [props.actionTakenOnTask]);

  const { assignedTasks } = props;
  const { tasks } = assignedTasks || {};

  return (
    <SafeAreaView>
      <FlatList
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
