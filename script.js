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
    return data;
}