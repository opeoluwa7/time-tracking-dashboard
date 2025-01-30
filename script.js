let data;

fetch("./data.json").then((response) => {
    if (!response.ok) {
        return console.log('Oops! Something went wrong.');
    }
    return response.json();
}).then((jsonData) => {
    data = jsonData;

    //initialize first display
    displayData(data, "weekly");
});

//Event listeners to toggle buttons
const timeframes = document.querySelectorAll(".profile-outer-box ul li");

//this loops through each li element
timeframes.forEach((li) => {
    li.addEventListener("click", () => {
        //remove the active class from all list items
        timeframes.forEach((item) => item.classList.remove("selected"));
        

        //add the selected class to the clicked list item
        li.classList.toggle('selected');

        //display the data for the selected timeframe
        displayData(data, li.textContent.toLowerCase());
    })
})

function displayData(data, timeframe) {
    data.forEach((item) => {
        const card = document.getElementById(`${item.title.toLowerCase().replace(" ", "-")}-box`);
        if (card) {

            const header = card.querySelector(".header");
            const content = card.querySelector(".content");

            header.querySelector("h2").textContent = `${item.title}`;

            content.querySelector("h3").textContent = `${item.timeframes[timeframe].current}hrs`;

            content.querySelector("h4").textContent = `Last Week - ${item.timeframes[timeframe].previous}hrs`;
        }
    })
}

