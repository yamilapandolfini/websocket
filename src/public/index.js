let socket = io();
let chatBox = document.getElementById('chatBox');
let user;

Swal.fire({
    title:"Identificate",
    input:'text',
    allowOutsideClick:false,
    inputValidator: (value)=>{
        return !value && 'Ingresa tu mail por favor'
    }
}).then(result =>{
    user = result.value;
})



chatBox.addEventListener('keyup',evt=>{

    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit('message',{user,message:chatBox.value.trim()})
            chatBox.value="";
        }
        
    }
    
});

/*Socket Events*/

socket.on('log', data=>{
    let log = document.getElementById('log');
    let messages= "";
    
    data.forEach(log=>{
        messages= messages + `${log.user} dice: ${log.message}</br>`
    })
    log.innerHTML = messages;
})

socket.on('notification',data=>{
    alert("alguien se conecto");
})