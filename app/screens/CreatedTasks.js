import {Button, View, FlatList, SafeAreaView} from "react-native";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getCreatedTasks, takeActionOnTask} from "../redux/actions/Actions";
import Item from "../components/TaskItem";
import {t} from 'react-native-tailwindcss';

function CreatedTasks(props) {
  useEffect(() => {
    props.getCreatedTasks();
  }, []);

  useEffect(() => {
    props.getCreatedTasks();
  }, [props.actionTakenOnTask]);

  const {createdTasks} = props;
  const {tasks} = createdTasks || {};

  return (
    <SafeAreaView>
      <FlatList
        data={tasks}
        renderItem={({item}) => <Item details={item}>
          <View style={[t.flex, t.flexRow]}>
            {!['cancelled', 'completed'].includes(item.status) &&
            <View style={[t.w1_2, t.pR1]}>
              <Button
                onPress={() => {
                  props.takeActionOnTask(item.id, 'cancel')
                }}
                title="Cancel"
                color="#C0392B"
              />
            </View>
            }
            {item.status === 'assigned' &&
            <View style={[t.w1_2, t.pL1]}>
              <Button
                onPress={() => {
                  props.takeActionOnTask(item.id, 'complete')
                }}
                title="Mark as Fulfilled"
              />
            </View>
            }
          </View>
        </Item>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    createdTasks: state.apisResp.createdTasks,
    actionTakenOnTask: state.apisResp.actionTakenOnTask
  }
};

export default connect(mapStateToProps, {getCreatedTasks, takeActionOnTask})(CreatedTasks);
