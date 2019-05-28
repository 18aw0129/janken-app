<template>
    <div id="score">
        <h1>成績</h1>
        <button @click="reset">成績リセット</button>
        <ul>
            <li v-for="(item, index) in score" :key="item.id">
                <p>
                    {{ index + 1 }}回目は : {{scores[item]}}
                </p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            scores:[
                "負け","勝ち","引き分け",
            ]
        }
    },
  computed:{
      score(){
          return this.$store.getters.score
      }
  },
  methods: {
      reset(e){
          this.$store.commit('resetScore')
      }
  },
}
</script>

<style lang="scss" scoped>
    li{
        text-align: left;
        width: 160px;
        margin: 0 auto;
        p{
            margin: 0;
        }
    }
</style>

