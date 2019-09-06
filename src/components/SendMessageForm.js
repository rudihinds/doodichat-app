import React from 'react'

class SendMessageForm extends React.Component {

    constructor(){
        super()

        this.state = {
            message: ""
        }


    this.getInputMessageText = this.getInputMessageText.bind(this)
    this.handleNewMessageSubmission = this.handleNewMessageSubmission.bind(this)
    }

    

        // getInputMessageText()
        // let newMessage = e.target.value
        // this.setState({ 
        //   message: newMessage
        //   })  
        // setUpNewMessage(newMessage)
        // this.setState({
        //   messages: [...this.state.messages, newMessage]
        // })
      

    getInputMessageText = (e) => {
        this.setState({
            message: e.target.value
        })
    // console.log(e.target)
    }

    handleNewMessageSubmission(e){
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ""
        })
    }


    render(){
        // console.log(this.state.message)

        return (
            <form 
            className="send-message-form" 
            onSubmit={this.handleNewMessageSubmission}
            >
                <input
                    disabled={this.props.disabled}
                    placeholder="Type a message and hit ENTER"
                    type="text"
                    onChange={this.getInputMessageText}
                    value={this.state.message} 
                />
                    
            </form >
        )
    }
}


export default SendMessageForm