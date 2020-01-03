import React, { Component } from 'react';
import {List,Toast} from 'antd-mobile'
import axios from 'axios';

class UnInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        const id=this.props.match.params
        axios({
            url:'http://172.16.101.219:8081/payinfo/service/uninfo',
            method:'POST',
            data:{
              "rec_code":id,
            },
            headers:{'Content-Type':'application/json'}
        }).then(res=>{

         }).catch(error =>  
            Toast.fail('Load failed'+error, 1)
        )
        console.log(this.props.match.params);
     }
    render() { 
        return (
            <div>
                <h2>这是一个晴朗的早晨</h2>
                <List>

                </List>
            </div>
         );
    }
}
 
export default UnInfo;