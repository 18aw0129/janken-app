<template>
  <div class="hello">
    <h1>Janken.vue</h1>
    <button v-on:click="gameStart" type="button" id="gameStart">ゲームスタート</button>
    <p>{{ score }}</p>
    <div class="imgArea"><img v-bind:src="src" alt=""></div>
    <ul>
            <li>
                <button v-on:click="onSelected" class="button" type="button" value="0" disabled>グー</button>
            </li>
            <li>
                <button v-on:click="onSelected" class="button" type="button" value="1" disabled>チョキ</button>
            </li>
            <li>
                <button v-on:click="onSelected" class="button" type="button" value="2" disabled>パー</button>
            </li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'Janken',
  data() {
      //何故リターンが必要なのか？=>子コンポーネントではdataは関数にしなければならない
            return { 
                src : require('../assets/goo.png'),
                imgList:[
                    require('../assets/goo.png'),
                    require('../assets/chi.png'),
                    require('../assets/pa.png'),
                    
                ],
                timer: null,
                resultMessage: ''
            }
        },
  computed:{
      score(){
          return this.$store.getters.score
      }
  },
  methods:{
      doUpdate(num){
          this.$store.dispatch( 'doUpdate', num )
      },
      changeImg(number) {
                // 画像の切替
                if(number && Math.abs(number) <= this.imgList.length) {
                    this.src = this.imgList[number];
                } else {
                    var num = Math.floor(Math.random() * this.imgList.length);
                    this.src = this.imgList[num];
                }
      },
      gameStart(){
          this.timer = setInterval(this.changeImg,80)
          document.getElementById('gameStart').setAttribute('disabled', true)
          let btns = document.querySelectorAll('.button');
          for( let btn of btns ) {
                    btn.removeAttribute('disabled');
                }
      },
      onSelected(e){
          clearInterval(this.timer)
          let btns = document.querySelectorAll('.button');
                for( let btn of btns ) {
                    btn.setAttribute('disabled', true);
                }
          document.getElementById('gameStart').removeAttribute('disabled')
          let button = e.target
          window.console.log(this.src)
          let resultNum = parseInt(this.imgList.indexOf(this.src), 10)
          let selectNum = parseInt(button.value, 10) /* 第一引数に渡した値を10進数に変換して返す */
          let kekkaNum = this.decisionJanken(selectNum, resultNum)
        //   this.doUpdate(kekkaNum)
          this.$store.commit('setScore', kekkaNum)
          window.console.log('勝ち負け(0 は負け, 1は勝ち,2は引き分け)→' + this.decisionJanken(selectNum, resultNum))
      },
      decisionJanken(myHand, cpuHand) {
                let result = 0; // 0 は負け, 1は勝ち,2は引き分け
 
                switch(myHand) {
                    case 0://自分がぐー(0)のとき
                    if(cpuHand===0){
                        result = 2 // 引き分け
                    }else if(cpuHand===1){
                        result = 1 // 勝ち
                    }else{
                        result = 0 // 負け
                    }
                    break;
                    case 1: // 自分がチョキ(1)
                    if(cpuHand===1){
                        result =2 // 引分け
                    }else if(cpuHand===2){
                        result = 1
                    }else{
                        result = 0
                    }
                    break;
                    case 2: // 自分がパー(2)の時
                    if(cpuHand===2){
                        result = 2
                    }else if(cpuHand===0){
                        result = 1
                    }else {
                        result = 0
                    }
                }
                return result;
            }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.imgArea{
    height: 300px;
}
</style>

