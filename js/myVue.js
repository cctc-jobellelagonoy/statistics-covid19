Vue.component('paginated-list',{
	data(){
	    return {
	    	pageNumber: 0
	    }
	},
	props:{
	    listData:{
	    	type:Array,
	    	required:true
	    },
	    size:{
	    	type:Number,
	    	required:false,
	    	default: 10
	    }
	},
	methods:{
	    nextPage(){
	    	this.pageNumber++;
	    },
	    prevPage(){
	        this.pageNumber--;
	    }
	},
	computed:{
	    pageCount(){
	    	let l = this.listData.length,
	        s = this.size;
	      	return Math.ceil(l/s);
	    },
	    paginatedData(){
	    	const start = this.pageNumber * this.size,
	            end = start + this.size;
	    	return this.listData
	            .slice(start, end);
	    }
	},
	template: `
	  	<div>
	  		<table class="table">
				<thead>
				    <tr>
				        <th>Country</th>
				        <th>Confirmed</th>
				        <th>Deaths</th>
				        <th>Recoveries</th>
				    </tr>
			    </thead>
				<tbody>
				    <tr v-for = "country in paginatedData">
				        <td>{{ country.Country}}</td>
				        <td>{{ country.TotalConfirmed }}</td>
				        <td>{{ country.TotalDeaths }}</td>
				        <td>{{ country.TotalRecovered }}</td>
				    </tr>
			    </tbody>
			</table>

			<div class="pagination">
			    <button :disabled="pageNumber === 0" @click="prevPage" class="pagination-prev">
				    <svg id="icon-arrowPrev" viewbox="0 0 24 24" class="icon">
				        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
			        </svg>
		        </button>
		        <button  :disabled="pageNumber >= pageCount -1" @click="nextPage" class="pagination-next">
		            <svg id="icon-arrowNext" viewbox="0 0 24 24" class="icon">
				        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
				    </svg>
				</button>
		    </div>
		</div>
	`
});

new Vue({
    el:'#app',
	data:{
	   countries: [],
	   chart: [],
	   filter: ['Confirmed', 'Deaths', 'Recovered'],
	   sortKey: 'Confirmed',
	   reverse: false,
	   selectedCountrySlug: '',
	   selectedCountry: '',
	   globalConfirmed: 0,
	   globalDeaths: 0,
	   globalRecovered: 0,
	   countryConfirmed: 0,
	   countryDeaths: 0,
	   countryRecovered: 0,
	   countryActive: 0,
	   countryDeathRate: '0%',
	   countryRecoveryRate: '0%'
	},
	
	mounted() {
	   var self = this;
	
	   $.getJSON('https://api.covid19api.com/summary', function(data) {
	        self.countries = data.Countries;
	        self.globalConfirmed = data.Global.TotalConfirmed.toLocaleString();
	        self.globalDeaths = data.Global.TotalDeaths.toLocaleString();
	        self.globalRecovered = data.Global.TotalRecovered.toLocaleString();
	        console.log(data);
	   }); 

	    
	},
	methods: {
		onCountryChange(event) {
			var self = this;

			$.getJSON('https://api.covid19api.com/total/country/'+self.selectedCountrySlug, function(data) {
				self.selectedCountry = self.selectedCountrySlug.split('-').join(' ');
		    	var pDailyCase = 0, pDeaths = 0, pRecoveries = 0;
		    	var dailycases = [], recovered = [], fatality = [];
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

				self.chart = new CanvasJS.Chart("chartContainer", {
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
			
			    var active = data[data.length-1].Confirmed - (data[data.length-1].Recovered + data[data.length-1].Deaths);
			    var deathRate = ((data[data.length-1].Deaths/data[data.length-1].Confirmed) * 100.00);
			    var recoveryRate = ((data[data.length-1].Recovered/data[data.length-1].Confirmed) * 100.00);

		       	if(isNaN(active)) {
		       		active = 0;
		       	}
			       	
		       	if(isNaN(deathRate)) {
		       		deathRate = 0+'%';
		       		recoveryRate = 0+'%';
		       	}
		       	else {
		       		deathRate = deathRate.toFixed(2)+'%';
		       		recoveryRate = recoveryRate.toFixed(2)+'%';
		       	}

		       	self.chart.render();
		        self.countryConfirmed = data[data.length-1].Confirmed.toLocaleString();
		        self.countryDeaths = data[data.length-1].Deaths.toLocaleString();
		        self.countryRecovered = data[data.length-1].Recovered.toLocaleString();
		       	self.countryActive = active.toLocaleString();
		        self.countryDeathRate = deathRate;
		        self.countryRecoveryRate = recoveryRate;

		    });	
		}
	}
});