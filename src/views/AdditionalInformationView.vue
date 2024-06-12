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
    .additional {
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

