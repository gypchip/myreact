import { 
  observable, 
  autorun, 
  observe, 
  computed, 
  reaction, 
  action,
  configure,
  runInAction
} from 'mobx'
// mobox的全局配置
configure ({
  enforceActions: 'observed'
})

class Store {
  // observable：把状态变为可监测的，只有这还有，以后基于autorun/@abserver等检测机制才会生效
  @observable x = 10
  @observable count = 3;
  @observable price = 120;

  // computed：装饰器，创建一个具备计算缓存的计算属性
  @computed get total() {
    return this.count * this.price
  }
  // 让函数的中的状态更改，变为异步批处理
  // bound 保证函数this都是Store实例
  @action.bound change() {
    this.x = 10
    this.count = 20
  }
}

let store = new Store;

// 第一次会执行
autorun(()=>{
  console.log('autorun', store.x)
  console.log(store.total)
})
store.x = 1000

// 都是监听器，默认不会执行，监听的值改变才会执行
reaction(()=>[store.x, store.total], ()=>{
  console.log('autorun', store.x)
  console.log(store.total)
})
// 经过observable处理后的数据，是基于ES6 proxy做过数据劫持的
// 后期修改状态值，可以在set函数中做特殊处理，把依赖其值的监听器触发
// 
let obj = observable({
  x: 10,
  y: 20
})

// 创建监听器，对象成员改变，会触发change回调函数，前天对象是基于observable创建的
observe(obj, change=>{
  console.log(change)
})

obj.x = 1000

// observable不能直接监听原始值，可以使用box处理
let x = observable.box(10)
console.log(x)

// 可以实现和@action一模一样的效果
runInAction(()=>{
  store.x = 100
  store.price = 200
},1000)

