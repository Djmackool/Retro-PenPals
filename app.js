const people = [
{
name:"Mina",
state:"Georgia",
interests:["tattoos","journaling"],
dislikes:["sports"]
},
{
name:"Raven",
state:"Georgia",
interests:["horror","reading"],
dislikes:["small talk"]
}
];

function saveProfile(){
alert("Profile saved (demo)");
}

function search(){
const interest = document.getElementById("searchInterest").value.toLowerCase();
const state = document.getElementById("searchState").value.toLowerCase();

const results = people.filter(p =>
(!state || p.state.toLowerCase().includes(state)) &&
(!interest || p.interests.join(" ").includes(interest))
);

document.getElementById("results").innerHTML =
results.map(p=>`<div>${p.name} - ${p.state}</div>`).join("");
}
