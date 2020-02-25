import React , {useRef, useState } from 'react';
import styled from 'styled-components'
import style from '../../assets/global-style'

const SearchBox = (props) => {
    const queryRef = useRef ();
    const [query, setQuery] = useState ('');
    // 从父组件热门搜索中拿到的新关键词
    const { newQuery } = props;
    // 父组件针对搜索关键字发请求相关的处理
    const { handleQuery } = props;
    // 根据关键字是否存在决定清空按钮的显示 / 隐藏 
    const displayStyle = query ? {display: 'block'}: {display: 'none'};
  
    const handleChange = () => {
      // 搜索框内容改变时的逻辑
    };
    const clearQuery = () => {
      // 清空框内容的逻辑
    }
  
    return (
      <SearchBoxWrapper>
        <i className="iconfont icon-back" onClick={() => props.back ()}>&#xe655;</i>
            <input ref={queryRef} className="box" placeholder="搜索" value={query} onChange={handleChange}/>
        <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe600;</i>
      </SearchBoxWrapper>
    )
  };

  const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: ${style["theme-color"]};
  .icon-back{
    font-size: 24px;
    color: ${style["font-color-light"]};
  }
  .box{
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: ${style["theme-color"]};
    color: ${style["highlight-background-color"]};
    font-size: ${style["font-size-m"]};
    outline: none;
    border: none;
    border-bottom: 1px solid ${style["border-color"]};
    &::placeholder{
      color: ${style["font-color-light"]};
    }
  }
  .icon-delete{
    font-size: 16px;
    color: ${style["background-color"]};
  }
`
export default SearchBox