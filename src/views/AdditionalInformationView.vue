<script lang="ts" setup>
  import AccessPoint from '@/components/additional/AccessPoint.vue';
  import AdHoc from '@/components/additional/AdHoc.vue';
  import DHCPElem from '@/components/additional/DHCPElem.vue';
  import axios from 'axios';
  import {ref} from 'vue';

  const access_data = ref('');
  const adhoc_data = ref('');
  const dhcp_data = ref('');

  axios.get('http://localhost:3000/additional/access')
    .then(function (response: any) {
      access_data.value = response.data;
    })
    .catch( function (error) {
      console.log(error);
    })

    axios.get('http://localhost:3000/additional/adhoc')
    .then(function (response: any) {
      adhoc_data.value = response.data;
    })
    .catch( function (error) {
      console.log(error);
    })
    axios.get('http://localhost:3000/additional/dhcp')
    .then(function (response: any) {
      dhcp_data.value = response.data;
    })
    .catch( function (error) {
      console.log(error);
    })
</script>

<template>
  <div class="additional">
    <AccessPoint :data="access_data" />
    <AdHoc :data="adhoc_data" />
    <DHCPElem :data="dhcp_data" />
  </div>
</template>

<style lang="scss" scoped>
  
</style>

