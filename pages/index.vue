<template>
  <section class="container">
    <div class="container__content">
      <h1>Please select a content type you wish to view</h1>
      <p>This is a website for demo purposes of using Nuxt & Contentful together</p>
      <br>
      <ul>
        <li v-for="(type, index) in types" :key="index">
          <nuxt-link :to="type.sys.id">{{ type.name }}</nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import {createClient} from '../plugins/contentful';

  const contentfulClient = createClient();

  export default {
    asyncData ({}) {
      return Promise.all([
        contentfulClient.getContentTypes()
      ]).then(([data]) => {
        return {
          types: data.items
        }
      }).catch(console.error)
    },
    head: {
      title: 'Nuxt Demo',
    }
  }
</script>
<style lang="scss">
  .container {
    color: grey;
  }
</style>
