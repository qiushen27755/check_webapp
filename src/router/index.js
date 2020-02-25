
import React from 'react';
import { Redirect } from 'react-router-dom'

 
import Unclaimed from '../application/unclaimed'
import Login from '../application/login'

import ClaimedInfo from '../application/claimedInfo'
import Search from '../application/search'
//子集
export default[
    {
        path:'/',
        component: Login,
        routes:[
            { path :'/', exact:true, render:()=>(<Redirect to={"/unclaimed"} /> )},
            { path:'/unclaimed', component: Unclaimed }, 
            { path:'/claimedInfo/:id',component: ClaimedInfo },
            { path:'/search',exact: true,key:"search",component: Search },
        ]
    }
]