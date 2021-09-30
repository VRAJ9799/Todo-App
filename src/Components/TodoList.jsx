import {Box, Button, Container, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import AddIcon from "@material-ui/icons/Add"
import {database} from "../firebaseConfig";
import firebase from "firebase/compat/app";
import Todo from "./Todo";
import {grey} from "@material-ui/core/colors";
import {useAuth} from "../Context/AuthContext";
import {toast} from "react-hot-toast";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5)
    },
    todoContainer: {
        marginTop: theme.spacing(3)
    },
    todos: {
        marginTop: theme.spacing(2)
    },
    addBtn: {
        border: "1px solid",
        borderRadius: "20px",
        borderColor: grey[300],
        backgroundColor: "white",
    }

}))

export default function TodoList() {
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState([]);
    const classes = useStyles();
    const history = useHistory();
    const {user} = useAuth()
    useEffect(() => {
        if (user !== null) {
            database.collection(`users/${user.uid}/todos`).orderBy("addedOn", "desc").onSnapshot(snapshot => {
                setTodos([]);
                snapshot.docs.map(doc => setTodos(prevData => ([...prevData, {id: doc.id, ...doc.data()}])))
            })
        } else history.push("/login")
    }, [user, history])


    const handleAddTodo = async () => {
        if (!title) return;
        try {
            await database.collection(`users/${user?.uid}/todos`).add({
                title,
                isCompleted: false,
                addedOn: firebase.firestore.FieldValue.serverTimestamp(),
            })
            setTitle("");
        } catch (error) {
            toast.error("Error while adding the Task")
        }
    }
    const handleCompleted = async (id, value) => {
        try {
            await database.collection(`users/${user?.uid}/todos`).doc(id).update({
                isCompleted: value
            })
        } catch (error) {
            toast.error("Error while Updating the task")
        }
    }
    const handleDelete = async (id) => {
        try {
            await database.collection(`users/${user?.uid}/todos`).doc(id).delete();
        } catch (error) {
            toast.error("Error while deleting the task")
        }

    }
    return (
        <>
            <Container maxWidth={"xs"} className={classes.root}>
                <Grid container>
                    <Grid item>
                        <Typography color={"textPrimary"} variant={"h5"}>Today's Tasks</Typography>
                    </Grid>
                </Grid>
                <Grid container className={classes.todoContainer}>
                    <Grid item container justifyContent={"space-between"}>
                        <Grid item md={10} xs={10}>
                            <TextField name={"todo"} value={title} placeholder={"Enter todo"} variant={"standard"}
                                       pattern={/[a-zA-Z ]+/i}
                                       fullWidth={true}
                                       size={"small"}
                                       label={"Enter todo"} onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item md={1} xs={1}>
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
                                <Button onClick={() => handleAddTodo()} disabled={!title} className={classes.addBtn}>
                                    <AddIcon color={"primary"} fontSize={"medium"}/>
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container className={classes.todos}>
                    {todos ? todos.map((todo) => <Todo todo={todo} key={todo.id} handleCompleted={handleCompleted}
                                                       handleDelete={handleDelete}/>
                    ) : ""}
                </Grid>
            </Container>
        </>
    )
}
