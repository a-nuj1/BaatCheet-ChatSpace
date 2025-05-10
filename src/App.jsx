import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import {server} from "./constants/config"
import { useDispatch, useSelector } from "react-redux";

import {Toaster} from "react-hot-toast"
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { SocketProvider } from "./socket";
import InstantLoad from "./pages/InstantLoad";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(()=>import("./pages/admin/UserManagement"));
const ChatManagement = lazy(()=>import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(()=>import("./pages/admin/MessageManagement"))


function App() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false); 

  useEffect(() => {
    axios.get(`${server}/api/v1/user/profile`, {
      withCredentials: true
    })
    .then(({ data }) => dispatch(userExists(data.user)))
    .catch(() => dispatch(userNotExists()))
    .finally(() => setAuthChecked(true)); 
  }, [dispatch]);



  return (
    <Router>
      <Suspense fallback={<LayoutLoader/>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          
          {!authChecked && <Route path="/" element={<InstantLoad />} />}
          
          {authChecked && (
            <Route element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }>
              <Route path="/" element={<Home />} />
              <Route path="/chat/:chatId" element={<Chat />} />
              <Route path="/groups" element={<Groups />} />
            </Route>
          )}

          {/* ADMIN ROUTES */}
          {authChecked && (
            <>
              <Route path="/admin/dashboard" element={<Dashboard />}/>
              <Route path="/admin/users" element={<UserManagement/>}/>
              <Route path="/admin/chats" element={<ChatManagement/>}/>
              <Route path="/admin/messages" element={<MessageManagement/>}/>
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
