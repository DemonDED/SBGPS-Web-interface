<script lang="ts" setup>
  import {defineProps} from 'vue';

  defineProps(['data']);
</script>

<template>
  <div class="dhcp">
    <div class="dhcp__title">
      <h2>DHCP</h2>
    </div>
    <table>
      <thead>
        <th>MAC addr</th>
        <th>Host Name</th>
        <th>IP-addr</th>
        <th>Link</th>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.mac_addr }}</td>
          <td>{{ item.host_name }}</td>
          <td>{{ item.ip_addr }}</td>
          <td><span v-if="item.link">YES</span> <span v-if="!item.link">expired</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  
</style>
