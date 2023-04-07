/**
 * react父子组件传值class方式
 */

import React from "react";

import VoteHeader from "./VoteHeader";
import VoteContent from "./VoteContent";
import VoteFooter from "./VoteFooter";

class Vote extends React.Component {
    state = {
      supNum: 10,
      oppNum: 4
    }
    change = (type) => {
      let { supNum, oppNum}  = this.state
      if (+type === 1) {
        this.setState({supNum: supNum+1})
        return
      }
      this.setState({oppNum: oppNum + 1})
    }
    render () {
      let { supNum, oppNum}  = this.state

      return <div>
        <VoteHeader voteNum={supNum + oppNum}/>
        <VoteContent supNum={supNum} oppNum={oppNum}/>
        <VoteFooter change={this.change}/>
      </div>
    }
}

export default Vote