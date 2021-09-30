import {AppBar, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {useAuth} from "../Context/AuthContext";
import {ExitToAppOutlined} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {CgProfile} from "react-icons/all";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: theme.spacing(2)
    },
    name: {
        marginLeft: theme.spacing(2)
    },
    logoutBtn: {
        marginLeft: theme.spacing(2),
        backgroundColor: "inherit",
        color: "white",
        boxShadow: "none",
        outline: "none",
        border: "none"
    }
}));

export default function Header({handleLogOut}) {
    const {user, logout} = useAuth();
    const history = useHistory();
    const classes = useStyles();
    const handleLogout = async () => {
        await logout();
    }
    return (
        <>
            <AppBar position={"static"} color={"primary"}>
                <Toolbar className={classes.root}>
                    {user ? <>
                            <Typography className={classes.name} component={"span"}>{user?.displayName}</Typography>
                            <IconButton color={"inherit"} onClick={() => handleLogout()} edge={"end"}>
                                <ExitToAppOutlined/>
                            </IconButton>
                        </> :
                        <IconButton color={"inherit"} onClick={() => history.push("/login")} edge={"end"}>
                            <CgProfile/>
                        </IconButton>}
                </Toolbar>
            </AppBar>
        </>
    )
}
