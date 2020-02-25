import React from 'react';
 //样式
 import {IconStyle} from './assets/iconfont/iconfont'
 import {GlobalStyle} from './styles'
 //路由
 import {HashRouter} from 'react-router-dom'
 import { renderRoutes } from 'react-router-config'
 import routes from './router'

function App(){
    return (
             <HashRouter>
            <GlobalStyle></GlobalStyle>
            <IconStyle></IconStyle>
                 {renderRoutes(routes)}
            </HashRouter>
     )
}
export default App;