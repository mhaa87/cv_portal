<template>
<div>

  <v-menu ref="menu" v-model="menu"
    :close-on-content-click="false" 
    transition="scale-transition" offset-y
    max-width="290px" min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field v-model="dateFormatted" :label="text" readonly v-on="on"
        @blur="date = parseDate(dateFormatted)"
      ></v-text-field>
    </template>

    <v-date-picker v-model="date" type="month" @input="menu = false" no-title scrollable>
      <v-spacer></v-spacer>
      <!-- <v-btn text color="primary" @click="menu = false">Cancel</v-btn> -->
      <!-- <v-btn text color="primary" @click="saveDate()">OK</v-btn> -->
    </v-date-picker>
    
  </v-menu>

</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CV_Date_Picker',
  components: {},

  props: {dateProp: String, text: String, save: Function},

  data() { return {
    menu: false,
    date: this.dateProp,
    dateFormatted: this.formatDate(this.dateProp),
    splitChar: '.',
  }},

  computed:{...mapState([]),},

  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
      this.save(val)
    },
  },

  methods: {
    ...mapMutations([]),

    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return month + '.' + year;
    },

    parseDate (date) {
      if (!date) return null
      const [month, year] = date.split('.')
      return `${year}-${month.padStart(2, '0')}`
    },
  },

}

</script>

<style scoped>

/* .monthInput{width: 2.5em} */
/* .yearInput{width: 4em} */
.editText{
  min-height: 1em; 
  /* max-width: 1200px; */
}

.button{
  margin: 2px 0px;
}

.error {
  color: red; 
  font-weight: bold; 
  padding-bottom: 5px;
  text-align: center
}

</style>