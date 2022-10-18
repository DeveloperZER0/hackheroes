<script>
export default {
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.9.2/dist/leaflet.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        },
      ],
    }
  },
}
</script>

<template>
  <div class="overflow-x-hidden">
    <canvas id="bg" class="fixed top-0 left-0 -z-10"></canvas>
    <ClientOnly>
      <NuxtPage />
    </ClientOnly>
  </div>
</template>
<style>
body {
  margin: 0;
}
</style>
