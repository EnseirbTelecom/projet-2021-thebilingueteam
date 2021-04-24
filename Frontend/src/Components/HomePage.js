import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { Button, Icon, Card, CardItem, Thumbnail, Header, Left, Body, Right } from 'native-base'

class HomePage extends React.Component {
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
                source={{ uri: 'https://images.bfmtv.com/AFn-Kh1iHnrSraLWJEPT-KPs6SI=/40x3:584x309/640x0/images/-67818.jpg'}}
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
                    <Text>The description of the picture :)</Text>
                </Body>
            </CardItem>
        </Card>
    )
  }
}

export default HomePage