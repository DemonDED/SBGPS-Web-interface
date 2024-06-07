<script setup lang="ts">
  /* eslint @typescript-eslint/no-var-requires: "off" */
  import MainElem from '@/components/monitoring/MainElem.vue';
  import LANElem from '@/components/monitoring/LANElem.vue';
  import WLANElem from '@/components/monitoring/WLANElem.vue';
  import PowerElem from '@/components/monitoring/PowerElem.vue';
  import {onMounted, ref} from 'vue';

  let monitoring_basic = ref('');
  let monitoring_lan = ref('');
  let monitoring_wlan = ref('');
  let monitoring_power = ref('');
  let websocket_data = ref('');

  const axios = require('axios');
  axios.get('http://localhost:3000/monitoring/basic')
    .then(function (response: any) {
      console.log(response.data);
      monitoring_basic.value = response.data;
    })
    .catch(function (error:any) {
      console.log(error);
    })

    axios.get('http://localhost:3000/monitoring/power')
    .then(function (response: any) {
      console.log(response.data);
      monitoring_power.value = response.data;
    })
    .catch(function (error:any) {
      console.log(error);
    })

    axios.get('http://localhost:3000/monitoring/wlan')
    .then(function (response: any) {
      console.log(response.data);
      monitoring_wlan.value = response.data;
    })
    .catch(function (error:any) {
      console.log(error);
    })

    function WebSocketLan() {
      const connectionWlan = new WebSocket('ws://localhost:3000/lan');

      connectionWlan.onopen = (event) => {  
        console.log("Connection opened");
        connectionWlan.send("Hello Server");
      };
      connectionWlan.onmessage = (event) => { 
        console.log("Server response:", event.data);
        monitoring_lan.value = JSON.parse(event.data);
      };
      connectionWlan.onclose = (event) => {
        WebSocketWlan();
      }
    }
    function WebSocketWlan() {
      const connection = new WebSocket('ws://localhost:3000/wlan');

      connection.onopen = (event) => {  
        console.log("Connection opened");
        connection.send("Hello Server");
      };
      connection.onmessage = (event) => { 
        console.log("Server response:", event.data);
        monitoring_wlan.value = JSON.parse(event.data);
      };
      connection.onclose = (event) => {
        WebSocketLan();
      }
    }


  onMounted(() => {
    WebSocketLan();
    WebSocketWlan();
  })
</script>

<template>
  <div class="home">
    <MainElem :data="monitoring_basic" />
    <LANElem :data="monitoring_lan" />
    <WLANElem :data="monitoring_wlan" />
    <PowerElem :data="monitoring_power" />
  </div>
</template>

<style lang="scss" scoped>
  .home {
    padding: 2rem 1.6rem;
    color: $orange;
    @include flex(column);
    @include flex-utils(flex-start, center);
    gap: 3.5rem;
    flex: 1 0 auto;
    background: $gray;
    box-sizing: border-box;

    &__main {
      padding: 0 1.6rem;
      width: 100%;
      max-width: 72.8rem;
      @include flex(column);
      text-align: left;
      box-shadow: 0 1rem 0 0 $dark-gray;
      border-radius: 1.6rem;

      &__title {
        background: $dark-gray;
        border-radius: 1.6rem 1.6rem 0 0;
      }
    }
  }
</style>
