import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmptyCartDialogComp = ({open,setOpen,handleEmptyCart,products}) => {


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
  <>
    <div>
      <Button 
            variant='contained'   
            color='error' 
            onClick={handleClickOpen} 
            disabled={products.product && !products.product.length}>
                            Empty  Cart
        </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="Empty Cart"
      >
        <DialogTitle>{"Empty Cart"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are You sure: You Want to Empty Your Cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>Disagree</Button>
          <Button onClick={handleEmptyCart} variant='outlined'>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  </>
  )
}

export default EmptyCartDialogComp