define(function(){
  var tpl = requirejs('text!sys_components/idcardboard/idcardboard.html')
  return {
    name: 'idcardboard',
    template: tpl,
    props: {
    },
    data: function(){
      return {
        numArray1: [{ value: '1', type: 'key' }, { value: '2', type: 'key' }, { value: '3', type: 'key' }, { value: '隐藏', type: 'hide' }],
        numArray2: [{ value: '4', type: 'key' }, { value: '5', type: 'key' }, { value: '6', type: 'key' }, { value: '', type: 'del' }],
        numArray3: [{ value: '7', type: 'key' }, { value: '8', type: 'key' }, { value: '9', type: 'key' }],
        numArray4: [{ value: '0', type: 'key' }, { value: 'X', type: 'key' }],
        done: { value: '完成', type: 'done'}
      }
    },
    methods: {
      getPointer() {
        if (this.$root.firstFocus) {
          var inputDom = $("#" + this.$root.currentType)[0]
          if ($("#" + this.$root.currentType + " input")[0]) {
            inputDom = $("#" + this.$root.currentType + " input")[0]
          }
          this.curElement = inputDom
          this.$root.pointer = this.curElement.selectionStart
          this.$root.firstFocus = false
        }
      },
      keyclick(value,type){
        switch(type){
          case 'key':
            var preval = this.$store.state.keyboardValue_idcard.split('') //获取之前的值，炸成数组
            preval.splice(this.$root.pointer,0,value) //使用数组splice方法进行插入
            this.$store.state.keyboardValue_idcard = preval.join('')  //在合成字符串赋给状态
            this.$root.pointer += value.length  //光标位置增加
            break
          case 'hide':
          case 'done':
            this.$store.commit("hideKeyboard_idcard")
            break
          case 'del':
            this.keyValue = this.$store.state.keyboardValue_idcard
            this.$store.state.keyboardValue_idcard = this.keyValue.substr(0, this.$root.pointer - 1) + this.keyValue.substr(this.$root.pointer)
            if (this.$root.pointer) this.$root.pointer--
            break
        }
      },

    }
  }
})
