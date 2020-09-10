export default function(hooks) {
  hooks.beforeEach(function() {
    this.store = this.owner.lookup('service:store');
    this.push = function(model, payload) {
      return this.store.push(this.store.normalize(model, payload));
    };
  });
}
