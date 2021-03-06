module.exports = {
  name: 'threetransfer',
  components: {
  },
  props: [],
  data () {
    return {
    weeks:[],
    drawer: null,
    items: [],
    dataPerWeek: [],
    user: "",
    selected:"this",
    dialog: false,
    VPN: 0,
    Manual: 0,
    Local: 0,
    week: 0,
    expanded: [],
    currentyear: 0,
    singleExpand: false,
    show: false,
    headers: [
      {
        text: 'User',
        align: 'left',
        sortable: false,
        value: 'user',
      },
      { text: 'Hours worked this week', value: 'time' },
     
    ],
    
   time_entries: []
  }
  },
  computed: {
    ...window.vuex.mapGetters([
      'uploadMessages',
      'uploadMessage',
      'uploading'
    ]),
    showUploadButton () {
      if (this.file === '' || this.uploadMessage.code === 'UPLOADING'){
        return false
      }
      return true
    }
  },
  mounted () {
    axios.get(`http://${window.location.hostname}:${window.location.port}/time_entries`)
    .then(response => {this.items = response.data; 
    })

    

    console.log("router",)
switch(this.$route.query.view){
  case 'all':
    console.log(`http://${window.location.hostname}:${window.location.port}/time_entries_week`)
      axios.get(`http://${window.location.hostname}:${window.location.port}/time_entries`)
      .then(response => {this.time_entries = response.data; 
      })
      break;
  case 'week':
    console.log(`http://${window.location.hostname}:${window.location.port}/time_entries_week`)
      axios.get(`http://${window.location.hostname}:${window.location.port}/time_entries_week`)
      .then(response => {this.time_entries = response.data; 
      })
      break;
  case 'week_project_user':
    console.log(`http://${window.location.hostname}:${window.location.port}/time_entries_week`)
      user=this.$route.query.user
      axios.get(`http://${window.location.hostname}:${window.location.port}/time_entries_week_user_project/${user}`)
      .then(response => {this.time_entries = response.data; 
      })
      break;
  case 'week_user':
    console.log(`http://${window.location.hostname}:${window.location.port}/time_entries_week`)
          user=this.$route.query.user
          axios.get(`http://${window.location.hostname}:${window.location.port}/time_entries_week_user/${user}`)
          .then(response => {this.time_entries = response.data; 
          })
          break;
}

  },
  methods: {
    setSelected(year) {
      this.currentyear = year;
      axios.get(`http://${window.location.hostname}:${window.location.port}/getWeeks/${year}`)
    .then(response => {this.weeks = response.data; 
      console.log(this.weeks)
    })
    },
    handleClick(value){
      this.week = value.week
      this.dialog = true;
    },
    getUserData(user){
      axios.get(`http://${window.location.hostname}:${window.location.port}/time_entries_week_user/${user}`)
          .then(response => {this.time_entries = response.data; 
          })
    },
    goToPersonal(){
      this.$router.push(`personal`)
    },
    goToDash(){
      this.$router.push(`dashboard`)
    },
    clicked(value){
      year = this.currentyear
      console.log(year)
      axios.get(`http://${window.location.hostname}:${window.location.port}/getDataWeek/${value}/${year}`)
          .then(response => {
            this.dataPerWeek = response.data; 
            console.log(this.show)
          })
    },
    fullscreen(){
      var elem = document.getElementById('jipla');

        if(elem.requestFullscreen){
            elem.requestFullscreen();
        }
        else if(elem.mozRequestFullScreen){
            elem.mozRequestFullScreen();
        }
        else if(elem.webkitRequestFullscreen){
            elem.webkitRequestFullscreen();
        }
        else if(elem.msRequestFullscreen){
            elem.msRequestFullscreen();
        }
    }
    // ...window.vuex.mapActions([

    // ]),
  
    
  }
}
