import Vue from "vue";
import { LocalStorage } from "quasar";

const state = {
  settings: {
    size: 20,
    sizeLock: false
  }
};

const mutations = {
  setSize(state, value) {
    state.settings.size = value;
  },
  setSizeLock(state, value) {
    state.settings.sizeLock = value;
  },
  setSettings(state, value) {
    Object.assign(state.settings, value);
  }
};

const actions = {
  setSize({ commit, dispatch }, value) {
    commit("setSize", value);
    dispatch("saveSettings");
  },
  setSizeLock({ commit, dispatch }, value) {
    commit("setSizeLock", value);
    dispatch("saveSettings");
  },
  getSettings({ commit }) {
    let settings = LocalStorage.getItem("settings");
    if (settings) commit("setSettings", settings);
  },
  saveSettings({ state }) {
    LocalStorage.set("settings", state.settings);
  }
};

const getters = {
  settings: state => {
    return state.settings;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
