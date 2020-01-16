import React from 'react'
import { Toast } from 'antd-mobile'
import httpPost from '../../../api/fetch'
import { List,WingBlank,WhiteSpace} from 'antd-mobile';
import ListInfo from './utools'
import CertInt from '../certInt'
 const Item = List.Item;
class UnInfoList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            detail:[]
           }
     }
    componentDidMount(){
        const {pk_pay,status}=this.props.param
        console.log(this.props)
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
        const {detail}=this.state 
        const {runClaim,msg}=this.props.doClaim //父组件传的值明细界面的切换
        const {checkBox}=this.props.certForm  //父组件传值 判断 认领界面的切换
        const item=detail.data
          return(
             
             <WingBlank>
                 <WhiteSpace size="lg" />
                     { 
                        runClaim && detail && item ? 
                                <ListInfo item={item}/>                                   
                                : msg?<Item>{msg}</Item> : 
                        <CertInt checkBox={checkBox} />
                     }
                </WingBlank>
        )
    }
 
   
}
 
export default UnInfoList;


     
 
 
