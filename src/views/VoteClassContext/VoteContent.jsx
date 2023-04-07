/*
 * @Description: 
 * @Version: 3.0
 * @Author: ganyanping
 * @Date: 2023-04-06 10:50:32
 * @LastEditors: ganyanping
 * @LastEditTime: 2023-04-06 10:55:04
 */
import React from "react";
import PropTypes from "prop-types"
import ThemeContext from "../../ThemeContext";
class VoteContent extends React.Component {
  static contextType = ThemeContext
  render () {
    let {supNum, oppNum} = this.context
    let ratio = '--',
        total = supNum + oppNum;
    if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%'
    return <div>
      <div>支持人数：{supNum}</div>
      <div>反对人数：{oppNum}</div>
      <div>支持率： {ratio}</div>
    </div>
  }
}
export default VoteContent