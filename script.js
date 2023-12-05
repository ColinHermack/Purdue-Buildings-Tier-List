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
    "owen",
    "pmu",
    "stewart-center",
    "math-building",
    "beering",
    "armstrong",
    "university-hall",
    "elliot",
    "krannert",
    "rawls",
    "cl50",
    "corec",
    "walc",
    "lawson",
    "winifred-parker",
    "frieda-parker",
    "lily",
    "armory",
    "felix-haas"]

const majors = [
    'Accounting',
    'Actuarial Science',
    'Aerospace Eng',
    'AET',
    'African American Studies',
    'Agricultural Engineering',
    'Agronomy',
    'Airline Management',
    'Animal Science',
    'Anthropology',
    'Art History',
    'Artificial Intelligence (Liberal Arts)',
    'Artificial Intelligence (Science)',
    'Biochemistry',
    'Biology',
    'Biomedical Engineering',
    'BAME',
    'Chemical Engineering',
    'Chemistry',
    'Civil Engineering',
    'Communication',
    'Computer and Information Technology',
    'Computer Engineering',
    'Computer Science',
    'Crop Sciene',
    'Cybersecurity',
    'Data Science',
    'Economics',
    'Electrical Engineering',
    'Elementary Education',
    'English',
    'Environmental Engineering',
    'Exploratory Studies',
    'Farm Management',
    'Fermentation Science',
    'Finance',
    'Professional Flight',
    'French',
    'Genetics',
    'German',
    'History',
    'Hospitality and Tourism Management',
    'Industrial Engineering',
    'Japanese',
    'Jewish Studies',
    'Kinesiology',
    'Criminology',
    'Liguistics',
    'Management',
    'Marketing',
    'Mathematics',
    'Applied Mathematics',
    'Mathematics Education',
    'Mechanical Engineering',
    'Microbiology',
    'Music',
    'Nuclear Engineering',
    'Nursing',
    'Nutrition',
    'Pharmaceutical Sciences',
    'Physics',
    'Plant Science',
    'Political Science',
    'Public Health',
    'Religious Studies',
    'Russian',
    'Sociology',
    'Spanish',
    'Statistics',
    'Theatre',
    "Women's, Gender, and Sexuality Studies"
]    

//Set the action of the reset button, save button, and selector buttons
document.getElementById("reset").onclick = resetElements;
document.getElementById("save").onclick = saveAsPDF;
document.getElementById("building-selector").onclick = changeToBuildings;
document.getElementById("majors-selector").onclick = changeToMajors;

//Position the elements so that they do not overlap
resetElements();

//Make elements draggable
for (let i = 0; i < ids.length; i++) {
    dragElement(document.getElementById(ids[i]));
}

function changeToBuildings() {
    document.getElementById("building-selector").classList.replace("unselected", "selected");
    document.getElementById("majors-selector").classList.replace("selected", "unselected");
    location.reload();
}

function changeToMajors() {
    document.getElementById("majors-selector").classList.replace("unselected", "selected");
    document.getElementById("building-selector").classList.replace("selected", "unselected");
    const majorElements = document.getElementsByClassName("tier-item")
    for (let i = 0; i < majorElements.length; i++) {
        majorElements[i].style.display = "none";
    }
    //Clear existing content
    let currY = 725;
    let count = 0;
    for (let i = 0; i < majors.length; i++) {
        if ((25 + 125 * count + 100) > window.innerWidth) {
            currY += 125;
            count = 0;
        }
        let newElement = document.createElement("div")
        dragElement(newElement);
        newElement.textContent = majors[i];
        newElement.id = majors[i];
        newElement.classList.add("major-container");
        newElement.style.position = "absolute";
        newElement.style.top = currY + "px";
        newElement.style.left = (25 + 125 * count) + "px";

        document.getElementById("tier-list-content").appendChild(newElement);

        count ++;
    }
    /*
    document.getElementById("building-selector").classList.replace("selected", "unselected");
    document.getElementById("majors-selector").classList.replace("unselected", "selected");
    const majorElements = document.getElementsByClassName("tier-item")
    for (let i = 0; i < majorElements.length; i++) {
        majorElements[i].style.display = "block";
    }
    resetElements();
    */
}

//Save the tier list as a pdf
function saveAsPDF() {
    element = document.getElementById('tier-list-content');
    html2pdf(element);
}

function resetElements() {
    let currY = 725;
    let count = 0;
    for (let i = 0; i < ids.length; i++) {
        if ((25 + 125 * count + 100) > window.innerWidth) {
            currY += 125;
            count = 0;
        }
        document.getElementById(ids[i]).style.width = "100px";
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