<template>
  <div>
    profile
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'Nuxt.js'
      }
    },
    head: {
		  title: '프로필페이지'
	},
  middleware: 'authenticated',
  }
</script>

<style scoped>

</style>