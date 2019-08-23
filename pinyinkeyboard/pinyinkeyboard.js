define(function () {
  var tpl = requirejs('text!sys_components/pinyinkeyboard/pinyinkeyboard.html')
  var dict = requirejs('sys_libs/pinyin/dict/pinyin_dict_notone')
  return {
    name: 'pinyinKeyboard',
    template: tpl,
    props: {
    },
    data: function () {
      return {
        slideRight:false,
        slideLeft:false,
        olde:0,
        hanzi: '',
        pychar: '',
        typing: false,
        downdisable: false,
        updisable: false,
        dict2: '',
        curPage: '',
        count: '',
        // pointer: '',
        curElement: '',
        resultArray: [],
        resultArray1: '',
        keyCodeArray1: [{ value: 'Q', type: 'key' }, { value: 'W', type: 'key' }, { value: 'E', type: 'key' }, { value: 'R', type: 'key' }, { value: 'T', type: 'key' }, { value: 'Y', type: 'key' }, { value: 'U', type: 'key' }, { value: 'I', type: 'key' }, { value: 'O', type: 'key' }, { value: 'P', type: 'key' }, { value: '隐藏', type: 'hide' }],
        keyCodeArray2: [{ value: 'A', type: 'key' }, { value: 'S', type: 'key' }, { value: 'D', type: 'key' }, { value: 'F', type: 'key' }, { value: 'G', type: 'key' }, { value: 'H', type: 'key' }, { value: 'J', type: 'key' }, { value: 'K', type: 'key' }, { value: 'L', type: 'key' }, { value: '', type: 'del' }],
        keyCodeArray3: [{ value: '手写', type: 'handwrite' }, { value: 'Z', type: 'key' }, { value: 'X', type: 'key' }, { value: 'C', type: 'key' }, { value: 'V', type: 'key' }, { value: 'B', type: 'key' }, { value: 'N', type: 'key' }, { value: 'M', type: 'key' }, { value: '#', type: 'mark' }, { value: '-', type: 'mark' }, { value: '换行', type: 'enter' }],
        keyCodeArray4: [{ value: '符号', type: 'symbl' }, { value: '123', type: 'num' }, { value: '', type: 'space' }, { value: '', type: 'comma' }, { value: '', type: 'point' }, { value: '', type: 'eng' }, { value: '完成', type: 'done' }],
      }
    },
    computed: {
      isshow: function(){
        return this.$store.state.showKeyboard_pinyin
      }
    },
    watch: {
      isshow(){
        if(!this.isshow){
          this.pychar = ''
          this.hanzi = ''
        }
      },
      pychar() {
        if (!this.pychar&&!this.hanzi) {
          this.typing = false
        }
      },
      hanzi(){
        if(!this.hanzi&&!this.pychar){
          this.typing = false
        }
      },
      curPage(){
        if(this.curPage===1&&this.curPage===this.count){
          this.updisable = true
          this.downdisable = true
        }
        if(this.curPage===1){
          this.updisable = true    //监听变化，设置disabled
        }else{
          this.updisable = false
        }
        if(this.curPage===this.count){
          this.downdisable = true
        }else {
          this.downdisable = false
        }
      },
      count(){
        if(this.curPage === this.count){
          this.downdisable = true
        }else{
          this.downdisable = false
        }
      }
    },
    mounted: function () {
      this.dict2 = {}
      this.dict2['i']='i'
      this.dict2['u'] = 'u'
      this.dict2['v'] = 'v'
      for(var i=97;i<=123;i++){
        var ch = String.fromCharCode(i)
        if(!dict[ch]){
          for(var j in dict){
            if(j.indexOf(ch)==0){
              this.dict2[ch] = dict[j]
              break
            }
          }
        }
      }
    },
    destroyed () {
    },
    methods: {
      silederOver(e){
        if(e.targetTouches[0].clientX-this.olde<10){
          this.slideLeft=true
          this.slideRight=false
        }else{
          this.slideRight=true
          this.slideLeft=false
        }
        this.olde = e.targetTouches[0].clientX
      },
      sliderUp(){
        if(this.slideRight&&!this.updisable){
          this.up()
          this.slideRight = false
        }else if(this.slideLeft&&!this.downdisable){
          this.down()
          this.slideLeft = false
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
      up(){
        if(this.curPage!==1){
          this.curPage--
         // this.resultArray1 = this.resultArray[this.curPage - 1] //切换页面，切换相应的数组
         // this.resultArray1.push(this.resultArray[this.curPage - 1])
          var aa=9
          for(var i=0;i<aa;i++){
            this.resultArray1.shift()
          }
          for(var j=0;j<aa;j++){
            this.resultArray1.push(this.resultArray[this.curPage - 1][j])
          }
        }
      },
      down(){
        if (this.curPage !== this.count) {
          this.curPage++
         var aa=9
         for(var i=0;i<aa;i++){
           this.resultArray1.shift()
         }
         for(var j=0;j<aa;j++){
          this.resultArray1.push(this.resultArray[this.curPage - 1][j])
         }
        }
      },
      resclick(value){     //选择结果
        this.hanzi += value
        var idx = this.pychar.indexOf("'")
        if(idx>0){
          this.handleResult(this.getHanzi(this.pychar.substr(idx+1)))
        }else{
          var newval = this.$store.state.keyboardValue.split('')
          newval.splice(this.$root.pointer,0,this.hanzi)
          this.$store.state.keyboardValue = newval.join('')
          this.$root.pointer = this.$root.pointer + this.hanzi.length

          this.hanzi = ''
          this.pychar = ''
          this.typing = false
        }
      },
      keyclick(value, type) {
        switch (type) {
          case 'hide':
          case 'done':
            this.pychar = ''
            this.hanzi = ''
            this.$store.commit("hideKeyboard_pinyin")
            break
          case 'key':
            this.typing = true
            setTimeout(function () {
              window.scrollTo(0, 800)
            }, 0)
            this.pychar += value.toLowerCase()   //
            this.handleResult(this.getHanzi(this.pychar.replace(/'/g, '')))
            break
          case 'del':  //先删除输入法中的输入，在删除输入框中的输入,前删
            if(this.pychar){
              this.pychar = this.pychar.substr(0, this.pychar.length - 1)
              this.handleResult(this.getHanzi(this.pychar.replace(/'/g, '')))
            }else if(this.hanzi){
              this.hanzi = this.hanzi.substr(0, this.hanzi.length - 1)
            }else{
              var inputValue = this.$store.state.keyboardValue
              this.$store.state.keyboardValue = inputValue.substr(0, this.$root.pointer - 1) + inputValue.substr(this.$root.pointer)
              if (this.$root.pointer) this.$root.pointer--
            }
            break
          case 'space':
            var newval = this.$store.state.keyboardValue.split('')
            newval.splice(this.$root.pointer, 0, ' ')
            this.$store.state.keyboardValue = newval.join('')
            this.$root.pointer = this.$root.pointer + 1
            break
          case 'comma':
            var newval = this.$store.state.keyboardValue.split('')
            newval.splice(this.$root.pointer, 0, '，')
            this.$store.state.keyboardValue = newval.join('')
            this.$root.pointer = this.$root.pointer + 1
            break
          case 'point':
            var newval = this.$store.state.keyboardValue.split('')
            newval.splice(this.$root.pointer, 0, '。')
            this.$store.state.keyboardValue = newval.join('')
            this.$root.pointer = this.$root.pointer + 1
            break
          case 'eng':
            this.pychar = ''
            this.$store.commit("hideKeyboard_pinyin")
            this.$store.commit("showKeyboard_eng_fun")
            break
          case 'num':
            this.pychar = ''
            this.$root.from = 'pinyin'
            this.$store.commit("hideKeyboard_pinyin")
            this.$store.commit("showKeyboard_subnum_fun")
            break
          case 'symbl':
            this.pychar = ''
            this.$root.from ='pinyin'
            this.$store.commit("hideKeyboard_pinyin")
            this.$store.commit("showKeyboard_mark_fun")
            break
          case 'mark':
            var newval = this.$store.state.keyboardValue.split('')
            newval.splice(this.$root.pointer, 0, value)
            this.$store.state.keyboardValue = newval.join('')
            this.$root.pointer = this.$root.pointer + value.length
            break
          case 'handwrite':
            this.pychar = ''
            this.$store.commit("hideKeyboard_pinyin")
            this.$store.commit("showKeyboard_handwrite_fun")
            break
        }

      },
      handleResult(arr) {
        this.count = Math.ceil(arr.length / 9) //将结果按9划分成多个数组
        for (var i = 0; i < this.count; i++) {
          this.resultArray[i] = arr.splice(0, 9)
        }
        this.curPage = 1;
        //深度拷贝
        var ary2 = this.resultArray[this.curPage - 1].concat();
        this.resultArray1 = ary2 //当前显示第一个数组的，页面变化再换
      },
      getHanzi(pinyin) {
        this.pychar = pinyin
        var result = this.getSingleHanzi(pinyin);
        if(result){
          return result.split('')
        }
        var temp = ''
        for(var i=0,len=pinyin.length;i<len;i++){
          temp += pinyin[i]
          result = this.getSingleHanzi(temp)  //比如aoo,a有结果
          if(!result) continue
          var flag = false  //flag 表示当前能匹配到结果，往后5个字母不能匹配结果，因为最长可能是5个字母，如zhuang
          if((i+1)<pinyin.length){
            for(var j=1,len=pinyin.length;j<=5&&(i+j)<len;j++){
              if(this.getSingleHanzi(pinyin.substr(0,i+j+1))){  //ao有结果
                flag = true
                break
              }
            }
          }
          if(!flag) {     //但 aa结果 所以a'a
            this.pychar = pinyin.substr(0,i+1)+"'"+pinyin.substr(i+1)
            return result.split('')
          }
        }
        return []
      },
      getSingleHanzi(pinyin) {
        return dict[pinyin]||this.dict2[pinyin]||''
      },

    },

  }
})
