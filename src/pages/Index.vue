<template>
  <q-page>
    <div class="absolute-center" style="display: flex; flex-direction: column">
      <div class="q-pa-md">Remotely eval'ing files directly:</div>
      <q-btn flat outline color="primary" @click="runRemoteScript('test1')"
        >Test1</q-btn
      >
      <q-btn
        flat
        outline
        class="q-my-lg"
        color="primary"
        @click="runRemoteScript('test2')"
        >Test2</q-btn
      >
      <q-btn flat outline color="primary" @click="runRemoteScript('test3')"
        >Test3</q-btn
      >
    </div>
  </q-page>
</template>

<script>
const fs = require("fs");

export default {
  data: () => ({}),
  computed: {
    app() {
      return this.$root.$children[0];
    }
  },
  methods: {
    //
    // First we need to fetch the text from the raw GitHub link
    async grabRepoRaw(repo, file) {
      let data = await fetch(
        `https://raw.githubusercontent.com/${repo}/master/${file}.jsx`
      ).catch(err => {
        console.err(err);
      });
      return data.text();
    },
    //
    // If we want to run the script remotely without saving to the filesystem:
    async runRemoteScript(file) {
      // We directly evaluate
      return await this.evalScript(
        // the text fetched from the github repo
        await this.grabRepoRaw("Inventsable/remoteScriptTest", file)
      );
    },
    // This is just a fancy wrapper for evalScript, which will return a Promise
    // and parses any JSON / value returned from the JSX file/function
    evalScript(text) {
      return new Promise((resolve, reject) => {
        window.__adobe_cep__.evalScript(`${text}`, res => {
          if (res) resolve(this.isJson(res) ? JSON.parse(res) : res);
          else reject({ error: res });
        });
      });
    },
    isJson(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style></style>
