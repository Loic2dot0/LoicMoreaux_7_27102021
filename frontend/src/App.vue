<template>
  <div id="app">
    <header-main></header-main>
    <footer-main></footer-main>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

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
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  body *{
    box-sizing: border-box;
  }

  a{
    text-decoration: none;
    color: #fff;
  }

  a:hover{
    text-decoration: underline;
  }
</style>
