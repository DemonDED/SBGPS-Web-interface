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
    .adhoc{
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
