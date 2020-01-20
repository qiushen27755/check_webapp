
import React from 'react';
import { Redirect } from 'react-router-dom'

import Cert from '../application/cert'
import Claimed from '../application/claimed'
import Unclaimed from '../application/unclaimed'
import Login from '../application/login'
//子集
export default[
    {
        path:'/',
        component: Login,
        routes:[
            { path :'/', exact:true, render:()=>(<Redirect to={"/unclaimed"} /> )},
            {
                path:'/unclaimed', component: Unclaimed,
            },
            {
                path:'/claimed',component: Claimed
            },
            {
                path: '/cert',component: Cert
            }
        ]
    }
]