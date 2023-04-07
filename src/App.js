import React from 'react';
import './App.css';
import Task from './views/Task';
import Demo from './components/demo05-hook'
import Vote from './views/VoteClass/Vote';
import VoteFunc from './views/VoteFunc/Vote';

/* 使用ANTD组件库 */
// ant组件，自带按需导入

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'

function App() {
  // console.log(React.createElement('div',null,React.createElement('div',{className: 'app'},111)))
  return (
    <div className="App">
      <ConfigProvider locale={zhCN}>
        <Task />
        
        {/* <Demo /> */}
        <Vote/>

        <VoteFunc/>
      </ConfigProvider>
    </div>
  );
  
}

export default App;
