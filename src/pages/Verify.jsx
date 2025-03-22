import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { verifyUser } from '../rtk/features/authSlice';
import { useParams } from 'react-router';
import { CircularProgress, Typography, Box } from '@mui/material';

function Verify() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const {token} = useParams()

    useEffect(() => {
        dispatch(verifyUser(token))
        setIsLoading(false)
    }, [])

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100vh" 
            fontFamily="Arial, sans-serif"
        >
            {isLoading ? (
                <>
                    <CircularProgress color="primary" />
                    <Typography variant="h6" color="primary" marginLeft={2}>
                        Verifying your account, please wait...
                    </Typography>
                </>
            ) : (
                <Typography variant="h6" color="success.main">
                    Verification complete!
                </Typography>
            )}
        </Box>
    )
}

export default Verify
