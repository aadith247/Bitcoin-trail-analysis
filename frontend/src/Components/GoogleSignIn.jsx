// GoogleSignIn.jsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = '342566792485-s26lthuftus4cenqdt69pfer0h1hnq8h.apps.googleusercontent.com'; // Replace with your actual client ID

const GoogleSignIn = () => {
  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    // Handle the response and perform actions such as sending the token to your server
  };

  const handleLoginFailure = (response) => {
    console.error('Login Failed:', response);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        buttonText="Login with Google"
        className=" w-full mt-5" // You can adjust the styling as needed
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
