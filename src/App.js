import React, { Component } from 'react'
import Persons from './components/persons'
import { UserProvider } from './context'
import '../src/App.css'
import Auth from './twitchAPI/auth'

class App extends Component {
  reducer=(state,action) =>{
    switch(action.type){
      case 'SET_FOLLOWINGS':
        return{
          ...state,
          followings:action.payload
        }
      default:
      return state 
    }
  }
  state={
    followings:[],
    rangeValue:30,
    dispatch: action => {
      this.setState(state => this.reducer(state,action))},
    username:null,
    text:"",
    followingLength:'-1'
    
  }
  auth=(e)=>{
    e.preventDefault();
    if(this.state.username!=null){
      const a=new Auth({
        ID:process.env.REACT_APP_ID,
        SECRET:process.env.REACT_APP_SECRET,
        REDIRECT_URI:process.env.REACT_APP_REDIRECT_URI
      },this.state.username);
      let {dispatch}=this.state;
      let allFollowings=null;
      a.getOauthToken().then(()=>{
          a.getUserID().then(()=>{
            a.getFollowings().then((followings)=>{
              if(followings===undefined){
                this.setState({
                  followingLength:'0'
                })
              }
              else{
              allFollowings=followings
              dispatch({type:'SET_FOLLOWINGS',payload:allFollowings})
              this.setState({
                followingLength:allFollowings.length
              })
              }
            })
          })
      })
      
    }
  }
  changeUsername=(e)=>{
    this.setState({
      username:e.target.value,
      text:e.target.value
    })
  }
  clearFields=(e)=>{
    this.setState({
      followings:[],
      text:"",
      username:null,
      followingLength:'-1'
    })
  }
  render() {
    const {text,followingLength,username} = this.state;
    return (
    <UserProvider value={this.state}>
      <div className='container mt-5 maindiv'>
        <form className='form'>
          <div className='input-group mb-3'>
            <input name='username' type='text' className="form-control" value={text} onChange={this.changeUsername} placeholder='Enter Username' aria-label='Username' aria-describedby='basic-addon2'/>
            <div className="input-group-append">
              <button className="btn btn-primary searchBtn" type="submit" onClick={this.auth}>Search</button>
            </div>
          </div>
        </form>
        <button type='reset' className='btn btn-danger clearButton' onClick={this.clearFields}>Clear Results</button>
        {followingLength==='-1'?null:(<label className='results'>Results for {username} : {followingLength} followings found!</label>)}
        <Persons/>
      </div>
    </UserProvider>
    )
  }
}
export default App
