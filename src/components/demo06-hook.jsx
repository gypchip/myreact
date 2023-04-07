/*
 * @Description: 自定义HOOK
 * @Version: 3.0
 * @Author: ganyanping
 * @Date: 2023-04-06 11:26:47
 * @LastEditors: ganyanping
 * @LastEditTime: 2023-04-06 13:47:28
 */
import React, {useState} from "react";
import { Button } from "antd";
const usePartialState = function usePartialState(initValue) {
  let [state, setState] = useState(initValue)
  const setPartial = function setPartial(partialState){
    setState({
      ...state,
      ...partialState
    })
  }
  return [state, setPartial]
}

export default function Demo() {
  let [state, setState] = usePartialState({
    supNum,
    oppNum
  })
  const handle = ()=> {
    let {supNum} = state
    setState({supNum: supNum+1})
  }
  return <div>
    {supNum}--{oppNum}
    <Button type="primary" onClick={handle}>支持</Button>
  </div>
}