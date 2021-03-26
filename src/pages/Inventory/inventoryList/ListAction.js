import styles from "./inventoryList.module.scss";
import {DatePicker, Space,Button, Input, Select, } from "antd";
import React,{useState, useCallback} from "react";
import moment from 'moment';
import axios from "axios";
import debounce from 'lodash/debounce';

const {Option} =Select
const { RangePicker } = DatePicker;
const currentDate = [{id:1,name: "今天"}, {id:2,name:"本周"}, {id:3,name:"本月"}, {id:4,name:"上個月"}, {id:5,name:"全部"}]


const ListAction=(props)=>{
  const[state, setState] = useState('')
  const {data, setData} = props


  function onChange(value, dateString) {
    axios.post('erp/inventoryLog/list')
      .then((res)=>{
        console.log(res)
      })
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  const searchHandler= useCallback((e)=>{
    setData(prev => {
      prev['searchKey'] = e;
      return prev;
    })
    axios.post('erp/inventoryLog/list',data)
      .then(res=>{
        props.setTable(res.data.content)
      })
    return data
  },[data,setData,props])


  return(
    <div className={styles.listAction}>
      <div className={styles.datePicker}>
        <Space direction="vertical" size={12}>
          <div>
            <Select style={{width:70}}>
              {
                currentDate.map(item=><Option key={item.id}>{item.name}</Option>)
              }
            </Select>
            <RangePicker
              ranges={{
                Today: [moment(), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              onChange={onChange}
            />
          </div>
        </Space>
      </div>
      <div className={styles.searchWrapper}>
        <div className={styles.title}>
        <span>異動方式</span>
          <Select style={{width:100}}></Select>
        </div>
        <div>
          <Input onChange={(e)=>debounce(searchHandler,600)(e.target.value)} />
        </div>
        <div className={styles.searchBtn}>
          <Button>查詢</Button>
        </div>

      </div>
    </div>

  )
}
export default ListAction
