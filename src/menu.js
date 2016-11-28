import tpl from './menu.html';
import styl from './menu.styl';

export default {
  name: 'rj-ui-menu',
  version: '0.1.0',
  template: tpl,
  props: {
    source: { type: [String, Array, Promise] }
  },
  data: function() {
    return { items: [] }
  },
  created: function() {
    if (this.source instanceof Array) this.items = this.source
    else if (this.source instanceof Promise) this.source.then((items) => this.items = items)
    else if (typeof this.source == 'string') fetch(this.source).then(res => res.json()).then((items) => this.items = items)
  }
}