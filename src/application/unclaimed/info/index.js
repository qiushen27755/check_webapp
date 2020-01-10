import React from 'react'
import {Toast } from 'antd-mobile'

import axios from 'axios'
class UnInfoList extends React.Component{
    constructor(props){
        super(props);
        this.State={
            info:[]
        }
    }
    componentDidMount(){
        const param=this.props.param
        let pk_pay=param.pk_pay
        let status=Number(param.status)

            axios({
            url:'http://192.168.233.1:8081/checkSever/payListInfo',
            method:'POST',
            data:{
              "pk_pay":pk_pay,
              "status":status
            },
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            const list=JSON.parse(JSON.stringify(res.data))
            console.log(list)
            this.setState({
                list:list.data
            })
             
        }).catch(error => Toast.fail('Load failed'+error, 1))
    }
    render(){
        return(
            <div>
                <h2>哈哈哈</h2>
            </div>
        )
    }
}

export default UnInfoList;