<script lang="ts" setup>
  import PingConnection from './PingConnection.vue';
</script>

<template>
  <header class="header">
    <nav class="header__content">
      <h1>MASTER-08</h1>
      <div class="header__content__navigation">
        <div class="header__content__navigation__burger">
          <div class="line line-1"></div>
          <div class="line line-2"></div>
          <div class="line line-3"></div>
        </div>

        <div class="header__content__navigation__list">
          <RouterLink to="/">
            Мониторинг
          </RouterLink>
          <RouterLink to="/additional-information">
            Дополнительная информация
          </RouterLink>
          <RouterLink to="/settings">
            Настройки
          </RouterLink>
        </div>
      </div>
      <div class="header__content__link-status-block">
        <PingConnection />
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    padding: 4rem 1.6rem;
    width: 100%;
    color: $orange;
    background: $gray;
    box-shadow: 0 0.5rem 5rem 0.1rem rgba($color: #000000, $alpha: 0.5);
    box-sizing: border-box;
    z-index: 20;
    line-height: 0;
    &__content {
      padding: 0;
      @include flex();
      @include flex-utils(space-between, center);

      &__link-status-block {
        display: none;
        @include tablet() {
          display: flex;
        }
      }
    }
  }
</style>
