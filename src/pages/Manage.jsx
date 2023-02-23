import {useEffect,useState} from "react";
function Manage() {
    const [users,setUsers] = useState(null);
    const [updating,setUpdating] = useState(false);
    const [trigger,setTrigger] = useState(false);

    const checkAndUpdate = (user) => {
        const name = document.getElementById(user.email).value;
        const u = users[users.indexOf(users.find(e => e.email === user.email))];
        if(u.name === name) {setUpdating(false);return;}
        fetch("/users",{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({email : user.email,name:name})
        }).then(res => res.json()).then(res => {
            if(res.status !== 200) alert(`Error ${res.status} ${res.data}`)
            else {alert("Success !");setUpdating(false);setTrigger(!trigger);}
        });
    }

    const deleteUser = (user) => {
        fetch("/users",{
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(user)
        }).then(res => res.json()).then(res => {
            if(res.status !== 200) alert(`Error ${res.status} ${res.data}`)
            else {alert("Success !");setTrigger(!trigger);}
        })
    }

    const makeUserCard = (user) => {
        return(
            <div className="userViewCard rouded shadow p-4 m-5" key={user.email}>
                <div className="row">
                    <div className="col-8">
                        <div className="h3">
                            {user.email}
                        </div>
                        <div className="h5">
                            <input disabled={!updating} id={`${user.email}`} defaultValue={`${user.name}`} />
                        </div>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <div className="controls">
                            <button onClick={() => deleteUser(user)} className="btn btn-danger mx-3"><i className="fa-solid fa-trash"></i></button>
                            {updating ? <button onClick={() => checkAndUpdate(user)} className="btn btn-primary"><i className="fa-regular fa-floppy-disk"></i></button> 
                            : <button onClick={() => setUpdating(true)} className="btn btn-primary"><i className="fa-solid fa-pen-to-square"></i></button>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const makeUserCards = (users) => {
        return users.map(user => makeUserCard(user));
    }

    useEffect(() => {
        fetch("/users").then(res => res.json()).then(res => {
            if(res.status !== 200) alert(`Error ${res.status} ${res.data}`);
            else setUsers(res.data);
        })
    },[trigger]);

    return (
        <>
        <div className="d-flex justify-content-center">
            <div className="manageUsersRoot">
                {users ? makeUserCards(users) : null}
            </div>
        </div>
        </>
    )
}

export default Manage;