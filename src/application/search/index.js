import React,{useState,useEffect,useRef,useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';
import SearchBox from '../../ui/search-box'
  function Search (props) {
  // 控制动画
  const [show, setShow] = useState (false);
  const [query, setQuery] = useState ('');

  const sl=useRef(null)
      // 由于是传给子组件的方法，尽量用 useCallback 包裹，以使得在依赖未改变，始终给子组件传递的是相同的引用
      const searchBack = useCallback (() => {
        setShow (false);
      }, []);
      const handleQuery = (q) => {
        setQuery (q);
      }
      useEffect (() => {
        setShow (true);
      }, []);
  return (
    <CSSTransition
    in={show}
    timeout={300}
    appear={true}
    classNames="fly"
    unmountOnExit
    onExited={() => props.history.goBack ()}
  >
    <Container>
      {/* <div onClick={() => (setShow(false))}> 返回 </div> */}
      <div className="search_box_wrapper">
        <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
      </div>
     </Container>
  </CSSTransition>
  )
}

export default Search;
 