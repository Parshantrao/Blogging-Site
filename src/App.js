import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import DashboardPage from './pages/dashboard/DashboardPage';
import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SignupPage';
import MyBlogs from './pages/myBlogs/MyBlogs';
import BlogsPage from './pages/blogs/BlogsPage';
import ProfilePage from './pages/profle/ProfilePage';
import { AuthProvider } from './utils/context/AuthContext';
import ProtectedRoutes from './utils/routes/ProtectedRoutes';
// import NotFoundPage from './pages/notfound/NotFoundPage';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route element={<Layout />}>
            <Route path='/' element={<DashboardPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path='/blogs' element={<BlogsPage />} />
          </Route>
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
