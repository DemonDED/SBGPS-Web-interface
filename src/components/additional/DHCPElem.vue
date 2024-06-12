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
  .dhcp{
    width: 100%;
    max-width: 72.8rem;
    @include flex(column);
    @include flex-utils();
    gap: 2rem;
    color: $orange;
    background: $gray;
    border-radius: 1.6rem;
    box-shadow: 0 5px 10px 0 rgba($color: #000000, $alpha: 0.3);

    &__title {
      padding: 0 1.6rem;
      @include flex();
      @include flex-utils(flex-start, center);
      background: $dark-gray;
      border-radius: 1.6rem 1.6rem 0 0;
      min-height: 3rem;
      box-sizing: border-box;
    }

    table {
      padding: 0 1.6rem;
      box-sizing: border-box;
      tbody {
        td {
          padding: 2rem;
        }
      }
    }
  }
</style>
