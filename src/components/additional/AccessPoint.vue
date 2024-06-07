<script lang="ts" setup>
  import {defineProps} from 'vue';

  defineProps(['data']);
</script>

<template>
  <div class="access-point">
    <div class="access-point__title">
      <h2>Access Point</h2>
    </div>
    <table>
      <thead>
        <th>MAC addr</th>
        <th>PowerLevel, dBm</th>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.mac_addr }}</td>
          <td>{{ item.power_level }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  
</style>
