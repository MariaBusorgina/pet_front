import {Box, CircularProgress} from "@mui/material";

const LoadingSpinner = (props: { loading: boolean }) => {
    return (
        <>
            {
                props.loading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CircularProgress sx={{color: 'secondary.main'}}/>
                    </Box>)
            }
        </>
    )
};

export default LoadingSpinner;
