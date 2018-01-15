// Sufficient for Normas implementation of functions like from lodash

export isPlainObject from 'is-plain-object';

export const isArray = Array.isArray;

export function isFunction(v) {
  return typeof v === 'function';
}

export function isString(v) {
  return typeof v === 'string';
}

export function compact(array) {
  return filter(array, v => v);
}

export function debounce(func, wait) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  }
}

export function flatten(array) {
  const result = [];
  array.forEach(value => {
    if (isArray(value)) {
      result.push(...value);
    } else {
      result.push(value);
    }
  });
  return result;
}

export function filter(collection, conditions) {
  return filterBase('filter', collection, conditions);
}

export function find(collection, conditions) {
  return filterBase('find', collection, conditions);
}

export function map(collection, iteratee) {
  return Array.prototype.map.call(collection, iteratee);
}

export function mapValues(object, iteratee) {
  const result = {};
  Object.keys(object).forEach(key => {
    result[key] = iteratee(object[key]);
  });
  return result;
}

export function without(collection, ...values) {
  return filter(collection, item => !values.includes(item));
}

// private

function filterBase(baseName, collection, conditions) {
  return Array.prototype[baseName].call(collection, makeConditionsMatch(conditions));
}

function makeConditionsMatch(conditions) {
  if (isFunction(conditions)) {
    return conditions;
  } else {
    const conditionsKeys = Object.keys(conditions);
    return item => filterMatch(item, conditions, conditionsKeys);
  }
}

function filterMatch(item, conditions, conditionsKeys) {
  return conditionsKeys.find(key => conditions[key] !== item[key]) === undefined;
}
