import {Box, Button, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useAuth} from "../Context/AuthContext";
import toast from "react-hot-toast";
import {Link, useHistory} from "react-router-dom";
import {FcGoogle} from "react-icons/all";
import {auth, googleAuthProvider} from "../firebaseConfig";

const useStyles = makeStyles(theme => ({
    root: {
        border: "1px solid black",
    },
    textInput: {
        margin: theme.spacing(1, 0),
    },
    googleIcon: {
        marginRight: theme.spacing(1)
    },
    btn: {
        margin: theme.spacing(2, 0, 1, 0)
    }
}))


export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, user} = useAuth();
    useEffect(() => {
        if (user) history.push("/")
    }, [user,history])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            toast.error("Error while login");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            googleAuthProvider.addScope("email");
            googleAuthProvider.addScope("profile");
            await auth.signInWithPopup(googleAuthProvider);
        } catch (error) {
            toast.error("Error while login");
        }
    }
    return (
        <>
            <Box marginTop="2rem">
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item container justifyContent={"center"}>
                            <Grid item>
                                <Typography variant={"h6"}>Log In</Typography>
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
                                <Link to={"/forgot-password"} style={{textDecoration: "none"}}>Forgot Password?</Link>
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
                        <Grid item container justifyContent={"center"}>
                            <Grid item xs={10} md={2}>
                                <Typography variant={"subtitle2"}>Not having an account? <Link to={"/sign-up"}
                                                                                               style={{textDecoration: "none"}}>Register
                                    Here</Link></Typography>
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
                                    disabled={Boolean(!email && !password)}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item container justifyContent="center">
                            <Grid item xs={10} md={2}>
                                <Button
                                    variant="outlined"
                                    type="button"
                                    fullWidth
                                    color="secondary"
                                    className={classes.btn}
                                    onClick={() => handleGoogleLogin()}
                                >
                                    <FcGoogle className={classes.googleIcon}/>
                                    Login with Google
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    )
}
