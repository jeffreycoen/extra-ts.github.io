// Get references to the tbody element and button for loading additional results
var $tbody = document.querySelector("tbody");

var $stateInput = document.querySelector("#state");
var $cityInput = document.querySelector("#city");
var $searchBtn = document.querySelector("#search");

//Adding pagination here
var $loadMoreBtn = document.querySelector("#load-btn");

// Set a startingIndex and resultsPerPage variable
var startingIndex = 0;
var resultsPerPage = 15;

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set addressSubsea to dataSet (the alien data) initially
var addressSubset = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTableSection() {
  //$tbody.innerHTML = "";

      // Set the value of endingIndex to startingIndex + resultsPerPage
      var endingIndex = startingIndex + resultsPerPage;
      // Get a section of the addressData array to render
      var addressSubset = dataSet.slice(startingIndex, endingIndex);
  
  
  for (var i = 0; i < addressSubset.length; i++) {
  
    // Get get the current address object and its fields
    var address = addressSubset[i];
    var fields = Object.keys(address);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i + startingIndex);
    
    
    // Loop through the fields
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  

  // Set filteredAddresses to an array of all addresses who's "state" matches the filter
  addressSubset = dataSet.filter(function(address) {
  var addressState = address.state.substring(0, filterState.length).toLowerCase();
  var addressCity = address.city.substring(0, filterCity.length).toLowerCase();
  
  if (addressState === filterState && addressCity === filterCity){
    return true;
  }
    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
  return false;
  });
  renderTableSection();
}

// Add an event listener to the button, call handleButtonClick when clicked
$loadMoreBtn.addEventListener("click", handleButtonClick);

function handleButtonClick() {
      // Increase startingIndex by resultsPerPage, render the next section of the table
      startingIndex += resultsPerPage;
      renderTableSection();
      // Check to see if there are any more results to render
      if (startingIndex + resultsPerPage >= dataSet.length) {
        $loadMoreBtn.classList.add("disabled");
        $loadMoreBtn.innerText = "All Addresses Loaded";
        $loadMoreBtn.removeEventListener("click", handleButtonClick);
      }
}

// Render the table for the first time on page load
renderTableSection();




