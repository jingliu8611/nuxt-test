<template>
  <section class="container">
    <div class="container__content">
      <h1>Viewing {{sys.contentType.sys.id + ' : ' + sys.id}}</h1>
      <p>This is a website for demo purposes of using Nuxt & Contentful together</p>
      <a href="#" @click="$router.go(-1)">Back</a>
      <br>
      <ul>
        <li v-for="(field, index) in fields" :key="index">
          <div>
            <h2>{{index}} : </h2>
            <div v-if="field.url">
              <img v-bind:src=field.url style="width: 300px">
            </div>
            <div v-else-if="typeof field == 'object' && field.sys && field.sys.type">
              <nuxt-link :to="{ path: '/contents/' + field.sys.id }">{{ field.sys.contentType.sys.id }}</nuxt-link>
            </div>
            <div v-else-if="Array.isArray(field)">
              <ul>
                <li v-for="(f, i) in field" :key="i">
                  <div v-if="typeof f == 'object' && f.sys && f.sys.type">
                    <nuxt-link :to="{ path: '/contents/' + f.sys.id }">{{ f.sys.contentType.sys.id }}</nuxt-link>
                  </div>
                  <div v-else>
                    <span v-html="f"></span>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else>
              <span v-html="field"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import {createClient} from '../../plugins/contentful';
  import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
  const contentfulClient = createClient();
  let md = require('markdown-it')();

  export default {
    asyncData ({params}) {
      return Promise.all([
        contentfulClient.getEntry(params.contentPage)
      ]).then(([data]) => {
        for (let key in data.fields) {
          if (typeof data.fields[key] === 'string') {
            console.log('string: ', data.fields[key]);
            data.fields[key] = md.render(data.fields[key]);
          } else if (typeof data.fields[key] === 'object') {
            console.log('obj: ', data.fields[key]);
            if (data.fields[key].nodeType === 'document') {
              console.log('obj rich: ', data.fields[key]);
              data.fields[key] = documentToHtmlString(data.fields[key]);
            } else if (data.fields[key].fields) {
              if (data.fields[key].fields.file && data.fields[key].fields.file.url) {
                console.log('obj img: ', data.fields[key]);
                data.fields[key].url = data.fields[key].fields.file.url;
              }
            }
          } else {
            console.warn('wrong value');
          }
        }
        return {
          fields: data.fields,
          sys: data.sys
        }
      }).catch(console.error)
    },
    head() {
      return {
        title: 'content type'
      }
    }
  }
</script>
