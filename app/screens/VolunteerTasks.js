import {Button, FlatList, SafeAreaView, View} from "react-native";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getPendingTasksForPincode, takeActionOnTask} from "../redux/actions/Actions";
import Item from "../components/TaskItem";

function VolunteerTasks(props) {
  useEffect(() => {
    props.getPendingTasksForPincode(560076);
  }, []);

  useEffect(() => {
    props.getPendingTasksForPincode(560076);
  }, [props.actionTakenOnTask]);

  const {pendingTasks} = props;
  const {tasks} = pendingTasks || {};

  return (
    <SafeAreaView>
      <FlatList
        data={tasks}
        renderItem={({item}) => <Item details={item}>
          <Button
            title="Accept Request"
            onPress={() => {
              props.takeActionOnTask(item.id, 'assign')
            }}
          />
        </Item>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    pendingTasks: state.apisResp.pendingTasksForPincode,
    actionTakenOnTask: state.apisResp.actionTakenOnTask
  }
};

export default connect(mapStateToProps, {getPendingTasksForPincode, takeActionOnTask})(VolunteerTasks);
