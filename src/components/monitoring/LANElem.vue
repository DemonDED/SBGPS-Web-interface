<script lang="ts" setup>
  import { defineProps } from 'vue';

  defineProps(['data']);
</script>

<template>
  <div class="lan-elem">
    <div class="lan-elem__title">
      <h2>LAN</h2>
    </div>
    <table>
      <thead>
        <tr>
          <th>Название порта</th>
          <th>MAC-адрес</th>
          <th>IP адрес</th>
          <th>Tx</th>
          <th>Rx</th>
          <th>Связь</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.name_port }}</td>
          <td>{{ item.mac_addr }}</td>
          <td>{{ item.ip_addr }}</td>
          <td>{{ item.tx }}</td>
          <td>{{ item.rx }}</td>
          <td>
            <div class="green" v-if="item.link"></div>
            <div class="red" v-if="!item.link"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  .lan-elem {
    width: 100%;
    max-width: 72.8rem;
    @include flex(column);
    @include flex-utils();
    gap: 2rem;
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

  .green {
    background: $green;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .red {
    background: $red;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
</style>
