import React from 'react'
import {Toast } from 'antd-mobile'
import {baseUrl} from '../../../API'
import { List, Button,WingBlank,WhiteSpace } from 'antd-mobile';
import axios from 'axios'
const Item = List.Item;
class UnInfoList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            detail:[],
            status:{},//标记状态
            loading:false,
            butRun:'认领',
            bType:'primary',
            disabled:false
        }
        this.itemTemplate=this.itemTemplate.bind(this)
    }
    componentDidMount(){
        const param=this.props.param
        let pk_pay=param.pk_pay
        let status=Number(param.status)
            axios({
            url:`${baseUrl}/checkSever/payListInfo`,
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
                detail:list,
                status:status
            })
        }).catch(error => Toast.fail('Load failed'+error, 1))
    }
    render(){
        const {detail,loading,butRun,bType,disabled}=this.state 
    
        const item=detail.data
        return(
                 <WingBlank>
                      <WhiteSpace size="lg" />
                 <List renderHeader={() => <span>银行汇款明细</span>}>
                    {
                    detail && item ?
                        <Item>
                            {this.itemTemplate(item)}
                        </Item>
                     : <Item><div>孔</div> </Item>
                    }
                </List>
                <div style={{
                backgroundColor: '#F5F5F9',
                 borderTop: '0.5px solid #ECECED',
                borderBottom: '0.5px solid #ECECED',
                marginTop:'10px'
                }}>
                <Button type="primary" inline disabled={disabled}
                    style={{ marginLeft: '10px' , }} 
                     onClick={this.props.runPage} >返回</Button>
                <Button type={bType} inline loading={loading}
                    style={{ float:'right' ,marginRight: '10px',}} 
                    onClick={this.Loading} >{butRun}</Button>
                </div>
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
    itemTemplate(item){
        return(
            <div>
                {item.cust_name}
            </div>
        )
    }
}
 
export default UnInfoList;


     
 
 
