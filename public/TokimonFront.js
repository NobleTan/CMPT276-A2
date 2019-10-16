var skillCounter = 1;
function add() {
    let newSelect = document.createElement("select")
    newSelect.id = `ability${skillCounter}`;
    newSelect.addEventListener("input", updateList);
    newSelect.setAttribute("required", "");
    newSelect.setAttribute("class","button1");
    newSelect.setAttribute("name", `ability${skillCounter}`);
    newSelect.setAttribute("data-i", skillCounter);

    let defaultval = document.createElement("option");
    defaultval.textContent = "Pick Ability";
    defaultval.setAttribute("hidden", "");
    defaultval.setAttribute("disabled", "");
    defaultval.setAttribute("selected", "");
    defaultval.setAttribute("value", "");

    newSelect.appendChild(defaultval);
    
    let options = ["fly", "fight", "fire", "water", "electric", "earth", "grass", "normal", "poison", "telepathy", "rock", "bug", "dark", "dragon", "ice"]; 
    options.forEach(option => {
        let child = document.createElement("option");
        child.textContent = option;
        child.value = option;
        newSelect.appendChild(child);
    });

    let newInput = document.createElement("input");
    newInput.type = "number";
    newInput.setAttribute("oninput", "inRange(event);");
    newInput.setAttribute("required", "");
    newInput.setAttribute("name", `abilityScore${skillCounter}`);
    newInput.setAttribute("id", `abilityScore${skillCounter}`);

    let newDelete = document.createElement("button");
    newDelete.innerHTML = "Delete";
    newDelete.setAttribute("class","button1");
    newDelete.setAttribute("onclick", `deleteSkill(${skillCounter})`);

    let newSelectTd = document.createElement("td");
    newSelectTd.appendChild(newSelect);
    
    let newInputTd = document.createElement("td");
    newInputTd.appendChild(newInput);

    let newDeleteTd = document.createElement("td");
    newDeleteTd.appendChild(newDelete);

    let newTr = document.createElement("tr");
    newTr.className = "skills";
    newTr.id = `abilityRow${skillCounter++}`;
    newTr.appendChild(newSelectTd);
    newTr.appendChild(newInputTd);
    newTr.appendChild(newDeleteTd);
    
    document.getElementById("newTokimonTable").appendChild(newTr);
}

function updateList(event) {
    let cur = event.target;
    document.getElementById(`abilityScore${cur.getAttribute('data-i')}`).setAttribute("name", cur.options[cur.selectedIndex].value);


    let selected = {};
    for(let i = 0; i < skillCounter; i++){
        let skill = document.getElementById(`ability${i}`);
        skill = skill.options[skill.selectedIndex].value;
        if(skill === "") continue;

        if(!selected[skill]){
            selected[skill] = 1;
        }else{
            document.getElementById("submit").disabled = true;
            document.getElementById("warning").innerHTML = `Wanring: Duplicated skill ${skill}`;
            return;
        }
    }
    document.getElementById("submit").disabled = false;
    document.getElementById("warning").innerHTML = '';

}

function deleteSkill(index){
    document.getElementById(`abilityRow${index}`).remove();
    skillCounter--;
}

function checkNum(event) {
    let element = event.target;
    if (!/^-?\d*\.?\d*$/.test(element.value)){
        element.value = element.getAttribute("data-old");
    }else {
        element.setAttribute('data-old', element.value);
    }
}

function inRange(event){
    let element = event.target;
    if (element.value <= 100 && element.value >= 0){
        element.setAttribute('data-old', element.value);
    }else {
        element.value = element.getAttribute("data-old");
    } 
}

function showForm(formToShow) {
    let forms = ['newTokimonForm', 'changeTokimonForm', 'deleteTokimonForm', 'getTokimonForm'];
    forms.forEach(form => {
        document.getElementById(form).className = form == formToShow ? '' : 'hide';
    })
} 

function computeTotal() {
    var total = 0;
    for(let i = 0; i < skillCounter; i++){
        let skill = document.getElementById(`abilityScore${i}`);
        total += parseInt(skill.value)
    }
    document.getElementById("totalInput").value=total;
}