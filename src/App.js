import React, { useState, useEffect } from "react";
import "./assets/css/App.css";
import Post from './components/post.jsx'
import { db } from './firebase';
import { makeStyles, Button, Input } from "@material-ui/core";
import Modal from '@material-ui/core/Modal'
import { auth } from "firebase";


//useEffects : runs a piece of code based on a specific condition

function getModelStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };

}

const useStyle = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxBoder: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))


function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const classes = useStyle();
  const [modalStyle] = useState(getModelStyle);

  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in...
        console.log(user);
        setUser(authUser);
      } else {
        // user has logged out
        setUser(null);
      }
    })

    return () => {
      // perform some cleanup actions 
      unsubscribe();
    }

  }, [user, username]);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
  }

  useEffect(() => {
    // this is were the code runs and using [] makes it work for single time & onSnapshot is powerfull listner that watches new doc in firebase db 
    // doc.data gives every prop from db
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    });
  }, []);

  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signup">
            <center>
              <img className="app-headerImage" src={require('./assets/img/instagram-logo.png')} alt="" />
            </center>
            <Input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" onClick={signUp}>Sigh Up</Button>
          </form>
        </div>
      </Modal>
      <div className="app-header">
        <img className="app-headerImage" src={require('./assets/img/instagram-logo.png')} alt="">
        </img>

      </div>
      <Button onClick={() => { setOpen(true) }}>
        Signup
      </Button>
      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />  /* using key helps use to render only the specific post from db, not etire database */
        ))
      }

    </div>
  );
}

export default App;
