import React from 'react'
import { connect } from 'react-redux'
import Absence from 'absence'
import { push } from 'connected-react-router'
import { Button, Table } from 'antd'
import actionFactory from 'actions/action-factory'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park'
  }
]

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name
  })
}

class Page extends React.Component {
  static defaultProps = {}

  onClick = () => {
    const { setStore } = this.props
    // this.props.history.goBack()
    setStore({ visible: true })
  }

  onPopupCancel = () => {
    const { setStore, dispatch } = this.props
    // dispatch(push('/'))
    setStore({ visible: false }, 'cancel')
  }

  render() {
    const { visible } = this.props
    return (
      <div>
        <Button onClick={this.onClick}>show</Button>
        {/* <Absence visible={visible} onCancel={this.onPopupCancel} /> */}
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { absence } = state
  return absence
}
function mapDispatchToProps(dispatch) {
  return {
    setStore: actionFactory('ABSENCE', dispatch)
    // dispatch (action) {
    //   dispatch(action)
    // }
  }
}

const PageVisible = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
export default PageVisible
