<template>
    <div class="mainPageLayout">
      <div class="title">How to use:</div>
      <div class="info">
            <b>CV menu options:</b><br/><br/>
            <b>Save:</b> Click to save the changes to your CV online.</br></br>
            <b>Open:</b> Show a list of your saved CVs, press it again to hide the list. Click on a CV in the list to select it.
                You can delete your currently selected CV with the <i>Delete</i> button at the bottom.</br></br>
            <b>New CV:</b> Create a new CV by entering the name in the input field and press <i>Save</i>.</br></br>
            <b>Download:</b> Opens a new window for printing or downloading the CV. Might not work for other browsers than Chrome.</br></br>
        </div>
        <div class="info">
            <b>Editing CV:</b><br/><br/>
            <li>Click an element on the CV to edit it's content.</li>
            <li>You can add elements to your experience and education sections by pressing the <i>add</i> button
                to the right of its title. </li>
            <li>For each element you can select duration by start month and year. Note that you can leave the months empty, but not the year.</li>
            <li>You can press <i>sort list</i> after you have added items to sort them chronologically.</li>
            <li>On the right side you have the options to select the font and font size.</li>
            <li>Select profile image by providing a link. If you use a link to your local file system it will only
                work on that computer.
            <li>Choose the size of the profile image by entering a number in the input field, or use the slider.</li>
        </div>
        <div class="info">
            <b>Print or download CV:</b><br/><br/>
            <li>Press <i>Download</i> to open the browsers options for printing or downloading the CV.</li> 
            <li>This might not work in all browsers, <i>Chrome</i> is recommended.</li>
            <li>In Chrome, choose <i>destination</i> in the left menu to select printer, or the option to download as pdf or save to google drive.</li>
            <li>Note that you might want to change the CV's margins before printing or downloading. In chrome you can find the option for this under
            <i>More settings</i> at the bottom of the left menu.</li>
        </div>
    </div>
</template>

<script>

export default {
  name: 'HelpMenu',
  data() { return {
    page: "menu",
  }},
  computed:{},
  methods: {},

}

</script>

<style scoped>

.title{
  margin: 10px auto;
  padding: 10px 80px;
  text-align: center;
  font-size: 36px;
  background-color: var(--main_content-bg-color);
  grid-column: 1 / 4;
}

.info{
  background-color: var(--main_content-bg-color);
  font-size: 20px;
  padding: 20px;
  margin: 10px 20px;
}

.helpPage{
  font-size: 20px;
}

.helpMenu button{
    height: 100%;
    font-size: 20px;
}

.helpMenu{
    width: 100%;
    height: 40px;
}

</style>
