<script lang="ts" setup>
  import router from '@/router';
  import { onMounted, ref,computed } from 'vue';

  let ping = ref('');
  let cookieStatus = ref(document.cookie);


  function WebSocketPing() {
      const link = new WebSocket('ws://localhost:3000/echo');

      link.onopen = (event) => {  
        console.log("link opened");
        link.send("Hello Server");
      };
      link.onmessage = (event) => { 
        console.log("Server response:", event.data);
        ping.value = JSON.parse(event.data);
      };
      link.onerror = () => {
        ping.value = '';
      }
      link.onclose = (event) => {
        ping.value = '';
        WebSocketPing();
      }
    }

    function LogOut() {
      document.cookie = 'user=admin;max-age=-1;';
      router.push('/auth');
    }

  onMounted(() => {
    WebSocketPing();
  })
</script>

<template>
  <div class="ping">
    <div class="ping__status">
      <h3>Связь с WRP: </h3>
      <div class="ping__status__item item-1" :class="{
        green: ping, red: !ping,
      }"></div>
      <div class="ping__status__item item-2" :class="{
        green: ping,
      }"></div>
      <div class="ping__status__item item-3" :class="{
        green: ping,
      }"></div>
    </div>
    <button v-if="cookieStatus == 'user=guest' || !cookieStatus" @click="$router.push('/auth')">Войти</button>
    <button v-if="cookieStatus == 'user=admin'" @click="LogOut()">Выйти</button>
  </div>
</template>

<style lang="scss" scoped>
  .ping {
    width: 100%;
    max-width: 19.2rem;
    @include flex(column);
    @include flex-utils(flex-start, center);
    gap: 1rem;

    &__status {
      @include flex();
      @include flex-utils(flex-start, center);
      gap: 0.8rem;

      &__item {
        width: 2rem;
        height: 2rem;
        background: $off-gray;
      }
    }
  }

  .green {
    background: $green;
  }
  .red {
    background: $red;
  }
</style>
