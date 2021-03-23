import React, {useEffect, useState} from 'react'
import axios from 'axios'

export const useFetch= (url) =>{
  const [tableData, setTableData] = useState([])

   useEffect(()=>{
    axios.get(url)
      .then(res=>{
        setTableData(res.data)
      })
  },[setTableData, url])
  // composition component, props drilling  prop 鑽(多層級 prop 傳遞)

  // 暴露方法
  //
  return tableData
}
