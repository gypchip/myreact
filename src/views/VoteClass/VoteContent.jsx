import React from "react";
import PropTypes from "prop-types"

class VoteContent extends React.Component {
  static defaultProps = {
    supNum: 10,
    oppNum: 5
  }
  static porpsType = {
    supNum: PropTypes.number.isRequired,
    oppNum: PropTypes.number.isRequired
  }
  render () {
    let { supNum, oppNum } = this.props
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