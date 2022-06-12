export const setInputClass = size => (size === 'sm' ? 'input-sm' : '');
export const jsonCopy = src => JSON.parse(JSON.stringify(src));
export const getNormal = val => val || '';
export const trimValue = val => (val && val.trim()) || '';

export const overRideAddressLine1 = (newAddress, address) => {
  if (!newAddress.addressLineOne) {
    newAddress.addressLineOne = address;

    let isSplited = false;
    if (newAddress.addressLineTwo) {
      const temp = address.split(newAddress.addressLineTwo.trim());
      // eslint-disable-next-line prefer-destructuring
      newAddress.addressLineOne = temp[0];
      isSplited = temp.length > 1;
    }
    if (newAddress.city && !isSplited) {
      const temp = address.split(newAddress.city.trim());
      // eslint-disable-next-line prefer-destructuring
      newAddress.addressLineOne = temp[0];
      isSplited = temp.length > 1;
    }
    if (newAddress.country && !isSplited) {
      newAddress.addressLineOne = '';
    }
    if (newAddress.state && !isSplited) {
      newAddress.addressLineOne = '';
    }
  }
  return newAddress.addressLineOne;
};

export const getAddressObject = (googlePlaceObj, address) => {
  const newAddress = {};
  const addressComponents = googlePlaceObj && googlePlaceObj.address_components;
  if (addressComponents) {
    const addressDetails = {};
    Object.keys(addressComponents).forEach(key => {
      const type = addressComponents[key].types[0];
      addressDetails[type] = addressComponents[key].long_name;
    });
    let cityName = '';
    if (addressDetails.city) {
      cityName = getNormal(addressDetails.city);
    } else if (addressDetails.locality) {
      cityName = getNormal(addressDetails.locality);
    } else if (addressDetails.postal_town) {
      cityName = getNormal(addressDetails.postal_town);
    } else if (addressDetails.administrative_area_level_2) {
      cityName = getNormal(addressDetails.administrative_area_level_2);
    } else {
      // Do Nothing
    }
    newAddress.city = cityName;
    newAddress.state = getNormal(addressDetails.administrative_area_level_1);
    newAddress.country = getNormal(addressDetails.country);
    newAddress.addressLineOne = `${getNormal(addressDetails.street_number)} ${getNormal(addressDetails.route)} ${getNormal(
      addressDetails.premise,
    )}  ${getNormal(addressDetails.street_address)}`;

    newAddress.addressLineTwo = `${getNormal(addressDetails.subpremise)} ${getNormal(addressDetails.sublocality_level_1)}  ${getNormal(
      addressDetails.sublocality_level_2,
    )} ${getNormal(addressDetails.neighborhood)}`;

    newAddress.postcode = getNormal(addressDetails.postal_code);
  }

  Object.keys(newAddress).forEach(key => {
    newAddress[key] = trimValue(newAddress[key]);
  });

  newAddress.addressLineOne = overRideAddressLine1(newAddress, address);

  try {
    newAddress.addressLineOne = newAddress.addressLineOne.trim().replace(/,$/, '');
  } catch (e) {}
  return newAddress;
};
