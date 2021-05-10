import React, { useState, useContext } from 'react';
import './Login.css'
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faGoogle } from '@fortawesome/free-brands-svg-icons'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const onSubmit = data => {
    if (newUser) {
      if (data.password === data.confirmPassword) {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
          .then(res => {
            // console.log(res);
            updateName(data.name);
            const newUser = {
              email: data.email,
              name: data.name
            }
            setLoggedInUser(newUser);
            history.replace(from);
          })
          .catch(err => {
            alert(err.message);
          })
      }
      else {
        alert("confirm password will be same");
      }
    }
    else {
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(res => {
          // console.log(res);
          const { displayName, email } = res.user;
          const newUser = {
            email: email,
            name: displayName
          }
          setLoggedInUser(newUser);
          history.replace(from);
        })
        .catch(err => {
          alert(err.message);
        })
    }

  }

  const updateName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    }).then(function () {
      console.log("Update successful");
    }).catch(function (error) {
      console.log("An error happened");
    });
  }

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignin = () => {
    firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const newUser = {
        email: email,
        name: displayName,
        photo: photoURL
      }
      setLoggedInUser(newUser);
      history.replace(from);
    })
    .catch(err => {
      alert(err.message);
    })
  }
  
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleFbLogin = () => {
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((res) => {
      const {displayName, photoURL, email} = res.user;
      const newUser = {
        email: email,
        name: displayName,
        photo: photoURL
      }
      setLoggedInUser(newUser);
      history.replace(from);
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  return (
    <div>
      <form className="verify-form" onSubmit={handleSubmit(onSubmit)}>
        {
          newUser && <input {...register("name", { required: true })} placeholder="full name" />
        }
        {errors.name && newUser && <span className="error"><small>Enter your name</small></span>}

        <input {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} placeholder="email" />
        {errors.email && <span className="error"><small>correct email is required</small></span>}

        <input {...register("password", { required: true, minLength: 6, pattern: /\d/ })} placeholder="password" />
        {errors.password && <span className="error"><small>must contain at least one digit and length be 6</small></span>}

        {
          newUser && <input {...register("confirmPassword", { required: true })} placeholder="confirm password" />
        }
        {errors.confirmPassword && newUser && <span className="error"><small>This field is required</small></span>}

        <input type="submit" className="submitStyle" value={newUser ? "SignUp" : "LogIn"} />

        {
          newUser ? <p>Already have an account? <span className="accountSetting" onClick={() => setNewUser(false)}>Login here</span></p> : <p>Don't have an account? <span className="accountSetting" onClick={() => setNewUser(true)}>Create an Account</span></p>
        }
      </form>
      <h4 className='or'><span>Or</span></h4>
      <div className="forButton">
        <button type="button" className="btn btn-light  mt-2" onClick={handleGoogleSignin}><FontAwesomeIcon  icon={faGoogle} size="1x" style={{backgroundColor:"rgb(204, 204, 204)",color:'rgb(43, 69, 100)',borderRadius:'5px',marginRight:'5px'}}/>  Continue with Google</button>
        <br />
        <button type="button" className="btn btn-light  mt-3"onClick={handleFbLogin}><FontAwesomeIcon 
         icon={faFacebook} size="1x" style={{backgroundColor:"rgb(204, 204, 204)",color:'rgb(0, 138, 230)',borderRadius:'5px',marginRight:'7px'}}/>
        Continue with Facebook</button>
      </div>
    </div>
  );
};

export default Login;