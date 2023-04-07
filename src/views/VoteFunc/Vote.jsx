import React, {useState}  from "react";
import VoteContent from "./VoteContent";
import VoteFooter from "./VoteFooter";
import VoteHeader from "./VoteHeader";

const Vote = function Vote () {
  let [supNum, setSupNum] = useState(10)
  let [oppNum, setOppNum] = useState(3)
  const change = (type)=> {
    if (+type === 1) {
      setSupNum(supNum+1)
      return;
    }
    setOppNum(oppNum+1)
  }
  return <div>
    <VoteHeader voteNum = {supNum+oppNum}/>
    <VoteContent supNum={supNum} oppNum={oppNum}/>
    <VoteFooter change={change} />
  </div>
}

export default Vote