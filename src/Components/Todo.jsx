import {Checkbox, Grid, makeStyles, Typography} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {green, grey} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    todo: {
        display: "flex",
        alignItems: "center",
        border: "1px solid",
        borderColor: grey[300],
        borderRadius: 15,
        margin: theme.spacing(1, 0),
        padding: theme.spacing(0.5, 0),
        backgroundColor: "white"
    },
    todoText: {
        verticalAlign: "middle",
        flexWrap: "wrap",
        fontSize: "0.9rem",
        margin: 0,
        padding: 0,
    },
    isCompleted: {
        color: green[400],
        "&.Mui-checked": {
            color: green[600]
        }
    }
}));


export default function Todo({todo, handleCompleted, handleDelete}) {
    const classes = useStyles();
    return (
        <>
            <Grid item container className={classes.todo}>
                <Grid item md={2} xs={2}>
                    <Checkbox checked={todo.isCompleted} name={"isCompleted"} size={"small"}
                              className={classes.isCompleted}
                              onChange={(e) => handleCompleted(todo.id, e.target.checked)}/>
                </Grid>
                <Grid item md={8} xs={8}>
                    <Typography component={"span"} gutterBottom className={classes.todoText}>{todo.title}</Typography>
                </Grid>
                <Grid item md={2} xs={2}>
                    <DeleteOutline onClick={() => handleDelete(todo.id)} style={{cursor:"pointer"}} fontSize={"small"} color={"error"}/>
                </Grid>
            </Grid>
        </>
    )
}
