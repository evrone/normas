import { isArray, isPlainObject, mapValues, each } from '../lib/helpers';

export default {
  memoryData(element, key, ...value) {
    if (value.length > 0) {
      this.elementsApply(element, el => { el[key] = value[0]; });
    } else {
      return element[key];
    }
  },

  removeMemoryData(element, key) {
    const value = element[key];
    delete element[key];
    return value;
  },

  data(element, key, ...value) {
    if (value.length > 0) {
      const stringifiedValue = this.dataStringify(value[0]);
      this.elementsApply(element, el => { el.dataset[key] = stringifiedValue; });
    } else {
      return key
        ?
        this.dataParse(element.dataset[key])
        :
        mapValues(element.dataset, dataValue => this.dataParse(dataValue));
    }
  },

  removeData(element, key) {
    const value = element.dataset[key];
    delete element.dataset[key];
    return value;
  },

  dataStringify(data) {
    return isArray(data) || isPlainObject(data)
      ?
      JSON.stringify(data)
      :
      data;
  },

  dataParse(dataValue) {
    try {
      return JSON.parse(dataValue);
    } catch (e) {
      this.lastDataParseError = e;
      return dataValue;
    }
  },

  elementsApply(element, iteratee) {
    if (this.isElement(element)) {
      iteratee(element);
    } else {
      each(element, iteratee);
    }
  },

  isElement(element) {
    return element instanceof Element;
  },

  contains(rootElement, element) {
    return (rootElement === document ? document.body : rootElement).contains(element);
  },

  remove(element) {
    element.parentNode.removeChild(element);
  },
};
