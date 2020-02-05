<template>
  <v-container style="height: 100%" fluid>
    <v-row dense>
      <!-- Left side -->
      <v-col cols="2"></v-col>
      <v-col><cvEdit class="cvEdit" /></v-col>
      <!-- Right side -->
      <v-col md="auto">
          <cvMenu style="background: transparent"/>
          <!-- <v-slider v-model="cvSize" min="1" max="10" thumb-label="always" dense></v-slider> -->
          <div :style="cvSizeStyle" >
            <CV class="cv" :style="cvScaleStyle"/> 
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import CV from '@/components/CV.vue'
import cvMenu from '@/components/CV_Menu.vue'
import cvEdit from '@/components/CV_Edit.vue'

export default {
  name: 'MyCV',

  components: {CV, cvMenu, cvEdit},

  data() { return {
    cvScale: 7,
  }},

  mounted(){},
  computed:{
    ...mapState(['content', 'fonts', 'cvSize']),

    cvScaleStyle(){
      return {transform: 'scale(' + this.cvScale/10 + ')'}
    },

    cvSizeStyle(){
      return{
        width: this.cvSize.width * (this.cvScale / 10) + "px", 
        height: this.cvSize.height * (this.cvScale / 10) + "px",
      };
    }
  },
  methods: { },


}

</script>

<style scoped>

.cv {
  width: var(--cv_width);
  transform-origin: 0% 0%;
}

.cvEdit{
  max-width: 650px;
}

</style>

