import React from 'react'
import {Button} from 'antd-mobile'


//明细界面的按钮
export default function InfoBtn(props){
    //返回首页   goBackHome  切换认领 goClaimed
         return(
            <div style={{ backgroundColor: '#FFFFFF', borderTop: '0.5px solid #ECECED',
                            padding:'10px 10px 15px 20px',marginTop:'5px',position: 'fiexd',
                             height: '100%'}}>
            <Button type="primary" size="small" inline disabled={props.disabled}
                     onClick={props.goBackHome} >返回</Button>
            <Button type="primary" size="small" inline style={{ float:'right'  }} 
                onClick={props.goClaimed} >认领</Button>       
            </div>            
        )
}
export  function ClaimBtn(props){
    // goInfo 明细 batch 切换批量
    return(
        <div style={{ backgroundColor: '#FFFFFF', borderTop: '0.5px solid #ECECED',
        padding:'10px 10px 15px 20px',marginTop:'5px',position: 'fiexd',
         height: '100%'}}>
            <Button type="primary"   inline size="small" onClick={props.goInfo}>返回</Button>
            <Button type="primary" style={{float:'right'}} inline size="small" onClick={props.batch}>批量</Button>  
        </div>          
    )
}