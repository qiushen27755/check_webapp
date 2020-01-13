import React from 'react'
import {InputItem,List} from 'antd-mobile'

export default function ListInfo(props){

    return(
        <List renderHeader={() => <span>银行汇款明细</span>}>
            <List.Item>
            <ul>
                <li><InputItem value="嘻嘻"><span >hah</span></InputItem></li>
                <li><InputItem value="嘻嘻"><span >hah</span></InputItem></li>
                <li><InputItem value="嘻嘻"><span >hah</span></InputItem></li>
                <li><InputItem value="嘻嘻"><span >hah</span></InputItem></li>
                <li><InputItem value="嘻嘻"><span >hah</span></InputItem></li>
                <li><InputItem value="嘻嘻"><span >hah</span></InputItem></li>
                <li><InputItem value="嘻嘻"><span >hah</span></InputItem></li>
                <li><InputItem value="嘻嘻"><span >hah</span></InputItem></li>
            </ul>
            </List.Item>
        </List>
    )

}

