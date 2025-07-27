/*initialization variables*/
const inputEnter = document.getElementById('input__enter');
const fieldText = document.getElementById('field__text');
const btnAdd = document.getElementById('btn__add');
const btnSortName = document.getElementById('btn__sort-name');
const btnSortValue = document.getElementById('btn__sort-value');
const btnDelete = document.getElementById('btn__delete');
/*initialization variables*/

/*creating regular expression for English letters, and for "name=value" value*/
const regEx = /^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/;

/*this block code created button which can add some text form input area to text area - div with ID - fieldText*/
/*connect to the "btnAdd" button an event listener with a type click*/
btnAdd.addEventListener('click', (ev) => {
  ev.preventDefault();/*disable default browser actions*/
  let inputValue = inputEnter.value; /*record in variabl inputValue value of inputEnter*/
    const match = inputValue.match(regEx); /*write regular expression in variable*/
    if (match)/*create a condition for input values ​​that match the regular expression*/{
        let labelValue = document.createElement('label'); /*create a label tag*/
        let labelValueInput = document.createElement('input');/*create input*/
        labelValueInput.type='checkbox'; /*set the checkbox type of the label*/
        labelValueInput.className='labelValueInputClass'/*set the label class */

        labelValue.append(labelValueInput); /*add input to label*/
        labelValue.append('' + inputValue);/*makes a text node from the data we receive from the input, this was necessary for the checkbox to work, without this the checkbox would not be displayed because the value written to the label would overlap it */
        fieldText.append(labelValue)/*add a label with values ​​to the block with id fieldText */

        inputEnter.value=''; /*overwrite what was printed to input to clean input*/
    } else /*create a condition for input values ​​that do not match the regular expression*/{
        inputEnter.value='';  /*overwrite what was printed to input to clean input*/
        alert('You pressed a wrong Name/Value pair!!! Correct format must be in English and in this format:  Name = Value ');/*call the alert function which shows a banner with recommended actions*/
    }
})
btnDelete.addEventListener('click', (ev) => { /*connect to the "btnDelete" button an event listener with a type click*/
    ev.preventDefault(); /*disable default browser actions*/
    let checkedInputs = document.querySelectorAll('.labelValueInputClass:checked'); /*find inputs with checked checkbox*/
    checkedInputs.forEach(a=>/*search checkedInputs*/{
        let g = a.parentElement;/*exit to the parent element and write it to a variable*/
        g.remove() /*delete parent element with inputs that were selected*/
    })
});




//  Function that gets all label data and prepares it for sorting
function getDataFromLabels() {
    let allLabels = document.querySelectorAll("label"); // Get all <label> elements from the page

    return Array.from(allLabels).map(label => {
        // Split the label text by "=" and trim spaces
        let [nameRaw, valueRaw] = label.textContent.trim().split('=').map(s => s.trim());
        let checkbox = label.querySelector('input[type="checkbox"]'); // Find checkbox inside the label

        // Check if name or value is a number and convert if necessary
        let name = isNaN(nameRaw) ? nameRaw : Number(nameRaw);
        let value = isNaN(valueRaw) ? valueRaw : Number(valueRaw);

        // Return an object with name, value, and checkbox state
        return {
            name,
            value,
            checked: checkbox.checked
        };
    });
}

// Function that creates label elements from data and adds them to the page
function renderData(data) {
    fieldText.innerHTML = ''; // Clear the output block before drawing new labels

    data.forEach(item => {
        // Create a new <label> and <input type="checkbox">
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'labelValueInputClass';
        input.checked = item.checked; // Keep the checkbox state (checked or not)

        // Add checkbox and text to the label, then label to the page
        label.append(input);
        label.append(` ${item.name}=${item.value}`);
        fieldText.append(label);
    });
}

//  Sort data by the "name" (before =)
btnSortName.addEventListener('click', (ev) => {
    ev.preventDefault(); // Stop default form/button behavior

    let data = getDataFromLabels(); // Get all current labels as objects

    // Sort by "name" — if number, sort as number; else, sort alphabetically
    data.sort((a, b) => {
        if (typeof a.name === 'number' && typeof b.name === 'number') {
            return a.name - b.name;
        } else {
            return String(a.name).localeCompare(String(b.name));
        }
    });

    renderData(data); // Show sorted data on the page
});

// Sort data by the "value" (after =)
btnSortValue.addEventListener('click', (ev) => {
    ev.preventDefault(); // Stop default form/button behavior

    let data = getDataFromLabels(); // Get all current labels as objects

    // Sort by "value" — if number, sort as number; else, sort alphabetically
    data.sort((a, b) => {
        if (typeof a.value === 'number' && typeof b.value === 'number') {
            return a.value - b.value;
        } else {
            return String(a.value).localeCompare(String(b.value));
        }
    });
    renderData(data); // Show sorted data on the page
});
