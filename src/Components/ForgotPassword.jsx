import {Button, Container, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {useAuth} from "../Context/AuthContext";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2)
    },
    textInput: {
        margin: theme.spacing(2, 0)
    }
}));


export default function ForgotPassword() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const {resetPassword} = useAuth();
    const history = useHistory();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await resetPassword(email);
            toast.success("Check mail to reset password")
            history.push("/login");
        } catch (error) {
            toast.error("Error while resetting the password")
        }
    }
    return (
        <>
            <Container maxWidth={"xs"} className={classes.root}>
                <form onSubmit={handleSubmit}>
                    <Grid container justifyContent={"center"}>
                        <Grid item md={12} xs={12}>
                            <Typography align={"center"} variant={"h6"}>Forgot Password</Typography>
                        </Grid>
                        <Grid item md={10} xs={10}>
                            <TextField name={"email"} variant={"outlined"} placeholder={"Email"}
                                       size={"small"}
                                       type={"email"}
                                       required={true}
                                       fullWidth={true}
                                       className={classes.textInput}
                                       onChange={(e) => setEmail(e.target.value)}/>
                        </Grid>
                        <Grid item md={10} xs={10}>
                            <Button type={"submit"} variant={"outlined"} disabled={!email} color={"primary"} fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    )
}
