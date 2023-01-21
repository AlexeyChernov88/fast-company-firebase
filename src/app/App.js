import React from "react";
import Main from "./layout/main";
import Login from "./layout/login";
import Users from "./layout/users";
import LogOut from "./layout/logOut";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfesions";
import { QualityProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <ProfessionProvider>
                    <QualityProvider>
                        <Switch>
                            <Route path="/login/:type?" component={Login} />
                            <ProtectedRoute
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/logout" component={LogOut} />
                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </QualityProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
