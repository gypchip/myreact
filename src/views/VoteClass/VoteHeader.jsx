/*
 * @Description: 
 * @Version: 3.0
 * @Author: ganyanping
 * @Date: 2023-04-06 09:04:18
 * @LastEditors: ganyanping
 * @LastEditTime: 2023-04-06 09:25:30
 */
import React from "react";
import PropType from 'prop-types'

class VoteHeader extends React.Component {
  static defaultProps = {
    voteNum: 0
  }
  static propsType = {
    voteNum: PropType.number.isRequired
  }
  render() {
    const {voteNum} = this.props
    return <div>
        React框架很好用！ {voteNum}
    </div>
  }
}

export default VoteHeader