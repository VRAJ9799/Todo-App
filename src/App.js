import SignUp from "./Components/SignUp";
import AuthProvider from "./Context/AuthContext";
import "./App.css";
import {Toaster} from "react-hot-toast";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import TodoList from "./Components/TodoList";
import Header from "./Components/Header";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import ForgotPassword from "./Components/ForgotPassword";

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path={"/"} component={TodoList}/>
                    <Route exact path={"/login"} component={Login}/>
                    <Route exact path="/sign-up" component={SignUp}/>
                    <Route exact path={"/forgot-password"} component={ForgotPassword}/>
                    <Route path={"*"} component={NotFound}/>
                </Switch>
            </BrowserRouter>
            <Toaster position="bottom-center" toastOptions={{duration: 3000}}/>
        </AuthProvider>
    );
}

export default App;
