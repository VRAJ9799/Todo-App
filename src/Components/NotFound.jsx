import {Box, Typography} from "@material-ui/core";

export default function NotFound() {
    return (
        <>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"calc(100vh - 4rem)"}>
                <Typography variant={"h5"}>404 Page Not Found</Typography>
            </Box>
        </>
    )
}
