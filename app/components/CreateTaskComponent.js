import React, { Component, } from 'react';
import { AsyncStorage, FlatList, View, ActivityIndicator, Alert } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { getCategories, createTask } from '../redux/actions/Actions';
import { ListItem, Input, Card, Button } from 'react-native-elements'
import { USER_PINCODE_KEY } from '../constants/Storage';

class CreateTaskComponent extends Component {
    state = {
        location: null,
        errorMessage: null,
        checked: [],
        taskDetail: "",
        address: {
            country: 'India'
        }
    }

    handleTaskDetail = (text) => {
        this.setState({taskDetail: text});
    }

    componentDidMount() {
        this.props.dispatch(getCategories());
        AsyncStorage.getItem(USER_PINCODE_KEY).then((pincode) => {
            this.handleAddress(pincode, 'pincode');
        });
        this._getLocationAsync();
    }

    handleCheckboxPress = item => {
        const {checked} = this.state;
        // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item)) {
            this.setState({checked: [...checked, item]});
        } else {
            this.setState({checked: checked.filter(a => a !== item)});
        }
    };

    handleAddress = (text, _property) => {
        const address = this.state.address;
        address[_property] = text;
        this.setState({address: address});
    }

    handleTaskCreation = () => {
        if (this.state.location === null) {
            Alert.alert("Location is not available.");
            return;
        }
        
    }

    keyExtractor = (item, index) => index.toString();
    renderItem = ({ item }) => (
        <ListItem checkBox={{ // CheckBox Props
            checked: this.state.checked.includes(item),
            onPress: () => this.handleCheckboxPress(item),
        }}
            onPress={() => this.handleCheckboxPress(item)}
            title={item.name.toUpperCase()}
        />
    )

    render() {
        const { error, loading, categories } = this.props;
        if (error) {
            return Alert.alert(error.message);
        }
        if (loading) {
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
                        </View>}
                />
            )
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                <ActivityIndicator size={'large'} />
            </View >
        )
    }
    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                error: {message: 'Permission to access location was denied'},
            });
            return;
        }
        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
        this.setState({location});
        this.handleAddress({latitude: location.latitude, longitude: location.longitude}, 'location');
    };
}

const mapStateToProps = state => ({
    categories: state.categories.categories,
    loading: state.categories.loading,
    error: state.categories.error
});

export default connect(mapStateToProps)(CreateTaskComponent);