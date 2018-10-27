function MyVue(data, el, exp){
    this.data = data;
    observe(data);
    el.innerHTML = this.data[exp];
    new Watcher(this, exp, value => el.innerHTML = value);
    return this;
}