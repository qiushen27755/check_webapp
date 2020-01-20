import React  from 'react';
import { Top ,Tab ,TabItem} from './styles';
import { renderRoutes } from "react-router-config";
import { NavLink } from 'react-router-dom';
import {setStorage,clearStorage} from '../../api/storage'
import httpPost from '../../api/fetch'
import * as dd from 'dingtalk-jsapi'
import {Toast} from 'antd-mobile'
import LoadingSelf from '../../component/loading'

 
 class Login  extends React.Component{
     constructor(props){
        super(props)
        this.state={redirect:false}
     }
     componentDidMount(){
        clearStorage()
         navigator.userAgent.toLowerCase().indexOf('dingtalk') > -1 ?
               dd.ready(()=>{
                  dd.runtime.permission.requestAuthCode({
                      corpId: "dingcd7886c79215f02235c2f4657eb6378f",
                      onSuccess: function (result) {
                          const loginInfo={}
                          const code = result.code;
                          httpPost({
                              url:'checkinfo/ssoDingLogin',
                              data:{code:code},   
                              success: res=>{
                                loginInfo.name=res.data.username
                                loginInfo.userId=res.data.userid
                                loginInfo.userCode=res.data.usercode
                                loginInfo.pk_psndoc=res.data.pk_psndoc
                                loginInfo.sessionId=res.data.sessionId
                                setStorage('loginInfo',loginInfo)
                                setStorage('userId',loginInfo.userId)
                                setStorage('pk_psndoc',loginInfo.pk_psndoc)
                                this.setState({redirect:true})
                          },
                          error:error => Toast.fail('登录异常:'+error, 1) })
                          }
                        
                      });
            }) :
            httpPost({
                url:'checkinfo/ssoDingLogin',
                data:{code:'118543'},   
                success: res=>{
                    let loginInfo={}
                    loginInfo.name=res.data.username
                    loginInfo.userId=res.data.userid
                    loginInfo.userCode=res.data.usercode
                    loginInfo.pk_psndoc=res.data.pk_psndoc
                    loginInfo.sessionId=res.data.sessionId
                    setStorage('loginInfo',loginInfo)
                    setStorage('userId',loginInfo.userId)
                    setStorage('pk_psndoc',loginInfo.pk_psndoc)
                    this.setState({redirect:true})
                },
            error:error => Toast.fail('登录异常:'+error, 1) })   
            
            // runTest('118543')  this.setState({redirect:true})

            }
     
     
     render(){
         const {route}=this.props
         const {redirect}=this.state
         return (
             
                    <div>
                        <Top>
                            <span className="iconfont home">&#xe616;</span>
                            <span className="title">Sunon</span>
                            <span className="iconfont search">&#xe613;</span>
                        </Top> 
                        <Tab>
                            <NavLink to="/unclaimed" activeClassName="selected"><TabItem><span>未认领</span></TabItem></NavLink>
                            <NavLink to="/claimed" activeClassName="selected"><TabItem><span>已认领</span></TabItem></NavLink>
                            <NavLink to="/cert" activeClassName="selected"><TabItem><span>我的合同</span></TabItem></NavLink>
                        </Tab>
           {  redirect ?  renderRoutes (route.routes)  : <LoadingSelf></LoadingSelf>}
                    </div> 
                    
               
           );
     }

 }
     

 
export default Login;