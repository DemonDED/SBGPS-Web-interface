<script lang="ts" setup>
  import router from '@/router';
import axios from 'axios';
  import {ref} from 'vue';

  let tokenAuth = ref('');
  let userName = ref('');
  let password = ref('');
  console.log(document.cookie);

  function Authorization() {

    console.log(userName.value);

    axios({
      method: 'post',
      url: 'http://localhost:3000/auth',
      data: {
        user_name: userName.value,
        password: password.value,
      },
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
    .then(function (response: any) {
      tokenAuth.value = response.data;

      if (response.data) {
        document.cookie = `user=${document.cookie};max-age=0;`;
        document.cookie = response.data;
        router.push('/');
      } else {
        alert('Проверьте логин или пароль');
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  function GuestSession() {
    document.cookie = `${document.cookie};max-age=0`;
    document.cookie = 'user=guest';
    router.push('/');
  }
</script>

<template>
  <div class="modal-back">
    <div class="modal">
      <h1>Авторизация</h1>
      <div class="modal__form">
        <div class="modal__form__inputs">
          <div class="modal__form__inputs__item">
            <label for="username">Username: </label>
            <input type="text" id="username" v-model="userName">
          </div>
          <div>
            <label for="password">Password: </label>
            <input type="text" id="password" v-model="password">
          </div>
        </div>
        <button @click="Authorization()">Войти</button>
        <br>
        <br>
        <button @click="GuestSession()">Войти как гость</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .modal-back {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 30;
    background: $dark-gray;
  }
  .modal {
    padding: 3rem;
    width: 100%;
    height: auto;
    max-width: 40rem;
    border-radius: 1.6rem;
    background: $gray;
    color: $orange;
  }
</style>
