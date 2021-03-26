import React,{useState, useEffect} from 'react'
import styles from "./inventoryList.module.scss"
import {Table} from 'antd'
import ListAction from './ListAction'
import axios from "axios";
import moment from 'moment'

const column = [
  {
    title: '日期',
    dataIndex: 'updateDate',
    key: 'updateDate',
    align: 'center',
  },
  {
    title: '異動方式',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
  },
  {
    title: '庫存倉庫',
    dataIndex: 'productDepot',
    key: 'productDepot',
    align: 'center',
  },
  {
    title: '商品名稱',
    dataIndex: 'productName',
    key: 'productName',
    align: 'center',
  },
  {
    title: '數量',
    dataIndex: 'amount',
    key: 'amount',
    align: 'center',
  },
]


const InventoryList = () =>{
  let differentDate = [
    moment()
      .date(1)
      .startOf('day'),
    moment().endOf('month')
  ]
  //
  // const [searchKey, setSearchKey] = useState('')
  // const [action, setAction] = useState('')
  // const [startDate, setStartDate] = useState(differentDate[0].format('YYYY-MM-DD'))
  // const [endDate, setEndDate] = useState(differentDate[1].format('YYYY-MM-DD'))
  // const [pageNumber, setPageNumber] = useState(1)
  // const [pageSize, setPageSize] = useState(10)
  const [TableData, setTable] = useState([])
  const startDate = differentDate[0].format('YYYY-MM-DD')
  const endDate = differentDate[1].format('YYYY-MM-DD')
  const [data, setData] = useState({searchKey:"",action:'',startDate:startDate +' 00:00:00',endDate: endDate + ' 23:59:59',pageNumber:1,pageSize:10})


  useEffect(()=>{
    axios.post('erp/inventoryLog/list',data)
      .then(res=>{
        setTable(res.data.content)
      })
  },[setTable])




  return(
    <div>
      <ListAction data={data} setData={setData} setTable={setTable} />
      <Table columns={column} dataSource={TableData} />
    </div>
  )
}

export default InventoryList
