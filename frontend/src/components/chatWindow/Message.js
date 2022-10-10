import React, { Component, Fragment } from 'react'

export class Message extends Component {

    rowClass() {
        const row = 'message '
        if (this.props.sender === '1') { return row + 'self-message' }
        return row + 'others-message'
    }

    render() {
        return (
            <Fragment> 
                <div className={this.rowClass()}>
                    <p className='mb-0'>{this.props.message}</p>
                    <p className='time m-0'>{this.props.date}</p>
            </div>
            </Fragment>
        )
    }
}

export default Message