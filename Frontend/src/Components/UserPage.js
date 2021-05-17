import React, { useState, useEffect,useLayoutEffect } from 'react';
import {Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity,FlatList, Alert, Modal,Pressable } from 'react-native';
import { Icon, Card, CardItem, Thumbnail, Container, Content, Header, Left, Body, Right } from 'native-base'
const vw = Dimensions.get('screen').width;
const vh = Dimensions.get('screen').height;

import EditProfile from './EditProfile'

import { Provider } from 'react-redux'
import Store from '../Store/configureStore'
import { connect } from 'react-redux'
import { CirclesLoader, PulseLoader, TextLoader, DotsLoader } from 'react-native-indicator'



function UserPage(props) {
  
  useEffect(() => {
      props.navigation.addListener('focus', () => {
      getUserPosts();
    });
  }, [props.navigation]);

  const [username, setUserName] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const [profilePictureURI, setProfilePictureURI] = useState();
  const [bio, setBio] = useState('');
  const [postNumber,setPostNumber] = useState(0)

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});

  useEffect(() => {
    getUserInfo();// we get user profile
  })

  useEffect(() => {
    getUserPosts(); //we get user posts once we got usernanme
  },[username]);

  useEffect(()=> {
    setPostNumber(posts.length);
    setisLoading(false); //once we got all the posts
  },[posts])

  useEffect(()=>{
    ModalPost();//we can render a modal only once we selected a post
  },[selectedPost])

  const deletePost = async ()=> {
    console.log('suppression dun poste');
    const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'id': selectedPost._id
      },
  }

  const response = await fetch("http://192.168.1.78:9000/api/posts/post/delete", requestOptions);
  const json = await response.json();
  console.log(json);
  }

  const displayPost = ()=>{
    setVisibility(!visibility)
  }

  const [visibility, setVisibility] = useState(false);
  const [visibilitySupression, setVisibilitySupression] = useState(false);

  const ModalSupression = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visibilitySupression}
      >
        <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View style={{width:0.80*vw,backgroundColor:"white",borderRadius:0.03*vw}}>
            <Text style={{fontWeight:'bold',fontSize:20, textAlign: 'center'}}>
              Supprimer le post ?
            </Text>
            <View style={{flexDirection: 'row',justifyContent:'space-around',paddingTop:0.1*vw}}>
            <Pressable onPress={()=>setVisibilitySupression(!visibilitySupression)}>
              <Text>
                Annuler
              </Text>
            </Pressable>
            <Pressable onPress={()=>{
              deletePost()
              getUserPosts();
              setVisibilitySupression(!visibilitySupression)}}>
              <Text style={{fontSize:15,color:'red'}}>
                Supprimer
              </Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>)
  }

  const ModalPost = () =>{
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visibility}
        onRequestClose={() => {
          setVisibility(!visibility);
        }}
      >
        <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View style={{width:0.80*vw,borderRadius:0.03*vw, backgroundColor: "white"}}>
            <View style={{width:0.80*vw, flexDirection:'row',justifyContent:'space-between'}}>
              <Pressable onPress={()=>setVisibility(!visibility)}>
                <Image source={{uri: 'https://p.kindpng.com/picc/s/214-2148901_close-icon-svg-hd-png-download.png'}}
                style={{height: 0.1*vw,width:0.1*vw,marginTop:0.04*vw,marginLeft:0.04*vw}}/>
              </Pressable>
              <Pressable onPress={()=>{
                setVisibility(!visibility)
                setVisibilitySupression(!visibilitySupression);
                }}>
                <Image source={{uri: 'https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png'}}
                style={{height: 0.1*vw,width:0.1*vw,marginTop:0.04*vw,marginRight:0.04*vw}}/>
              </Pressable>
            </View>
            <View>
              <Text style={{fontSize: 15,fontWeight: 'bold', textAlign: 'center',paddingTop:0.05*vw }}>{selectedPost.title}</Text>
              <Image source={{uri: selectedPost.imgsource}}
              style={{height:0.80*vw,width:0.80*vw}}/>
              <Text style={{textAlign: 'center',paddingTop:0.05*vw,paddingBottom:0.05*vw}}>{selectedPost.description}</Text>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  const PostGrid = () =>{
    return(
    <View style={{flexDirection: 'row', flexWrap:'wrap'}} >
      {posts.map((post)=>
      <TouchableOpacity onPress={()=>{
        setSelectedPost(post)
        displayPost()
        }
      }>
        <View style={{height:0.333*vw,width:0.333*vw}}>
        <View style={{height:0.30*vw,width:0.30*vw,marginLeft:0.02*vw,marginTop:0.02*vw,backgroundColor:'#DCDCDC'}}>
        <Image 
        source={{uri:post.imgsource}}
        style={{height:0.30*vw,width:0.30*vw}}
        />
        </View>
        </View>
      </TouchableOpacity>)}
    </View>)
  }

  const _handleAuth = () => {
    const action = { type: "REMOVE_TOKEN", value: 'concombre' }
    props.dispatch(action)
  }

  const getUserInfo = async () => {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer' + ' ' + props.authToken,
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch("http://192.168.1.78:9000/api/user", requestOptions);
    const json = await response.json();
    setUserName(json.pseudo);
    setBio(json.bio);
    setProfilePictureURI(json.userPP);
  };

  const getUserPosts = async () =>{
    console.log(username);
    const requestOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'username': username
      },
  }

  const response = await fetch("http://192.168.1.78:9000/api/posts/user", requestOptions);
  const json = await response.json();
  console.log(json);
  console.log('jai recu les posts')
  setPosts(json);
  }

  return (
    <Provider store={Store}>
    
      {isLoading === true ? (
        
        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 250 }}>
            <CirclesLoader color='#fb5b5a' />
            <TextLoader text="Loading" color='#fb5b5a'/>
        </View>
        
      ) : (
          <Container style={{ flex: 1, backgroundColor: 'white' }}>
            <Header style={{ backgroundColor: 'white' }}>
              <Body><Text style={{ fontWeight: 'bold' }}>{username}</Text></Body>
              <Right>
                <TouchableOpacity
                  onPress={() => {
                    _handleAuth()
                    props.navigation.navigate('SignIn')
                  }}
                  style={{ flex: 1, width: "80%", backgroundColor: "#fb5b5a", borderRadius: 25, height: 30, alignItems: "center", justifyContent: "center", marginTop: 10, marginBottom: 10 }}>
                  <Text style={{ color: 'white' }}>Disconnection</Text>
                </TouchableOpacity>
              </Right>
            </Header>
            <Content>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, paddingLeft: 5, justifyContent: 'space-around' }}>
                    <View style={{width: 75, height: 75 ,borderRadius:37.5, backgroundColor:'#DCDCDC'}}>
                      <Image 
                      source={{uri: profilePictureURI}}
                      style={{width: 75, height: 75 ,borderRadius:37.5}}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 3 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <View style={{ alignItems: 'center' }}>
                        <Text>{postNumber}</Text>
                        <Text style={{ fontSize: 10, color: 'grey' }}>posts</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text>100</Text>
                        <Text style={{ fontSize: 10, color: 'grey' }}>followers</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text>109</Text>
                        <Text style={{ fontSize: 10, color: 'grey' }}>following</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('EditProfile', { authToken: props.authToken, bio: bio, uri: profilePictureURI, setBio: setBio, setURI: setProfilePictureURI })
                          console.log(props.authToken);
                        }}
                        style={{ flex: 1, width: "80%", backgroundColor: "#fb5b5a", borderRadius: 25, height: 30, alignItems: "center", justifyContent: "center", marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ color: 'white' }}>Edit Profile</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </View>

                <View style={{ paddingBottom: 10, paddingHorizontal: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>{username}</Text>
                  {bio === '' ? (
                    <Text>Vous n'avez pas de description, ajoutez en une en editant votre profil !</Text>
                  ) : (
                    <Text>{bio}</Text>
                  )}
                </View>
              </View>

              <View>
                    <PostGrid />
              </View>
            </Content>
            <ModalPost />
            <ModalSupression />
          </Container>
      )}  
    </Provider>
  )
}




const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(UserPage)