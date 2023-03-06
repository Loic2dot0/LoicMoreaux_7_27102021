<template>
  <div id="app">
    <Header></Header>
      
    <main>
      <router-view></router-view>
    </main>
    
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/TheHeader.vue';
import Footer from './components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
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
    font-family: Helvetica, Arial, sans-serif;
  }

  main{
    width: 100%;
    margin: auto;
    flex: 1;
  }

  a{
    text-decoration: none;
    color: #fff;
  }

  a:hover, a:focus{
    text-decoration: underline;
  }

  button{
    cursor: pointer;
  }

  @media screen and (min-width: 1024px) {
    main{
      width: 80%;
      max-width: 1200px;
    }
  }
</style>