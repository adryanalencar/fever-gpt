const {config} = require('dotenv') 
config()

const fs = require('fs')
const WebSocket = require('ws');
const openai = require("./connection")

var user = {}
var client = null;

const messageTypes = {
    chat: 7
}
const chatEvents = {
    new_message: "new_message",
}

function buildMessage(user, content){
    const message = {
        "user_name": user,
        "question": content
    }
    return {
        role: "user",
        content: JSON.stringify(message)
    }
}

function checkBlackList(chat_id){
    try {
        const content = fs.readFileSync("/tmp/blacklist", {encoding:'utf8', flag:'r'}).split("\n")
        if(content.indexOf(chat_id) !== -1){
            return true
        }

    } catch (error) {
        console.error("Error", error)
    }
    
    return false    
}

async function threatNewMessage(eventData) {

    if(eventData.data.user_id != user.id){
        const messages = openai.template;
        const chatId = eventData.data.chat_id;

        if(!checkBlackList(chatId)){
            return
        }

        const content = eventData.data.message;
        const user = eventData.data.user.user_name;
        const newMessage = buildMessage(user, content);

        messages.push(newMessage);

        const response = await openai.connection.createChatCompletion({
            ...openai.settings,
            messages
        })
        const replyContent = response.data.choices[0]['message']['content'];
        sendMessage(chatId, replyContent);
    }

}


function processPayload(payload){
    const messageType = payload.t;
    const eventData = payload.d

    if(messageType == messageTypes.chat){
        processor = {
            [chatEvents.new_message]: threatNewMessage
        }[eventData.event]

        if(processor){
            processor(eventData)
        }
    }
    
}

function connect() {
    client = new WebSocket(`wss://fever-2023-ss-socket.herokuapp.com/adonis-ws?token=%7B%22xtoken%22%3A%22${user.auth.token}%22%2C%22xemail%22%3A%22${user.email}%22%7D`)
    client.onerror = (error) => {
        console.error("Erro:", error);
    };

    client.onopen = () => {
        console.log("Conexão aberta");

        const ping = () => {
            setTimeout(() => {
                client.send(JSON.stringify({"t":8}))
                ping();
            },25000)
        }

        ping();

        setTimeout(() => {
            client.send(JSON.stringify({ "t": 1, "d": { "topic": "chat:all" } }));
            client.send(JSON.stringify({"t":1,"d":{"topic":"notification:all"}}));
            client.send(JSON.stringify({"t":1,"d":{"topic":"accesslog:all"}}))
        }, 500);
    };

    client.onclose = () => {
        console.log("Conexão fechada");
        connect();
    };

    client.onmessage = (event) => {
        console.log("Recebido:", event.data);
        try {
            const payload = JSON.parse(event.data);
            processPayload(payload);
        } catch (error) {
            console.log("Error:", error);
        }
    };
}

function sendMessage(chatId, content) {
    if (client.readyState !== WebSocket.OPEN) {
        connect()
    }
    client.send(JSON.stringify({ "t": 7, "d": { "topic": "chat:all", "event": "sendMessage", "data": { "message": content, "chat_id": chatId, "replied_message_id": null } } }));
}

async function login(email, password) {
    const payload = {
        "authenticators": [
            {
                "ref_code": "email",
                "value": email
            }
        ],
        "password": password,
        "continuePath": null
    }

    const response = await fetch("https://fever-2023-ss-v2-api.herokuapp.com/login", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "pt-BR",
            "authorization": "Bearer b5011e51d3420555640465754627f6e1e73d964958c509a4",
            "content-type": "application/json;charset=UTF-8",
            "product-identifier": "1",
            "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site"
        },
        "referrer": "https://startupsfever.yazo.app.br/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify(payload),
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });

    const user = await response.json();

    return user;
}

async function main(){
    user = await login(process.env.email, process.env.password)
    connect();
}

main();