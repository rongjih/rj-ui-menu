new Vue({
  el: '#demo',
  components: { "rj-ui-menu": RJUIMenu },
  data: {
    // navSource: [1, 2, 3]
    // navSource: Promise.resolve([1, 2, 3, 4])
    navSource: 'menu.json'
  }
});