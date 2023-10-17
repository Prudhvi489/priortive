import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {styles} from '../../assets/styles/Styles_export'
const Rightarrow = () => {
  return (
    <div>
        <span style={{color:'white',border:`1px solid ${styles.app_color}`,fontSize:'0.6rem',padding:'1rem 1px 1px 1px',borderRadius:'2rem',backgroundColor:'#003556'}}><NavigateNextIcon/></span>
    </div>
  )
}

export default Rightarrow