import React, { Component } from 'react';
import axios from 'axios'
import {ListView,PullToRefresh,Icon, Card, WingBlank, WhiteSpace ,Toast } from 'antd-mobile'
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom'
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
            pullLoading:false,
            ipLoading:false,
            route: props.route.routes
        }
    }
    //初始化 挂载
    componentDidMount(){
        axios({
            url:'http://172.16.101.219:8081/payinfo/service/listview',
            method:'POST',
            data:{
              "code":"1111",
              "offset":setoff,
              "index":0,
              "state":"0"

            },
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            const list=JSON.parse(JSON.stringify(res.data))
            const dataSource=this.state.dataSource.cloneWithRows(list.data)
            console.log(list)
            this.setState({
                dataSource:dataSource,
                list:list
            })
        }).catch(error => Toast.fail('Load failed'+error, 1))
    }
     enterDetail = (id) => {
        this.props.history.replace(`/unclaimed/info/${id}`);
      }
    render() { 
        const {list,dataSource,upLoading,pullLoading} =this.state
         const separator=(sectionID,rowID)=>
        ( //分离器，分隔符？
          // <WhiteSpace key={`${sectionID}-${rowID}`} size="xs" />
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
              list && list.data && list.data.length ?
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
              :
              list && list.data && !list.data.length ?
                <div>
                  <p>暂无数据</p>
                </div> : null
            }
                  { renderRoutes(this.state.route) }

          </div>
         );
    }
    renderRow=(item,id)=>{
        //渲染子项
        // console.log(JSON.stringify(item))
        const code=item.REC_CODE
         return (
          <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <label>
          <Card onClick={()=>this.enterDetail(code)}>
            <Card.Header
               title= {item.TYPE}
               extra={<span style={{"fontSize":"12px","float":"right","color":"#B8860B"}}>{item.REC_CODE}</span>}
               />
            <Card.Body>
              <div >
                {item.CUST_NAME}付款<span style={{"color":"green"}}>{item.MONEY}</span>元
                <div style={{"marginTop":"5px"}}>
                    {this.runState(item.STATUS)}
                    <div style={{"marginTop":"5px"}}>
                    {
                    item.MEMO ? <p style={{"fontSize":"12px","float":"right",
                                "color":"#4D4D4D"}}>{item.MEMO}</p> : ''
                    }
                    </div>
                </div>
                </div>
            </Card.Body>
            <Card.Footer content="支付日期" extra={item.PAY_TIME} />
          </Card>
        </label>
          <WhiteSpace size="lg" />
 
        </WingBlank>
        
        );
              
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
        // console.log('当前页数'+page+'，总页数'+lastPage)

    if(Number(page)<Number(lastPage)-1){
            // store.dispatch(putPullTRUE)
            //请求重新setState
            this.setState({
                pullLoading:true
            }) 
        let index= page+1
        // console.log(index)
        axios({
        url:'http://172.16.101.219:8081/payinfo/service/listview',
        method:'POST',
        data:{
            "code":"1111",
            "offset":setoff,
            "index":index,
            "state":"0"

        },
        headers:{'Content-Type':'application/json'}
        }).then(res=>{
        
        const list=JSON.parse(JSON.stringify(res.data))
        const dataSource= this.state.dataSource.cloneWithRows(list.data)
        this.setState({
            dataSource:dataSource,
            list:list,
            pullLoading:false
        })
        }).catch(error => Toast.fail('Load failed'+error, 1))
    }
    }
//下拉
onRefresh=()=>{
    this.setState(
        {upLoading:true}
    )
    axios({
      url:'http://172.16.101.219:8081/payinfo/service/listview',
      method:'POST',
      data:{
        "code":"1111",
        "offset":setoff,
        "index":0,
        "state":"0"
      },
      headers:{'Content-Type':'application/json'}
    }).then(res=>{
        
       const list=JSON.parse(JSON.stringify(res.data))
         const dataSource= this.state.dataSource.cloneWithRows(list.data)
        this.setState({
            dataSource:dataSource,
            list:list,
            upLoading:false
        })
      }).catch(error => Toast.fail('Load failed'+error, 1))

  }
}
 
export default withRouter(Unclaimed);