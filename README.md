# remote control

This panel fetches the JSX scripts [within this repo](https://github.com/Inventsable/remoteScriptTest) and shows examples of how to evaluate them remotely or save them to the file system and load them to memory using `$.evalFile`, with no need for packages or dependencies (other than native node and my own CEP-Spy):

![](https://thumbs.gfycat.com/FavorableCarefulAttwatersprairiechicken-size_restricted.gif)

Each example is a standalone vue file:

- [Index.vue](./src/pages/Index.vue) (evaluation at runtime)
- [Advanced.vue](./src/pages/Advanced.vue) (save to local file system first, load into memory, then eval)

Made by request of Rob via https://github.com/Inventsable/vue-cli3-CSInterface/issues/1

---

## This panel was made with [bombino](https://github.com/Inventsable/bombino)
