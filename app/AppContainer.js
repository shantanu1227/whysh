import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import CustomNavigationContainer from './navigation/NavigationContainer';
import store from './redux/store';
import { Provider } from 'react-redux';


const AppContainer = ({ navigation }) => {
  return (
    <Provider store={store} >
      <View style={styles.container}>
        <CustomNavigationContainer navigation={navigation} />
      </View >
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AppContainer;
