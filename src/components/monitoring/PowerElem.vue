<script lang="ts" setup>
  import { defineProps } from 'vue';

  defineProps(['data']);
</script>

<template>
  <div class="power">
    <div class="power__title">
      <h2>POWER</h2>
    </div>

    <div class="power__content">
      <p>
        currtime = {{ data.currtime }} s
      </p>
      <p>
        uout = {{ data.uout }} mV
      </p>
      <p>
        iout = {{ data.iout }} mA
      </p>
      <p>
        uacc = {{ data.uacc }} mV
      </p>
      <p>
        iacc = {{ data.iacc }} mA
      </p>
      <p>
        uf1 = {{ data.uf1 }} mV
      </p>
      <p>
        if1 = {{ data.if1 }} mA
      </p>
      <p>
        uf2 = {{ data.uf2 }} mV
      </p>
      <p>
        if2 = {{ data.if2 }} mA
      </p>
      <p>
        charge = {{ data.charge }} %
      </p>
      <p>
        accumact = {{ data.accumact }}
      </p>
      <p>
        POSITIONING MODULE = <span v-if="data.positioning_module">YES</span> <span v-if="!data.positioning_module">NO</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .power {
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