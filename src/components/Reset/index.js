// == Import
import './style.scss';
import  { useNavigate }  from "react-router-dom";
import { useDispatch } from 'react-redux';

// == Composant
function Test() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    
  }
  const handleKeyUp = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      const value = e.target.value;
      dispatch({
        type: 'SEARCH_VALUE',
        value: e.target.value,
      })
      navigate(`/search/${value}`)
     
  }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onKeyUp={handleKeyUp}/>
    </form>
  );
}

// == Export
export default Test;
