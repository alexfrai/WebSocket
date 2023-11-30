export default class UI{
    
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.listenInterface();
        })        
    }
    
    listenInterface(){
        document.querySelector("#auth_user").addEventListener('click', () => {this.idChecker(false)}) 
        document.querySelector("#disconect").addEventListener('click',() => {this.disconectUser()} )
    }
    
    idChecker(exist){
        if(exist) window.alert("ce pseudo est deja utilisé")   

        let pseudo = window.prompt('choix du pseudo')

        if(pseudo !== null && pseudo !=="") {
            const event = new CustomEvent("local:user:conect", { detail: { pseudo } });
            document.dispatchEvent(event);
        }
        //socket.emit('client:user:conected', pseudo)
    }

    disconectUser() {
        const event = new CustomEvent("local:user:disconect");
        document.dispatchEvent(event);
        //socket.emit('client:user:disconect')
    }

    conected(){
        document.querySelectorAll('#auth_login', ).forEach((element) => { element.classList.add('hide')})
        document.querySelectorAll('#chat').forEach((element) => { element.classList.remove('hide')}) 
        document.querySelectorAll('#disconect').forEach((element) => { element.classList.remove('hide')}) 
        console.log('chat page')
    }
    disconected(){
        document.querySelectorAll('#auth_login', ).forEach((element) => { element.classList.remove('hide')})
        document.querySelectorAll('#chat').forEach((element) => { element.classList.add('hide')}) 
        document.querySelectorAll('#disconect').forEach((element) => { element.classList.add('hide')}) 
        console.log('login page')
    }

    listUsers(users){
        
        document.querySelector('#usersList').innerHTML = '';
        if ("content" in document.createElement("template")) {
            let template = document.querySelector("#usersTpl");
            users.forEach((user) => {
                let clone = document.importNode(template.content, true);
                clone.querySelector("li").textContent = user
                document.querySelector('#usersList').appendChild(clone);
            })
        }   
    }
}