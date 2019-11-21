//jshint esversion:8

// const baseUrl = 'https://api.spacexdata.com/v3/history';
// const baseUrl = 'https://api.spacexdata.com/v3/history?filter=title,event_date_utc,details,links/article';
const baseUrl = 'https://api.spacexdata.com/v3/launches/past?filter=flight_number,mission_name,launch_date_local,rocket/rocket_name,links/article_link,details,links/mission_patch';


const sectionNews = document.getElementById("news");

function grabData() {
    fetch(baseUrl)
        .then(result => result.json())
        .then(json => {
            console.log(json);

            // for (let i = 0; i < json.length; i++) {
            for (let i = json.length - 1; i >= 0; i = i - 1) {
                let flightNum = json[i].flight_number;
                let rocketName = json[i].rocket.rocket_name;
                let missionName = json[i].mission_name;
                // let title = json[i].title;
                // let flightDate = json[i].event_date_utc;
                let flightDate = json[i].launch_date_local.substring(0,10);
                let details = json[i].details;
                // let article = json[i].links.article;
                let article = json[i].links.article_link;
                let patchImage = json[i].links.mission_patch;

                console.log(flightDate, details);

                let header = document.createElement("h3");
                let para = document.createElement("p");
                let link = document.createElement("a");
                let image = document.createElement("img");
                let container = document.createElement("div");
                let column = document.createElement("div");
                let column2 = document.createElement("div");
                let row = document.createElement("div");

                // header.innerHTML = title;
                header.innerHTML = "Flight " + flightNum + ", " + rocketName + " Rocket" + ", Mission Name: " + missionName;
                image.setAttribute("src", patchImage);
                image.setAttribute("style", "width:200px");
                para.innerHTML = "Date Launched: " + flightDate + ". Details: " + details;
                link.innerHTML = "Click here for News Article";
                link.setAttribute("href", article);
                link.setAttribute("target", "blank");
                container.setAttribute("class", "container");
                column.setAttribute("class", "col-md-6");
                column2.setAttribute("class", "col-md-6");
                row.setAttribute("class", "row");
                column.innerHTML = image.innerHTML;
                column2.innerHTML = para.innerHTML;
                container.innerHTML = header.innerHTML + row.innerHTML + column.innerHTML + column2.innerHTML;

                sectionNews.appendChild(container);
                // sectionNews.append(image);
                // sectionNews.append(para);
                sectionNews.append(link);
            }
        });
}
grabData();


/*

Pagination
All endpoints that
return an array of objects can be paginated by using the limit and offset querystrings.
This allows you to limit results and create pages of results to offset or skip.

On all endpoints that
return an array, the header spacex - api - count is included with the total number of items in the array.
This can be used to page through the results.By
default, there is no limit set.

For example, the url https: //api.spacexdata.com/v3/launches?limit=1&offset=5 will only return launch #6, 
because we limited the results to a single launch, and skipped the first 5 launches using offset.

*/

// https://github.com/r-spacex/SpaceX-API

// https://docs.spacexdata.com/?version=latest

