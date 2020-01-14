import React from 'react'
import { Toast } from 'antd-mobile'
import httpPost from '../../../api/fetch'
import { List,Button,WingBlank,WhiteSpace} from 'antd-mobile';
import ListInfo from './utools'
import CertInt from '../certInt'
 const Item = List.Item;
class UnInfoList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            detail:[],
            runInsert:true, // 详细页
            status:{},//标记状态
            loading:false,
            butRun:'认领',
            bType:'primary',
            disabled:false, //不可返回
            msg:'无数据'
        }
        this.goInfo=this.goInfo.bind(this)
        this.runInsert=this.runInsert.bind(this)
     }
    componentDidMount(){
        console.log(this.props.routes)
        const param=this.props.param
        let pk_pay=param.pk_pay
        let status=Number(param.status)
        httpPost({
            url:'/checkSever/payListInfo',
             data:{
              "pk_pay":pk_pay,
              "status":status
            },
            success:res=>{
                const list=JSON.parse(JSON.stringify(res))
                console.log(list)
                this.setState({
                    detail:list,
                    status:status
                })
            },
            error:error => Toast.fail('Load failed'+error, 1)})
    }
    render(){
        const {runInsert,loading,disabled} = this.state
        const {detail,butRun,bType,msg}=this.state 
        const item=detail.data
         return(
             
             <WingBlank>
                 <WhiteSpace size="lg" />
                     { 
                     runInsert && detail && item ? 
                                <ListInfo item={item}/>                                   
                                : msg?<Item>{msg}</Item> :null
                     }
                     {
                     runInsert ?     
                      <div style={{
                            backgroundColor: '#FFFFFF',
                            borderTop: '0.5px solid #ECECED',
                            padding:'10px 10px 15px 20px',
                            marginTop:'10px'}}>
                        <Button type="primary" size="small" inline disabled={disabled}
                             onClick={this.props.runPage} >返回</Button>
                        <Button type={bType} inline loading={loading} size="small"
                            style={{ float:'right'  }} 
                            onClick={this.runInsert} >{butRun}</Button>
                        </div> : <CertInt goInfo={this.goInfo}/>
                     }   
                </WingBlank>
        )
    }
    Loading=()=>{
        this.setState({
            loading:true,
            butRun:'',
            bType:'ghost',
            disabled:true
        })
    }
    runInsert(){
        this.setState({
            runInsert:false,
            msg:''
        })
    }
    //返回
     goInfo(){
         this.setState({
             runInsert:true
         })
     }
}
 
export default UnInfoList;


     
 
 
