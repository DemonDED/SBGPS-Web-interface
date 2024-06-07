<script lang="ts" setup>
  import {defineProps} from 'vue';

  defineProps(['data']);
</script>

<template>
  <div class="adhoc">
    <div class="adhoc__title">
      <h2>AdHoc</h2>
    </div>
    <table>
      <thead>
        <th>MAC addr</th>
        <th>HostNumberByte</th>
        <th>PowerLevel, dBm</th>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.mac_addr }}</td>
          <td>{{ item.host_number_byte }}</td>
          <td>{{ item.power_level }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  
</style>
