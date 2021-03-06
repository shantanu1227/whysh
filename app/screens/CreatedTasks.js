import React, { useEffect, useState } from "react";
import { Button, View, FlatList, SafeAreaView, RefreshControl } from "react-native";
import { connect } from "react-redux";
import { getCreatedTasks, takeActionOnTask } from "../redux/actions/Actions";
import Item from "../components/TaskItem";
import { t } from 'react-native-tailwindcss';
import NoDataRenderer from "../components/NoDataRenderer";
import ListRenderer from "../components/ListRenderer";

function CreatedTasks(props) {
  const [refreshing, setRefreshing] = useState(false);
  const { createdTasks } = props;
  const { tasks } = createdTasks || {};

  const _handleRefresh = () => {
    setRefreshing(true);
    props.getCreatedTasks();
    setRefreshing(false);
  }

  useEffect(() => {
    props.getCreatedTasks();
  }, [props.task, props.actionTakenOnTask]);

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
          renderItem={({ item }) => <Item details={item} showContact={true} isCreator={true}>
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
          ListEmptyComponent={NoDataRenderer}
        />
      </ListRenderer>
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
