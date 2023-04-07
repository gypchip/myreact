import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types"

const VoteFooter = function VoteFooter(props) {
  let { change } = props
  return <div>
      <Button type="primary" onClick={change.bind(null,1)}>支持</Button>
      <Button onClick={change.bind(null,0)}>反对</Button>
  </div>
}
VoteFooter.defaultProps = {};
VoteFooter.propTypes  = {
  change: PropTypes.func.isRequired
}
export default VoteFooter