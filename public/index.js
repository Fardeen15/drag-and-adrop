var firebaseConfig = {
    apiKey: "AIzaSyBLLWNOJbyqu77TPfDMWYf6azf1qoZAxU8",
    authDomain: "drag-and-drop-d51fe.firebaseapp.com",
    databaseURL: "https://drag-and-drop-d51fe.firebaseio.com",
    projectId: "drag-and-drop-d51fe",
    storageBucket: "drag-and-drop-d51fe.appspot.com",
    messagingSenderId: "268873660167",
    appId: "1:268873660167:web:4aaa230ca4741672"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function send() {
    event.preventDefault();
    var value = document.getElementById('name').value;
    var value1 = document.getElementById('example-datetime-local-input').value;
    var obj = {
        date: value1,
        name: value,
        id: "drop"
    }
    data()
    database.ref().child('data').child(obj.name).set(obj)
    document.getElementById('name').value = ""
    document.getElementById('example-datetime-local-input').value = ""

}

function getData() {
    var id1 = document.getElementById('drop');
    var id2 = document.getElementById('drop2');
    let data;
    database.ref().child('data').on("value", (snap) => {
        if (snap.val()) {
            data = Object.values(snap.val())
            console.log(data)
            // document.getElementById('drop').innerHTML = ""

            id1.innerHTML = ""
            id2.innerHTML = ""
            for (var i = 0; i < data.length; i++) {
                var id = document.getElementById(data[i].id);
                console.log(id);
                if (id.id === 'drop') {
                    id = document.getElementById('drop')
                    id.innerHTML += `<button name = "${data[i].name}" class = "drag" id = "drag${i}"ondragstart="drag(event)" draggable="true">
                    ${data[i].name} ${data[i].date}
                    </button>`;
                }
                // id.innerHTML = ""
                if (id.id === 'drop2') {
                    console.log(id.id)
                    id.innerHTML += `<button name = "${data[i].name}" class = "drag" id = "drag${i}"ondragstart="drag(event)" draggable="true">
                    ${data[i].name} ${data[i].date}
                    </button>`;
                }
            }
        }
    })
}
var name1;
var value1
getData()
function data() {
    var value = document.getElementById('name').value;
    value1 = document.getElementById('example-datetime-local-input').value;
    console.log(value)

}
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    name1 = ev.target.name;
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log(data);
    var evId = ev.target.id;
    var data = name1;
    var obj = {
        date : value1,
        name: data,
        id: evId
    }
    console.log(data);
    database.ref().child('data').child(obj.name).set(obj)
}