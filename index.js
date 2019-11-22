//jshint esversion:8

const baseUrl =
    "https://api.spacexdata.com/v3/launches/past?filter=flight_number,mission_name,launch_date_local,rocket/rocket_name,links/article_link,details,links/mission_patch";
const sectionNews = document.getElementById("news");

function grabData() {
    fetch(baseUrl)
        .then(result => result.json())
        .then(json => {
            for (let i = json.length - 1; i >= 0; i = i - 1) {
                let flightNum = json[i].flight_number;
                let rocketName = json[i].rocket.rocket_name;
                let missionName = json[i].mission_name;
                let flightDate = json[i].launch_date_local.substring(0, 10);
                let details = json[i].details;
                let article = json[i].links.article_link;
                let patchImage = json[i].links.mission_patch;
                let header = document.createElement("h3");
                let para = document.createElement("p");
                let link = document.createElement("a");
                let image = document.createElement("img");
                let container = document.createElement("div");
                header.innerHTML =
                    "Flight " +
                    flightNum +
                    ", " +
                    rocketName +
                    " Rocket" +
                    ", Mission Name: " +
                    missionName;
                image.setAttribute("src", patchImage);
                image.setAttribute("style", "width:200px");
                para.innerHTML =
                    "Date Launched: " + flightDate + ". <br>Details: " + details;
                link.innerHTML = "Click here for News Article";
                link.setAttribute("href", article);
                link.setAttribute("target", "blank");
                container.innerHTML = `<h3> ${header.innerHTML}</h3>
        <div class='row mt-3'>
            <div class='col-md-3'> 
               <img src='${patchImage}' style='width:100%;'/>
                </div>
                <div class='col-md-9'> 
                ${para.innerHTML}
                </div>
            </div>
        `;
                sectionNews.appendChild(container);
                sectionNews.append(link);
            }
        });
}
grabData();
