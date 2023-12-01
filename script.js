const ids = [
    "mccutcheon",
    "hillenbrand", 
    "harrison", 
    "earhart", 
    "shreve", 
    "first-street", 
    "meredith",
    "meredith-south",
    "windsor",
    "honors-college",
    "wiley",
    "tarkington",
    "owen"]

//Set the action of the reset button
document.getElementById("reset").onclick = resetElements;

//Position the elements so that they do not overlap
resetElements();

//Make elements draggable
for (let i = 0; i < ids.length; i++) {
    dragElement(document.getElementById(ids[i]));
}

function resetElements() {
    let currY = 725;
    let count = 0;
    for (let i = 0; i < ids.length; i++) {
        if ((25 + 125 * i + 100) > window.innerWidth) {
            currY += 125;
            count = 0;
        }
        document.getElementById(ids[i]).style.top = currY + "px";
        document.getElementById(ids[i]).style.left = (25 + 125 * count) + "px";
        count ++;
    }
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    if (elmnt) {
        elmnt.onmousedown = function (e) {
            dragMouseDown(e, elmnt);
        };
    } else {
        console.log("Element Not Found");
    }
    
}

function dragMouseDown(e, elmnt) {
    e = e || window.event;
    e.preventDefault();

    //Get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;

    //Call a function whenever the cursor moves
    document.onmousemove = function (e) {
        elementDrag(e, elmnt);
    };
}

function elementDrag(e, elmnt) {
    e = e || window.event;
    e.preventDefault();

    //Calculate the new cursor position
    pos1 = pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    //Set the element's new position
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

function closeDragElement() {
    //Stop moving when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
}