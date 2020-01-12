import React, { Component } from 'react';
import axios from 'axios'
import {ListView,PullToRefresh,Icon, Card, WingBlank, WhiteSpace ,Toast } from 'antd-mobile'
import Loading from '../../component/loading'
import UnInfoList from './info'
import {baseUrl} from '../../API'
const setoff=10
class Unclaimed extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }); 
        
        this.state = { 
            dataSource:ds,
            list:[],
            changeCode:{},
            changeInfo:false, // 换页面
            runListView:true, 
            pullLoading:false,
            upLoading:false,
            goBack:false,
            route: props.route.routes
        }
        this.connBoot=this.connBoot.bind(this)
        this.enterDetail=this.enterDetail.bind(this)
        this.runPage=this.runPage.bind(this)
    }
    // 转换明细页面
    enterDetail(param) {
      this.setState({
        runListView:false,
        changeInfo:true,
        changeCode:param
      })
    }
    //初始化 挂载
    componentDidMount(){
      console.log('回来了？')
      this.connBoot({index:0,status:0})
    }
    renderRow=(item,id)=>{
      //渲染子项
      // console.log(JSON.stringify(item))
      const code=item.rec_code
       return (
         <div key={code+id}>
        <WingBlank size="lg">
        <WhiteSpace size="lg" />
         <Card onClick={()=>this.enterDetail({pk_pay:code,status:item.status})}>
          <Card.Header
             title= {item.type}
             extra={<span style={{"fontSize":"12px","float":"right","color":"#B8860B"}}>{code}</span>}
             />
          <Card.Body>
            <div >
              {item.cust_name}付款<span style={{"color":"green"}}>{item.money}</span>元
              <div style={{"marginTop":"5px"}}>
                  {this.runState(item.status)}
                  <div style={{"marginTop":"5px"}}>
                  {
                    item.memo ? <p style={{"fontSize":"12px","float":"right",
                    "color":"#4D4D4D"}}>{item.memo}</p> : ''
                  }
                  </div>
              </div>
              </div>
          </Card.Body>
          <Card.Footer content="支付日期" extra={item.type} />
        </Card>
         <WhiteSpace size="lg" />
      </WingBlank>
        </div>
      
      );
   }
     connBoot(param){
      const {index,status}=param
      axios({
        url:`${baseUrl}/checkSever/payList`,
        method:'POST',
        data:{
          "code":"1111",
          "offset":setoff,
          "index":Number(index),
          "state":Number(status)
        },
        headers:{'Content-Type':'application/json'}
      }).then(res=>{
          const list=JSON.parse(JSON.stringify(res.data))
          const dataSource=this.state.dataSource.cloneWithRows(list.data)
          console.log(list)
          this.setState({
              dataSource:dataSource,
              list:list,
              pullLoading:false,
              upLoading:false,
          })
      }).catch(error => Toast.fail('Load failed'+error, 1))
     }
    render() { 
        const {runListView,list,dataSource,upLoading,pullLoading,changeInfo} =this.state
         const separator=(sectionID,rowID)=>
        (  
            <div 
            key={`${sectionID}-${rowID}`}
                style={{
                backgroundColor: '#F5F5F9',
                height: 5,
                borderTop: '0.5px solid #ECECED',
                borderBottom: '0.5px solid #ECECED',
                }}
           />
        )  
     
        return ( 
            <div>
            {
              runListView && list.data? 
               <ListView 
                  className="am-list"
                  dataSource={dataSource}
                  ref={el => this.lv = el}  //固定对象管理
                  // initialListSize   //这里我没有设置初始值，默认是10个
                  // renderHeader={this.handHead}
                  renderFooter={() => (   
                                          <div style={{ padding: 30, textAlign: 'center' }}>
                                          <div>
                                          {  upLoading ?
                                          <Icon type="loading" /> : list.pageNum+1===list.pageTotal ?
                                          <div>-没有更多了-</div> : <div>-{list.pageNum+1}-</div> }
                                          </div>
                                          </div>
                                          )} // render 这两个是针对 listView 的上下 内容的渲染

                  renderRow={(rowData, id, i) => this.renderRow(rowData,i)} // 通过参数 方法对 一行进行单独渲染
                  renderSeparator={separator} //渲染了 view之间的小间隙

                  pageSize={list.pageSize}  //每次循环事件 渲染的行数
                  // renderBodyComponent={() => <MyBody />}
                  renderSectionBodyWrapper={(rowData) => this.renderRow(rowData)}
                  useBodyScroll  //使用html的body 作为滚动容器
                  // onScroll={(e) => { console.log('.......'); }} // 列表渲染每行可通过此进行回调
                  scrollRenderAheadDistance={500} //定制每行接近屏幕范围
                  onEndReached={() => this.onEndReached(list.pageNum, list.pageTotal)} // 自动渲染机制
                  onEndReachedThreshold={10}
                  pullToRefresh={<PullToRefresh  
                                  refreshing={pullLoading}
                                  onRefresh={this.onRefresh}
                              />}
              />   
              :  changeInfo ? <div> 
                <UnInfoList param={this.state.changeCode} 
                          runPage={this.runPage}/> 
                </div> :  <Loading></Loading>
             }
           </div>
         ); // 后续最后的三目更换位置
    }
      runPage(){
        this.setState({
          runListView:true,
          
        })
      }
     //暂定 开始 进行中 结算完毕
   runState=(approve)=>{
     let status=Number(approve)
     if(status===0){
       return <span style={{"marginLeft":"3px","fontSize":"10px",
              "backgroundColor":"#8EE5EE","color":"#595959"}}>{''} 未认领{''} </span>
     }else if(status===1){
      return <span style={{"marginLeft":"3px","fontSize":"10px",
              "backgroundColor":"#FF0000","color":"#595959"}}>{''} 结算中{''} </span>

     }else if(status===2){
      return <span style={{"marginLeft":"3px","fontSize":"10px",
              "backgroundColor":"#00FF00","color":"#595959"}}>{''} 已结算{''} </span>
     }
   }
    //上拉
    onEndReached=(page,lastPage)=>{
    if(Number(page)<Number(lastPage)-1){
        this.setState({
            pullLoading:true
        }) 
        let index= page+1
        this.connBoot({index:index,status:0})
    }
    }
    //下拉
    onRefresh=()=>{
        this.setState(
            {upLoading:true}
        )
        this.connBoot({index:0,status:0})
      }
}
 
// export default withRouter(Unclaimed);
export default Unclaimed