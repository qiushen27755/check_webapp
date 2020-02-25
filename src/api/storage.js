export const getStorage = (key) => {
    var v=localStorage.getItem(key);
    if(!v){return null}
    var v4=v.slice(0,4);
    if(v4==='obj-'){
      v=JSON.parse(v.slice(4));
    }else if(v4==='str-'){
      v=v.slice(4);
    }
    return v
  }
  export const setStorage = (key, value) => {
    var v=value;
    if(typeof v == "object"){
      v="obj-"+JSON.stringify(v)
    }else{
  
      if(value===null||value===undefined){
        v="str-"
      }else{
        v="str-"+v
      }
    }
    localStorage.setItem(key,v);
  }
  export const clearStorage = () => {
    localStorage.clear();
  }
  
  export const removeStorage = (key) => {
    localStorage.removeItem(key);
  }
   