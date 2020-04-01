import React, { useEffect, useState } from "react";
import { Button, View, FlatList, SafeAreaView, RefreshControl } from "react-native";
import { connect } from "react-redux";
import { getCreatedTasks, takeActionOnTask } from "../redux/actions/Actions";
import Item from "../components/TaskItem";
import { t } from 'react-native-tailwindcss';

function CreatedTasks(props) {
  const [refreshing, setRefreshing] = useState(false);

  _handleRefresh = () => {
    setRefreshing(true);
    props.getCreatedTasks();
    setRefreshing(false);
  }

  useEffect(() => {
    props.getCreatedTasks();
  }, []);

  useEffect(() => {
    props.getCreatedTasks();
  }, [props.actionTakenOnTask]);

  useEffect(() => {
    props.getCreatedTasks();
  }, [props.task]);

  const { createdTasks } = props;
  const { tasks } = createdTasks || {};

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
        renderItem={({ item }) => <Item details={item}>
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
    actionTakenOnTask: state.apisResp.actionTakenOnTask,
    task: state.createTask.task
  }
};

export default connect(mapStateToProps, { getCreatedTasks, takeActionOnTask })(CreatedTasks);
