import React,{useEffect,useState} from 'react'
import {Input,Button, Modal} from "antd/es";
import { Table,Select } from 'antd';
import styles from './inventoryLog.module.scss'
import axios from "axios";


const Action=(props)=>{
  console.log(props.setTableList)

  const { Option } = Select;
  return(
    <div className={styles.actionWrapper}>
      <div className={styles.btn}>
        <Button>重新整理</Button>
        <Button>重新入庫</Button>
      </div>
      <div className={styles.searchWrapper}>
        <div style={{padding:5}}><span>倉庫別</span></div>
        <div className={styles.selection}>
          <Select defaultValue="" style={{ width: 120 }} onChange={(id)=>props.setDepotId(id)}>
            <Option value={""}>{"全部"}</Option>
          {
            props.depotList.map(item =><Option value={item.id}>{item.name}</Option>)
          }
          </Select>
        </div>
        <div style={{marginRight: 10}}>
          <Input placeholder={"搜尋商品名稱"}></Input>
        </div>
        <div><Button>查詢</Button></div>
      </div>

    </div>
  )
}



const InventoryLog = () =>{


  const columns = [
    {
      title: '庫存倉庫',
      dataIndex: 'depotName',
      key: 'depotName',
      align: 'center',
    },
    {
      title: '商品條碼',
      dataIndex: 'count',
      key: 'count',
      align: 'center'
    },
    { title: '商品名稱', dataIndex: 'productName', key: 'productName',align: 'center' },
    { title: '計價單位', dataIndex: 'unit', key: 'unit',align: 'center' },
    { title: '建議售價', dataIndex: 'price', key: 'price',align: 'center' },
    { title: '庫存量', dataIndex: 'amount', key: 'amount',align: 'center' },
    {
      title: '操作',
      key: 'operation',
      align: 'center',
      width: 100,
      render: () => <div>刪除</div>,
    },
  ];

  const [productName, setProductName] = useState('')
  const [depotId, setDepotId] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(15)
  const [TableList, setTableList] = useState([])
  const [depotList, setDepotList] = useState([])


  useEffect(() => {
    axios.get('erp/inventory/stockList?productName=' +
      productName +
      '&depotId=' +
      depotId +
      '&pageNumber=' +
      pageNumber +
      '&pageSize=' +
      pageSize)
      .then(res=>{
        setTableList(res.data.inventoryListResponseList)
  })
  },[productName, depotId, pageNumber, pageSize, setTableList])

  useEffect(()=>{
    axios.get('erp/productDepot/productDepotList?'+'depotName')
      .then(res=>{
        setDepotList(res.data)
      })
  },[setDepotList])


  return(
    <div>
      <Action depotList={depotList} setDepotId={setDepotId} setTableList={setTableList}  />
    <Table columns={columns} dataSource={TableList} />
    </div>
  )
}

export default InventoryLog
