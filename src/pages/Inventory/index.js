import React,{useEffect,useState,useRef} from 'react'
import { Table } from 'antd';
import styles from './inventoryTable.module.scss'
import axios from 'axios'
import 'antd/dist/antd.css';
import {Input,Button, Modal} from "antd/es";



const InvenTable = ()=>{

  const editHandler=(record)=>{
    setShowModal(true)
    setTitle("編輯倉庫")
    setDepotName(record.name)
  }


  const columns = [
    {
      title: '倉庫名稱',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '庫存數量',
      dataIndex: 'count',
      key: 'count',
      align: 'center'
    },
    { title: '最後更新時間', dataIndex: 'lastUpdate', key: 'lastUpdate',align: 'center' },
    {
      title: '操作',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (text, record) => <div><a onClick={() => editHandler(text,record)}>編輯</a><span> </span><a>刪除</a></div>,
    },
  ];


  const [useInfo, setUser]=useState({userName: 'admin', password: '123'})
  const [tableData, setTableData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [name, setDepotName] = useState("")
  const [title, setTitle] = useState("")

  useEffect(()=>{

    axios.get('erp/productDepot/productDepotList?'+'depotName')
      .then(res=>{
        setTableData(res.data)
      })
  },[])


  const submitHandler=()=>{
    let formData = new FormData()
    formData.append('username',useInfo.userName)
    formData.append('password',useInfo.password)
   axios.post("erp/api/login",formData)
     .then(res=>{
       console.log(res)
     })
  }
  const handleOk=()=>{
    if(title === "新增倉庫"){
      axios.post('erp/productDepot/addProductDepot', {name: name})
        .then(res=>{
          console.log(res)
          setShowModal(false)
          setDepotName("")
        })
    }else {
      axios.put('erp/productDepot/updateProductDepot', {name:name})
        .then(res=>{
          console.log(res)
          setShowModal(false)
          setDepotName("")
        })
    }
  }

  const handleCancel=()=>{
    setShowModal(false)
    setDepotName("")
  }

  return(
    <div className={styles.inventoryTable}>
      <Input value={useInfo.userName} onChange={(e)=>{setUser(e.target.value)}} />
      <Input value={useInfo.password} onChange={setUser} />
      <Button onClick={submitHandler} >登錄</Button>
      <Button onClick={()=>{setShowModal(true); setTitle('新增倉庫')}}>新增倉庫</Button>
      <Modal title={title} visible={showModal} onOk={handleOk} onCancel={handleCancel}>
        { title === "新增倉庫" ?<Input value={name} onChange={(e) => {setDepotName(e.target.value)}} />:
          <Input value={name} onChange={(e) => {setDepotName(e.target.value)}}/>
        }
      </Modal>
      <Table columns={columns} dataSource={tableData} bordered  />
    </div>

  )
}

export default InvenTable

