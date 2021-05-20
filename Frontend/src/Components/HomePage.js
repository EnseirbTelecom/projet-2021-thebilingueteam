import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, RefreshControl, TouchableOpacity } from 'react-native';

import { Button, Icon, Card, CardItem, Thumbnail, Header, Left, Body, Right } from 'native-base'
import { CirclesLoader, PulseLoader, TextLoader, DotsLoader } from 'react-native-indicator'

import { Provider } from 'react-redux'
import Store from '../Store/configureStore'
import { connect } from 'react-redux'


class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            imgsource: '',
            datasource: [],
            refreshing: false,
            count: 1,
            end: false,
            following: [],
            suggestList: [],
        }
    }


    renderItem = ({ item }) => {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={item.userPP ? { uri: item.userPP } : null} />
                        <Body>
                            <Text>{item.username}</Text>
                            <Text note>{item.date}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        source={item.imgsource ? { uri: item.imgsource } : null}
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

    renderItemSuggest = ({ item }) => {
        return (
            <Card>
                <CardItem>
                    <Body>
                        <Image
                            style={{ width: 45, height: 45, borderRadius: 37.5 }}
                            source={item.userPP ? { uri: item.userPP } : null} />
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>{item.pseudo}</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <TouchableOpacity
                            style={styles.followButton}
                            onPress={() => {
                                this._handleFollow(item.pseudo);
                                this.updateSuggest(item.pseudo);
                            }}>
                            <Text style={styles.followText}>Follow</Text>
                        </TouchableOpacity>
                    </Body>
                </CardItem>
            </Card>
        )
    }

    updateSuggest(user) {
        var array = [...this.state.suggestList]; // make a separate copy of the array
        console.log(user);
        var index = array.findIndex(item => item.pseudo === user)
        console.log(index)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ suggestList: array });
        }
        console.log(this.state.suggestList);
    }

    getSuggests = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer' + ' ' + this.props.authToken,
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch("http://192.168.1.22:9000/api/user/suggests", requestOptions);
        const json = await response.json();
        this.setState({ suggestList: json });
    }


    _handleFollow = async (username) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer' + ' ' + this.props.authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userFollowed: username,
            })
        }
        const response = await fetch("http://192.168.1.22:9000/api/user/follow", requestOptions);
    }

    componentDidMount() {

        this.getUserInfo().then(() => {
            if (this.state.following.length != 0) {
                this.getPosts()
            }
            else {
                this.getSuggests().then(() => {
                    this.setState({ loading: false })
                })
            }

        })
    }

    getPosts = async () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'offset': this.state.count,
            },
            body: JSON.stringify({
                following: this.state.following,
            })

        }

        const response = await fetch("http://192.168.1.22:9000/api/posts", requestOptions);

        if (!response.ok) {
            console.log('fin de la liste');
            this.setState({ end: true });
        } else {
            const json = await response.json();
            this.setState({ datasource: this.state.datasource.concat(json) });
            this.setState({ loading: false, refreshing: false });
        }

        console.log('end get podtst');
    }

    getUserInfo = async () => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer' + ' ' + this.props.authToken,
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch("http://192.168.1.22:9000/api/user", requestOptions);
        const json = await response.json();
        this.setState({ following: json.following })
    }


    _handleLoadMore = () => {
        console.log('LOAD MORE')
        this.setState({ count: this.state.count + 1 }, () => { this.getPosts() });
        console.log(this.state.datasource.length)
    }

    _handleFooterComponent = () => {
        return (
            <View>
                {this.state.end ? (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.logo}>No more posts</Text>
                    </View>
                ) : (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <DotsLoader color='#fb5b5a' />
                    </View>
                )}
            </View>
        )
    }

    _handleRefresh = () => {
        this.setState({
            count: 1,
            refreshing: true,
            loading: true,
            end: false,
            datasource: [],
            following: [],
        }, () => {
            this.getUserInfo().then(() => {
                if (this.state.following.length != 0) {
                    this.getPosts()
                }
                else {
                    this.setState({ loading: false })
                }
            })
        })
    }

    render() {
        return (
            <Provider store={Store}>
                <View>
                    {this.state.loading ? (
                        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 250 }}>
                            <CirclesLoader color='#fb5b5a' />
                            <TextLoader text="Loading" color='#fb5b5a' />
                        </View>
                    ) : (
                        <View>
                            {this.state.following.length != 0 ? (
                                <View>
                                    <FlatList
                                        data={this.state.datasource}
                                        renderItem={this.renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        onEndReached={this._handleLoadMore}
                                        onEndReachedThreshold={0.1}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={this.state.refreshing}
                                                onRefresh={this._handleRefresh}
                                            />
                                        }
                                        ListFooterComponent={this._handleFooterComponent()}
                                    />

                                </View>
                            ) : (
                                <View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.logo}>Suggestions</Text>
                                    </View>
                                    <FlatList
                                        data={this.state.suggestList}
                                        renderItem={this.renderItemSuggest}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal={true}
                                    />
                                    <View style={{ alignItems: 'center', marginTop: 25, width: '100%' }}>
                                        <TouchableOpacity
                                            style={styles.followButton}
                                            onPress={() => this._handleRefresh()}>
                                            <Text style={styles.followText}>Refresh</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}

                </View>
            </Provider>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },
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


export default connect(mapStateToProps)(HomePage)