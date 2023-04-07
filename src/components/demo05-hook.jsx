import React, {useState, useEffect, useRef, useMemo, useCallback} from "react";
import { Button } from "antd";

/* 子组件 */
class Child extends React.PureComponent {
  render() {
    console.log('child reander')
    return <div>我是子组件</div>
  }
}
/* 
 *useState: React Hook函数之一，目的是在函数组件中使用状态，并且后期基于状态修改，可以让组件更新
  let xxx = useState(initialValue)
    + 执行useSate，传递initialValue是初始状态值
    + 执行方法，返回结果是一个数值：[状态值，修改状态方法]
        + num变量存储的是：获取的状态值
        + setNum变量存储的是:修改状态的方法
    + 执行setNum(value)
      + 修改状态值为value
      + 通知视图更新
 */
const Demo = function Demo(props) {
  let [num, setNum] = useState(0)
  const handle = ()=>{
    num += 10
    setNum(num)
  }

  // 我们需要把基于属性传递进来的x/y经过其他处理的结果作为初始值
  // 此时我们需要对初始值的操作，进行惰性化处理，只有第一次渲染组件才会处理
  // 以后组件更新这样的逻辑就不要执行了
  let [num1, setNum1] = useState(()=>{
    let {x, y} = props,
    total = x + y;
    return total
  })

  /**
   * useEffect：在函数组件中，使用生命周期函数
   *  useEffect(callback):没设置依赖
   *    + 第一次渲染完毕后，执行callback，等价componentDidMount
   *    + 在组件每次更新完毕后，也会支持callback，等价于componentDidUpdate
   *  useEffect(callback, [])：设置无依赖
   *    + 只有第一次渲染完毕后，才会执行callback，更次视图更新完毕后，callback不再执行
   *    + 类型componentDidMount
   *  useEffect(callback, [依赖的状态（可以是多个状态）])
   *    + 第一次渲染完毕会执行callback
   *    + 当依赖的状态值（多个中其中一个）发生改变，也会触发callback执行
   *  useEffect(()=>{
   *    return ()=> {
   *      // 返回的小函数，会在组件释放的时候执行
   *      // 如果组件更新，会把上一次返回的小函数执行
   *    }
   *  })
   * 
   * 第一次渲染完成之后，从服务器获取异步数据
   * useEffect如果设置返回值，则返回值必须是一个函数，下面案例中callback经过async的修饰，返回是一个promise实例，不符合要求
   * useEffect(async ()=> {
   *    let data = await queryData()
   * }, [])
   * 
   * 可以通过promise.then和定一个小函数，用async修饰，执行改函数
   * useEffect(()=>{
   *    queryData().then()
   *    const next = async ()=> {
   *      let data = await queryData()
   *    }
   * },[])
   * 
   * 
   * useLayoutEffect会阻止浏览器渲染真实DOM，优先执行effect链表中的callback
   *  + useLayoutEffect设置callback要优先与useEeffect去执行
   *  + 在两者设置callback中，依然可以获取DOM元素，区别只是浏览器是否渲染
   *  + 如果在callback函数中修改状态值视图更新
   *    + useEffect浏览器肯定是把第一次的真实已经绘制了，再去渲染第二次真实DOM
   *    + useLayoutEffect：浏览器是把两次真实DOM渲染，合并在一次渲染
   *  
   * 视图更新步骤：
   * 第一步：基于babel-preset-react-app把JSX编译为createElement格式
   * 第二步：把createElement执行，创建出virtualDOM
   * 第三步：基于root.render方法把virtualDOM变为真的DOM对象【DOM-DIFF】
   *        useLayoutEffect阻止第四步操作，先执行Effect链表中的方法（同步操作）
   *        useEffect第四步操作和Effect链表中的方法执行，是同时进行的（异步操作）
   * 第四步：浏览器渲染和绘制
   * 
   */
    useEffect(()=>{
      // 可以获取最新的一个状态值
      console.log('@1', num)
    })

    useEffect(()=>{
      // 可以获取最新的一个状态值
      console.log('@2', num)
    }, [])
    useEffect(()=>{
      // 可以获取最新的一个状态值
      console.log('@3', num)
    }, [num])

    
  /** 
   * useRef,函数组件中可以基于useRef方法创建一个ref对象
   * 函数组件中，创建ref对象
   *  + React.createRef()
   *  + useRef 只能在函数组件中使用
   * 使用useRef的好处：
   *  useRef在每次组件更新（函数重新执行），再执行useRef方法的时候，不会创建新的REF对象，获取的还是第一次创建的那个REF对象
   *  createRef都会创建新的对象，比较浪费性能。
   * 
   * 基于forwardRef实现ref转发，目的：获取子组件内部的某个元素
   * 
   * 函数组件内部：可以有自己的状态和方法，如何事件forwardRef实现ref转发的同时，获取函数子组件nebula的状态或者方法=> useImperativeHandle
   * const Child = React.forwardRef(function Child(props, ref) {
   *    let [text, setText] = useState('hello');
   *    const submit = ()=> {}
   *    useImperativeHandle(ref, ()=> {
   *      return {
   *        text,
   *        submit
   *      }
   *    })
   * })
   */
  // let box = React.createRef();  
  let box = useRef(null)
  useEffect(()=>{
    console.log(box.current)
  },[])

  /**
   * let xxx = useMemo(callback, [dependencies])
   * + 第一次渲染组件的时候，callback会执行
   * + 后期只有依赖的状态值发生改变，callback才会再执行
   * + 每次会把callback执行的返回结果赋值给xxx
   * + useMemo具备缓存的效果，在依赖的状态值没有发生改变，callback没有触发执行的时候，xxx获取的是上一次计算出来的结果
   */

  let ratio = useMemo(()=>{
    console.log('ok')
    let total = num1 + num
    return total
  }, [num, num1])

  /**
   * const xxx = useCallback(callback, [dependencies]);
   * + 组件第一次渲染，useCallback执行，创建一个函数callback，赋值给xxx
   * + 组件后续每次更新，判断依赖的状态值是否改变，如果改变则重新创建新的函数，赋值给xxx，但是如果，依赖状态没有更新，或者没有设置依赖[],则xxx获取的一直是第一次创建的函数堆，不会创建新的函数出来
   * + 或者说，基于useCallback，可以始终获取第一次创建的函数的堆内存地址
   * + usecallback，可以保证函数组件的每次更新，不再把里面的小函数重新创建，用的都是第一次创建的。
   * + 啥时候用：
   *    + 父组件嵌套子组件，父组件要把一个内部函数，基于属性传递给子组件，此时传递的这个方法，我们基于useCallback处理一下会更好
   *    + 在子组件内部也要做处理，验证父组件传递的属性是否发生改变，如果没变化，则让子组件不能更新，有变化才需要更新，react.p
   */

  const updateNum = useCallback(() => {}, [])
  return <div className="demo">
    <span ref = {box}>{num}</span>
    <Child handle={updateNum} />
    <Button type="primary" size="small" onClick={handle}>新增</Button>
    <div>{ratio}</div>
  </div>
}
/**
 * 
 * useState(()=>{
 * })
 * 
 * 
 */

export default Demo