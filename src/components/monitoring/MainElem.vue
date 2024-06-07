<script lang="ts" setup>
  import { defineProps } from 'vue';

  defineProps(['data']);
</script>

<template>
  <div class="main">
    <div class="main__title">
      <h2>Main</h2>
    </div>

    <div class="main__content">
      <p>
        Serialnum = {{ data.serialnum }}
      </p>
      <p>
        Fwversion router = {{ data.fwversion_router }}
      </p>
      <p>
        Load average = {{ data.load_average }}
      </p>
      <p>
        IP = {{ data.ip }}
      </p>
      <p>
        AP clients registered and linking = {{ data.ap_linking }}
      </p>
      <p>
        AdHoc BS in range = {{ data.adhoc_linking }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .main {
    width: 100%;
    max-width: 72.8rem;
    @include flex(column);
    @include flex-utils();
    gap: 2rem;
    background: $gray;
    border-radius: 1.6rem;
    box-shadow: 0 5px 10px 0 rgba($color: #000000, $alpha: 0.3);
    min-height: 32rem;

    &__title {
      padding: 0 1.6rem;
      @include flex();
      @include flex-utils(flex-start, center);
      background: $dark-gray;
      border-radius: 1.6rem 1.6rem 0 0;
      min-height: 3rem;
      box-sizing: border-box;
    }
    &__content {
      padding: 0 1.6rem;
      @include flex(column);
      gap: 1rem;
      text-align: left;
      box-sizing: border-box;
    }
  }
</style>
