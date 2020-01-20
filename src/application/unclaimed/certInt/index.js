import React from 'react'
import httpPost from '../../../api/fetch'
import {Toast,List,ListView,Button} from 'antd-mobile';
 
const Item=List.Item
const offset=5
class CertInt extends React.Component{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }); 
        this.state={
            dataSource:ds,
            cert:[],
            checkBox:true,
            pullDown:false,//上拉加载
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
                     const dataSource=this.state.dataSource.cloneWithRows(list.data)
                    this.setState({
                        cert:list,
                        dataSource:dataSource,
                    })
            },
            error:error => Toast.fail('Load failed'+error, 1) })
        }
    render(){
         const {cert,dataSource}=this.state
         const {checkBox}=this.state
         const item=cert.data
         return(
            <div>
                { 
                    !item ? <Item>无数据</Item> :
                    <ListView 
                        dataSource={dataSource}
                        initialListSize={offset}
                        pageSize={offset}
                        renderRow={(item,id,i)=>(<div>null</div>)}
                        renderFooter={()=><div>没有了</div>}
                        onEndReached={() => this.endLoad} //上拉加载
                        useBodyScroll
                    />
                }

                <div style={{ backgroundColor: '#FFFFFF', borderTop: '0.5px solid #ECECED',
                                            padding:'10px 10px 15px 20px', marginTop:'10px'}}>
                    {
                        checkBox ?
                        <div>
                            <Button type="primary"   inline size="small" onClick={this.props.goBackInfo}>返回</Button>
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
             endLoad=()=>{
                 //TODO 后台一个合同匹配多个明细
                 this.connBoot();
             }
    
}
          

export default CertInt