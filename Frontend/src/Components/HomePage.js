import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, RefreshControl } from 'react-native';

import { Button, Icon, Card, CardItem, Thumbnail, Header, Left, Body, Right } from 'native-base'
import { CirclesLoader, PulseLoader, TextLoader, DotsLoader } from 'react-native-indicator'


class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            title: '',
            description: '',
            imgsource: '',
            datasource: [],
            refreshing: false,
        }
    }





    renderItem = ({ item }) => {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={ item.userPP ? { uri: item.userPP } : null} />
                        <Body>
                            <Text>{item.username}</Text>
                            <Text note>{item.date}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        source={ item.imgsource ? { uri: item.imgsource } : null}
                        style={{ height: 200, width: null, flex: 1 }}
                    />
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }

    componentDidMount() {
        console.log(this.state.refreshing);
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
        console.log(json);

        this.setState({ datasource: json });
        this.setState({ loading: false, refreshing: false })

    }

    _handleRefresh = () => {
        this.setState({
            refreshing: true,
        }, () => {
            this.getPosts();
        })
    }

    render() {
        return (
            <View>
                {this.state.loading ? (
                    <View style={{ alignItems: "center", justifyContent: "center", marginTop: 250 }}>
                        <CirclesLoader color='#fb5b5a' />
                        <TextLoader text="Loading" color='#fb5b5a' />
                    </View>
                ) : (
                    <View>
                        <FlatList
                            data={this.state.datasource}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            refreshControl={
                                <RefreshControl
                                  refreshing={this.state.refreshing}
                                  onRefresh={this._handleRefresh}
                                />
                            }
                        />
                    </View>
                )}

            </View>
        )
    }
}

export default HomePage