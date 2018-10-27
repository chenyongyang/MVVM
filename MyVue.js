function MyVue(data, el, exp){
    let self = this;
    this.data = data;

    Object.keys(data).forEach(key => {
        self.proxyKey(key)
    })

    observe(data);
    el.innerHTML = this.data[exp]; // 初始化模板数据
    new Watcher(this, exp, value => {
        el.innerHTML = value
    });
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