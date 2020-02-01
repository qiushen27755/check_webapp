import React from 'react'
import httpPost from '../../../api/fetch'
import { Toast,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import LoadingSelf from '../../../component/loading'
import ListInfo from '../../../component/infolist'
import CertInt from '../certInt'
class UnInfoList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            detail:[],
            msg:'无数据',
            stay:true, //停留本页面或切换到认领页
            disable:false,
           }
           this.goClaim=this.goClaim.bind(this)
           this.goBackInfo=this.goBackInfo.bind(this)
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
        const {pk_pay,status}=this.props.param

        const {detail,msg}=this.state 
        const {stay,disable}=this.state
        const item=detail.data
        return(
                    <div>
                        <WhiteSpace size="lg"/>
                      { 
                        stay && detail && item ? 
                        <div>
                            <WingBlank><ListInfo item={item}/> 
                            {
                                Number(status)===2?<p>这是2</p>:null
                            }
                            
                            </WingBlank>
                            <div style={{ backgroundColor: '#FFFFFF', borderTop: '0.5px solid #ECECED',
                                             padding:'10px 10px 15px 20px', marginTop:'10px'}}>
                                 <Button type="primary" size="small" inline disabled={disable} onClick={this.props.goBackHome}
                                  >返回</Button>
                                <Button type="primary" size="small" inline style={{ float:'right'  }} 
                                 disabled  onClick={this.goClaim} >认领</Button>       
                            </div>
                        </div>
                        :  msg?<LoadingSelf></LoadingSelf>  //<Item>{msg}</Item>   //加载中我也直接显示为无数据
                        : <CertInt  goBackInfo={this.goBackInfo} param={this.props.param}/>          
                      }
                    </div>
        )
    }
    goClaim(){  //切换进入认领
        this.setState({
            stay:false,
            disable:true,
            msg:'',//排除无数据的可能,为按钮触发事件
        })
    }
    goBackInfo(){
        this.setState({//不多解释 把goClaim做的还原即可 
            stay:true,  
            disable:false,
            msg:'有数据',
        })
    }
}
 
export default UnInfoList;


     
 
 
