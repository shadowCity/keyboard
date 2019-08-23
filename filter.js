define(function () {
  var formatObj = requirejs('module/format')
  var board = requirejs('module/board')
  var Vue = null
  var filter = {
    init: function (V) {
      Vue = V
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
