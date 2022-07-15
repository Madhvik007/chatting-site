const socket = io()

const names = prompt('enter your name here')
socket.emit('register', names);

function send() {
    var msg = document.getElementById('msgbox').value;
    socket.emit('send-msg', msg);
    document.getElementById('msgbox').value = "";
    addm_msg(msg);
}



function addm_msg(msg) {
    var buffer = document.getElementById('chatbox').innerHTML;
    document.getElementById('chatbox').innerHTML = buffer + `<label class = "me">`+msg+" : You"+`</label><br><br>`
}

function addo_msg(uname, msg) {
    var buffer = document.getElementById('chatbox').innerHTML;
    document.getElementById('chatbox').innerHTML = buffer + `<label class = "other">`+uname+" : "+msg+`</label><br><br>`
}


socket.on('recive-msg', (uname,msg) => {
    addo_msg(uname,msg);
})

