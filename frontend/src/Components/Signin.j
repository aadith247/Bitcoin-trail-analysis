
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

export const Signin = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log("Current User", user)

  return  <>
  <div>
    <h3>{ isAuthenticated &&`hello ${user.name}`}</h3>
    {
      isAuthenticated ? (<button onClick={e => logout()}>Logout</button>) : (  <button onClick={e=> loginWithRedirect()}>Login With Redirect</button>)
    }

  </div>
  </>;
};


