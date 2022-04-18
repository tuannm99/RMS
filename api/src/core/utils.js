/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

/**
 * Create an object that removed keys properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const omit = (object, keys) => {
  const result = { ...object };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

const utf8ToASCII = (text) => {
  let str = text.trim().toLowerCase();
  str = str
    .normalize('NFD') // converts to unicode
    .replace(/[\u0300-\u036f]/g, ''); // remove signed

  // đĐ character
  str = str.replace(/[đĐ]/g, 'd');
  // remove space
  str = str.replace(/(\s+)/g, ' ');
  return str;
};

module.exports = { pick, omit, utf8ToASCII };
