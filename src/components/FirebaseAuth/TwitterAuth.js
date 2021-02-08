import firebase from '../../Firebase';

const TwitterAuth = (e) => {
    e.preventDefault();

    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            const token = result.credential.accessToken;
            const secret = result.credential.secret;
            console.log(token);
            console.log(secret);
        }
        const user = result.user;
        console.log(user);
        }).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log(errorCode);
            console.log(errorMessage);
            console.log(email);
            console.log(credential);
    });
}

export default TwitterAuth;