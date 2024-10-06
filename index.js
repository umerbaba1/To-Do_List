const text_sub=document.getElementById("todo-input")
const ulEl=document.getElementById("task-list")
const form = document.getElementById("todo-form")
const save_btn=document.getElementById("save")
const delTask=document.getElementById("delete")

// firebase import 

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase,
    ref,
    onValue,
    push,
    remove } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";


const firebaseConfig = {
    databaseURL:"https://notepad-ed1c9-default-rtdb.asia-southeast1.firebasedatabase.app/"

}

const app = initializeApp(firebaseConfig);
const databased=getDatabase(app)
const reference=ref(databased, "note")

form.addEventListener("click",function(event){
    event.preventDefault();
})

// onvalue  is a firebase function that sits & listens to the database that change in database in case of data added,changed,removed

onValue(reference,function(snapshot){
    const existssnapshot=snapshot.exists()
    if(existssnapshot){
        const snapshotvalue=snapshot.val()
        const value=Object.values(snapshotvalue)
        render(value)
    }
   
})


//Array to store the value
let saveText=[]

save_btn.addEventListener("click",function(){
    
    if(text_sub.value){
        push(reference,text_sub.value)
        text_sub.style.borderColor="blue"
        text_sub.value=""
        // render(value)

    }
    else{
        text_sub.placeholder="Write Something";
        text_sub.style.borderColor="red";
    }
})


function render(text){
    let mytext=text;
    let listItems="";

    for(let i=0;i<mytext.length;i++){ 
        listItems+=`<li> ${mytext[i]} </li>`
    }
ulEl.innerHTML=listItems

}

delTask.addEventListener("dblclick",function(){
   remove(reference)
    // render(saveText);
    ulEl.innerText=""

})


