import axios from 'axios'
import {baseUrl} from './host'

/**
 * 封装的POST请求 默认json传递
 */
const httpPost=(request)=>{
       axios({
         method: 'POST',
         url:`${baseUrl}${request.url}`,
         data: request.data ? JSON.stringify(request.data):{},
         param: request.param ? request.param : {},
         headers: {
             'Content-Type': 'application/json',
          }
     }).then( res=>{
         if(res.data.statusCode===10010){
             window.close()
         }
         if(res.data.statusCode===200){
             request.success(res.data)
         }else{
             if(!res.data.message){
                 res.data.message='服务异常'
             }
             request.error(res.data)
         }
     }).catch(error=>{
         request.error(error)
     })
      
 }
 
 export default httpPost;