import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";
import LogOut from "./pages/login/LogOut";

import Loading from "./components/loading";
import Developers from "./components/developer";
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Login = lazy(() => import("./pages/login/index"));
const UpdateAttendance = lazy(() =>
  import("./pages/dashboard/Dashboard-components/Admin/n_update_attendance")
);
const ViewAttendance = lazy(() =>
  import("./pages/dashboard/Dashboard-components/Admin/n_view_attendance")
);
const ViewAttendanceClasses = lazy(() =>
  import("./pages/dashboard/Dashboard-components/Admin/n_view_attendance_class")
);
const UserMainIndex = lazy(() => import("./pages/dashboard/UserMainIndex"));
const StudentAttendanceLog = lazy(() =>
  import("./pages/dashboard/Dashboard-components/student/N_AttendanceLog")
);
const SendAMessage = lazy(() =>
  import("./pages/dashboard/Dashboard-components/student/SendMessage")
);
const ChangePassword = lazy(() =>
  import("./pages/dashboard/Dashboard-components/ChangePassword")
);
// import Footer from "./components/footer/footer";
function App() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<UserMainIndex />} />
              <Route path="update" element={<UpdateAttendance />}></Route>
              <Route path="view" element={<ViewAttendance />} />
              <Route path="class" element={<ViewAttendanceClasses />} />
              <Route path="attendance-log" element={<StudentAttendanceLog />} />
              <Route path="change-pass" element={<ChangePassword />} />
            </Route>
            <Route path="/logout" element={<LogOut />} />
            <Route path="/message" element={<SendAMessage />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
