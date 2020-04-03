import * as firebase from 'firebase';

const logout = () => {
    return firebase.auth().signOut();
};

export default logout;