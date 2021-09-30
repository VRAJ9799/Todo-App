import {Box, Button, Grid, makeStyles, TextField, Typography,} from "@material-ui/core";
import {useState} from "react";
import toast from "react-hot-toast";
import {useAuth} from "../Context/AuthContext";
import {Link, useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        border: "1px solid black",
    },
    textInput: {
        margin: theme.spacing(1, 0),
    },
    btn: {
        margin: theme.spacing(2, 0, 1, 0)
    }
}));

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signUp} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            toast.success("User created");
            history.push("/")
        } catch (error) {
            toast.error("Error while creating account");
        }
    };

    return (
        <Box marginTop="1rem">
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item container justifyContent="center">
                        <Grid item xs={10} md={2}>
                            <Typography align={"center"} variant={"h6"}>Sign Up</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center">
                        <Grid item xs={10} md={2}>
                            <TextField
                                name="email"
                                type="email"
                                value={email}
                                variant="outlined"
                                placeholder="Email"
                                label="Email"
                                size="small"
                                fullWidth
                                className={classes.textInput}
                                onChange={({target}) => setEmail(target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center">
                        <Grid item xs={10} md={2}>
                            <TextField
                                name="password"
                                type="password"
                                value={password}
                                variant="outlined"
                                placeholder="Password"
                                label="Password"
                                size="small"
                                fullWidth
                                className={classes.textInput}
                                onChange={({target}) => setPassword(target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center">
                        <Grid item xs={10} md={2}>
                            <Typography variant={"subtitle2"}>
                                Already having an account? <Link to={"/login"} style={{textDecoration: "none"}}>Login
                                Here</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center">
                        <Grid item xs={10} md={2}>
                            <Button
                                variant="outlined"
                                type="submit"
                                fullWidth
                                color="primary"
                                className={classes.btn}
                                disabled={Boolean(!email &&!password)}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
