import React from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../redux/features/search/search-slice';
import { useNavigate } from 'react-router-dom';
const SearchForm = () => {
    
    const dispatch=useDispatch()
    
    const {text}=useSelector(state=>state.search)
    const navigate=useNavigate();
    
    const handleChange=(e)=>{
        dispatch(setSearchQuery(e.target.value))
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        navigate(`/shop?${text}`)
        


    }
    
  return (
    <div>
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 ,height:30,borderRadius:100 ,opacity: 0.9 ,marginRight:'15px'}}
            onSubmit={handleSubmit}
        >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="search Products"
        inputProps={{ 'aria-label': 'search Products' }}
        onChange={handleChange}
        value={text}
      />
      <IconButton type="button" onClick={handleSubmit} sx={{ p: '10px' }} aria-label="search">
        <SearchIcon   />
      </IconButton>
    </Paper>
    </div>
  )
}

export default SearchForm