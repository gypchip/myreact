import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types"

class VoteFooter extends React.Component {
  static propTypes = {
    change: PropTypes.func.isRequired
  }
  render () {
    let {change} = this.props
    return <div>
     
      <Button type="primary" onClick={change.bind(null, 1)}>支持</Button>
      <Button onClick={change.bind(null, 0)}>反对</Button>
    </div>
  }
}

export default VoteFooter
