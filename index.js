import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"
const firebaseConfig = {
apiKey: "AIzaSyAFkTi7OS0jELDKe2kFcmVUiUneWc6Nycs",
authDomain: "first-project-87bc3.firebaseapp.com",
databaseURL: "https://first-project-87bc3-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "first-project-87bc3",
storageBucket: "first-project-87bc3.appspot.com",
messagingSenderId: "651001384086",
appId: "1:651001384086:web:edee389085a90a5f92c6b7"
};

const app = initializeApp(firebaseConfig);
const database=getDatabase(app)
const items=ref(database,"list_items")

const input=document.getElementById("input-box")
const btn=document.getElementById("btn-sub")
const ListEl = document.getElementById("list");
const inputElement=input.value

function ader(items,inputElement)
{
    push(items,inputElement)
    alert(inputElement+" is added")
    input.value=""
}
function AppenderAndRemover(ArrayValue,ListEl)
{
    let ids=ArrayValue[0]
    let values = ArrayValue[1]
    let NewListEl = document.createElement("li")
    NewListEl.textContent=values
    NewListEl.addEventListener("dblclick",()=>{
        let location = ref(database,`list_items/${ids}`)
        remove(location)
    })
    ListEl.append(NewListEl)
}

btn.addEventListener("click",()=>{
    let inputElement = input.value
    if(inputElement=="")
    {
        alert("Empty value")
    }
    else
    {
        onValue(items,(snapshot) => {
            if(snapshot.val()==null)
            {
                ader(items,inputElement)
            }
            else if(Object.values(snapshot.val()).includes(inputElement)) {
                alert(inputElement+" already exist");
            }
            else{
                ader(items,inputElement)
            }
        },{onlyOnce:true})
    }
})
        
onValue(items,(snapshot) => {
    if(snapshot.val()==null)
    {
        ListEl.innerHTML="Its Empty I wonder Y?"
        ListEl.classList.add("active")
    }
    else
    {
        ListEl.classList.remove("active")
        const data = Object.entries(snapshot.val())
        ListEl.innerHTML=""
        for(let i=0;i < data.length; i++)
        {
            const valueStorage = data[i]
            AppenderAndRemover(valueStorage,ListEl)
        }
    }
})