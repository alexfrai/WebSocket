import UI from "./UI.js"

export default class Chat{
    
    constructor(){
        this.socket = io.connect(document.location.host);
        this.ui = new UI();
        this.listenWebSocketServer();
        this.listenLocalEvent();
    }
    
    listenWebSocketServer(){

        this.socket.on('server:user:exist', () => {this.ui.idChecker(true)})
        this.socket.on('server:user:conected', this.ui.conected)
        this.socket.on('server:user:disconected', this.ui.disconected)
        this.socket.on('server:users:list', this.ui.listUsers)
    }

    listenLocalEvent() {
        document.addEventListener('local:user:conect', (e) => {
            this.socket.emit('client:user:conect', e.detail.pseudo)
            //this.socket.emit('server:user:conected')
            console.log("ecoute de l'event" + e.detail.pseudo)
        })

        document.addEventListener('local:user:disconect', (e) => {
            this.socket.emit('client:user:disconect')
        })
    }    
}

