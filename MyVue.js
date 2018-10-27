function MyVue(options){
    let self = this;
    this.vm = this;
    this.data = options.data;

    Object.keys(this.data).forEach(key => {
        self.proxyKey(key)
    })

    observe(this.data);
    // el.innerHTML = this.data[exp]; // 初始化模板数据
    // new Watcher(this, exp, value => {
    //     el.innerHTML = value
    // });
    new Compile(options.el, this.vm);
    return this;
}

MyVue.prototype = {
    proxyKey(key){
        let self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function proxyGetter() {
                return self.data[key];
            },
            set: function(newVal) {
                self.data[key] = newVal;
            }
        })
    }
}