import React from 'react';
import httpPost from '../../../api/fetch'
import { Toast } from 'antd-mobile';

class InfoListed extends React.Component{
    constructor(props){
        super(props);
        this.state={
    
        }
    }
     componentDidMount(){
         const {pk_pay,status} = this.props.param
        httpPost({
            url:'checkSever/payListInfo',
             data:{
              "pk_pay":pk_pay,
              "status":Number(status)
            },
            success:res=>{
                const list=JSON.parse(JSON.stringify(res))
                 this.setState({
                    detail:list
                 })
            },
            error:error => Toast.fail('Load failed'+error, 1)})
     }

    render(){
        return(
            <div>
                哈哈
            </div>
        )
    }
}

export default InfoListed