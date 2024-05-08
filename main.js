// API is in XML format (differs from JSON)

let vehicleResult = document.getElementById('vehicleResult');

for (let i = 0; i <= 50; i++) {
    let optionSelect = document.createElement('option');
    optionSelect.innerText = `Vehicle ${i}`;
    optionSelect.value = i;
    optionVehicle.appendChild(optionSelect);
    // Fetch API for each vehicle number
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${i}`)
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(data, "text/xml");
            let make = xmlDoc.getElementsByTagName('make')[0].textContent;
            let model = xmlDoc.getElementsByTagName("model")[0].textContent;
            optionSelect.innerText = `Vehicle ${i} - ${make} ${model}`;
        })
        .catch(error => {
            console.error(`${error}`);
        });
};



let formSelection = document.getElementById('formSelection');
formSelection.addEventListener('submit', function(event){
    vehicleResult.innerHTML = "";
    event.preventDefault(); 
    const selectedValue = document.getElementById('optionVehicle').value;
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${selectedValue}`)
        .then(response => response.text())
        .then(data => {
            // reference to get data "console.log(xmlDoc);" to see available data
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(data, "text/xml");
            console.log(xmlDoc);

            let producerValue = xmlDoc.getElementsByTagName("make")[0].textContent;
            let modelValue = xmlDoc.getElementsByTagName("model")[0].textContent;
            let yearValue = xmlDoc.getElementsByTagName('year')[0].textContent;
            console.log(`${producerValue} ${modelValue} ${yearValue}`);

            let fuelValue = xmlDoc.getElementsByTagName("fuelType1")[0].textContent;
            console.log(fuelValue);

            let transmissionValue = xmlDoc.getElementsByTagName("trany")[0].textContent;
            console.log(transmissionValue);

            let driveValue = xmlDoc.getElementsByTagName("drive")[0].textContent;
            console.log(driveValue);

            let fuelCostValue = xmlDoc.getElementsByTagName("fuelCost08")[0].textContent;
            console.log(fuelCostValue);
            
            let fuelMessage = '';
            if(fuelCostValue >= 5000){
                fuelMessage = ', this spend more than your average car';
            }
            else if(fuelCostValue <=3000){
                fuelMessage = ', this spend less than your average car'
            }
            else{
                fuelMessage = ', this spend like most people do'
            }

            console.log('<!----------------------------->')
            vehicleResult.insertAdjacentHTML("beforeend", `
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>${producerValue} ${modelValue} ${yearValue}</b></li>
                    <li class="list-group-item">${fuelValue}</li>
                    <li class="list-group-item">${transmissionValue}</li>
                    <li class="list-group-item">${driveValue}</li>
                    <li class="list-group-item">$${fuelCostValue} Fuel Cost (Over 5 Years ${fuelMessage})</li>
                </ul>
            `)
        })
        .catch(error => {
            console.error(`${error}`);
        })
});
