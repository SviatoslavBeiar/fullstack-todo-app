import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './security/AuthContext';

//import { AuthProvider, useAuth } from './security/AuthContext';
import LoginComponent from './LoginComponent';
import WelcomeComponent from './WelcomeComponent';
import ListTodosComponent from './ListTodosComponent';
import ErrorComponent from './ErrorComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import LogoutComponent from './LogoutComponent';
import TodoComponent from './TodoComoponent';


function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>

            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/welcome/:username" element={
              <AuthenticatedRoute>
                <WelcomeComponent />
              </AuthenticatedRoute>
            } />
            <Route path="/todos" element={
              <AuthenticatedRoute>
                <ListTodosComponent />
              </AuthenticatedRoute>
            } />
            <Route path="/todo/:id" element={
              <AuthenticatedRoute>
                <TodoComponent/>
              </AuthenticatedRoute>
            } />
            <Route path="/logout" element={
              <AuthenticatedRoute>
                <LogoutComponent />
              </AuthenticatedRoute>
            } />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          {/* <FooterComponent /> */}
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated)
    return children;

  return <Navigate to="/" />;
}

export default TodoApp;










