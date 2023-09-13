import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert, Slide, useMediaQuery } from '@mui/material';


function AllowCookies() {
    const [openString, setOpenString] = React.useState(sessionStorage.getItem('isCookiesAllowed') || "false");

    const [open , setOpen] = React.useState(openString==="false");

    const view_768 = useMediaQuery('(min-width: 768px)');

    const state = {
        Transition: Slide,
    };

    const vertical='bottom';
    const horizontal='center';


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        sessionStorage.setItem('isCookiesAllowed', true);
    };

    const action = (
        <React.Fragment>
            <Button color="primary" style={{fontWeight:'600'}} size={view_768?'large':'medium'} onClick={handleClose}>
                Allow
            </Button>
        </React.Fragment>
    );
    
    return (
        <div>
            <Snackbar
                anchorOrigin={{vertical , horizontal}}
                open={open}
                onClose={handleClose}
                message="" // Write message to here
                action={action}
                TransitionComponent={state.Transition}
                key={state.Transition.name}
                autoHideDuration={10000}
            >
                <Alert severity='info'>This website uses cookies to ensure you get the best experience on our website</Alert>
            </Snackbar>
        </div>
    );
}

export default AllowCookies