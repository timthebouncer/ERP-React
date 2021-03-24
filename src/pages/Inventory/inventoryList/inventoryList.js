import React from 'react'
import { DatePicker, Space } from 'antd';
import styles from "./inventoryList.modue.scss"

const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

const InventoryList = () =>{
  return(
    <div>
      <Space direction="vertical" size={12}>
        <div style={styles.datePicker}>
          <DatePicker showTime onChange={onChange} onOk={onOk} />
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={onChange}
            onOk={onOk}
          />
        </div>
      </Space>
    </div>
  )
}

export default InventoryList
