import React, { useState, useEffect,useLayoutEffect } from 'react';
import {Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity,FlatList, Alert, Modal,Pressable } from 'react-native';
import { Provider, connect } from 'react-redux'
import Store from '../Store/configureStore'
import { Icon, Card, CardItem, Thumbnail, Container, Content, Header, Left, Body, Right } from 'native-base'
const vw = Dimensions.get('screen').width;
const vh = Dimensions.get('screen').height;

import { CirclesLoader, PulseLoader, TextLoader, DotsLoader } from 'react-native-indicator'

function FriendProfile({route, navigation}, {props}) {
    
    const { authToken, pseudo, mail, PPuri, bio, following, followers } = route.params;
    const [myFollowing, setmyFollowing] = useState([]);
    const [isFollowed, setisFollowed] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [postNumber,setPostNumber] = useState(0)
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState({});
    
    useEffect(() => {
        getUserPosts(); //we get user posts once we got usernanme
      },[pseudo]);
    
      useEffect(()=> {
        setPostNumber(posts.length);
        setisLoading(false); //once we got all the posts
      },[posts])



      useEffect(()=>{
        ModalPost();//we can render a modal only once we selected a post
      },[selectedPost])


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
      const displayPost = ()=>{
        setVisibility(!visibility)
      }
      const [visibility, setVisibility] = useState(false);

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
      const getUserPosts = async () =>{
        console.log(pseudo);
        const requestOptions = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'username': pseudo
          },
      }
    
      const response = await fetch("http://192.168.1.22:9000/api/posts/user", requestOptions);
      const json = await response.json();
      console.log(json);
      console.log('jai recu les posts')
      setPosts(json);
      }
      
    useEffect(() => {
      console.log('My Token :' + authToken);
      getUserInfo();
      console.log('My following :' + myFollowing);
    }, []);

    useEffect(() => {
      _isFollowing();
    }, [myFollowing]);

    const _isFollowing = () => {
      const ans = myFollowing.includes(pseudo);
      console.log(ans);
      if (ans == true){
        setisFollowed(true);
      } else {
        setisFollowed(false);
      }
    }

    const _handleFollow = async (username) => {
      const requestOptions = {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer' + ' ' + authToken,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              userFollowed: username,
          })
      }
      const response = await fetch("http://192.168.1.22:9000/api/user/follow", requestOptions);
    }

    const _handleUnfollow = async (username) => {
      const requestOptions = {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer' + ' ' + authToken,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              userFollowed: username,
          })
      }
      const response = await fetch("http://192.168.1.22:9000/api/user/unfollow", requestOptions);
    }

    const getUserInfo = async () => {

      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer' + ' ' + authToken,
          'Content-Type': 'application/json'
        },
      }
      const response = await fetch("http://192.168.1.22:9000/api/user", requestOptions);
      const json = await response.json();
      console.log(json.following)
      setmyFollowing(json.following);
    }

    return (
    <Provider store={Store}>
        {isLoading === true ? (
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 250 }}>
                <CirclesLoader color='#fb5b5a' />
                <TextLoader text="Loading" color='#fb5b5a'/>
             </View> )
       :(<Container style={{ flex: 1, backgroundColor: 'white' }}>
          <Content>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingLeft: 5, justifyContent: 'space-around' }}>
                  <View style={{width: 75, height: 75 ,borderRadius:37.5, backgroundColor:'#DCDCDC'}}>
                    <Image 
                    source={{uri: PPuri}}
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
                    {isFollowed === true ? (
                      <TouchableOpacity
                      style={styles.followButton}
                      onPress={() => {
                          _handleUnfollow(pseudo);
                          setisFollowed(false);
                      }}>
                      <Text style={styles.followText}>Unfollow</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                      style={styles.followButton}
                      onPress={() => {
                          _handleFollow(pseudo);
                          setisFollowed(true);
                      }}>
                      <Text style={styles.followText}>Follow</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>

              <View style={{ paddingBottom: 10, paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{pseudo}</Text>
                {bio === '' ? (
                  <Text></Text>
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
        </Container>
    )}
    </Provider>
    )  
 }
const styles = StyleSheet.create({
    followButton: {
        width: "100%",
        backgroundColor: "#fb5b5a",
        borderRadius: 10,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    followText: {
        color: "white",
    }
});

const mapStateToProps = (state) => {
    return state
  }
  
export default connect(mapStateToProps)(FriendProfile)

