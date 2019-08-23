define(function () {
  var formatObj = requirejs('module/format')
  var board = requirejs('module/board')
  var Vue = null
  var filter = {
    init: function (V) {
      Vue = V
      /**
       * 日期格式化
       * @param {String|Date} value 日期对象或者字符串日期，格式为YYYYMMDD
       * @param {String} format 日期格式
       * @param {String} defaultValue 当value为空时默认的返回值
       * @return {String} 格式化后的日期字符串
       */
      Vue.filter('dateFormatByYMD', function (value, format, defaultValue) {
        if (value === '9999') {
          return '长期有效'
        }

        return formatObj.dateFormatByYMD(value, format, defaultValue)
      })

      Vue.filter('dateFormat', function (date, format, defaultValue) {
        return formatObj.dateFormat(date, format, defaultValue)
      })

      Vue.filter('nullToEmpty', function (value) {
        return formatObj.nullToEmpty(value)
      })

      /**
       * 接口返回结果
       * @param {String} str 响应码
       * @return {String} 如果响应码为000000则返回成功，否则返回失败
       * */
      Vue.filter('retStg', function (str) {
        if (str === '000000') {
          return '成功'
        } else {
          return '失败'
        }
      })

      Vue.filter('moneyFormat', function (number) {
        return formatObj.moneyFormat(number)
      })

      /**
       *  数字转换千分位
       *
       */
      Vue.filter('moneyFormatToThousands', function (number, decimals, decPoint, thousandsSep) {
        return formatObj.moneyFormatToThousands(number, decimals, decPoint, thousandsSep)
      })

      /**
       *  数字金额大写转换(可以处理整数,小数,负数)
       *
       */
      Vue.filter('moneyFormatToUpperCase', function (n) {
        return formatObj.moneyFormatToUpperCase(n)
      })

      /**
      * 增加防双击自定义指令
      */
      Vue.directive('no-dbclick', {
        inserted (el, binding) {
          el.addEventListener('touchend', function (event) {
            var _dom = this
            var _event = window.event || event
            if (_dom.dataset.dbdisabled === '1') {
              if (_event && _event.preventDefault) { // 非IE
                _event.preventDefault()
              } else { // 兼容IE
                _event.returnValue = false
              }
              if (_event.stopImmediatePropagation) { // 非IE
          _event.stopImmediatePropagation()
              } else { // 兼容IE
                _event.cancelBubble = true
              }
              return
            }
            _dom.dataset.dbdisabled = '1'
            setTimeout(function () {
              _dom.dataset.dbdisabled = '0'
            }, binding.value || 2000)
          })
        }
      })
      //数字键盘
      Vue.directive('numboard', {
        inserted(el, binding) {
          if (el.__vue__) {
            el.__vue__.handleFocus = function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.numboard(event, options)
            }
          }
          if ($(el).find("input")[0]){
            $(el).find("input").off("focus").on("focus", function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.numboard(event, options)
            })
          }else{
            $(el).off("focus").on("focus", function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.numboard(event, options)
            })
          }
        }
      })

      Vue.directive('cashboard', {
        inserted(el, binding) {
          if (el.__vue__) {
            el.__vue__.handleFocus = function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.cashboard(event, options)
            }
          }
          if ($(el).find("input")[0]) {
            $(el).find("input").off("focus").on("focus", function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.cashboard(event, options)
            })
          } else {
            $(el).off("focus").on("focus", function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.cashboard(event, options)
            })
          }
        }
      })

      Vue.directive('idcardboard', {
        inserted(el, binding) {
          if (el.__vue__) {
            el.__vue__.handleFocus = function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.idcardboard(event, options)
            }
          }
          if ($(el).find("input")[0]) {
            $(el).find("input").off("focus").on("focus", function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.idcardboard(event, options)
            })
          } else {
            $(el).off("focus").on("focus", function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.idcardboard(event, options)
            })
          }
        }
      })

      Vue.directive('pinyinboard', {
        inserted(el, binding) {
          if (el.__vue__) {
            el.__vue__.handleFocus = function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.pinyinboard(event, options)
            }
          }
          if ($(el).find("input")[0]) {
            $(el).find("input").off("focus").on("focus", function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.pinyinboard(event, options)
            })
          } else {
            $(el).off("focus").on("focus", function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.pinyinboard(event, options)
            })
          }
        }
      })

      Vue.directive('engboard', {
        inserted(el, binding) {
          if (el.__vue__) {
            el.__vue__.handleFocus = function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.engboard(event, options)
            }
          }
          if ($(el).find("input")[0]) {
            $(el).find("input").off("focus").on("focus", function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.engboard(event, options)
            })
          } else {
            $(el).off("focus").on("focus", function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.engboard(event, options)
            })
          }
        }
      })

      Vue.directive('handwrite', {
        inserted(el, binding) {
          if (el.__vue__) {
            el.__vue__.handleFocus = function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.handwrite(event, options)
            }
          }
          if ($(el).find("input")[0]) {
            $(el).find("input").off("focus").on("focus", function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.handwrite(event, options)
            })
          } else {
            $(el).off("focus").on("focus", function (event) {
              var options = {
                inputId: binding.value.vnodeId,
                // value: binding.value.modelVal
              }
              board.handwrite(event, options)
            })
          }
        }
      })
    }
  }
  return filter
})
