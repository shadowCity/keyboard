define(function(){
  var tpl = requirejs('text!sys_components/markboard/markboard.html')
  return {
    name: 'markboard',
    template: tpl,
    props: {
    },
    data: function(){
      return {
        upable: false,
        isdown: false,
        tempArray1: [],
        tempArray2: [],
        tempArray3: [],
        tempArray4: [],
        numArray1: [{ value: '', type: 'comma' }, { value: '', type: 'point' }, { value: '', type: 'duan' }, { value: '', type: 'dun' }, { value: '——', type: 'key' }, { value: '？', type: 'key' }],
        numArray2: [{ value: '：', type: 'key' }, { value: '', type: 'semicolon' }, { value: '......', type: 'key' }, { value: '', type: 'lsigquote' }, { value: '', type: 'ldoubquote' }, { value: '！', type: 'key' }],
        numArray3: [{ value: '.', type: 'key' }, { value: '&', type: 'key' }, { value: '#', type: 'key' }, { value: '*', type: 'key' }, { value: '（', type: 'key' }, { value: '）', type: 'key' }],
        numArray4: [{ value: '~', type: 'key' }, { value: '￥', type: 'key' }, { value: '%', type: 'key' }, { value: '《', type: 'key' }, { value: '》', type: 'key' }, { value: '【', type: 'key' }],
        numArray5: [{ value: '】', type: 'key' }, { value: '{', type: 'key' }, { value: '}', type: 'key' }, { value: '|', type: 'key' }, { value: '^', type: 'key' }, { value: '=', type: 'key' }],
        numArray6: [{ value: '+', type: 'key' }, { value: '-', type: 'key' }, { value: '', type: 'rsigquote' }, { value: '', type: 'rdoubquote' }],
        funArray: [{ value: '返回', type: 'back' }, { value: '隐藏', type: 'hide' }, { value: '', type: 'del' },{ value: '完成', type: 'done' }],
      }
    },
    computed: {
      isshow: function(){
        return this.$store.state.showKeyboard_mark
      }
    },
    watch: {
      isshow: function(){
        if(!this.isshow&&this.isdown){
          this.up()
        }
      }
    },
    methods: {
      up(){
        if(this.upable){
          this.numArray1 = this.tempArray1
          this.numArray2 = this.tempArray2
          this.numArray3 = this.tempArray3
          this.numArray4 = this.tempArray4
          this.upable = false
          this.isdown = false
        }
      },
      down(){
        if(!this.upable){
          this.tempArray1 = this.numArray1
          this.tempArray2 = this.numArray2
          this.tempArray3 = this.numArray3
          this.tempArray4 = this.numArray4
          this.numArray1 = this.numArray5
          this.numArray2 = this.numArray6
          this.numArray3 = []
          this.numArray4 = []
          this.upable = true
          this.isdown = true
         }
      },
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
            var preval = this.$store.state.keyboardValue.split('') //获取之前的值，炸成数组
            preval.splice(this.$root.pointer,0,value) //使用数组splice方法进行插入
            this.$store.state.keyboardValue = preval.join('')  //在合成字符串赋给状态
            this.$root.pointer += value.length  //光标位置增加
            break
          case 'hide':
          case 'done':
          case 'back':
            this.$store.commit("hideKeyboard_subnum")
            if(this.$root.from=='pinyin'){
              this.$store.commit("showKeyboard_pinyin_fun")
            } else if (this.$root.from == 'handwrite') {
              this.$store.commit("showKeyboard_handwrite_fun")
            }
            break
          case 'del':
            this.keyValue = this.$store.state.keyboardValue
            this.$store.state.keyboardValue = this.keyValue.substr(0, this.$root.pointer - 1) + this.keyValue.substr(this.$root.pointer)
            if (this.$root.pointer) this.$root.pointer--
            break
          case 'comma':
            var preval = this.$store.state.keyboardValue.split('')
            preval.splice(this.$root.pointer, 0, '，')
            this.$store.state.keyboardValue = preval.join('')
            this.$root.pointer += 1
            break
          case 'point':
            var preval = this.$store.state.keyboardValue.split('')
            preval.splice(this.$root.pointer, 0, '。')
            this.$store.state.keyboardValue = preval.join('')
            this.$root.pointer += 1
            break
          case 'duan':
            var preval = this.$store.state.keyboardValue.split('')
            preval.splice(this.$root.pointer, 0, '-')
            this.$store.state.keyboardValue = preval.join('')
            this.$root.pointer += 1
            break
          case 'dun':
            var preval = this.$store.state.keyboardValue.split('')
            preval.splice(this.$root.pointer, 0, '、')
            this.$store.state.keyboardValue = preval.join('')
            this.$root.pointer += 1
            break
          case 'semicolon':
            var preval = this.$store.state.keyboardValue.split('')
            preval.splice(this.$root.pointer, 0, '；')
            this.$store.state.keyboardValue = preval.join('')
            this.$root.pointer += 1
            break
          case 'lsigquote':
            var preval = this.$store.state.keyboardValue.split('')
            preval.splice(this.$root.pointer, 0, '‘')
            this.$store.state.keyboardValue = preval.join('')
            this.$root.pointer += 1
            break
          case 'ldoubquote':
            var preval = this.$store.state.keyboardValue.split('')
            preval.splice(this.$root.pointer, 0, '“')
            this.$store.state.keyboardValue = preval.join('')
            this.$root.pointer += 1
            break
          case 'rsigquote':
            var preval = this.$store.state.keyboardValue.split('')
            preval.splice(this.$root.pointer, 0, '’')
            this.$store.state.keyboardValue = preval.join('')
            this.$root.pointer += 1
            break
          case 'rdoubquote':
            var preval = this.$store.state.keyboardValue.split('')
            preval.splice(this.$root.pointer, 0, '”')
            this.$store.state.keyboardValue = preval.join('')
            this.$root.pointer += 1
            break
        }
      },
    }
  }
})
