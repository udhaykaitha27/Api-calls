

const firstNamein1  = document.querySelector('#input-first-name1');
const lastNamein1 = document.querySelector('#input-last-name1');
const emailin1  = document.querySelector('#input-email1');
const mobilein1 = document.querySelector('#input-phone1');
const passwordin1= document.querySelector('#input-password1');
const addressin1 = document.querySelector('#input-address1');
const updateBtinn = document.querySelector('#update-details-btn');



let container = document.querySelector('#main-container');
let API = "https://the-techie-crud.onrender.com"
// console.log(API);

//UPDATE

 async function updateUser(valueId)
{
    let userinfo = await fetch(`${API}/user-info/${valueId}`)
    let getUser = await userinfo.json();
    console.log(getUser);
const { data } = getUser;
const{firstName,lastName,mobile,address,email} = data;
firstNamein1.value = firstName;
    lastNamein1.value = lastName;
    emailin1.value = email;
    mobilein1.value = mobile;
    addressin1.value = address;

    updateBtinn.addEventListener('click',
        async ()=>
        {
            let userdetails = {
                firstName : firstNamein1.value,
        lastName : lastNamein1.value,
        mobile : mobilein1.value,
        email : emailin1.value,
        password : passwordin1.value,
        address : addressin1.value 

            }

            let updated = await fetch(`${API}/update-user-info/${valueId}`,
                {
                    method: 'PUT',
                    headers:{
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(userdetails)
                }
            );

            let check = await updated.json;
            if(check)
            {
                window.location.reload();
                alert('user details updated successfully');
            }
        }
    )

}


//DELETE

async function deleit(value)
{
    let deleteUser = await fetch(`${API}/delete-user/${value}`,
        {
            method : 'DELETE'
        }
    );
     
    let check = await deleteUser.json();
    if(check)
    {
        window.location.reload();
        alert('user deleted successfully')
    }
}

//GET Method


async function upload(event,value)
{
    let image = event.target.files[0];

    let data = new FormData();
    data.append('image',image);

    let upload = await fetch(`${API}/upload/${value}`,
        {
            method : 'POST',
            body : data
        }
    );

    let pic = await upload.json()

    if(pic)
    {
        window.location.reload();
        return alert('profile pic uploaded successfully')
    }
}


try{

window.onload = async function runThise ()
{
    let response = await fetch(`${API}/users`);
    let data = await response.json();
    
    const{data: array} = data;
    for( let elements of array)
    {
        const{firstName,lastName,mobile,address,email,profilePic,_id} = elements;
        // console.log(elements);

        let htmlCode = 
        `<div id="sub-container">
        <div id="container-1">
           
            <h3>first name : ${firstName}</h3>
            <h3>last name : ${lastName}</h3>
            <h3>mobile : ${mobile}</h3>
            <h3>address : ${address}</h3>
            <h3>email : ${email}</h3>
            <button  type="button" onclick="updateUser('${_id}')"  class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" >Update </button>
            <button onclick="deleit('${_id}')" class="btn btn-outline-danger">Delete</button>
            <input id="upload-file" onchange="upload(event,'${_id}')"  class="form-control w-100 mt-3" type="file">
            
        </div>
        <div id="container-2">
            <img style="height : 100px; width:100px; border-radius:50%" src=${profilePic}>
        </div>
            </div>
        
        `
        container.innerHTML += htmlCode;
    }




}
    


}
catch(error)
{
    console.log(error);
}


const firstNamein  = document.querySelector('#input-first-name');
const lastNamein = document.querySelector('#input-last-name');
const emailin  = document.querySelector('#input-email');
const mobilein = document.querySelector('#input-phone');
const passwordin = document.querySelector('#input-password');
const addressin = document.querySelector('#input-address');
const addBtnin = document.querySelector('#add-btn');

//POST Method



try
{
addBtnin.addEventListener('click',async(event) => 
{
    event.preventDefault();
    

    if(!firstNamein.value || !lastNamein.value || !emailin.value || !mobilein.value || !passwordin.value || !addressin.value)
    {
        return alert('please fill all the details')
    }

    
    let createdObject = 
    {
        firstName : firstNamein.value,
        lastName : lastNamein.value,
        mobile : mobilein.value,
        email : emailin.value,
        password : passwordin.value,
        address : addressin.value 
    }
     
let storeDb = await fetch(`${API}/user-creation`,
    {
        method : 'POST',
        headers : 
        {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(createdObject)

});

let check = await storeDb.json();
console.log(check);

if(check === 'User is already exists....')
{
    return alert("User with this email id already exists..")
} else 
{
    window.location.reload();
    return alert('User Created successfully..!!')
}
    

});
}
catch(error)
{
    console.log(error);
}

