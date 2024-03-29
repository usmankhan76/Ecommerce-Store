import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';



export default function UserProfileComponent({profileImage,role,loginUser,logOut}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const firstLetter=loginUser.email.charAt(0)
  const titleName=loginUser.email && loginUser.email.split('@')[0]
  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center'  }}>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            
          >
             <Avatar sx={{ width:32, height: 32}} src={profileImage&&profileImage} >{firstLetter}</Avatar> 
            
            <Typography align='right' color='grey' sx={{marginLeft:1}}>
                {titleName}
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        
      >
        {loginUser&& (
            <MenuItem>
            
            <Avatar sx={{ width:20, height: 20}} src={profileImage&&profileImage} >{firstLetter}</Avatar> Profile
            </MenuItem>

        )}
    
            <MenuItem>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
            <Link   
              to={role === "admin" ? 'admin/dashboard':'/user/dashboard' } 
              // to={role === "admin" ? 'admin/dashboard/products':'/user/dashboard' } 
                    style={{textDecoration:'none' ,color:'black'}}>
                            Dashboard
            </Link>
            </MenuItem>

        <Divider />
        {loginUser&& (
            <MenuItem onClick={()=>logOut()}>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            Logout
            </MenuItem>

        )}
      </Menu>
    </React.Fragment>

    
   
  );
}
