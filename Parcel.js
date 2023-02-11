var data = [

    {

        id: 10,

        name: "PARCEL1",

        sequence: 1,

        group: "Mumbai"

    },

    {

        id: 11,

        name: "PARCEL2",

        sequence: 2,

        group: "Mumbai"

    },

    {

        id: 13,

        name: "PARCEL3",

        sequence: 3,

        group: "Mumbai"

    },

    {

        id: 19,

        name: "PARCEL4",

        sequence: 4,

        group: "Delhi"

    },

    {

        id: 18,

        name: "PARCEL5",

        sequence: 5,

        group: "Delhi"

    },

    {

        id: 21,

        name: "PARCEL6",

        sequence: 6,

        group: "Kolkata"

    },

    {

        id: 12,

        name: "PARCEL7",

        sequence: 7,

        group: "Kolkata"

    },

    {

        id: 22,

        name: "PARCEL8",

        sequence: 8,

        group: "Kolkata"

    },

    {

        id: 23,

        name: "PARCEL9",

        sequence: 9,

        group: "Kolkata"

    },

    {

        id: 24,

        name: "PARCEL10",

        sequence: 10,

        group: "Mumbai"

    },

    {

        id: 25,

        name: "PARCEL11",

        sequence: 11,

        group: "Mumbai"

    },

    {

        id: 31,

        name: "PARCEL12",

        sequence: 12,

        group: "Mumbai"

    },

    {

        id: 34,

        name: "PARCEL13",

        sequence: 13,

        group: "Mumbai"

    },

    {

        id: 35,

        name: "PARCEL14",

        sequence: 14,

        group: "Delhi"

    },

    {

        id: 41,

        name: "PARCEL15",

        sequence: 15,

        group: "Delhi"

    },

    {

        id: 42,

        name: "PARCEL16",

        sequence: 16,

        group: "Delhi"

    },

    {

        id: 43,

        name: "PARCEL17",

        sequence: 17,

        group: "Delhi"

    },

    {

        id: 44,

        name: "PARCEL18",

        sequence: 18,

        group: "Kolkata"

    },

    {

        id: 53,

        name: "PARCEL19",

        sequence: 19,

        group: "Kolkata"

    },

    {

        id: 57,

        name: "PARCEL20",

        sequence: 20,

        group: "Kolkata"

    }

];
const parcelContainer = document.querySelector("#parcel-container");
const parcelNameInput = document.querySelector("#parcel-name");
const groupSelect = document.querySelector("#parcel-group");
const addAfterButton = document.querySelector("#add-after");
const addBeforeButton = document.querySelector("#add-before");
const replaceButton = document.querySelector("#replace");
const deleteButton = document.querySelector("#delete");
const refreshButton = document.querySelector("#refresh");
const showFinalButton = document.querySelector("#show-final");
const selectedParcel = document.querySelector("#selected-parcel");

// Function to render the parcel elements on the page
function renderParcels() {
  parcelContainer.innerHTML = "";
  data.forEach((parcel) => {
    const parcelElement = document.createElement("div");
    parcelElement.classList.add("parcel");
    if(parcel.group=='Kolkata'){
      parcelElement.style.backgroundColor = 'blue';
    }if(parcel.group=='Delhi'){
       parcelElement.style.backgroundColor = 'yellow';
    }if(parcel.group=='Mumbai'){
       parcelElement.style.backgroundColor = '#FF1493';
    }
    parcelElement.innerHTML = parcel.name;
    parcelElement.dataset.id = parcel.id;
    parcelContainer.appendChild(parcelElement);
  });
}

// Function to get the selected parcel element
function getSelectedParcel() {
  return parcelContainer.querySelector(".selected");
}

// Function to select a parcel element
function selectParcel(parcelElement) {
  parcelContainer.querySelectorAll(".parcel").forEach((p) => {
    p.classList.remove("selected");
  });
  parcelElement.classList.add("selected");
  selectedParcel.innerHTML = `${parcelElement.innerHTML}`;
}

// Function to add a parcel after the selected parcel
function addParcelAfter() {
  const selected = getSelectedParcel();
  console.log(selected.getAttribute('data-id'))
  if (!selected) {
    return;
  }
  const parcelName = parcelNameInput.value;
  const parcelGroup = groupSelect.value;
  if (!parcelName || !parcelGroup) {
    return;
  }
  const selectedIndex = data.findIndex(
    (parcel) => parcel.id === parseInt(selected.getAttribute('data-id'))
  );
  const newParcel = {
    id: Date.now(),
    name: parcelName,
    sequence: selectedIndex + 1,
    group: parcelGroup
  };
  data.splice(selectedIndex + 1, 0, newParcel);
  renderParcels();
}

// Function to add a parcel before the selected parcel
function addParcelBefore() {
  const selected = getSelectedParcel();
  if (!selected) {
    return;
  }
  const parcelName = parcelNameInput.value;
  console.log(parcelName)
  const parcelGroup = groupSelect.value;
  if (!parcelName || !parcelGroup) {
    return;
  }
  const selectedIndex = data.findIndex(
    (parcel) => parcel.id ===parseInt(selected.getAttribute('data-id'))
  );
  const newParcel = {
    id: Date.now(),
    name: parcelName,
    sequence: selectedIndex,
    group: parcelGroup
  };
  data.splice(selectedIndex, 0, newParcel);
  renderParcels();
}

// Function to replace the selected parcel
function replaceParcel() {
  const selected = getSelectedParcel();
  if (!selected) {
    return;
  }
  const parcelName = parcelNameInput.value;
  const parcelGroup = groupSelect.value;
  if (!parcelName || !parcelGroup) {
    return;
  }
  const selectedIndex = data.findIndex(
    (parcel) => parcel.id === parseInt(selected.getAttribute('data-id'))
  );
  const newParcel = {
    id: parseInt(selected.getAttribute('data-id')),
    name: parcelName,
    sequence: selectedIndex,
    group: parcelGroup
  };
  data[selectedIndex] = newParcel;
  renderParcels();
}

// Function to delete the selected parcel
function deleteParcel() {
  const selected = getSelectedParcel();
  if (!selected) {
    return;
  }
  const selectedIndex = data.findIndex(
    (parcel) => parcel.id === parseInt(selected.getAttribute('data-id'))
  );
  data.splice(selectedIndex, 1);
  renderParcels();
}

// Function to refresh the parcel list
function refreshParcelList() {
  data.sort((a, b) => a.sequence - b.sequence);
  renderParcels();
}

// Function to show the final parcel list
function showFinalList() {
  console.log(data);
  alert("Check the Console.")
}

// Event listeners for parcel element click
parcelContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("parcel")) {
    selectParcel(event.target);
  }
});

// Event listeners for buttons
addAfterButton.addEventListener("click", addParcelAfter);
addBeforeButton.addEventListener("click", addParcelBefore);
replaceButton.addEventListener("click", replaceParcel);
deleteButton.addEventListener("click", deleteParcel);
refreshButton.addEventListener("click", refreshParcelList);
showFinalButton.addEventListener("click", showFinalList);

// Initial render
renderParcels();
