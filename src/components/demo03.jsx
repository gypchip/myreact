import React from "react";
class Demo extends React.Component {
  render() {
    console.log("react事件机制")
    return <div className="outer"
            onClick={(ev)=> {
              console.log("outer--冒泡-- 合成")
              ev.stopPropagation() // 合成事件中，阻止事件传播：阻止的原生事件传播&阻止合成事件的事件传播
              ev.nativeEvent.stopPropagation() // 只能阻止元素事件的事件传播
              ev.nativeEvent.stopImmediatePropagation() // 原生事件对象阻止事件传播，只不过可以阻止#root上其他绑定的方法执行
              
            }}
            onClickCapture={()=>{
              console.log('outer--捕获--合成')
            }}>
      <div className="inner"
        onClick={()=>{
          console.log("inner--冒泡--合成")
        }}
        onClickCapture={()=>{
          console.log("inner-捕获--合成")
        }}>

      </div>
    </div>
  }
  componentDidMount() {

  }
}
export default Demo

/**
 * React中合成事件处理原理
 * "绝对不是给当前元素基于addEventListener单独的事件绑定，React中的合成事件，都是基于事件委托处理的"
 *  + 在React17及以后版本，都是委托给#root这个容器，捕获和冒泡都做的委托
 *  + 在17版本以前，都是为委托给document容器的，而且只做了冒泡阶段的委托
 *  + 对于没有实现事件传播机制的时间，才是单独的事件绑定
 * 
 * 在组件渲染的时候，如果发现JSX元素，属性中onXXX这样的属性，不会给当前元素直接做事件绑定，只是把绑定的方法赋值给元素的相关属性
 * 
 */