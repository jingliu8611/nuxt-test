<template>
  <section class="container">
    <div class="container__content">
      <h1>Please select a content page you wish to view</h1>
      <p>This is a website for demo purposes of using Nuxt & Contentful together</p>
      <nuxt-link to="/">Back</nuxt-link>
      <br>
      <ul>
        <li v-for="(content, index) in contents" :key="index">
          <nuxt-link :to="{ path: 'contents/' + content.sys.id }">{{ content.fields.title ? content.fields.title : content.sys.id }}</nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import {createClient} from '../plugins/contentful';
  const contentfulClient = createClient();

  export default {
    asyncData ({params}) {
      return Promise.all([
        contentfulClient.getEntries({
          content_type: params.contentType
        })
      ]).then(([data]) => {
        data.items.forEach((item) => {
          if (!item.title) {
            for (let key in item.fields) {
              if (typeof item.fields[key] === 'string') {
                item.fields.title = item.fields[key];
                break;
              }
            }
          }
        });
        return {
          contents: data.items
        }
      }).catch(console.error)
    },
    head() {
      return {
        title: 'Content Type'
      }
    }
  }
</script>
