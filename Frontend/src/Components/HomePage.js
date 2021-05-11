import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { Button, Icon, Card, CardItem, Thumbnail, Header, Left, Body, Right } from 'native-base'

class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            imgsource: '',
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = async () => {

        const requestOptions = {
          method: 'GET',
          headers: { 
              'Content-Type': 'application/json'
          },
        }
    
        const response = await fetch("http://192.168.1.78:9000/api/posts", requestOptions);
        const json = await response.json();
        console.log(json[0].imgsource);   
        
        this.setState({ title: json[0].title, description: json[0].description, imgsource: json[0].imgsource })
    
      };


    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: 'https://images.bfmtv.com/AFn-Kh1iHnrSraLWJEPT-KPs6SI=/40x3:584x309/640x0/images/-67818.jpg'}}/>
                        <Body>
                            <Text>Pablo Escobar</Text>
                            <Text note>Jan 15, 2021</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        source={{ uri: this.state.imgsource }}
                        style={{ height: 200, width: null, flex: 1}}
                    />
                </CardItem>
                <CardItem style={{ height: 45}}>
                    <Left>
                        <Button transparent>
                            <Text>likes</Text>
                        </Button>
                        <Button transparent>
                            <Text>comment</Text>
                        </Button>
                        <Button transparent>
                            <Text>share</Text>
                        </Button>
                    </Left>
                </CardItem>

                <CardItem>
                    <Body>
                        <Text>{this.state.title}</Text>
                        <Text>{this.state.description}</Text>
                    </Body>
                </CardItem>

                <CardItem>
                    <TouchableOpacity onPress={() => 
                                console.log(this.state.imgsource) }>
                                <Text>TEST</Text>
                    </TouchableOpacity>
                </CardItem>
            </Card>


    )
  }
}

export default HomePage