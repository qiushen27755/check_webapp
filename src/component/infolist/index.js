import React from 'react'
import {InputItem,List,TextareaItem} from 'antd-mobile'

export default function ListInfo(props){
    const item=props.item
    const { cust_name,type,status,pay_time,memo,cust_code,pay_money,purpose}=item
    let s=Number(status)
    const state= s===0?'未认领':s===1?'未认领':s===2? '结算中':s===3?'已完成':'未知状态'
    return(
        <List renderHeader={() => <span>银行汇款明细</span>}>
            <List.Item>
            <ul>
                <li><InputItem disabled value={cust_code}><span >客户编码</span></InputItem></li>
                <li><TextareaItem disabled title="客户" value={cust_name} autoHeight /></li>
                <li><InputItem disabled value={type}><span >类型</span></InputItem></li>
                <li><InputItem disabled value={state}><span >状态</span></InputItem></li>
                <li><InputItem disabled value={pay_money}><span >金额</span></InputItem></li>
                <li><InputItem disabled value={memo}><span >备注</span></InputItem></li>
                { purpose ? <li><TextareaItem disabled title="摘要"value={purpose} autoHeight /></li>: null}
                <li><InputItem disabled value={pay_time}><span >支付日期</span></InputItem></li>

            </ul>
            </List.Item>
        </List>
    )

}

