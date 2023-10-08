<script setup>
</script>

<template>
  <nav>
    <ul>
      <li id="#logo">Logo</li>
      
      <li>
        <RouterLink to="/gado">Gados</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  nav {
    width: 100%;
    height: 100vh;
  }

  nav ul li {
    line-height: 40px;
    cursor: pointer;

    padding-left: 10px;
  }

  nav ul li:hover {
    background: gray;
  }

</style>