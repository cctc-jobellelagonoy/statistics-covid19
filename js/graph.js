function start(){
    document.getElementById("countryId").addEventListener("change", loadGraph, false);
    document.getElementById("countryId").addEventListener("select", loadGraph, false);
}

window.onload = function(){
    start();
    loadGraph();
}

function updateCases(data){
    var currentCountry = data = data[data.length-1];
    var totalCases = document.getElementById('totalCases');
    var activeCases = document.getElementById('activeCases');
    var deaths = document.getElementById('deaths');
    var recovered = document.getElementById('recovered');
    var title = document.getElementById('header-title');

    totalCases.innerHTML = 0;
    activeCases.innerHTML = 0;
    deaths.innerHTML = 0;
    recovered.innerHTML = 0;
    Stitle.innerHTML = "Cases";
    
}
  
function loadGraph() {
    var dailycases = [];
    var recovered= [];
    var fatality = [];
     
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        backgroundColor: "transparent",
        theme: "light2",
        zoomEnabled: true,
        title: {
            text: "COVID 19 Curve",
            fontSize: 16
        },
        axisY: {
            title: "Cases",
            titleFontSize: 12,
            prefix: ""
        },
        legend: {
            horizontalAlign: "center",
            verticalAlign: "bottom",
            fontSize: 11
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
        ,
        data: [{
            type: "line",
            legendText: "Daily Cases",
            showInLegend: true,
            yValueFormatString: "0",
            dataPoints: dailycases
        }, 
        {
            type: "line",
            legendText: "Recovered",
            showInLegend: true,
            yValueFormatString: "0",
            dataPoints: recovered
        },
        {
            type: "line",
            legendText: "Deaths",
            showInLegend: true,
            yValueFormatString: "0",
            dataPoints: fatality
        }]
    });

    function addData(data){
        var pDailyCase = 0, pDeaths = 0, pRecoveries = 0;
        for (var i = 0; i < data.length-1; i++) {

            dailycases.push({
                x: new Date(data[i].Date),
                y: Math.abs(pDailyCase - data[i].Confirmed)
            });

            recovered.push({
                x: new Date(data[i].Date),
                y: Math.abs(pRecoveries - data[i].Recovered)
            });
             
            fatality.push({
                x: new Date(data[i].Date),
                y: Math.abs(pDeaths - data[i].Deaths)
            });

            pDailyCase = data[i].Confirmed;
            pDeaths = data[i].Deaths;
            pRecoveries = data[i].Recovered;
        }
        chart.render();
        updateCases(data);
    }

    var country = document.getElementById('countryId').value + "";
    var url = "https://api.covid19api.com/total/country/"+country;
    $.getJSON(url, addData);
}