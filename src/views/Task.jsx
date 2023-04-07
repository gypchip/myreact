import React from "react";
import './Task.less'
import {  Input, Button, Tag, Table, Popconfirm, Modal, Form, DatePicker, message } from "antd";
// 补零
const zero = function (text) {
  text = String(text)
  return text.length <2 ? '0'+text : text
}
// 对日期处理方法
const formatTime = function (time) {
  let arr = time.match(/\d+/g),
  [,month, day, hours='00', minutes="00"] = arr;
  return `${zero(month)}-${zero(day)} ${zero(hours)}:${zero(minutes)}`
}

const confirm = (e)=>{

}
class Task extends React.Component {
  
    /*定义表格列的数据 */
    tableHeader = [
      {
        title: '编号',
        dataIndex: 'id',
        width: '8%'
      },
      {
        title: '任务描述',
        dataIndex: 'task',
        ellipsis:true,
        width: '50%'
      },
      {
        title: '状态',
        dataIndex: 'state',
        render: (text, record) => {
          return Number(text) === 1 ? '未完成' : '已完成'
        }
      },
      {
        title: '完成时间',
        dataIndex: 'time',
        render: (_, record) => {
          let { state, time, complete } = record;
          if (Number(state) === 2) {
            time = complete
          }
          return formatTime(time)
        }
      },
      {
        title: '操作',
        render: (_, record)=>{
          let {state}  = record;
          return <>
            <Popconfirm title="你确定要删除吗？" onConfirm={confirm}>
                <Button type="link">删除</Button>
            </Popconfirm>
            {+state === 2 ? 
              <Popconfirm title="你确定要完成此任务吗？" onConfirm={confirm}>
                <Button type="link" >完成</Button>
              </Popconfirm> : null}
          </>
        }
      },
    ];
    formIns = null;
    // 初始组件状态
    state = {
      tableData: [
        {
          id: 1,
          task: '今天天气不错，今夜月光明媚',
          state: 1,
          time: '2023-1-23 18:00:00',
          complete: '2023-2-1 19:00:00'
        },
        {
          id: 2,
          task: '可见或发开发会看见',
          state: 2,
          time: '2023-1-23 18:00:00',
          complete: '2023-1-23 18:23:00',
        }
      ],
      tableLoading: false,
      modeVisible: false,
      confirmLoading: false,
      ruleForm: {
        task: '',
        time: ''
      }
    }
    // 关闭对话框，清楚表单里面的内容
    closeModal = ()=>{
      this.setState({
        modeVisible: false,
        confirmLoading: false
      })
      this.formIns.resetFields()
    }
    // 新增任务
    submit =async ()=> {
      // console.log(this.formIns)
      try {
        await this.formIns.validateFields()
        message.success('标签校验通过')
        let data = this.formIns.getFieldsValue()
        let { tableData } = this.state
        tableData.push({
          id: tableData.length+1,
          task: data.task,
          time: data.time.format('YYYY-MM-DD HH:mm:ss'),
          state: 1
        })
        // console.log(tableData)
        this.setState({
          tableData: [...tableData],
          modeVisible:false
        })
        this.formIns.resetFields()
        console.log(this.state.tableData)
      } catch (error) {
        
      }

    }
    render() {
      console.log('视图渲染')
      let { tableData, tableLoading, modeVisible, confirmLoading } = this.state
      return <div className="task-box">
          {/* 头部 */}
          <div className="header">
            <h2 className="title">TASK OA 任务管理系统</h2>
            <Button type="primary" onClick={()=> {
              this.setState({modeVisible: true})
            }}>新增任务</Button>
          </div>
          {/* 标签 */}
          <div className="tag-box">
            <Tag color="#1677ff">全部</Tag>
            <Tag>已完成</Tag>
            <Tag>未完成</Tag>
          </div>
          {/* 表格 */}
          <Table dataSource={tableData} columns={this.tableHeader} loading={tableLoading} pagination={false} rowKey="id"/>
          {/* 对话框&表单 */}
          <Modal title="新增任务窗口" open={modeVisible} confirmLoading={confirmLoading}
          keyboard={false} maskClosable={false} okText="确认提交" onCancel={this.closeModal} onOk={this.submit}>
            <Form ref={x=> this.formIns = x} initialValues={{ task: '',time: ''}} layout="vertical">
              <Form.Item label="任务描述" name="task" validateTrigger="onBlur" 
                rules={[
                  {required: true, message: "任务描述必填"},
                  {min: 6, message: '输入内容6位及以上'}
                ]}>
                <Input.TextArea rows={4}></Input.TextArea>
              </Form.Item>
              <Form.Item label="完成时间" name="time" 
                rules={[
                  {required: true, message: "完成时间必填"},
                ]}>
                <DatePicker showTime />
              </Form.Item>
            </Form>
          </Modal>
      </div>
    }
}

export default Task;