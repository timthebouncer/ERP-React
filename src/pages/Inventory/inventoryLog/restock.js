import axios from "axios";
import React,{useState,useEffect} from 'react'
import {Button, Input, Modal} from "antd/es";
import {Form} from "antd";
import debounce from 'lodash/debounce';

const Restock=(props)=>{
  const [form] = Form.useForm();

  const[barCode, setBarcode]= useState("")
  const[restockData, setRestockData] = useState({})
  const [count, setCount] = useState(0)

  const submitHandler=()=>{
    if(restockData.unit === "件" || restockData.unit === "包"){
      let data = {amount: restockData.amount + count,barcode:barCode, id:restockData.inventoryId}
      axios.put('erp/inventory/updateStock',data)
        .then(res=>{
          console.log(res)
        })
    }else{
      let data = {amount:restockData.amount+1, barcode:barCode, id:restockData.inventoryId}
      axios.put('erp/inventory/updateStock',data)
        .then(res=>{
          console.log(res)
        })
    }
    clearData()
    props.showModal(false)
  }

  const searchBarcode =(e)=>{
    // setBarcode(e.barCode)
    axios.get('erp/inventory/getStock?barcode='+ e.barCode)
      .then(res=>{
        setRestockData({...res.data})
      })
  }

  const clearData=()=>{
    props.showModal(false)
    form.setFieldsValue({
      note1: '',
    });
    setRestockData({})
    setCount(0)
  }

  return(
    <div>
      <Modal footer={[<Button onClick={()=>submitHandler()}>送出</Button>,<Button onClick={clearData}>取消</Button>]} title={"重新入庫"}
             visible={props.modal} onCancel={clearData}>
        <div>
          <div>
            <span>工作日期</span>
            <span>{barCode}</span>
          </div>
          <Form form={form}>
            <Form.Item name="note1" label="商品條碼" rules={[{ required: true }]}>
              <Input onChange={(e)=>debounce(searchBarcode,600)({barCode: e.target.value}
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
                {restockData.unit === "件" || restockData.unit === "包" ?
                  <Input style={{width:50}} value={count} onChange={(event)=>setCount(event.target.value)} />:<span>{restockData.weight}</span>
                }
              </Form.Item>
            </Form>
          </Form>
        </div>
      </Modal>
    </div>
  )
}
export default Restock
