import React,{useState,useEffect,useRef} from 'react'
import {ListView,PullToRefresh,Icon ,Toast} from 'antd-mobile'
import httpPost from '../../api/fetch'
import RenderRow from '../../component/rowmap'
import { renderRoutes } from 'react-router-config';

const offset=10
function separator(id){
   return(<div 
    key={id}
    style={{ backgroundColor: '#F5F5F9',height: 8,borderTop: '0.5px solid #ECECED'
                ,borderBottom: '0.5px solid #ECECED',}}/>
  )
}

function Unclaimed(props){
    const vl=useRef(null);
    
    const [dataSource,setDataSource]=useState(new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}))
    const [effect,setEffect] =useState(0) //页数，通过这个变化 触发 useEffect
    const [pullLoading,setPullLoading]=useState(false) //下拉
    const [upLoading,setUpLoading]=useState(false) //上拉
    const [data,setData]=useState([]) // 后台response
    const [list,setList]=useState([]) // 响应的实体数据集合
    const [height,setHeight]=useState(0)

    useEffect(()=>{
        const hei = document.documentElement.clientHeight - vl.current.offsetTop;
       
        const data={"code":"111936",
        "offset":offset,
        "index":effect,
        "state":0}
        httpPost({
            url:'checkSever/payList',
            data:data,   
            success: res=>{
                const data=JSON.parse(JSON.stringify(res))
                const lis=list.concat(data.data)
                console.log(lis)
                setList(data.data)
                setData(data)
                setHeight(hei)
                setDataSource(dataSource.cloneWithRows(lis))
                setUpLoading(false)
                setPullLoading(false)
         },
         error:error => {Toast.fail('Load failed'+error, 1) ;console.log(error) }})
     },[effect,upLoading])
     const enterDetail = (pk_pay) => {
      props.history.push (`/claimedInfo/${pk_pay}`)
    }
      return(
      <div  ref={vl} >
        <ListView 
        dataSource={dataSource}
        initialListSize={offset}
        
        renderSeparator={(sectionID, rowID)=>separator(sectionID+rowID)} //渲染了 view之间的小间隙
        pageSize={list.length}  //每次循环事件 渲染的行数
        renderRow={(rowData, id, i) =>  <RenderRow enterDetail={enterDetail}  item={rowData} id={i}></RenderRow>}// 通过参数 方法对 一行进行单独渲染
        style={{
         height: height,
         overflow: 'auto',
        }}
        renderBodyComponent={() => <MyBody />}
        renderFooter={() => (   
            <div style={{ padding: 30, textAlign: 'center' }}>
              <div>
              {pullLoading ?<Icon type="loading"/> :
              data.pageNum+1===data.pageTotal ? <div>-没有更多了-</div> : <div>-{data.pageNum+1}-</div> }
              </div>
            </div>
          )}
        onEndReachedThreshold={100}
        scrollRenderAheadDistance={500}
        onEndReached={()=>{  setPullLoading(data.pageNum+1===data.pageTotal?false:true) 
                             setEffect(data.pageNum+1===data.pageTotal?effect:data.pageNum+1)}}
          pullToRefresh={ <PullToRefresh  
          refreshing={upLoading}
          onRefresh={()=>{setUpLoading(true) 
                          setEffect(0)} }
          /> 
        }
    />
      { renderRoutes(props.route.routes) }
     </div>
    )
}
function MyBody(props) {
  console.log('进入myBody')
    return (
      <div className="am-list-body my-body">
        <span style={{ display: 'none' }}>自定义的body换行元素</span>
        {props.children}
      </div>
    );
  }
export default Unclaimed