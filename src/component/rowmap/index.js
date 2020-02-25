import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'

function RenderRow(props){
     const {item,id}=props
    const {pk_pay,pay_time,cust_name,pay_money,pay_type,memo,status}=item
          return (
            <div key={pk_pay+id}>
              <WingBlank size="lg">
                <WhiteSpace size="lg" />
                  <Card onClick={() => props.enterDetail(pk_pay)}>
                    <Card.Header
                      title= {pay_type}
                      extra={<span style={{"fontSize":"12px","float":"right","color":"#B8860B"}}>{pk_pay}</span>}
                      />
                    <Card.Body>
                      <div >
                          {cust_name}付款<span style={{"color":"green"}}>{pay_money}</span>元
                          <div style={{"marginTop":"5px"}}>
                              {runState(status)}
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
function runState(approve){
  
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
export default RenderRow;