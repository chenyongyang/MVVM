/**
 * Compile的主要作用是：
 * 1、解析模板指令，替换模板数据，初始化视图；
 * 2、
 */
// 要取到所有的DOM节点，然后对其提取指令，频繁访问DOM不可取，故将其存储在DOM片段中
function Compile(el, vm){
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init(){
        if(this.el){
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        }else{
            console.log('请提供一个根节点')
        }
    },
    
    nodeToFragment(el) {
        let fragment = document.createDocumentFragment();
        let child = el.firstChild;
        while (child) {
            fragment.appendChild(child);
            // 将根节点的子节点挨个添加到DOM片段上
            child = el.firstChild;
        }
        return fragment;
    },

    compileElement(el) {
        let childNodes = el.childNodes;
        let self = this;
        [].slice.call(childNodes).forEach(node => {
            let reg = /\{\{(.*)\}\}/;
            let text = node.textContent;
            if (self.isTextNode(node) && reg.test(text)) {
                self.compileText(node, reg.exec(text)[1]);
            }
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        })
    },

    compileText(node, exp) {
        let self = this;
        let initText = this.vm[exp];
        this.updateText(node, initText);
        new Watcher(this.vm, exp, value => {
            self.updateText(node, value);
        })
    },

    updateText(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    isTextNode(node) {
        return node.nodeType == 3;
    }
}




