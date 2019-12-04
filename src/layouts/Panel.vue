<template>
  <q-layout view="hHh lpR fFf">
    <toolbar />
    <q-footer>
      <q-bar>
        <q-space />
        <q-btn dense flat @click="openGitHubLink" :icon="`mdi-github-circle`">
          <span class="q-ml-sm q-pr-sm" style="font-size: 12px;"
            >See the github repo this is fetching from</span
          >
        </q-btn>
        <q-space />
      </q-bar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import getExtVersion from "src/utils/main/getExtVersion";
import spy from "cep-spy";

export default {
  name: "MyLayout",
  components: {
    toolbar: require("components/panel/Toolbar.vue").default,
    tooltipper: require("components/panel/tooltipper.vue").default
  },
  data: () => ({}),
  mounted() {
    console.log("Panel");
  },
  computed: {
    ...mapGetters("settings", ["settings"]),
    app() {
      return this.$root.$children[0];
    },
    extVersion() {
      return getExtVersion();
    },
    size: {
      get() {
        return this.settings.size;
      },
      set(value) {
        this.setSize(value);
      }
    }
  },
  methods: {
    ...mapActions("settings", ["setSize"]),

    isActiveStyle(state) {
      return `
        color: var(--color-${state ? "selection" : "default"});
      `;
    },
    openGitHubLink() {
      spy.launchInNewTab(`https://github.com/Inventsable/remoteScriptTest`);
    }
  }
};
</script>

<style>
.q-layout__section--marginal {
  user-select: none;
  cursor: default;
  background-color: var(--color-header-border);
}

@media screen and (max-width: 260px) {
  .toolbar-title {
    display: none;
  }
}
</style>
