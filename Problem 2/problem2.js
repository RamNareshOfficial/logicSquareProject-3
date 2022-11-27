console.log("Problem 2 solving");

let problem_2 = async function () {
    let cafesUrl = "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json"
    let placesUrl = "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json"
    let newArr = [];
    await fetch(cafesUrl).then(res => res.json()).then((data) => {
        data.cafes.map((newData) => {
            newArr.push(newData);
        })
    });

    let newObj = {};
    await fetch(placesUrl).then(res => res.json()).then((data) => {
        if (data.places.length > 0) {
            data.places.map(data => {
                newObj[data.id] = data;
            })
        }
        else {
            console.log("No data found");
        }
    })


    let finalArray = [];
    for (let i = 0; i < newArr.length; i++) {
        let placesObject;
        if (newArr[i].name) {
            placesObject = newObj[newArr[i].location_id];
            let finalPlaceObj = {};
            finalPlaceObj.sr_no = i + 1;
            finalPlaceObj.name = newArr[i].name;
            finalPlaceObj.locality = placesObject.locality;
            finalPlaceObj.postal_code = placesObject.postal_code;
            finalPlaceObj.lat = placesObject.lat;
            finalPlaceObj.long = placesObject.long;

            finalArray.push(finalPlaceObj);
        }
    }

    finalArray.map((data) => {
        let tr = tableBody.appendChild(document.createElement("tr"));
        let num = 1;
        for(let key in data){
            let td = document.createElement("td");
            tr.appendChild(td).innerHTML = data[key];  
            tr.appendChild(td).setAttribute("class", `column${num}`); 
            num++;         
        }
    });

    let searchInput = document.getElementById("myInput");
    searchInput.addEventListener("keyup", () => {
        let myInput = document.getElementById("myInput").value.toUpperCase();
        let tableBody = document.getElementById("tableBody");
        let tr = tableBody.getElementsByTagName("tr");
        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName("td")[1];
            let textValue = td.textContent || td.innerHTML;
            if (textValue.toUpperCase().indexOf(myInput) > -1) {
                tr[i].style.display = ""; 
            }
            else {
                tr[i].style.display = "none";
            }
        }
    })
}
problem_2();