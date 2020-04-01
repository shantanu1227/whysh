import React, { Component, } from 'react';
import { AsyncStorage, FlatList, View, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { getCategories, createTask } from '../redux/actions/Actions';
import { ListItem, Input, Card, Button } from 'react-native-elements'
import * as storageKey from '../constants/Storage';
import { CREATED_TASKS } from '../constants/Routes';

class CreateTaskComponent extends Component {
    state = {
        location: null,
        errorMessage: null,
        checked: [],
        taskDetail: '',
        address: {
            pincode: '',
            flat: '',
            street1: '',
            street2: '',
            city: '',
            country: 'India',
            location:{
                latitude: null,
                longitude: null
            }
        }
    }

    handleTaskDetail = (text) => {
        this.setState({ taskDetail: text });
    }

    storeAddress = async () => {
        const flat = [storageKey.USER_FLAT_KEY, this.state.address.flat];
        const street1 = [storageKey.USER_STREET1_KEY, this.state.address.street1];
        const street2 = [storageKey.USER_STREET2_KEY, this.state.address.street2];
        const city = [storageKey.USER_CITY_KEY, this.state.address.city];
        await AsyncStorage.multiSet([flat, street1, street2, city]);
    }

    componentDidMount() {
        this.props.dispatch(getCategories());
        this._getLocationAsync();
        this._getAddressData();
    }

    handleCheckboxPress = item => {
        const { checked } = this.state;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item)) {
            this.setState({ checked: [...checked, item] });
        } else {
            this.setState({ checked: checked.filter(a => a !== item) });
        }
    };

    handleAddress = (value, _property) => {
        const address = this.state.address;
        address[_property] = value;
        this.setState({ address: address });
    }

    handleTaskCreation = () => {
        if (this.state.location === null) {
            Alert.alert("Location is not available.");
            return;
        }
        if(this.state.checked.length == 0){
            Alert.alert("Please select category.");
            return;
        }
        this.storeAddress();        
        console.log(this.state.address);
        this.props.dispatch(createTask(this.state.taskDetail, this.state.address, this.state.checked));
    }

    handleTaskCreationSuccess= () => {
        console.log(this.state);
        this.state.navigation.navigate(CREATED_TASKS);
        return;
    }

    keyExtractor = (item, index) => index.toString();
    renderItem = ({ item }) => (
        <ListItem 
            checkBox={{ checked: this.state.checked.includes(item), onPress: () => this.handleCheckboxPress(item) }}
            onPress={() => this.handleCheckboxPress(item)}
            title={item.name.toUpperCase()}
        />
    )

    render() {
        const { categoriesError, categoriesLoading, categories, task, taskError, taskLoading } = this.props;
        if (categoriesError || taskError) {
            const error = categoriesError || taskError;
            if (error) {
                console.log('error found', error);
                return Alert.alert(error.message);
            }
        }
        if (categoriesLoading || taskLoading || task) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} />
                </View>
            )
        }
        if (categories.length > 0) {
            return (
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={categories}
                    extraData={this.state}
                    renderItem={this.renderItem}
                    ListFooterComponent={
                        <View containerStyle={{ margin: 0, flex: 1 }}>
                            <Card title="Description" containerStyle={{ marginTop: 0, marginBottom: 0 }} >
                                <Input
                                    placeholder="Task Description"
                                    spellCheck={true}
                                    value={this.state.taskDetail}
                                    onChangeText={this.handleTaskDetail}
                                    multiline={true}
                                />
                            </Card>
                            <Card title="Address" containerStyle={{ marginTop: 0 }} >
                                <Input
                                    placeholder="Flat/Building"
                                    value={this.state.address.flat}
                                    onChangeText={(text) => this.handleAddress(text, 'flat')}
                                />
                                <Input
                                    placeholder="Street 1"
                                    value={this.state.address.street1}
                                    onChangeText={(text) => this.handleAddress(text, 'street1')}
                                />
                                <Input
                                    placeholder="Street 2"
                                    value={this.state.address.street2}
                                    onChangeText={(text) => this.handleAddress(text, 'street2')}
                                />
                                <Input
                                    placeholder="City"
                                    value={this.state.address.city}
                                    onChangeText={(text) => this.handleAddress(text, 'city')}
                                />
                                <Input
                                    placeholder="Pincode"
                                    disabled={true}
                                    value={this.state.address.pincode}
                                />
                                <Input
                                    placeholder="Country"
                                    disabled={true}
                                    value={this.state.address.country}
                                />

                            </Card>
                            <Card containerStyle={{ marginTop: 0 }} >
                                <Button title="Create Task" onPress={this.handleTaskCreation}></Button>
                            </Card>
                        </View>
                    }
                />
            )
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                <ActivityIndicator size={'large'} />
            </View>
        )
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({ error: { message: 'Permission to access location was denied' } });
            return;
        }
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
        console.log(location);
        this.setState({ location });
        this.handleAddress({ latitude: location.coords.latitude, longitude: location.coords.longitude }, 'location');
    };

    _getAddressData = async () => {
        let results = await AsyncStorage.multiGet([storageKey.USER_PINCODE_KEY, storageKey.USER_FLAT_KEY,
        storageKey.USER_STREET1_KEY, storageKey.USER_STREET2_KEY, storageKey.USER_CITY_KEY]);
        results.forEach((result) => {
            const key = result[0];
            const value = result[1];
            let addressKey = null;
            switch (key) {
                case storageKey.USER_PINCODE_KEY:
                    addressKey = 'pincode';
                    break;
                case storageKey.USER_FLAT_KEY:
                    addressKey = 'flat';
                    break;
                case storageKey.USER_STREET1_KEY:
                    addressKey = 'street1';
                    break;
                case storageKey.USER_STREET2_KEY:
                    addressKey = 'street2';
                    break;
                case storageKey.USER_CITY_KEY:
                    addressKey = 'city';
                    break;
                default:
                    addressKey = null;
            }
            if(value && addressKey) {
                this.handleAddress(value, addressKey);
            }
        });
    }
}

const mapStateToProps = state => ({
    categories: state.categories.categories,
    categoriesLoading: state.categories.loading,
    categoriesError: state.categories.error,
    task: state.createTask.task,
    taskError: state.createTask.error,
    taskLoading: state.createTask.loading
});

export default connect(mapStateToProps)(CreateTaskComponent);