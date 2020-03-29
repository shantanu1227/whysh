import {StyleSheet} from 'react-native';

export const statuses = StyleSheet.create({
  common: {
    borderRadius: '4px',
    color: 'white',
    backgroundColor: 'green',
    textAlign: 'center',
    padding: '5px',
    textTransform: 'uppercase',
    maxHeight: '30px',
    lineHeight: '20px'
  },
  pending: {
    backgroundColor: '#6B6B67'
  },
  cancelled: {
    backgroundColor: '#C0392B'
  }
});
