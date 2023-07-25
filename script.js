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
    const apiEndpoint = "/~pdevlin2/book_site/backend/bookAPI.py"
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
        console.log(data)
        displayResults(data['predictions']);
        alert("Server response:\n" + JSON.stringify(data, null, 2));
    })
    .catch(error => {
        // Handle any errors here
        alert("Error uploading image: " + error);
    });
}

function drawChart() {
    // Create the data table.
    
    var data = new google.visualization.DataTable();
    /*
    let range = 5;
    for (let i = 0; i < range; i++) {
      data.addColumn('string', )
    } 
    */

    data.addColumn('string', 'Toppings');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ]);

   let width = document.getElementById('top').offsetWidth;
    console.log(width);
    // Set chart options
    var options = {'title':'How Much Pizza I Ate Last Night',
                //    'chartArea': {'left': '10', 'top': '20','right': '10', 'bottom': '20'},
                   'width': .5*width,
                   'height': .3*width,
                   'legend': {'position': 'bottom'},
                  };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function displayResults(predictions) {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});
    console.log(predictions);
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);
    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    
}

window.addEventListener("resize", drawChart);
