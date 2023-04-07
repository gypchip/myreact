import React from "react";
import PropTypes from "prop-types"
const VoteContent = function VoteContent(props) {
  let { supNum, oppNum } = props
  let ratio = '--',
      total = supNum + oppNum;
  if (total > 0) {ratio = (supNum / total *100).toFixed(2) + '%'} 
  return <div>
      <div>支持人数：{supNum}</div>
      <div>反对人数: {oppNum}</div>
      <div>支持率：{ratio}</div>
   </div>
}
VoteContent.defaultProps = {
  supNum: 0,
  oppNum: 0
}
VoteContent.propsTypes = {
  supNum: PropTypes.number.isRequired,
  oppNum: PropTypes.number.isRequired
}
export default VoteContent