//软键盘管理模块
(function (factory) {
  // CommonJS、CMD规范检查
  /* global define */
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) { // AMD规范检查
    define(factory)
  }
}(function (conf, flag) {
  'use strict'
  var VERSION = '1.0.0'

  var Vue = null

  /**
   * 设置vue实例对象
   * @public
   * @alias module:module/board.setVue
   * @param {Vue} vue vue实例
   * @returns {void}
   */
  function setVue(vue) {
    Vue = vue
  }

  /**
* 显示数字软键盘
* @public
* @alias module:module/board.numboard
* @returns {void}
*/
  function numboard(e, options) {
    Vue.$root.currentType = options.inputId
    Vue.$root.firstFocus = true
    var value
    if ($("#" + options.inputId + " input")[0]) {
      value = $("#" + options.inputId + " input").val()
    } else {
      value = $("#" + options.inputId).val()
    }
    Vue.$store.state.keyboardValue_num = value
    Vue.$store.commit("showKeyboard_num_fun", e)
  }

  /**
 * 显示金额软键盘
 * @public
 * @alias module:module/board.cashboard
 * @returns {void}
 */
  function cashboard(e, options) {
    Vue.$root.currentType = options.inputId
    Vue.$root.firstFocus = true
    var value
    if ($("#" + options.inputId + " input")[0]) {
      value = $("#" + options.inputId + " input").val()
    } else {
      value = $("#" + options.inputId).val()
    }
    Vue.$store.state.keyboardValue_cash = value
    Vue.$store.commit("showKeyboard_cash_fun", e)
  }

  /**
 * 显示身份证号软键盘
 * @public
 * @alias module:module/board.idcardboard
 * @returns {void}
 */
  function idcardboard(e, options) {
    Vue.$root.currentType = options.inputId
    Vue.$root.firstFocus = true
    var value
    if ($("#" + options.inputId + " input")[0]) {
      value = $("#" + options.inputId + " input").val()
    } else {
      value = $("#" + options.inputId).val()
    }
    Vue.$store.state.keyboardValue_idcard = value
    Vue.$store.commit("showKeyboard_idcard_fun", e)
  }

  /**
 * 显示拼音软键盘
 * @public
 * @alias module:module/board.pinyinboard
 * @returns {void}
 */
  function pinyinboard(e, options) {
    Vue.$root.currentType = options.inputId
    Vue.$root.firstFocus = true
    var value
    if ($("#" + options.inputId + " input")[0]) {
      value = $("#" + options.inputId + " input").val()
    } else {
      value = $("#" + options.inputId).val()
    }
    Vue.$store.state.keyboardValue = value
    Vue.$store.commit("showKeyboard_pinyin_fun", e)
  }

  /**
  * 显示英文软键盘
  * @public
  * @alias module:module/board.engboard
  * @returns {void}
  */
  function engboard(e, options) {
    Vue.$root.currentType = options.inputId
    Vue.$root.firstFocus = true
    var value
    if ($("#" + options.inputId + " input")[0]) {
      value = $("#" + options.inputId + " input").val()
    } else {
      value = $("#" + options.inputId).val()
    }
    Vue.$store.state.keyboardValue = value
    Vue.$store.commit("showKeyboard_eng_fun", e)
  }

  /**
  * 显示手写软键盘
  * @public
  * @alias module:module/board.handwrite
  * @returns {void}
  */
  function handwrite(e, options) {
    Vue.$root.currentType = options.inputId
    Vue.$root.firstFocus = true
    var value
    if ($("#" + options.inputId + " input")[0]) {
      value = $("#" + options.inputId + " input").val()
    } else {
      value = $("#" + options.inputId).val()
    }
    Vue.$store.state.keyboardValue = value
    Vue.$store.commit("showKeyboard_handwrite_fun", e)
  }

  /**
  * 关闭软键盘
  * @public
  * @alias module:module/board.closeKeyboard
  * @returns {void}
  */
  function closeKeyboard() {
    Vue.$store.commit("hideKeyboard_num")
    Vue.$store.commit("hideKeyboard_idcard")
    Vue.$store.commit("hideKeyboard_cash")
    Vue.$store.commit("hideKeyboard_pinyin")
    Vue.$store.commit("hideKeyboard_eng")
    Vue.$store.commit("hideKeyboard_subnum")
    Vue.$store.commit("hideKeyboard_mark")
    Vue.$store.commit("hideKeyboard_engmark")
    Vue.$store.commit("hideKeyboard_handwrite")
  }

  /**
  * 获取数字软键盘的值
  * @public
  * @alias module:module/board.getNumValue
  * @returns {void}
  */
  function getNumValue() {
    return Vue.$store.state.keyboardValue_num
  }

  /**
  * 获取金额软键盘的值
  * @public
  * @alias module:module/board.getCashValue
  * @returns {void}
  */
  function getCashValue() {
      return Vue.$store.state.keyboardValue_cash
  }

  /**
  * 获取身份证软键盘的值
  * @public
  * @alias module:module/board.getIdcardValue
  * @returns {void}
  */
  function getIdcardValue() {
      return Vue.$store.state.keyboardValue_idcard
  }

  /**
  * 获取拼音或英文软键盘的值
  * @public
  * @alias module:module/board.getBoardValue
  * @returns {void}
  */
  function getBoardValue() {
      return Vue.$store.state.keyboardValue
  }

  /**
 * 设置输入框的值
 * 页面中多个输入框时，将结果和输入框匹配
 * @public
 * @alias module:module/board.setInputValue
 * @returns {void}
 */
  function setInputValue(Vue, val, options) {
      for(var key in options){
        if(Vue.$root.currentType === key){
          // Vue[options[key]]=val
          eval(`Vue.${options[key]}=val`)
        }
      }
  }

  return {
    version: VERSION,
    setVue: setVue,
    numboard: numboard,
    cashboard: cashboard,
    idcardboard: idcardboard,
    pinyinboard: pinyinboard,
    engboard: engboard,
    handwrite: handwrite,
    closeKeyboard: closeKeyboard,
    getNumValue: getNumValue,
    getCashValue: getCashValue,
    getIdcardValue: getIdcardValue,
    getBoardValue: getBoardValue,
    setInputValue: setInputValue
  }
}))
