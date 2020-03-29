import {FlatList, SafeAreaView, View, Text} from "react-native";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import getPendingTasksForPincode from "../redux/actions/Actions";

function Item({details}) {
  return (
    <View>
      <Text>{details.id}</Text>
      <Text>{details.task}</Text>
      <Text>{details.status}</Text>
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
