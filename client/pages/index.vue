<template>
  <div>
    <div class="wrapper">
      <h1 style="cursor: pointer;" @click="resetAll">
        Find Your Football Club
      </h1>
      <div class="order-wrapper">
        <a-form-model :layout="form.layout" :model="form">
          <a-form-model-item prop="area" ref="area">
            <span>
              Area
            </span>
            <a-select v-model="form.area"
              placeholder="Select area"
              @change="inputArea"
            >
              <a-select-option v-for="opt in option.listArea" :key="opt.id">
                {{ opt.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>
        <a-form-model :layout="form.layout" :model="form">
          <a-form-model-item prop="competition" ref="competition">
            <span>
              Competition
            </span>
            <a-select v-model="form.competition"
              :placeholder="form.competitionDisable ? 'No Data Available' : 'Select Competition'"
              :disabled="form.competitionDisable"
              @change="inputCompetition"
            >
              <a-select-option v-for="opt in option.listCompetition" :key="opt.id">
                {{ opt.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>

        <div v-if="isTeam">
          <a-row type="flex" justify="space-between" align="middle">
            <a-col v-for="team in listTeam" :key="team.id" :span="6" style="margin-bottom:5em;">
              <a-card hoverable style="width: 300px; padding:1em !important;" @click="detailTeam(team.id)">
                <img
                  slot="cover"
                  alt="example"
                  height="300px"
                  :src="team.crestUrl"
                />
                <a-card-meta :title="team.name">
                  <template slot="description">
                    {{team.venue}}
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </div>
        <div v-if="isSquad">
          <a-row type="flex" justify="space-between">
            <a-col :span="6">
              <img :src="listDetailTeam.crestUrl" alt="">
            </a-col>
            <a-col :span="18">
              <a-row>
                <span style="font-size:3rem">{{ listDetailTeam.name }}</span>
              </a-row>
              <a-row>
                <span style="font-size:2rem">{{ listDetailTeam.venue }}</span>
              </a-row>
              <a-row>
                <span style="font-size:2rem">{{ listDetailTeam.website }}</span>
              </a-row>
              <a-row>
                <span style="font-size:2rem">{{ listDetailTeam.address }}</span>
              </a-row>
            </a-col>
          </a-row>

          <a-row type="flex" style="margin-top:2em;">
            <a-col v-for="squad in listDetailTeam.squad" :key="squad.id" :span="6" style="margin-bottom:3em;">
              <a-card hoverable style="width: 300px">
                <a-row>
                  <a-col :span="20">
                    <span style="display:block">
                      {{ squad.shirtNumber }}
                    </span>
                    <span style="display:block">
                      {{ squad.name }}
                    </span>
                    <span style="display:block">
                      {{ squad.nationality }}
                    </span>
                    <span style="display:block">
                      {{ squad.position }}
                    </span>
                  </a-col>
                  <a-col :span="4">
                    <img
                      width="40px"
                      src="~/assets/images/person_thumbnail.jpeg"
                    />
                  </a-col>
                </a-row>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listTeam: [],
      listDetailTeam: {},
      isSquad: false,
      isTeam:false,
      form : {
        layout: 'vertical',
        area: undefined,
        competition: undefined,
        competitionDisable: true
      },
      option: {
        listArea: [],
        listCompetition: []
      }
    }
  },
  mounted (){
    this.fetchData()
  },
  methods: {
    detailTeam (id){
      this.isTeam = false
      this.isSquad = true
      this.fetchDetailTeam(id)
    },
    inputArea(){
      this.form.competitionDisable = false
      this.isSquad = false
      this.isTeam = false
      this.fetchCompetition()
    },
    inputCompetition(){
      this.isTeam = true
      this.isSquad = false
      this.fetchAllTeam()
    },
    fetchDetailTeam(id){
      const unwatch = this.$store.watch(
          state => state.Football,
          () => {
            const {
              success,
              error,
              message,
              listDetailTeam
            } = this.$store.state.Football

            if (success) {
              unwatch()
              this.listDetailTeam = listDetailTeam
              console.log(this.listDetailTeam)
            }

            if (error) {
              unwatch()
              this.$notification.error({
                message: 'Terjadi Kesalahan',
                description: message
              })
            }
          },
          {
            deep: true
          }
        )
        this.$store.dispatch('Football/fetchTeamById', id)
    },
    fetchAllTeam(){
      const unwatch = this.$store.watch(
          state => state.Football,
          () => {
            const {
              success,
              error,
              message,
              listTeam
            } = this.$store.state.Football

            if (success) {
              unwatch()
              this.listTeam = listTeam
              console.log(this.listTeam)
            }

            if (error) {
              unwatch()
              this.$notification.error({
                message: 'Terjadi Kesalahan',
                description: message
              })
              this.form.competition = undefined
            }
          },
          {
            deep: true
          }
        )
        this.$store.dispatch('Football/fetchAllTeam', this.form.competition)
    },
    fetchCompetition(){
      console.log(this.form.area)
      const unwatch = this.$store.watch(
          state => state.Football,
          () => {
            const {
              success,
              error,
              message,
              listCompetition
            } = this.$store.state.Football

            if (success) {
              unwatch()
              this.option.listCompetition = listCompetition
              console.log(this.option.listCompetition)
            }

            if (error) {
              unwatch()
              this.$notification.error({
                message: 'Terjadi Kesalahan',
                description: message
              })
            }
          },
          {
            deep: true
          }
        )
        this.$store.dispatch('Football/fetchCompetition', this.form.area)
    },
    fetchData(){
      const unwatch = this.$store.watch(
          state => state.Football,
          () => {
            const {
              success,
              error,
              message,
              listArea
            } = this.$store.state.Football

            if (success) {
              unwatch()
              this.option.listArea = listArea
              console.log(this.option.listArea)
            }

            if (error) {
              unwatch()
              this.$notification.error({
                message: 'Terjadi Kesalahan',
                description: message
              })
            }
          },
          {
            deep: true
          }
        )
        this.$store.dispatch('Football/fetchArea')
    },
    resetAll(){
      this.listTeam= []
      this.listDetailTeam= {}
      this.isSquad= false
      this.isTeam=false
      this.form = {
        layout: 'vertical',
        area: undefined,
        competition: undefined,
        competitionDisable: true
      }
      this.option= {
        listArea: [],
        listCompetition: []
      }

      this.fetchData()
    }
  },
}
</script>

<style scoped>
.wrapper {
  padding: 2em 4em;
  background-color: #e5e5e5;
  height: 100vh;
}
.order-wrapper {
  padding: 2em;
  width: 100%;
  overflow: hidden;
  background-color: white;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
