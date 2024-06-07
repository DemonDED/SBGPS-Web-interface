<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';

const settings_lan = ref();
const settings_wlan = ref();

axios.get('http://localhost:3000/monitoring/lan')
    .then(function (response) {
      console.log(response.data);
      settings_lan.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    })

    axios.get('http://localhost:3000/monitoring/wlan')
    .then(function (response) {
      console.log(response.data);
      settings_wlan.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    })


    function SetSettings() {
      const portNameIp = document.getElementsByClassName('port-ip');
      const ipValue = document.getElementsByClassName('ip-addr');
      const portNameIp_wlan = document.getElementsByClassName('port-ip-wlan');
      const ipValue_wlan = document.getElementsByClassName('ip-addr-wlan');
      const regExp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

      let n = 0;
      let portNames = [];
      let network = [];
      let portNames_wlan = [];
      let network_wlan = [];
      for (let item of portNameIp) {
        portNames.push( item.textContent );
      }
      for ( let item of ipValue ) {
        if (!regExp.test(item.value)) {
          alert('Данные введены некорректно, введите данные корректно и попробуйте еще раз!');
          return 0;
        }
        network.push( `{"name":"${portNames[n]}","ip_addr":"${item.value}"}` );
        n++;
      }
      n = 0;
      for (let item of portNameIp_wlan) {
        portNames_wlan.push( item.textContent );
      }
      for ( let item of ipValue_wlan ) {
        if (!regExp.test(item.value)) {
          alert('Данные введены некорректно, введите данные корректно и попробуйте еще раз!');
          return 0;
        }
        network_wlan.push( `{"name":"${portNames_wlan[n]}","ip_addr":"${item.value}"}` );
        n++;
      }
      console.log(network);
      let network_data = [];
      network_data.push(network);
      network_data.push(network_wlan);
      console.log(network_data);



      axios({
        method: 'post',
        url: 'http://localhost:3000/settings',
        data: {
          data: network_data,
        },
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
      .then(function (response, request)  {
        if (response.data) {
          alert('Настройки успешно изменены!');
        } else {
          alert('Данные введены некорректно, введите данные корректно и попробуйте еще раз!')
        }
      })
      .catch(function (error)  {
        console.log(error);
      })
    }
</script>

<template>
  <h1>Settings</h1>

  <div class="settings">
    <div class="settings__lan">
      <div class="settings__lan__item" v-for="item in settings_lan" :key="item.id">
        <label class="port-ip" :for="item.id">{{ item.name_port }}</label>
        <input class="ip-addr" type="text" :id="item.id" v-model="item.ip_addr">
      </div>
    </div>

    <div class="settings_wlan">
      <div class="settings__wlan__item" v-for="item in settings_wlan" :key="item.id">
        <label class="port-ip-wlan" :for="item.id">{{ item.name_port }}</label>
        <input class="ip-addr-wlan" type="text" :id="item.id" v-model="item.ip_addr">
      </div>
    </div>

    <button @click="SetSettings()">Применить настройки</button>
  </div>
</template>

<style lang="scss" scoped>
  
</style>
