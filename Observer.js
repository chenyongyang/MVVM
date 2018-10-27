// 通过这样，我们就能够感知数据变动
function Observer(data){
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk(data){
        let self = this;
        Object.keys(data).forEach(key => {
            self.defineReactive(data, key, data[key]);
        });
    },
    defineReactive(data, key, val){
        let dep = new Dep();
        let childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function(){
                if(Dep.target){ // 只有Watcher初始化阶段才需要添加
                    dep.addSub(Dep.target)
                }
                return val;
            },
            set: function(newVal){
                if(val === newVal){
                    return;
                }
                val = newVal;
                dep.notify();
            }
        });
    }
};

function observe(value, vm){
    if(!value || typeof value !== 'object'){
        return;
    }
    return new Observer(value);
   
}

function Dep(){
    this.subs = [];
}
Dep.prototype.addSub = function(sub){
    this.subs.push(sub)
}
Dep.prototype.notify = function(){
    this.subs.forEach(sub => sub.update())
}

Dep.target = null;