import { createContext, useState } from 'react';

const AuthContext = createContext({});
const FollowingContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [logged, setLogged] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logged, setLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
