import React,{useState,useEffect,useRef,useContext, createContext} from 'react';
import { withRouter } from 'react-router-dom';
import {Toast } from 'antd-mobile'
import httpPost from '../../api/fetch'
import ListInfo from '../../component/infolist'

export const DataContext=createContext();

function ClaimedInfo(props){
    const pk_pay=props.match.params.id
    const [data,setData]=useState([])
    const info=useRef(null);
    useEffect(()=>{
        console.log('进入明细页面================')
        console.log(pk_pay)
        httpPost({
            url:'checkSever/payListInfo',
             data:{
              "pk_pay":pk_pay,
            },
            success:res=>{
                const list=JSON.parse(JSON.stringify(res.data))
                //  const {cust_name,type,status,pay_time,memo,cust_code,pay_money,purpose}=list
                 setData(list)
            },
            error:error => Toast.fail('Load failed'+error, 1)})
    },[])
    return(
        <div ref={info}    >
            <DataContext.Provider value={data}>
                 <ListInfo />
            </DataContext.Provider>
        </div>
    )
}
export default withRouter(ClaimedInfo)