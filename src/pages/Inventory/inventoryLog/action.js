import {Select,Form} from "antd";
import React,{useState} from 'react'
import styles from "./inventoryLog.module.scss";
import {Button, Input,Modal} from "antd/es";
import axios from "axios";
import debounce from 'lodash/debounce';

const Restock=(props)=>{
  const[barCode, setBarcode]=useState("")
  const[restockData, setRestockData] = useState({})
  const [count, setCount] = useState(0)

  const searchBarcode =(e)=>{
    setBarcode(e.barCode)
    axios.get('erp/inventory/getStock?barcode='+ e.barCode)
      .then(res=>{
        console.log(res)
        setRestockData({...res.data})
        console.log(restockData)
      })
  }
  return(
    <div>
      <Modal footer={[<Button>送出</Button>,<Button>取消</Button>]} title={"重新入庫"}
             visible={props.modal} onOk={()=>props.showModal(false)} onCancel={()=>props.showModal(false)}>
        <div>
            <div>
              <span>工作日期</span>
              <span></span>
            </div>
            <Form>
              <Form.Item name="note" label="商品條碼" rules={[{ required: true }]}>
                <Input value={barCode} onChange={(e)=>debounce(searchBarcode,600)({barCode: e.target.value}
                ,e.preventDefault())} />
              </Form.Item>
              <Form.Item name="note" label="商品名稱">
                <span>{restockData.productName}</span>
              </Form.Item>
              <Form.Item name="note" label="計價單位">
                <span>{restockData.unit}</span>
              </Form.Item>
              <Form>
                <Form.Item name="note" label="數量">
                  {restockData.unit !== "件" || restockData.unit !== "包" ? <div>
                    <Input style={{width:50}} value={count} onChange={(event)=>setCount(event.target.value)} />
                  </div>:<span>{restockData.weight}</span>
                  }
                </Form.Item>
              </Form>
            </Form>
        </div>
      </Modal>
    </div>
    )
}


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
              props.depotList.map(item =><Option value={item.id}>{item.name}</Option>)
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
