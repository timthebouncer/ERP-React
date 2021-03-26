import {Select,Form} from "antd";
import React,{useState,useEffect} from 'react'
import styles from "./inventoryLog.module.scss";
import {Button, Input,Modal} from "antd/es";
import Restock from './restock'



const Action = React.memo((props)=>{

  const[modal, showModal] = useState(false)

  const { Option } = Select;
  return(
    <div className={styles.actionWrapper}>
      <div className={styles.btn}>
        <Button>重新整理</Button>
        <Button onClick={()=>showModal(true)}>重新入庫</Button>
        <Restock modal={modal} showModal={showModal} />
      </div>
      <div className={styles.searchWrapper}>
        <div style={{padding:5}}><span>倉庫別</span></div>
        <div className={styles.selection}>
          <Select defaultValue="" style={{ width: 120 }} onChange={(id)=>props.setDepotId(id)}>
            <Option value={""}>{"全部"}</Option>
            {
              props.depotList.map(item =><Option key={item.id}>{item.name}</Option>)
            }
          </Select>
        </div>
        <div style={{marginRight: 10}}>
          <Input value={props.goodsName} onChange={(e)=>props.searchName(e.target.value)} placeholder={"搜尋商品名稱"}></Input>
        </div>
        <div><Button>查詢</Button></div>
      </div>

    </div>
  )
})
export default Action
