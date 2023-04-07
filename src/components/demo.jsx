import React from "react";
import PropTypes from "prop-types"


class Demo extends React.Component {
  /**
   * 第一步：初始化属性 && 规则校验
   * 先校验规则，在处理属性的其他操作
   */

  // 设置默认值
  static defaultProps = {
    num: 0
  }
  // 设置规则校验
  static propTypes = {
    title: PropTypes.string.isRequired,
    num: PropTypes.number
  }
  
  // 不写constructor，默认执行
  // constructor(props) {
  //   super(props)
  // }


  /**
   * 第二步:初始化状态
   * 状态： 后期修改状态，可以触发视图更新
   * 需要收到初始化，如果我们没哟去做相关的处理，则默认往实例上挂载state，初始化值null
   * 想让视图更新，我们得基于React.Component.propotype提供的方法操作
   * @1 this.setSate({
   *  supNum: supNum + 1
   * })
   * @2 this.forceUpdate()强制视图更新
   */
  state = {
    supNum: 10,
    oppNum: 5
  }

  /**第三步：
   * 触发componentWillMount周期函数（钩子函数）
   * 钩子函数：在程序运行到某个阶段，我们可以基于提供一个处理函数，让开发者在这个阶段做一些自定义的事情
   * 在组件第一次渲染之前，执行
   * + 此周期函数，目前是不安全的，虽然可以用，所以不建议使用
   *    + 控制台会抛出黄色警告
   * + 如果开启React.StricMode,则我们使用UNSAFE_componentWillMoun，控制台会抛出红色警告
   *    + React.StricMode React严格模式，他会去检查react的不规范写法，或者不建议使用的
   * 
   * 
   */
  // componentDidMount() {

  // }
  // 不抛出黄色警告
  UNSAFE_componentWillMount() {

  }
  /**
   * 
   *render函数在渲染的时候，如果type是：
      + 字符串：创建一个标签
      + 普通函数：把函数执行，并且把props传递给函数
      + 构造函数： 把构造函数基于new执行，也就是创建类的一个实例，也会把解析出来的props传递过去
        + 每调用一次类组件都会创建一个单独的实例
        + 把在类组件编写的render函数执行，把返回的jsx（virtualDOM）当做组件视图进行渲染
        例如：
        new Demo({title: 'khhjgjh'})
   */

  /**
   * 
   * 第四步，render函数渲染
   */
 
  render() {
    let { title } = this.props
    return (
      <div className="vote-box">
        <div className="header">
          <h2 className="title">{title}</h2>
        </div>
        <div className="main">
          <div>支持人数{supNum}</div>
          <div>反对人数{oppNum}</div>
        </div>
        <div>
          <button onClick={()=>{}}>支持</button>
          <button onClick={()=>{}}>返回</button>
        </div>
      </div>
    )
  }

   /**
   * 
   * 第五步: componentDidMount,第一次渲染完毕
   *  + 页面中已经有创建的真实DOM，所以我们可以获取真实DOM
   */
   componentDidMount() {

   }
   /**
    * 
    * 组件更新逻辑
    * 第一种，组件内部状态更改，触发更新
    * 1.触发shouldComponentUpdate周期函数，是否允许更新
    * 2.触发componentWillUpdate周期函数，更新之前
    *   + 此周期函数不安全
    *   + 在这个阶段，状态还没有被修改
    * 3.修改状态值
    *   + this.state.xxx改为最新值
    * 4. 触发reader函数，组件更新
    *   + 按最新状态和属性，把返回的JS编译为virtualDOM
    *   + 和第一次渲染出来的virtualDOM进行DOM-DIFF对比
    *   + 把差异的部分进行渲染，渲染为真的的DOM
    * 5.触发componentDidUpdate组件更新完毕
    * 
    * 特殊说明：如果基于this.forceUpdate()强制更新视图，会跳过shouldComponentUpdate周期函数的校验，直接从WillUpdate开始进行更新
    * 第二种： 父组件更新，触发子组件更新
    * 1.触发componentWillReceiveProps
    * 2.shouldComponentUpdate
    * ....以下和第一种逻辑一下
    * .
    * .
    * 
    * 父子组件嵌套，深度优先原则
    * 父willMount->父render->子willMount->子render->子DidMount->父DidMount
    * 
    */
   
   shouldComponentUpdate(nextProps, nextState) {
    // nextState存储修改后的状态
    console.log(this.state, nextState)
    // 此周期函数返回boll
    //  返回true，允许更新，会继续执行下一个操作
    //  返回false， 不允许更新，接下来啥都不处理
    return true
   }
  //  此周期函数不安全，不建议使用
   componentWillUpdate(nextProps, nextState) {
    console.log(this.state, nextState)
   }
  //  组件更新完毕
  componentDidUpdate() {

  }

  /**
   * 组件卸载逻辑
   * 触发componentWillUnmount,组件销毁之前
   */
  componentWillUnmount(){

  }
}  

/*
  函数组件是静态组件
    + 组件第一次渲染完毕后，无法基于内部的某些操作，让组件更新，但是如果调用它的父组件更新了，那么相关子组件一定会更新，可能传递最新的属性值进来
    + 函数组件具备：属性... 
    + 优势： 比类组件处理机制简单，这样导致函数组件渲染速度快
  类组件是动态组件
    + 组件，在第一次渲染后，除了父组件更新可以触发更新，我们可以通过setState和forceUpdate的方式实现自更新
    + 类组件具备：属性、状态、周期函数，ref...
    + 优势：功能强大
  ===> hook具备函数组件和类组件的各自优势，在函数组件基础上，基于hooks函数，让函数组件也可以拥有状态，自更新
  
*/