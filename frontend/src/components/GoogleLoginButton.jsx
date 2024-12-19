import React, { useEffect } from 'react';

const GoogleLoginButton = () => {
    useEffect(() => {
        /* Initialize the Google Sign-In button */
        window.google.accounts.id.initialize({
            client_id: 'YOUR_CLIENT_ID',
            callback: handleCredentialResponse,
        });

        /* Render the button */
        window.google.accounts.id.renderButton(
            document.getElementById('google-login-button'),
            { theme: 'outline', size: 'large' } // Customize button options
        );
    }, []);

    /* Handle the login response */
    const handleCredentialResponse = (response) => {
        console.log('Encoded JWT ID token:', response.credential);

        // You can send this token to your backend for validation
    };

    return (
        <div>
            <h1>Google Login</h1>
            <div id="google-login-button"></div>
        </div>
    );
};

export default GoogleLoginButton;
