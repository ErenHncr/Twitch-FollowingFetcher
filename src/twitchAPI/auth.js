
export default class Auth{
    
    constructor(envVariables,username){
        
        const { ID, SECRET,REDIRECT_URI } = envVariables;
        this.url="";
        this.clientID=ID;
        this.clientSecret=SECRET;
        this.redirect_uri=REDIRECT_URI;
        this.token=null;
        this.userInfos={
            id:'',
            username:username,
            followings:[]
        };
        this.setters=(action)=>{
        switch(action){
            case 'setID':
                return ((data)=>{
                this.userInfos.id=data;
                })
            case 'setUsername':
                return ((data)=>{
                this.userInfos.username=data;
                })
            case 'addFollowings':
                return ((data)=>{
                this.userInfos.followings=data;
                })
            case 'setToken':
                return ((data)=>{
                this.token=data;
            })
            default:
                return null;
            }
        } 
    }
    async getOauthToken(){
        const fetch3 = require("node-fetch");
        const auth=`https://id.twitch.tv/oauth2/token?client_id=${this.clientID}&client_secret=${this.clientSecret}&grant_type=client_credentials&scope=user:edit+user:read:email+viewing_activity_read`;
        let setToken=this.setters('setToken');
        await fetch3(auth,{
            method:'POST'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            setToken(myJson.access_token);
            
            return myJson.access_token
        })
        return this.token;
    }
    async getUserID(){
        const fetch1 = require("node-fetch");
        const input=this.userInfos.username;
        let id="";
        let setID=this.setters('setID');
        let setUserName=this.setters('setUsername');
        setUserName(input);        
        await fetch1('https://api.twitch.tv/helix/users?login='+input,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+this.token
              }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            let user=JSON.stringify(Number(myJson.data[0].id));
            id=user;
            setID(id);
            return user;
        })
        .catch(()=>{
            return 0;
        })
        return this.userInfos.id;
    }
    async getFollowings(){
        
        const fetch2 = require("node-fetch");
        const clientID="your_client_ID";   
        let allFollowings;
        await fetch2(`https://api.twitch.tv/helix/users/follows?from_id=${this.userInfos.id}`,{
            headers:{
                'Content-Type': 'application/json',
                'Client-ID': clientID
              }
        })
        .then(function(response) {
            return response.clone().json();
        })
        .then(function(myJson) {
            let users=(myJson.data);
            allFollowings = users.map((following)=>{
                let changeDateString=(dateString)=>{
                    let year=dateString.substring(0,4);
                    let month=dateString.substring(5,7);
                    let day=dateString.substring(8,10);
                    return day+'/'+month+'/'+year
                }
                let followingModel={
                name:following.to_name,
                followedAt:changeDateString(following.followed_at)
                }
                return followingModel;
            })
            return allFollowings;
        })
        .catch(()=>{
            return 0;
        })
        
        this.userInfos.followings=allFollowings;
        return (this.userInfos.followings)
    }
}
