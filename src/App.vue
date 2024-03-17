<template>
  <!-- Start Single Page Apps for GitHub Pages -->
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    // This script checks to see if a redirect is present in the query string,
    // converts it back into the correct url and adds it to the
    // browser's history using window.history.replaceState(...),
    // which won't cause the browser to attempt to load the new url.
    // When the single page app is loaded further down in this file,
    // the correct url will be waiting in the browser's history for
    // the single page app to route accordingly.
    (function (l) {
      if (l.search[1] === "/") {
        var decoded = l.search
          .slice(1)
          .split("&")
          .map(function (s) {
            return s.replace(/~and~/g, "&");
          })
          .join("?");
        window.history.replaceState(
          null,
          null,
          l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    })(window.location);
  </script>
  <!-- End Single Page Apps for GitHub Pages -->
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
