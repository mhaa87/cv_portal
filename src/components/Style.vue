<template><div class="styleOptions">
    <br/><h1>Style otions</h1><br/>
    Font: <br/>
    <select @change="(e) => setFont(e.target.value)">
        <option v-for="(value, key) in fonts" :key="key" :value="value">{{key}}</option>
    </select>
    <input class="numInput" type="number" @change="(e) => setFontSize(e.target.value)" :value="content.style.fontSize"><br>
    Profile Image: <br/>
    <input @change="(e) => setImg(e.target.value)" :value="content.style.imgLink"><br>
    Profile Image Size:<br/>
    <input class="imgSizeInput" type="number" @change="(e) => setImgSize(e.target.value)" :value="content.style.imgSize">
    <input @change="(e) => setImgSize(e.target.value)" type="range" min="100" max="250" :value="content.style.imgSize">
    <!-- {{content.style.imgSize}} -->
</div></template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Style',

  computed:{
      ...mapState(['fonts', 'content']),
  },

  methods: {
      ...mapMutations(['setFont', 'setFontSize', 'setImg', 'setImgSize']),
  },

}
</script>

<style>
.numInput{width: 2.5em;}
.imgSizeInput{width: 3.5em;}

.styleOptions{margin-left: 20px}
input[type=range] {
    height: 28px;
    -webkit-appearance: none;
    margin: 0px;
    background: transparent;
    padding: 0px;
  }

  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000;
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid #000000;
  }
  input[type=range]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 15px;
    width: 15px;
    border-radius: 4px;
    background: #5d96e0;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -4.5px;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #FFFFFF;
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000;
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid #000000;
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 15px;
    width: 15px;
    border-radius: 4px;
    background: #5d96e0;
    cursor: pointer;
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: #FFFFFF;
    border: 1px solid #000000;
    border-radius: 4px;
    box-shadow: 1px 1px 1px #000000;
  }
  input[type=range]::-ms-fill-upper {
    background: #FFFFFF;
    border: 1px solid #000000;
    border-radius: 4px;
    box-shadow: 1px 1px 1px #000000;
  }
  input[type=range]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 15px;
    width: 15px;
    border-radius: 4px;
    background: #5d96e0;
    cursor: pointer;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: #FFFFFF;
  }
  input[type=range]:focus::-ms-fill-upper {
    background: #FFFFFF;
  }

</style>