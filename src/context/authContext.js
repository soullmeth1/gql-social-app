import { createContext, useContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
};

if (localStorage.getItem('jwtToken')) {
  const tokenDecoded = jwtDecode(localStorage.getItem('jwtToken'));
  // console.log(tokenDecoded);
  if (tokenDecoded.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = {
      ...tokenDecoded,
      token: localStorage.getItem('jwtToken'),
    };
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      break;
  }
}

function WrapAuthContext(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({ type: 'LOGIN', payload: userData });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }
  return <AuthContext.Provider value={{ state, login, logout }} {...props} />;
}

const GetAuthContext = () => useContext(AuthContext);

export { WrapAuthContext, GetAuthContext };
