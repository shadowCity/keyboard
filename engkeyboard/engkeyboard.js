define(function () {
  var tpl = requirejs('text!sys_components/engkeyboard/engkeyboard.html')
  return {
    name: 'engkeyboard',
    template: tpl,
    props: {
    },
    data: function () {
      return {
        keyValue: '',
        keyCodeTmp1: '',
        keyCodeTmp2: '',
        keyCodeTmp3: '',
        keyCodeTmp4: '',
        isUpper: false,
        // pointer:'',
        curElement:'',
        keyCodeArray1: [{ value: 'Q', type: 'key' }, { value: 'W', type: 'key' }, { value: 'E', type: 'key' }, { value: 'R', type: 'key' }, { value: 'T', type: 'key' }, { value: 'Y', type: 'key' }, { value: 'U', type: 'key' }, { value: 'I', type: 'key' }, { value: 'O', type: 'key' }, { value: 'P', type: 'key' }, { value: '隐藏', type: 'hide' }],
        keyCodeArray2: [{ value: 'A', type: 'key' }, { value: 'S', type: 'key' }, { value: 'D', type: 'key' }, { value: 'F', type: 'key' }, { value: 'G', type: 'key' }, { value: 'H', type: 'key' }, { value: 'J', type: 'key' }, { value: 'K', type: 'key' }, { value: 'L', type: 'key' }, { value: '', type: 'del' }],
        keyCodeArray3: [{ value: '大写', type: 'upper' }, { value: 'Z', type: 'key' }, { value: 'X', type: 'key' }, { value: 'C', type: 'key' }, { value: 'V', type: 'key' }, { value: 'B', type: 'key' }, { value: 'N', type: 'key' }, { value: 'M', type: 'key' }, { value: '#', type: 'key' }, { value: '-', type: 'key' }, { value: '换行', type: 'enter' }],
        keyCodeArray4: [{ value: '符号', type: 'symbl' }, { value: '123', type: 'num' }, { value: '', type: 'space' }, { value: '.', type: 'key' }, { value: '@', type: 'key' }, { value: '', type: 'pinyin' }, { value: '完成', type: 'done' }],
        keyCodeArrayLower1: [{ value: 'q', type: 'key' }, { value: 'w', type: 'key' }, { value: 'e', type: 'key' }, { value: 'r', type: 'key' }, { value: 't', type: 'key' }, { value: 'y', type: 'key' }, { value: 'u', type: 'key' }, { value: 'i', type: 'key' }, { value: 'o', type: 'key' }, { value: 'p', type: 'key' }, { value: '隐藏', type: 'hide' }],
        keyCodeArrayLower2: [{ value: 'a', type: 'key' }, { value: 's', type: 'key' }, { value: 'd', type: 'key' }, { value: 'f', type: 'key' }, { value: 'g', type: 'key' }, { value: 'h', type: 'key' }, { value: 'j', type: 'key' }, { value: 'k', type: 'key' }, { value: 'l', type: 'key' }, { value: '', type: 'del' }],
        keyCodeArrayLower3: [{ value: '小写', type: 'lower' }, { value: 'z', type: 'key' }, { value: 'x', type: 'key' }, { value: 'c', type: 'key' }, { value: 'v', type: 'key' }, { value: 'b', type: 'key' }, { value: 'n', type: 'key' }, { value: 'm', type: 'key' }, { value: '#', type: 'key' }, { value: '-', type: 'key' }, { value: '换行', type: 'enter' }],
        keyCodeArrayLower4: [{ value: '符号', type: 'symbl' }, { value: '123', type: 'num' }, { value: '', type: 'space' }, { value: '.', type: 'key' }, { value: '@', type: 'key' }, { value: '', type: 'pinyin' }, { value: '完成', type: 'done' }],
      }
    },
    computed: {
      isshow: function () {
        return this.$store.state.showKeyboard_eng
      }
    },
    watch: {
      isshow: function () {
        if (!this.isshow && this.isUpper) {
          this.keyCodeArrayLower1 = this.keyCodeTmp1
          this.keyCodeArrayLower2 = this.keyCodeTmp2
          this.keyCodeArrayLower3 = this.keyCodeTmp3
          this.keyCodeArrayLower4 = this.keyCodeTmp4
        }
      }
    },
    mounted: function () {

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
      keyclick(value, type){
        switch(type){
          case 'upper':
            this.isUpper = false
            this.keyCodeArrayLower1 = this.keyCodeTmp1
            this.keyCodeArrayLower2 = this.keyCodeTmp2
            this.keyCodeArrayLower3 = this.keyCodeTmp3
            this.keyCodeArrayLower4 = this.keyCodeTmp4
            break
          case 'lower':
            this.isUpper = true
            this.keyCodeTmp1 = this.keyCodeArrayLower1
            this.keyCodeTmp2 = this.keyCodeArrayLower2
            this.keyCodeTmp3 = this.keyCodeArrayLower3
            this.keyCodeTmp4 = this.keyCodeArrayLower4
            this.keyCodeArrayLower1 = this.keyCodeArray1
            this.keyCodeArrayLower2 = this.keyCodeArray2
            this.keyCodeArrayLower3 = this.keyCodeArray3
            this.keyCodeArrayLower4 = this.keyCodeArray4
            break
          case 'hide':
          case 'done':
            if(this.isUpper){
              this.keyCodeArrayLower1 = this.keyCodeTmp1
              this.keyCodeArrayLower2 = this.keyCodeTmp2
              this.keyCodeArrayLower3 = this.keyCodeTmp3
              this.keyCodeArrayLower4 = this.keyCodeTmp4
            }
            this.$store.commit("hideKeyboard_eng")
            break
          case 'key':
            this.keyValue = value
            var preval = this.$store.state.keyboardValue.split('')
            preval.splice(this.$root.pointer,0,this.keyValue)
            this.$store.state.keyboardValue = preval.join('')
            this.$root.pointer++
          break
          case 'del':
            this.keyValue = this.$store.state.keyboardValue
            this.$store.state.keyboardValue = this.keyValue.substr(0, this.$root.pointer - 1) + this.keyValue.substr(this.$root.pointer)
            if (this.$root.pointer) this.$root.pointer--
            break
          case 'space':
            this.keyValue = ' '
            var preval = this.$store.state.keyboardValue.split('')
            preval.splice(this.$root.pointer, 0, this.keyValue)
            this.$store.state.keyboardValue = preval.join('')
            this.$root.pointer++
            break
          case 'pinyin':
            this.$store.commit("hideKeyboard_eng")
            this.$store.commit("showKeyboard_pinyin_fun")
            break
          case 'num':
            this.$root.from = 'eng'
            this.$store.commit("hideKeyboard_eng")
            this.$store.commit("showKeyboard_subnum_fun")
            break
          case 'symbl':
            this.$store.commit("hideKeyboard_eng")
            this.$store.commit("showKeyboard_engmark_fun")
            break
        }

      }
    }
  }
})
