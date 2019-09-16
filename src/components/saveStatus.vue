<template>
<div class="saveStatus">
    <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'saveStatus',
    components: {},
    data() { return {}},
    computed:{},
    methods: {}
}

</script>

<style scoped>

.saveStatus {
    /* background-color: var(--topbar-bg-color); */
    /* min-height: 35px; */
    /* text-align: center; */
    /* margin-top: 10px; */
    /* position: relative; */
    /* z-index: 2; */
}

.spinner {
  margin: 5px auto 0;
  width: 70px;
  text-align: center;
  color: white;
}

.spinner > div {
  width: 12px;
  height: 12px;
  background-color: white;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}

</style>