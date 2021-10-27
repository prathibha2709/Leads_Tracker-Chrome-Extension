let myLeads = []


let inputEl = document.getElementById("input-el")
let ulEl = document.getElementById("ul-el")
let inputButton = document.getElementById("input-btn")
let tabButton = document.getElementById("tab-btn")
let deleteButton = document.getElementById("delete-btn")
const leadsFromLocalStorage =JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage)
{
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

//save input button functionality
inputButton.addEventListener("click",function(){ 
    myLeads.push(inputEl.value)
    inputEl.value=null
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)})

//saving tabs option
tabButton.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

            // since only one tab should be active and in the current window at once
            // the return variable should only have one entry
            let activeTab = tabs[0].url;
            myLeads.push(activeTab)
            localStorage.setItem("myLeads",JSON.stringify(myLeads))
            render(myLeads)
       
        })
})


//delete button functionality
deleteButton.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

//rendering
function render(leads)
{   
    let listItems = ""
    for(let i=0;i<leads.length;i++)
    {
        listItems +=
        `<li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        </a>
        </li>`
        //console.log(leads[i])
    }
    ulEl.innerHTML = listItems
}



