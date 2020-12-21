export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export const checkValidity = (value, validity, identifier) => {
  let isValid = true;

  if (validity && validity.type && isValid) {
    if (
      identifier === 'name' ||
      identifier === 'email' ||
      identifier === 'street' ||
      identifier === 'city'
    ) {
      isValid = isNaN(parseInt(value));
    }
  }
  if (validity && validity.type && isValid) {
    if (identifier === 'postal') {
      isValid = !isNaN(parseInt(value));
    }
  }
  if (validity && validity.required && isValid) {
    isValid = value.trim().length > 0;
  }
  if (validity && validity.maxLength && isValid) {
    isValid = value.length <= validity.maxLength;
  }
  if (validity && validity.minLength && isValid) {
    isValid = value.length >= validity.minLength;
  }
  return isValid;
};
