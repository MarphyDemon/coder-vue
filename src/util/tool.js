import store from "../vuex/store";

/**
 *   Toast公共方法
 */
export function toast(str, icon) {
  store.dispatch("showToast", true);
  if (icon == "success") {
    store.dispatch("showSuccess", true);
    store.dispatch("showFail", false);
  } else {
    store.dispatch("showSuccess", false);
    store.dispatch("showFail", true);
  }
  store.dispatch("toastMsg", str);
  setTimeout(() => {
    store.dispatch("showToast", false);
  }, 1500);
}

/**
 * dialog公共方法
 */

export function alert(str) {
  store.dispatch("showAlert", true);
  store.dispatch("alertMsg", str);
  setTimeout(() => {
    store.dispatch("showAlert", false);
  }, 1500);
}
export function add(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
export function reduce(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 带中文参数的
export function getUrlParam(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}
export function getQueryString(name) {
  var me = this;
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return "";
}
