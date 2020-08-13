import React, { useState, useEffect } from "react";
import "./assets/css/App.css";
import Post from './components/post.jsx'
import { db } from './firebase';
import { makeStyles, Button } from "@material-ui/core";
import Modal from '@material-ui/core/Modal'

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


const signUp = (event) => {

}

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyle();
  const [modalStyle] = useState(getModelStyle);

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

      <Modal
        open={open}
        onClose={() => setOpen(false)}

      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img className="app-headerImage" src={require('./assets/img/instagram-logo.png')} alt="" />
          </center>
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
