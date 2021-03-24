import React,{useEffect,useState,useCallback} from 'react'
import {Input,Button, Modal} from "antd/es";
import { Table } from 'antd';
import axios from "axios";
import Action from "./action";


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
  const [goodsName, setName] = useState("")

  const searchName = useCallback((e)=>{
    setName(e)
    axios.get('erp/inventory/stockList?productName=' +
      e +
      '&depotId=' +
      depotId +
      '&pageNumber=' +
      pageNumber +
      '&pageSize=' +
      pageSize)
      .then(res=>{
        setTableList(res.data.inventoryListResponseList)
      })
  },[setTableList])

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
      <Action depotList={depotList} setDepotId={setDepotId} setTableList={setTableList} goodsName={goodsName} searchName={searchName} />
    <Table columns={columns} dataSource={TableList} />
    </div>
  )
}

export default InventoryLog
