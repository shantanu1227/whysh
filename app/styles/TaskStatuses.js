import {
  StyleSheet
} from 'react-native';

export const statuses = StyleSheet.create({
  common: {
    color: 'white',
    backgroundColor: 'green',
    textAlign: 'center',
    padding: 5,
    textTransform: 'uppercase',
    maxHeight: 30,
  },
  pending: {
    backgroundColor: '#6B6B67'
  },
  cancelled: {
    backgroundColor: '#C0392B'
  }
});