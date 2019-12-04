<template>
  <q-header>
    <q-toolbar>
      <q-space />
      <span class="bigCase">./SRC/PAGES/</span>
      <q-tabs v-model="activeTab" shrink stretch>
        <q-route-tab
          v-for="(tab, i) in tabs"
          :key="i"
          :label="tab.label"
          :to="tab.route"
        />
      </q-tabs>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  data: () => ({
    activeTab: "tab1",
    tabs: [
      {
        label: "Index.vue",
        route: "/"
      },
      {
        label: "Advanced.vue",
        route: "/Advanced"
      }
    ]
  })
};
</script>

<style>
.bigCase {
  font-size: 14px;
  line-height: 1.715em;
  font-weight: 500;
  letter-spacing: 0.2ch;
  margin-right: 10px;
  color: var(--color-btn-border);
}

/* .q-toolbar,
.q-tab {
  min-height: 32px;
  max-height: 32px;
} */
</style>
