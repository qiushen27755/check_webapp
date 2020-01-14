import React from 'react'
import {List,Card,WingBlank} from 'antd-mobile';
 
export default function SingleCert(props){
    const item=props.item
    return (
        <div>
            <WingBlank>
            <List   renderHeader={() => '相关合同'}
                    >
                {  
                    item.map((i,k) => (
                                <List.Item multipleLine key={i+k} >
                                     <Card full>
                                            <Card.Header
                                                title={i.cert_type}
                                                extra={<span>{i.cert_cust}</span>}
                                                />
                                            <Card.Body>
                                                <div>内容...略</div>
                                            </Card.Body>
                                            <Card.Footer content="时间" extra={i.cert_time} />
                                    </Card>
                                </List.Item>
                    ))
                }
                </List>
                </WingBlank>
        </div>
    )

}
