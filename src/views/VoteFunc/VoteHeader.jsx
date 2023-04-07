
import PropTypes from "prop-types";
import React from "react";

const VoteHeader = function VoteHeader(props) {
  let {voteNum} = props
  return <div>
    Vue是一个很不错的框架！ {voteNum}
  </div>
}
VoteHeader.defaultProps = {
  voteNum: 0
}

VoteHeader.protoTypes = {
  voteNum: PropTypes.number.isRequired
}

export default VoteHeader