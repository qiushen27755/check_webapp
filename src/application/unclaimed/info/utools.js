import React from 'react'
import {InputItem,List} from 'antd-mobile'

export default function ListInfo(props){
    const item=props.item
    const {bank_code,bank_name,cust_name,type,status,pay_time,memo,customer,money}=item
    let s=Number(status)
    const state= s===1?'未认领':s===2? '结算中':s===3?'已完成':'未知状态'
    return(
        <List renderHeader={() => <span>银行汇款明细</span>}>
            <List.Item>
            <ul>
                <li><InputItem disabled value={bank_code}><span >银行账户</span></InputItem></li>
                <li><InputItem disabled value={bank_name}><span >户名</span></InputItem></li>
                <li><InputItem disabled value={cust_name}><span >客户</span></InputItem></li>
                <li><InputItem disabled value={customer}><span >客户编码</span></InputItem></li>
                <li><InputItem disabled value={type}><span >类型</span></InputItem></li>
                <li><InputItem disabled value={state}><span >状态</span></InputItem></li>
                <li><InputItem disabled value={memo}><span >备注</span></InputItem></li>
                <li><InputItem disabled value={money}><span >金额</span></InputItem></li>
                <li><InputItem disabled value={pay_time}><span >支付日期</span></InputItem></li>

            </ul>
            </List.Item>
        </List>
    )

}

