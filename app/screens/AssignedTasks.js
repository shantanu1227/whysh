import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, RefreshControl } from "react-native";
import { connect } from "react-redux";
import { getAssignedTasks, takeActionOnTask } from "../redux/actions/Actions";
import Item from "../components/TaskItem";
import NoDataRenderer from "../components/NoDataRenderer";
import ListRenderer from '../components/ListRenderer';

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

  const _handleRefresh = () => {
    setRefreshing(true);
    props.getAssignedTasks();
    setRefreshing(false);
  }

  const { assignedTasks } = props;
  const { tasks } = assignedTasks || { tasks: [] };

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
          renderItem={({ item }) => <Item details={item} showContact={true} isCreator={false} />}
          keyExtractor={item => item.id}
          ListEmptyComponent={NoDataRenderer}
        />
      </ListRenderer>
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
