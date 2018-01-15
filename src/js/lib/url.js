import { compact, map, isArray } from '../lib/helpers';

export function filterUrl($form, filterNames = null) {
  let params = $form.serializeArray();
  let action = $form.attr('action');
  params = params.filter(param => param.name !== 'utf8');
  return changeUrlParams(action, params, filterNames);
}

export function changeUrlParams(url, setParams, filterNames = null) {
  let urlParts = url.split('?');
  let params = getUrlParams(url);
  if (!isArray(setParams)) {
    setParams = serializedArrayFromHash(setParams);
  }
  params = prepareParams(params.concat(setParams));
  if (filterNames) { params = params.filter(({ name }) => filterNames.indexOf(name.replace(/\[\]$/, '')) > -1) }
  urlParts[1] = $.param(params);
  url = compact(urlParts).join('?');
  return url;
}

export function getUrlParams(url) {
  let paramsPart = url.split('?')[1] || '';
  if (!paramsPart) {
    return [];
  }
  let params = paramsPart.split('&');
  return params.map((param) => {
    let [name, value] = param.split('=').map(decodeURIComponent);
    return { name, value };
  });
}

function prepareParams(serializedArray) {
  // collapsing value by names to last in order
  let params = [];
  let names = [];
  serializedArray.forEach((param) => {
    let index = /\[\]$/.test(param.name) ? -1 : names.indexOf(param.name);
    if (index < 0) {
      names.push(param.name);
      params.push(param);
    } else {
      params[index] = param;
    }
  });
  return params.filter(param => param.value).sort(serializedSort);
}

function serializedSort(a, b) {
  if (a.name === b.name) {
    return a.value >= b.value ? 1 : -1;
  }
  return a.name > b.name ? 1 : -1;
}

function serializedArrayFromHash(params) {
  return map(params, (value, name) => ({ name, value })).sort(serializedSort);
}
