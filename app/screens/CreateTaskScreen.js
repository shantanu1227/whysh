import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import CreateTaskComponent from '../components/CreateTaskComponent';
import {CREATED_TASKS} from '../constants/Routes';

const CreateTaskScreen = (props) => {
  useEffect(() => {
      if(props.task) {
          props.navigation.navigate(CREATED_TASKS);
      }
  }, [props.task]);    
  return <CreateTaskComponent />
}

const mapStateToProps = state => ({
    task: state.createTask.task
});

export default connect(mapStateToProps)(CreateTaskScreen);