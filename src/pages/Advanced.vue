<template>
  <q-page>
    <div class="absolute-center">
      <div v-if="!downloaded" style="display: flex; flex-direction: column;">
        <div class="q-pa-md">Fetch test4.jsx and test5.jsx</div>
        <q-btn flat outline color="primary" @click="downloadAll"
          >Download files</q-btn
        >
      </div>
      <div
        v-else
        style="display: flex; flex-direction: column; align-items: center;"
      >
        <div class="q-pa-md">Now using their functions:</div>
        <q-btn flat outline color="primary" @click="evalScript('doSomething()')"
          >Simple alert</q-btn
        >
        <q-btn flat outline class="q-my-lg" color="primary" @click="logAppName"
          >Log Appname to Console</q-btn
        >
        <q-btn
          flat
          outline
          color="primary"
          @click="evalScript('showSomething()')"
          >Show Build</q-btn
        >
      </div>
    </div>
  </q-page>
</template>

<script>
const fs = require("fs");

// Dynamic identification object that reports all panel and host information:
// https://github.com/Inventsable/CEP-Spy
import spy from "cep-spy";

export default {
  data: () => ({
    downloaded: false,
    scripts: ["test4", "test5"]
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    }
  },
  methods: {
    async downloadAll() {
      for (let name of this.scripts) {
        // Grab raw text for each target script name
        let file = await this.grabRepoRaw("Inventsable/remoteScriptTest", name);
        let filePath = `${spy.path.root}/scripts/${name}.jsx`;
        // Create the directory if it doesn't already exist
        if (!fs.existsSync(`${spy.path.root}/scripts`))
          fs.mkdirSync(`${spy.path.root}/scripts`);

        // Write the file contents locally to this panel at `./scripts/[name].jsx`
        fs.writeFileSync(filePath, file);

        // Finally use $.evalFile to load script and all functions into memory:
        this.evalScript(`$.evalFile('${spy.path.root}/scripts/${name}.jsx')`);
        console.log(`${name} was written to ${filePath}`);
      }
      this.downloaded = true;
      // Now that all the scripts are loaded into memory,
      // we can directly call their functions with simple evalScript calls in above buttons.

      // This may not actually be needed, but is a good fallback to guarantee script contents are in app memory.
    },
    //
    // Fetch the text from the raw GitHub link
    async grabRepoRaw(repo, file) {
      let data = await fetch(
        `https://raw.githubusercontent.com/${repo}/master/${file}.jsx`
      ).catch(err => {
        console.err(err);
      });
      return data.text();
    },
    async logAppName() {
      console.log(await this.evalScript("getAppName()"));
    },
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
