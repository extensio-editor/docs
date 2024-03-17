<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
    rel="stylesheet"
  />
  <div id="wrapper">
    <div id="menuBar" class="flex items-center text-lg select-none">
      <img
        alt="Extensio logo"
        src="@/assets/logo.png"
        class="w-20 h-auto pointer-events-none"
      />
      <nav class="space-x-5">
        <router-link
          to="/"
          class="ease-linear duration-75 hover:text-xl hover:underline"
          >Home</router-link
        >
        <router-link
          to="/search"
          class="ease-linear duration-75 hover:text-xl hover:underline"
          >Search</router-link
        >
      </nav>
    </div>
    <hr />
    <br />
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #302f3d;
  color: #c1c0c9;
  padding: 15px;
}
</style>
