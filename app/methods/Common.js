export const getFormattedAddress = ({flat, street1, street2, pincode, city}) => {
  let address = '';
  if (flat) {
    address = flat;
  }
  if (street1) {
    if (address) {
      address += ', ' + street1;
    }
    else {
      address = street1;
    }
  }
  if (street2) {
    if (address) {
      address += ', ' + street2;
    }
    else {
      address = street2;
    }
  }
  if (pincode) {
    if (address) {
      address += ', ' + pincode;
    }
    else {
      address = pincode;
    }
  }
  if (city) {
    if (address) {
      address += ', ' + city;
    }
    else {
      address = city;
    }
  }

  // todo: obj needs to be iterated with append logic as function

  return address;
};
