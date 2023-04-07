import React from "react";
const Child2 = React.forwardRef(function Child2(props, ref) {
  return (
    <div>
      子组件2
      <button ref={ref}>按钮</button>
    </div>
  )
})
class Demo extends React.Component {
  box3 = React.createRef(); // this.box3 = xxx
  render () {
    return <div>
      {/* <h2 className="title" ref="titleBox">温馨提示</h2> */}
      <h2 className="title" ref={x=> this.box2 = x}>友情提示</h2>
      <h2 className="title" ref={this.box3}>郑重提示</h2>
      <Child2 ref={x=>this.child2 = x} />
    </div>
  }
  componentDidMount() {
    // console.log(this.refs.titleBox)
    console.log(this.box2)
    console.log(this.box3.current)
    console.log(this.child2)
    // console.log(11)
  }
}

export default Demo

/*
PureComponent和Component的区别
  PureComponent会给类组件默认加一个shouldComponentUpdate周期函数
  + 在此周期函数中，它对新老的属性/状态会做一个浅比较
  + 如果经过浅比较，发现属性和状态并没有改变，则返回false，也就是不继续更新组件
    如果有变化，才会更新
*/

/*
受控组件：基于修改数据/状态，让视图更新，达到需要的效果
非受控组件: 基于ref获取DOM元素，我们操作DOM元素
基于ref获取DOM元素的语法
1.给需要获取元素设置ref="xxx"，后期基于this.refs.xxx获取相应的dom元素（不推荐使用）
2.给ref属性设置为一个函数
ref={x=>this.xxx=x}
  + x是函数的形参，存储的就是当前DOM元素
  + 然后我们获取DOM元素"x"直接挂在到实例的某个属性是上（例如：box2）
3. 基于React.createRef()方法创建一个REF对象-> {current:null}
this.xxx = React.createRef(); => this.xxx = {current:null}
ref = {REF对象（this.xxx）}
获取this.xxx.current

*/

/**
 * 给元素标签设置ref，目的：获取对应DOM元素
 * 给类组件设置ref，目的：获取当前调用组件创建的实例
 * 给函数组件设置ref，直接报错
 *    + 但是我们让其配合React.forwardRef实现ref转发
 *    + 目的： 获取函数组件内部的某个元素
 */