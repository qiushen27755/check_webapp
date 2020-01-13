import React from 'react'
import {Button} from 'antd-mobile'
class CertInt extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <div>
                <h1>护手霜准备执行</h1>
                <Button type="primary" onClick={this.props.goInfo}>返回</Button>
            </div>
        )
    }
}

export default CertInt