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
  
  <div class="settings">
    <h1>Settings</h1>
    <div class="settings__lan">
      <div class="settings__lan__item" v-for="item in settings_lan" :key="item.id">
        <label class="port-ip" :for="item.id">{{ item.name_port }}</label>
        <input class="ip-addr" type="text" :id="item.id" v-model="item.ip_addr">
      </div>
    </div>

    <div class="settings__wlan">
      <div class="settings__wlan__item" v-for="item in settings_wlan" :key="item.id">
        <label class="port-ip-wlan" :for="item.id">{{ item.name_port }}</label>
        <input class="ip-addr-wlan" type="text" :id="item.id" v-model="item.ip_addr">
      </div>
    </div>

    <button @click="SetSettings()">Применить настройки</button>
  </div>
</template>

<style lang="scss" scoped>
    .settings {
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

    &__lan, &__wlan {
      @include flex(column);
      @include flex-utils(flex-start, center);
      gap: 2rem;

      &__item {
        @include flex();
        @include flex-utils(flex-start, center);
        gap: 1rem;

        input {
          background-color: $off-gray;
          border: 1px solid #676767;
          border-radius: 1.6rem;
          padding: 1rem;
          color: $orange;
        }
      }
    }

  }

  button {
    cursor: pointer;
    padding: 1.6rem 2rem;
    text-decoration: none;
    color: $orange;
    background-color: $off-gray;
    border-radius: 1.6rem;
    box-sizing: border-box;
    width: 100%;
    max-width: 23rem;
    border: none;
  }
</style>
