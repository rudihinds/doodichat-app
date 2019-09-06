import React from 'react';
import './App.css';
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import Chatkit from '@pusher/chatkit-client'
import config from './config'



class App extends React.Component {

  constructor(){
    super()  
   this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
   }

   this.sendMessage = this.sendMessage.bind(this)
   this.subscribeToRoom = this.subscribeToRoom.bind(this)
   this.getRooms = this.getRooms.bind(this)
   this.createRoom = this.createRoom.bind(this)

}


  componentDidMount(){
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:4d916ea9-31a3-4ea4-8267-1e2475e2280f",
      userId: "user_1",
      tokenProvider: new Chatkit.TokenProvider({
      url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/4d916ea9-31a3-4ea4-8267-1e2475e2280f/token"
      })
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.getRooms()  
      })
      .catch(error => {
        console.error("error:", error);
  })
}

getRooms(){
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
      })
    })
      .catch(err => console.log('error on joinableRooms: ', err))
}

// clickedRoom(){

// }

subscribeToRoom(roomId){
  this.setState({ messages: [] })
  this.currentUser.subscribeToRoomMultipart({
    roomId: roomId,
    messageLimit: 20,
    hooks: {
      onMessage: message => {
        this.setState({
          messages: [...this.state.messages, message]
        })
      }
    }
  }).then(room => {
    this.setState({ roomId: room.id })
    this.getRooms()
  })
  .catch(error => console.log('error on subscribing to room: ', error))
}

sendMessage(text){
  this.currentUser.sendMessage({
    text: text,
    roomId: this.state.roomId
  })
}

createRoom(name){
  this.currentUser.createRoom({
    name
  })
  .then(room => this.subscribeToRoom(room.id))
  .catch(error => console.log("Error with create room: ", error))

}
// setUpNewMessage(newMessage) => {
//   console.log(this.state.messages)
// }



render() { 
  // console.log(this.state.joinableRooms)
  // console.log(this.state.message)
  // console.log(this.state.messages)
  return (
    <div className="App">
      <RoomList 
        roomId={this.state.roomId}
        rooms={[...this.state.joinedRooms, ...this.state.joinableRooms]}
        subscribeToRoom={this.subscribeToRoom}
        />
      <MessageList 
        messages={this.state.messages}
        roomId={this.state.roomId} 
        />
      <SendMessageForm 
        sendMessage={this.sendMessage}
        disabled={!this.state.roomId}
        />
      <NewRoomForm createRoom={this.createRoom} />
    </div>
  );
}

}
export default App;


// console.log(`${currentUser.name}: `, message.parts[0].payload.content)
// 