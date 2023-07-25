function uploadImage() {
    const inputElement = document.getElementById("imageInput");
    const file = inputElement.files[0];
    if (!file) {
        alert("Please select an image to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    //    const apiEndpoint = "backend/bookAPI.py";
    const apiEndpoint = "https://cs.swarthmore.edu/~pdevlin2/book_site/backend/bookAPI.py"
    fetch(apiEndpoint, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data here.  Put whatever you want (e.g., the javascript uses the response in data to do whatever cool updates to the page you want)
        var responseExample = displayResults(data);
        print(responseExample);
        alert("Server response:\n" + JSON.stringify(data, null, 2));
    })
    .catch(error => {
        // Handle any errors here
        alert("Error uploading image: " + error);
    });
}

function displayResults(data) {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
      ]);

      // Set chart options
      var options = {'title':'How Much Pizza I Ate Last Night',
                     'width': 500,
                     'height': 400};

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
}
displayResults()