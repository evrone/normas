// Sufficient for Normas implementation of functions like from lodash

export function isPlainObject(value) {
  if (value == null || typeof value !== 'object') {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const constructor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof constructor === 'function' && constructor instanceof constructor;
}

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

export function groupBy(array, key) {
  return reduceBy(array, key, (grouped, groupKey, item) => {
    if (grouped[groupKey]) {
      grouped[groupKey].push(item);
    } else {
      grouped[groupKey] = [item];
    }
  });
}

export function countBy(array, key) {
  return reduceBy(array, key, (grouped, groupKey) => {
    if (grouped[groupKey]) {
      grouped[groupKey]++;
    } else {
      grouped[groupKey] = 1;
    }
  });
}

export function groupByInArray(array, key) {
  return reduceBy(array, key, (grouped, groupKey, item) => {
    const group = find(grouped, ([k]) => k === groupKey);
    if (group) {
      group[1].push(item);
    } else {
      grouped.push([groupKey, [item]]);
    }
  }, []);
}

export function flatten(array, deep = false) {
  return array.reduce((flat, value) => {
    if (isArray(value)) {
      flat.push(...(deep ? flatten(value, true) : value));
    } else {
      flat.push(value);
    }
    return flat;
  }, []);
}

export function intersection(a, b) {
  if (!isArray(b)) {
    b = [b];
  }
  return (isArray(a) ? a : [a]).reduce((result, value) => {
    if (includes(b, value)) {
      result.push(value);
    }
    return result;
  }, []);
}

export function deepMerge(destination, source) {
  return Object.keys(source).reduce((result, key) => {
    if (source[key]) {
      if (isPlainObject(destination[key]) && isPlainObject(source[key])) {
        result[key] = deepMerge(destination[key], source[key]);
      } else {
        result[key] = source[key];
      }
      return result;
    }
  }, Object.assign({}, destination));
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
  return Object.keys(object).reduce((result, key) => {
    result[key] = iteratee(object[key]);
    return result;
  }, {});
}

export function without(collection, ...values) {
  return filter(collection, item => !includes(values, item));
}

export function includes(collection, searchElement) {
  return Array.prototype.indexOf.call(collection, searchElement) !== -1;
}

// private

function reduceBy(array, key, reducer, initial = {}) {
  return Array.prototype.reduce.call(array, (grouped, item) => {
    const groupKey = isFunction(key) ? key(item) : item[key];
    reducer(grouped, groupKey, item);
    return grouped;
  }, initial);
}

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
