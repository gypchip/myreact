/*
 * @Description: 
 * @Version: 3.0
 * @Author: ganyanping
 * @Date: 2023-04-06 10:50:32
 * @LastEditors: ganyanping
 * @LastEditTime: 2023-04-06 10:53:11
 */
/**
 * react祖先组件通信方式，context方式传值
 */

import React from "react";

import VoteHeader from "./VoteHeader";
import VoteContent from "./VoteContent";
import VoteFooter from "./VoteFooter";
import ThemeContext from "../../ThemeContext";

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

      return <ThemeContext.Provider>
          <div>
            <VoteHeader voteNum={supNum + oppNum}/>
            <VoteContent/>
            <VoteFooter change={this.change}/>
          </div>
      </ThemeContext.Provider>
    }
}

export default Vote