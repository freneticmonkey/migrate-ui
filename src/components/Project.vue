// src/components/Project.vue

<template>
  <div>
    <div class="col-sm-3">
      <ProjectSidebar :config="projectConfig"></ProjectSidebar>
    </div>
    <div class="col-sm-9">
      <div>
        <div class="form-horizontal">
          <div class="form-group">
            <div class="col-sm-1"></div>
            <div class="col-sm-10 input-group">
              <input
                class="form-control"
                :value="tableFilter"
                @input="inputFilter"
                placeholder="Filter"/>
                <span class="glyphicon glyphicon-search form-control-feedback" aria-hidden="true"></span>
            </div>
          </div>
          <div class="col-sm-1"></div>
          <div class="col-sm-10 input-group">
            <button
             class="col-sm-10 btn btn-block btn-primary"
             v-if="tableFilter.length > 0 && !filterMatch"
             @click="create()">
             Create
            </button>
          </div>
          <hr>
          <div class="alert alert-info" v-if="tableFilter.length > 0 && !filteredTables.length"><strong>No matching tables. Do you want to create it?</strong></div>
          <div class="alert alert-warning" v-if="!tables.length"><strong>No tables yet</strong></div>
        </div>
        <div class="tables">
          <div class="list-group">

            <a class="list-group-item" v-for="table in filteredTables">
              <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-4">
                  {{ table.Name }}
                </div>
                <div class="col-sm-4">
                  <button :value="table" class="btn btn-primary" @click="editTable">Edit</button>
                  <button class="btn btn-danger">Delete</button>
                </div>
                <div class="col-sm-2"></div>

              </div>
            </a>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .avatar {
    height: 75px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    margin: -10px 0;
  }
  .time-block {
    padding: 10px;
  }
  .comment-section {
    padding: 20px;
  }
</style>

<script>
  const _ = require('lodash')
  import ProjectSidebar from './ProjectSidebar.vue'

  export default {
    data () {
      return {
        filteredTables: [],
        tables: [],
        projectConfig: {},
        tableFilter: '',
        filterMatch: false
      }
    },
    created: function () {
      this.fetchTables()
    },
    components: { 'ProjectSidebar': ProjectSidebar },
    methods: {
      fetchTables () {
        var apiURL = 'http://localhost:8081'
        var xhr = new XMLHttpRequest()
        var self = this
        xhr.open('GET', apiURL + '/api/table/list/')
        xhr.onload = function () {
          var response = JSON.parse(xhr.responseText)
          self.tables = response.result.tables
          self.applyFilter()
        }
        xhr.send()
      },
      inputFilter: _.debounce(function (e) {
        this.tableFilter = e.target.value
        this.applyFilter()
      }, 300),
      applyFilter: function () {
        this.filteredTables = []
        this.filterMatch = false

        if (this.tableFilter.length > 0) {
          let tb = this.tableFilter
          this.filteredTables = this.tables.filter(function (table) {
            return table.Name.includes(tb)
          })
        } else {
          this.filteredTables = this.tables
        }
        //   for (let table of this.tables) {
        //     if (table.Name.includes(this.tableFilter)) {
        //       this.filteredTables.push(table)
        //     }
        //     if (table.Name === this.tableFilter) {
        //       this.filterMatch = true
        //     }
        //   }
        // } else {
        //   this.filteredTables = this.tables
        // }
      },
      editTable: function (e) {
        let table = e.target.value
        debugger
        // let id = e.target.id
        // console.log(id)
        // this.activeTable = tableName
        // for (let table of this.tables) {
        //   if (table.Name === tableName) {
        //     this.$activeTable = table
        //     break
        //   }
        // }
        if (table != null) {
          this.$router.push({path: '/table', params: {'table': table}})
        }
      }
    },
    events: {
    }
  }
</script>
