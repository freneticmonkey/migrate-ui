<template>
  <div>
    <div class="col-sm-3">
      <TableSidebar :table="table"></TableSidebar>
    </div>
    <div class="col-sm-9">
      
    </div>
  </div>
</template>

<script>
  import TableSidebar from './TableSidebar.vue'

  export default {
    props: ['table'],
    components: { 'TableSidebar': TableSidebar }
  }
</script>
