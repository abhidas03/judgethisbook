var predictions;

function uploadImage() {
    const inputElement = document.getElementById("imageInput");
    const file = inputElement.files[0];
    if (!file) {
        alert("Please select an image to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    //loading gif 
    let loading = document.createElement('img');
    let chart = document.getElementById('chart_div');
    let temp = chart;
    loading.src = './public/robot-think.gif';
    chart.replaceWith(loading);

    const apiEndpoint = "/~pdevlin2/book_site/backend/bookAPI.py"
    fetch(apiEndpoint, {
        method: "POST",
        body: formData
    })
    .then(response => {
        loading.replaceWith(temp);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data here.  Put whatever you want (e.g., the javascript uses the response in data to do whatever cool updates to the page you want)
        predictions = data['predictions'];
        predictions = Object.entries(predictions);
        displayResults();
    })
    .catch(error => {
        // Handle any errors here
        alert("Error uploading image: " + error);
    });

}



function displayResults() {
    // Load the Visualization API and the corechart package.
    dynamicGraph();
    google.charts.load('current', {'packages':['corechart']});
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Genre');
        data.addColumn('number', 'Prediction %');
        data.addRows(predictions.slice(0, 5));
        
    

        let topWidth = document.getElementById('top').offsetWidth;
        let screenWidth = window.innerWidth;
        if (screenWidth > 710) {
                width = 600;
                height = 500;
            }
            else {
                width = .9*topWidth;
                height = .6*topWidth;
            }
            // Set chart options
            var options = {'title':'Predictions',
                        'width': width,
                        'height': height,
                        'legend': {'position': 'bottom'},
                        };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, options);
    }
}

function dynamicGraph() {
    window.addEventListener("resize", displayResults);
}