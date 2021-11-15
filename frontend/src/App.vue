<template>
  <div id="app">
    <header-main></header-main>
    
    <main>
      <router-view></router-view>
    </main>
    
    <footer-main></footer-main>
  </div>
</template>

<script>
import Header from './components/layouts/Header.vue';
import Footer from './components/layouts/Footer.vue';

export default {
  name: 'App',
  components: {
    'header-main': Header,
    'footer-main': Footer
  }
}
</script>

<style>
  html{
    font-size: 100%;
  }

  body{
    background-color: #000;
    margin: 0;
    color: #fff;
  }

  body *{
    box-sizing: border-box;
  }

  #app{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  main{
    width: 80%;
    max-width: 1200px;
    margin: auto;
    flex: 1;
}

  a{
    text-decoration: none;
    color: #fff;
  }

  a:hover{
    text-decoration: underline;
  }
</style>
