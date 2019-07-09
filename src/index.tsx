import * as React from "react";
import * as ReactDOM from "react-dom";

import { NewsItem } from "./components/NewsItem";
import { TableFromJson } from "./components/TableFromJson";
import { TrainerItem } from "./components/TrainerItem";

ReactDOM.render(
    <TableFromJson />,
    document.getElementById("content-tab2")
);

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://script.google.com/macros/s/AKfycbxqafFUJrAssl0kWnYw53D3UMTeU-A0KIj05Ct6e7Y6-hzoVovW/exec', false);
xhr.send();

if (xhr.status != 200) {
    alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
} else {
    let NewsTab = document.getElementById("content-tab1");
    let JsonArray = JSON.parse(xhr.responseText);

    for (var i = 0; i < JsonArray.length; i++) {
        var newsDiv = document.createElement("div");
        newsDiv.id = "newsDiv" + i;
        NewsTab.appendChild(newsDiv);

        ReactDOM.render(
            <NewsItem title={JsonArray[i]["Title"]}
                date={JsonArray[i]["Date"]}
                text={JsonArray[i]["Text"]}
                imgUrl={JsonArray[i]["Photo"]} />,
            document.getElementById("newsDiv" + i)
        );

    }
}

xhr.open('GET', 'https://script.google.com/macros/s/AKfycbxpbGZEmVii7ao5zCeBH-pfgncpan0LhZrhCqLGTA/exec', false);
xhr.send();

if (xhr.status != 200) {
    alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
} else {
    let TrainerTab = document.getElementById("content-tab5");
    let trainerArray = JSON.parse(xhr.responseText);

    console.log(trainerArray);

    for (var i = 0; i < trainerArray.length; i++) {
        let trainerDiv = document.createElement("div");
        trainerDiv.id = "trainerDiv" + i;
        TrainerTab.appendChild(trainerDiv);

        ReactDOM.render(
            <TrainerItem
                club={trainerArray[i]["Club"]}
                name={trainerArray[i]["Name"]}
                specialization={trainerArray[i]["Specialization"]}
                text={trainerArray[i]["Description"]}
                photoURL={trainerArray[i]["FotoURL"]}
                vkURL={trainerArray[i]["VKURL"]}
                instaURL={trainerArray[i]["InstagramURL"]}
            />,
            document.getElementById("trainerDiv" + i)
        );

    }
}

