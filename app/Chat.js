import { Server } from "socket.io"
import User from './User.js'

export default class Chat{

    constructor(httpServer){
        this.users = []
        this.io = new Server(httpServer)

        this.onConected()
    }
    onConected(){
        this.io.on('connection', (socket) => {
            console.log('New Users !!!');

            socket.on('client:user:conexion', (pseudo) =>{ console.log("test"); this.onUserConect.bind(this,socket,pseudo)} )
            socket.on('client:user:disconect', this.onUserDisconect.bind(this,socket)) 
        });
    }
    onUserConect(socket,pseudo){
        console.log(pseudo)
        let searchUser = this.users.filter((user) => user.pseudo == pseudo)
        if(searchUser.length>0) socket.emit('server:user:exist')
        else{
            let user = new User(pseudo);
            this.users.push(user)
            socket.user = user
            console.log("test")
            socket.emit('server:user:conected')
            this.io.emit('server:users:list', this.getUsersList())
        }
        console.log(this.users)
}

onUserDisconect(socket){
    
    this.users.splice(this.users.findIndex((user) => user.pseudo == socket.user.pseudo), 1)
    socket.emit('server:user:disconected')
    this.io.emit('server:users:list',this.getUsersList())
}

    getUsersList(){
        return this.users.map(user => user.pseudo);
    }
}

    