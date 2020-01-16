import React from 'react'
import httpPost from '../../../api/fetch'
import {Button,Toast} from 'antd-mobile';
import SingleCert from './singleCert'
import BatchCert from './batchCert'
 
class CertInt extends React.Component{
    constructor(props){
        super(props);
        this.state={
            insert:[],
         } 
    }
        componentDidMount(){
            this.connBoot()
        }
        connBoot(param){
            httpPost({
            url:'checkSever/payCert',
            data:{userId:'~~'},   
            success: res=>{
                const list=JSON.parse(JSON.stringify(res))
                console.log(list)
                this.setState({
                    insert:list
                })
            },
            error:error => Toast.fail('Load failed'+error, 1) })
        }
    render(){
        const {insert,batchButton}=this.state
        const item=insert.data
        const checkBox=this.props.checkBox
         return(
        <div>
           { 
           item && checkBox ? <SingleCert  item={item} />
            : item && !checkBox ? <BatchCert item={item} /> 
            : <h1>无数据</h1>
           }
          </div>
         )   
    }
    
}
          

export default CertInt