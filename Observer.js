// 通过这样，我们就能够感知数据变动
function defineReactive(data, key, val){
    observe(val);
    var dep = new Dep();
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
            console.log('数据变化了，新值为：',newVal)
        }
    })
}

function observe(data){
    if(!data || typeof data !== 'object'){
        return
    }
    Object.keys(data).forEach(key=>{
        defineReactive(data, key, data[key]);
    })
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

var books = {
    book1: {
        name: ''
    },
    book2: ''
}

observe(books);
books.book1.name = 'javascript';
books.book2 = 'html'