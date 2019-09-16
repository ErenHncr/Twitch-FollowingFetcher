import React, { Component } from 'react'
import { UserConsumer } from '../context'
import '../App.css'
import Person from './person'

class Persons extends Component {

  render() {

    return (
      <UserConsumer>
         {state => {
          const {followings}=state
          let turn=0;
          return(
            <div className="container">
              <div className="person row" id="header">
                <div className="col-md-auto">#</div>
                <div className="col-8">Username</div>
                <div className="col">Followed At</div>
              </div>
              {followings!=null?followings.map(following=>{
                turn++;
                return(
                  <Person id={turn} key={turn} content={following}></Person>
                )
                }):null}
            </div>
          )
        }}
      </UserConsumer>
    )
  }
}

export default Persons