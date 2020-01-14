import React  from 'react';
import { Top ,Tab ,TabItem} from './styles';
import { renderRoutes } from "react-router-config";
import { NavLink } from 'react-router-dom';
 function Login(props){
    const {route}=props
     return (
         <div>
             <Top>
                <span className="iconfont menu">&#xe65c;</span>
                <span className="title">Sunon</span>
                <span className="iconfont search">&#xe62b;</span>
            </Top> 
            <Tab>
                <NavLink to="/unclaimed" activeClassName="selected"><TabItem><span>未认领</span></TabItem></NavLink>
                <NavLink to="/claimed" activeClassName="selected"><TabItem><span>已认领</span></TabItem></NavLink>
                <NavLink to="/cert" activeClassName="selected"><TabItem><span>我的合同</span></TabItem></NavLink>
            </Tab>
            
             
             { renderRoutes (route.routes) }
         </div>
       );

 }
     

 
export default Login;