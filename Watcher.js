function Watcher(vm, exp, cb){
    this.cb = cb
    this.vm = vm
    this.exp = exp;
    this.value = this.get()
    // 因为订阅者添加到Dep是发生在数据的get方法中，因此在订阅者初始化时，我们只需要调用其get方法，就可以将订阅者添加进去
}

Watcher.prototype = {
    update(){
        this.run()
    },
    run(){
        let value = this.vm.data[this.exp];
        let oldValue = this.value;
        if(value !== oldValue){
            this.value = value;
            this.cb.call(this.vm, value, oldValue)
        }
    },
    get(){
        Dep.target = this;
        let value = this.vm.data[this.exp];
        Dep.target = null; // 只需要在Watcher初始化时才需要添加，因此设置全局target属性来存储正在初始化的那个订阅者
        return value;
    }
}

