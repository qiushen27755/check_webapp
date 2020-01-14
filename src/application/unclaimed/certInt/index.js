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
            checkBox:true,
            batchButton:true,//隐藏batch按钮
        }
        this.batch=this.batch.bind(this)
        this.single=this.single.bind(this)
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
        const {insert,checkBox,batchButton}=this.state
        const item=insert.data
        return(
        <div>
           { 
           item && checkBox ? <SingleCert  item={item} />
            : item  ? <BatchCert item={item} /> : <h1>null</h1>
           }
            <div style={{ backgroundColor: '#FFFFFF',
                            borderTop: '0.5px solid #ECECED',
                            padding:'10px 10px 15px 20px',
                            marginTop:'10px'}}>
           {
               batchButton?
               <div>
                   <Button type="primary"   inline size="small" onClick={this.props.goInfo}>返回</Button>
                   <Button type="primary" style={{float:'right'}} inline size="small" onClick={this.batch}>批量</Button>
               </div>
            : 
            <div>
                <Button type="primary"   inline size="small" onClick={this.single}>取消</Button>
                <Button type="primary" style={{float:'right'}} inline size="small" onClick={this.single}>确认</Button>
            </div>
            }
            </div>
              
          </div>
         )   
    }
    batch(){
        this.setState({
            checkBox: false,
            batchButton:false
        })
    }
    single(){
        this.setState({
            checkBox: true,
            batchButton:true
        })
    }
}
          

export default CertInt