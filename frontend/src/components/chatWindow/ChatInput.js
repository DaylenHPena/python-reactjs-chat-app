import React, { Component } from 'react'

export class ChatInput extends Component {

  handleSubmit(e){
    e.preventDefault();
    console.log('submitted',e.target.message.value)
  }

  render() {
    return (
      <form id="message-form" className="bg-light" onSubmit={this.handleSubmit}>
        <input name="message" type="text" placeholder="Write a message..."  className='form-control'></input>
        <button type='submit' className="btn btn-outline-secondary"><i
                className="fa fa-paper-plane"></i></button>
      </form>
    )
  }
}

export default ChatInput