import React, { Component } from 'react'
import {
  View,
  Text,
  Modal,
  Image,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Platform,
} from 'react-native'
import { Linking } from 'expo'
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  MessageText,
} from 'react-native-gifted-chat'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import RBSheet from 'react-native-raw-bottom-sheet'
import { api_url } from '../../constants/Api'
import LoadItem from '../../components/LoadItem'
import LoadItemChat from '../../components/LoadItemChat'
import LoadInfoChat from '../../components/LoadInfoChat'
import Colors from '../../constants/Colors'

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      loading: true,
      modalVisible: false,
      loadModal: false,
      modalLoader: false,
      loads: [],
      selectedLoad: null,
    }
    this.user = {
      id: props.navigation.getParam('userId'),
      name: props.navigation.getParam('userName'),
      image: props.navigation.getParam('userImage'),
    }
    this.friend = {
      id: props.navigation.getParam('friendId'),
      name: props.navigation.getParam('friendName'),
      image: props.navigation.getParam('friendImage'),
    }

    this.friendChatRef = this.getRef().child(
      `chat/${this.friend.id}/${this.user.id}/messages`
    )
    this.chatRef = this.getRef().child(
      `chat/${this.user.id}/${this.friend.id}/messages`
    )

    this.chatRefForDelete = this.getRef().child(
      `chat/${this.user.id}/${this.friend.id}`
    )

    this.userInfoRef = this.getRef().child(
      `chat/${this.user.id}/${this.friend.id}/info`
    )
    this.friendInfoRef = this.getRef().child(
      `chat/${this.friend.id}/${this.user.id}/info`
    )

    this.chatRefData = this.chatRef.orderByChild('order')
    this.onSend = this.onSend.bind(this)
    this.pickImage = this.pickImage.bind(this)
    this.pickDoc = this.pickDoc.bind(this)
    this.handleModal = this.handleModal.bind(this)
    this.handleLoadModal = this.handleLoadModal.bind(this)
    this.fetchLoads = this.fetchLoads.bind(this)
    this.handleLoadTouch = this.handleLoadTouch.bind(this)
    this.renderCustomView = this.renderCustomView.bind(this)
    this.setSelectedLoad = this.setSelectedLoad.bind(this)

    props.navigation.setParams({
      fname: props.navigation.getParam('friendName'),
      chatRefInNavigation: this.chatRefForDelete,
    })
  }

  static navigationOptions = function ({ navigation }) {
    return {
      title: navigation.getParam('fname'),
      headerRight: function () {
        return (
          <TouchableWithoutFeedback
            onPress={function () {
              const chatRef = navigation.getParam('chatRefInNavigation')
              Alert.alert('', 'Delete this chat', [
                {
                  text: 'Cancel',
                  onPress: () => {},
                },
                {
                  text: 'OK',
                  onPress: () => {
                    chatRef.remove()
                    navigation.goBack()
                  },
                },
              ])
            }}
          >
            <MaterialCommunityIcons
              style={{ marginRight: 15 }}
              name="delete-outline"
              color="#fff"
              size={20}
            />
          </TouchableWithoutFeedback>
        )
      },
    }
  }

  async fetchLoads() {
    this.setState((prevState) => {
      return {
        ...prevState,
        modalLoader: true,
      }
    })
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=getload`, {
        method: 'POST',
        body: JSON.stringify({ token, limit: 'all' }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.status === '200') {
        this.setState((prevState) => {
          return {
            ...prevState,
            loads: json.data,
          }
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.setState((prevState) => {
        return {
          ...prevState,
          modalLoader: false,
        }
      })
    }
  }

  async pickImage() {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      // allowsEditing: true,
      // aspect: [1, 1],
      // base64: true
    })

    if (!pickerResult.cancelled) {
      let uri = pickerResult.uri
      let uriParts = uri.split('.')
      let fileType = uriParts[uriParts.length - 1]

      let formData = new FormData()
      formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      })

      try {
        const res = await fetch(`${api_url}?action=saveimage`, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        const json = await res.json()

        if (json.status === '200') {
          let now = new Date().getTime()
          this.chatRef.push({
            _id: now,
            text: '',
            image: json.url,
            createdAt: now,
            uid: this.user.id,
            order: -1 * now,
          })
          this.friendChatRef.push({
            _id: now,
            text: '',
            image: json.url,
            createdAt: now,
            uid: this.user.id,
            order: -1 * now,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  async pickDoc() {
    let pickerResult = await DocumentPicker.getDocumentAsync({
      type: 'application/*',
      copyToCacheDirectory: false,
    })

    if (pickerResult.type === 'success') {
      if (pickerResult.size > '10000000') {
        Alert.alert('Size should be smaller than 10MB')
        return
      }

      let parts = pickerResult.name.split('.')
      let fileType = parts[parts.length - 1]

      let mimeType
      if (fileType === 'pdf') {
        mimeType = 'application/pdf'
      } else if (fileType === 'docx') {
        mimeType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      } else if ((fileType = 'doc')) {
        mimeType = 'application/msword'
      }

      let formData = new FormData()
      formData.append('doc', {
        uri: pickerResult.uri,
        name: pickerResult.name,
        type: mimeType,
      })

      formData.append('filetype', fileType)

      try {
        const res = await fetch(`${api_url}?action=savedoc`, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        const json = await res.json()

        if (json.status === '200') {
          let now = new Date().getTime()
          this.chatRef.push({
            _id: now,
            docLink: {
              url: json.url,
              name: json.filename,
            },
            text: '',
            createdAt: now,
            uid: this.user.id,
            order: -1 * now,
          })
          this.friendChatRef.push({
            _id: now,
            docLink: {
              url: json.url,
              name: json.filename,
            },
            text: '',
            createdAt: now,
            uid: this.user.id,
            order: -1 * now,
          })
        }
      } catch (error) {
        console.log('from catch error', error)
      }
    }
  }

  getRef() {
    return firebase.database().ref()
  }

  generateChatId() {
    if (this.user.id > this.friend.id) {
      return `${this.user.id}-${this.friend.id}`
    } else {
      return `${this.friend.id}-${this.user.id}`
    }
  }

  onSend(messages = []) {
    messages.forEach((message) => {
      var now = new Date().getTime()
      this.chatRef.push({
        _id: now,
        text: message.text,
        createdAt: now,
        uid: this.user.id,
        order: -1 * now,
      })
      this.friendChatRef.push({
        _id: now,
        text: message.text,
        createdAt: now,
        uid: this.user.id,
        order: -1 * now,
      })
    })
  }

  listenForItems(chatRef) {
    chatRef.on('value', (snap) => {
      // get children as an array
      var items = []
      snap.forEach((child) => {
        // var name =
        //   child.val().uid == this.user.uid ? this.user.name : this.friend.name
        items.push({
          _id: child.val().createdAt,
          text: child.val().text,
          image: child.val().image,
          load: child.val().load,
          docLink: child.val().docLink,
          createdAt: new Date(child.val().createdAt),
          user: {
            _id: child.val().uid,
          },
        })
      })
      this.setState({
        loading: false,
        messages: items,
      })
    })
  }

  componentDidMount() {
    this.listenForItems(this.chatRefData)
    this.userInfoRef.set({
      id: this.friend.id,
      name: this.friend.name,
      image: this.friend.image,
    })
    this.friendInfoRef.set({
      id: this.user.id,
      name: this.user.name,
      image: this.user.image,
    })
  }

  componentWillUnmount() {
    this.chatRefData.off()
  }

  customBubble(bubbleProps) {
    return (
      <Bubble
        {...bubbleProps}
        timeProps={{
          right: { color: 'black' },
        }}
        textStyle={{
          right: { color: '#4A3C19' },
          left: { color: '#41403C' },
        }}
        wrapperStyle={{ right: { backgroundColor: '#F2DD9A' } }}
      />
    )
  }

  customSend(customSendProps) {
    return (
      <Send
        {...customSendProps}
        containerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
          marginRight: 5,
          // backgroundColor: '#f7f7f7',
          borderRadius: 10,
          // margin: 8
        }}
      >
        <Text>Send</Text>
        {/* <FontAwesome name="send" size={18} color={colors.greyishBrown} /> */}
      </Send>
    )
  }

  customInput(customInputProps) {
    return (
      <InputToolbar
        {...customInputProps}
        containerStyle={{
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopWidth: 0,
          paddingTop: 12,
          paddingBottom: 25,
          backgroundColor: '#f7f7f7',
          elevation: 2,
        }}
        primaryStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          marginHorizontal: 10,
          marginVertical: 20,
          // borderWidth: StyleSheet.hairlineWidth,
          // borderColor: 'black',
          backgroundColor: 'white',
        }}
      />
    )
  }

  customActions(customActionsProps) {
    return (
      <MaterialCommunityIcons
        {...customActionsProps}
        name="plus"
        size={22}
        style={{
          marginLeft: 10,
          backgroundColor: '#f7f7f7',
          borderRadius: 20,
          padding: 3,
        }}
        color="grey"
        onPress={() => this.RBSheet.open()}
      />
    )
  }

  handleModal() {
    this.setState((prevState) => {
      return {
        ...prevState,
        modalVisible: !prevState.modalVisible,
      }
    })
  }

  handleLoadModal() {
    this.setState((prevState) => {
      return {
        ...prevState,
        loadModal: !prevState.loadModal,
      }
    })
  }

  handleLoadTouch(data) {
    this.handleModal()

    const now = new Date().getTime()
    this.chatRef.push({
      _id: now,
      text: '',
      load: {
        pickDate: data.pickup_date,
        pickTime: data.pickup_time,
        pickAddress: data.pickup_address,
        dropDate: data.drop_date,
        dropTime: data.drop_time,
        dropAddress: data.drop_address,
        noOfLoads: data.no_of_loads,
        weight: data.total_weight,
        rate: data.rate,
      },
      createdAt: now,
      uid: this.user.id,
      order: -1 * now,
    })
    this.friendChatRef.push({
      _id: now,
      text: '',
      load: {
        pickDate: data.pickup_date,
        pickTime: data.pickup_time,
        pickAddress: data.pickup_address,
        dropDate: data.drop_date,
        dropTime: data.drop_time,
        dropAddress: data.drop_address,
        noOfLoads: data.no_of_loads,
        weight: data.total_weight,
        rate: data.rate,
      },
      createdAt: now,
      uid: this.user.id,
      order: -1 * now,
    })
  }

  setSelectedLoad(data) {
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedLoad: data,
      }
    })
  }

  renderCustomView({ currentMessage }) {
    if (currentMessage.load) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            this.handleLoadModal()
            this.setSelectedLoad(currentMessage.load)
            console.log(this.state.selectedLoad)
          }}
        >
          <View
            style={{
              margin: 5,
              borderRadius: 10,
            }}
          >
            <LoadItemChat data={currentMessage.load} />
          </View>
        </TouchableWithoutFeedback>
      )
    } else if (currentMessage.docLink) {
      return (
        <View style={{ margin: 10 }}>
          <TouchableWithoutFeedback
            onPress={() => Linking.openURL(currentMessage.docLink.url)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <AntDesign name="filetext1" size={35} color="brown" />
            <Text style={{ marginLeft: 10, color: '#696855' }}>
              {currentMessage.docLink.name}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      )
    }
    return null
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading && <ActivityIndicator color="#000" />}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.loadModal}
          onRequestClose={this.handleLoadModal}
        >
          <View
            style={{
              paddingVertical: 15,
              backgroundColor: Colors.greyishBrown,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>Load Info</Text>
          </View>
          <ScrollView>
            <LoadInfoChat load={this.state.selectedLoad} />
            <TouchableOpacity onPress={this.handleLoadModal}>
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 20,
                  backgroundColor: Colors.themeYellow,
                  alignItems: 'center',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  marginHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 5,
                }}
              >
                CLOSE
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.handleModal}
        >
          <View
            style={{
              paddingVertical: 15,
              backgroundColor: Colors.greyishBrown,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>Select Load</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            {this.state.modalLoader && <ActivityIndicator color="#000" />}
            <ScrollView>
              {this.state.loads.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      this.handleLoadTouch(item)
                    }}
                  >
                    <LoadItem data={item} />
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
            <TouchableOpacity onPress={this.handleModal}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  backgroundColor: Colors.themeYellow,
                  alignItems: 'center',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  marginHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 5,
                }}
              >
                CLOSE
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref
          }}
          height={120}
          duration={250}
          customStyles={{
            container: {
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            },
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.RBSheet.close()
              this.pickImage()
            }}
          >
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name="camera" size={30} color="grey" />
              <Text>Photos</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.RBSheet.close()
              this.fetchLoads()
              this.handleModal()
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{ height: 30, width: 30 }}
                source={require('../../assets/images/load-icon.png')}
              />
              <Text>Loads</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.RBSheet.close()
              this.pickDoc()
            }}
          >
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons
                name="file-upload"
                size={30}
                color="grey"
              />
              <Text>Files</Text>
            </View>
          </TouchableOpacity>
        </RBSheet>
        <GiftedChat
          messages={this.state.messages}
          user={{ _id: this.user.id, name: this.user.name }}
          onSend={this.onSend.bind(this)}
          alwaysShowSend={true}
          renderAvatar={null}
          renderBubble={this.customBubble}
          renderInputToolbar={this.customInput}
          renderSend={this.customSend}
          renderActions={this.customActions.bind(this)}
          renderCustomView={this.renderCustomView}
          minInputToolbarHeight={100}
          maxInputLength={400}
          timeTextStyle={{ right: { color: 'grey' } }}
          renderMessageText={(props) => (
            <MessageText {...props} linkStyle={{ right: { color: 'black' } }} />
          )}
        />
        {Platform.OS === 'android' && <KeyboardSpacer />}
      </View>
    )
  }
}
