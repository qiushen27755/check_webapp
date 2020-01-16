import React, { Component } from 'react';
import {ListView,PullToRefresh,Icon, Card, WingBlank, WhiteSpace ,Toast  } from 'antd-mobile'
import Loading from '../../component/loading'
import UnInfoList from './info'
import InfoBtn from './btnsever'
import httpPost from '../../api/fetch'
const setoff=5
class Unclaimed extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }); 
        this.state = { 
            dataSource:ds,
            list:[], // 返回实例
            body:[], // 拼接子项
            infoParam:[], //切明细传值
            disabled:false,//按钮不可选
            pullLoading:false, //上拉
            upLoading:false, //下拉

            
            runListView:true, // 未认领首页和明细切换的坐标  明细返回
            runClaim:true, // 明细和认领的切换坐标  明细认领
            msg:'无数据', // 认领异常无 合同
            checkBox:true, // 认领界面 批量界面的切换
            claimBtn:false, //切换认领按钮
            batchBtn:false,  //切换批量选择按钮
         }
        this.connBoot=this.connBoot.bind(this)
        this.enterDetail=this.enterDetail.bind(this)
        this.goBackHome=this.goBackHome.bind(this)
        this.goClaimed=this.goClaimed.bind(this)
    }
  
    //初始化 挂载
    componentDidMount(){
       this.connBoot({index:0,status:0})
    }
    connBoot(param){
      const {index,status}=param
      httpPost({
         url:'checkSever/payList',
         data:{
          "code":"111936",
          "offset":setoff,
          "index":Number(index),
          "state":Number(status)
        },   
       success: res=>{
         if(Number(index)>0){
          const list=JSON.parse(JSON.stringify(res))
          let stateList=this.state.body
           const data=stateList.concat(list.data)
           const dataSource=this.state.dataSource.cloneWithRows(data)
          this.setState({
              dataSource:dataSource,
              list:list,
              body:data,
              pullLoading:false // 上拉
          })
         }else{
           const list=JSON.parse(JSON.stringify(res))
           const dataSource=this.state.dataSource.cloneWithRows(list.data)
            this.setState({
               dataSource:dataSource,
               list:list,
               body:list.data,
               upLoading:false, //下拉
               
           })
         }
      },
      error:error => Toast.fail('Load failed'+error, 1) })
     }
    renderRow=(item,id)=>{
      const {pk_pay,pay_time,cust_name,pay_money,pay_type,memo,status}=item
          return (
         <div key={pk_pay+id}>
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
            <Card onClick={()=>this.enterDetail({pk_pay:pk_pay,status:status})}>
              <Card.Header
                title= {pay_type}
                extra={<span style={{"fontSize":"12px","float":"right","color":"#B8860B"}}>{pk_pay}</span>}
                />
              <Card.Body>
                <div >
                    {cust_name}付款<span style={{"color":"green"}}>{pay_money}</span>元
                    <div style={{"marginTop":"5px"}}>
                        {this.runState(status)}
                        {
                          memo ? <p style={{"fontSize":"12px",float:'right',"color":"#4D4D4D"}}>
                            {memo}</p> : ''
                        }
                    </div>
                  </div>
              </Card.Body>
              <Card.Footer content="支付日期" extra={pay_time} />
            </Card>
          <WhiteSpace size="lg" />
        </WingBlank>
        </div>
      );
   }
     
    render() { 
        const {list,dataSource,body,infoParam,msg} =this.state
        const {runListView,upLoading,pullLoading,runClaim,checkBox,claimBtn,batchBtn,disabled}=this.state
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
              !body? <Loading></Loading>:
              runListView && body? 
               <ListView 
                  className="am-list"
                  dataSource={dataSource}
                  initialListSize={setoff}
                  ref={el => this.lv = el}  //固定对象管理
                  renderFooter={() => (   
                          <div style={{ padding: 30, textAlign: 'center' }}>
                            <div>
                            {pullLoading ?<Icon type="loading"/> :
                            list.pageNum+1===list.pageTotal ? <div>-没有更多了-</div> : <div>-{list.pageNum+1}-</div> }
                            </div>
                          </div>
                        )} // render 这两个是针对 listView 的上下 内容的渲染
                  renderRow={(rowData, id, i) => this.renderRow(rowData,i)} // 通过参数 方法对 一行进行单独渲染
                  renderSeparator={separator} //渲染了 view之间的小间隙
                  pageSize={body.length}  //每次循环事件 渲染的行数
                  // renderBodyComponent={() => <MyBody />}
                  useBodyScroll  //使用html的body 作为滚动容器
                  // onScroll={(e) => { console.log('.......'); }} // 列表渲染每行可通过此进行回调
                  onEndReached={() => this.onEndReached(list.pageNum, list.pageTotal)} // 自动渲染机制
                  onEndReachedThreshold={100}
                  pullToRefresh={ <PullToRefresh  
                                              refreshing={upLoading}
                                              onRefresh={this.onRefresh}
                                              /> 
                                }
              />   
              :  
                <div> <UnInfoList param={infoParam}
                                  doClaim={{runClaim:runClaim,infoMsg:msg}}
                                  certForm ={{checkBox:checkBox}}   /> 
                      <div>

                          <InfoBtn goBackHome={this.goBackHome}
                                   goClaimed={this.goClaimed} 
                                   disabled={disabled}
                                />
                      </div>
                 </div>
            }
           </div>
         );  
    }
       // 返回列表页面
      goBackHome(){ //将所有左边切回除数状态
        this.setState({
          runListView:true,
          runClaim:true
        })
      }
      // 转换明细页面 并传参
      enterDetail(param) {
         this.setState({
          infoParam:param,
          runListView:false
        })
      }
      //进入认领页面
      goClaimed(){
        this.setState({
          runClaim:false, //切换页面
          msg:'', //判断不是因为没有数据而切换页面
          claimBtn:false, //切换认领按钮
          disabled:true,//页面切换不可返回
        })
       }
      //暂定 开始 进行中 结算完毕
      runState=(approve)=>{
        let status=Number(approve)
        if(status===1 || status===0){
          return <span style={{"marginLeft":"3px","fontSize":"10px",
                  "backgroundColor":"#8EE5EE","color":"#595959"}}>{''} 未认领{''} </span>
        }else if(status===2){
          return <span style={{"marginLeft":"3px","fontSize":"10px",
                  "backgroundColor":"#FF0000","color":"#595959"}}>{''} 结算中{''} </span>

        }else if(status===3){
          return <span style={{"marginLeft":"3px","fontSize":"10px",
                  "backgroundColor":"#00FF00","color":"#595959"}}>{''} 已结算{''} </span>
        }
      }
      //上拉
      onEndReached=(page,lastPage)=>{
      if(Number(page)<Number(lastPage)-1){
          this.setState({pullLoading:true})
          let index= page+1
          this.connBoot({index:index,status:0})
        }
      }
      //下拉
      onRefresh=()=>{
        this.setState({upLoading:true})
        this.connBoot({index:0,status:0})
        }
      
}
 
export default Unclaimed