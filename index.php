<?php ?>
<!DOCTYPE html>
<html>
<head>
	<title>COVID 19 Statistics</title>
	<link rel="stylesheet" type="text/css" href="css/neomorphism.css">
	<!-- <script src="js/graph.js"></script> -->
	<script src="js/jquery-3.2.1.min.js"></script>
    <script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
    <script src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js"></script>
  	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
  <!-- 	<script src="js/axios.min.js"></script>
  	<script src="js/vue.min.js"></script> -->
	<link rel="stylesheet" type="text/css" href="css/style.css">

</head>
<body class="theme-light">
    <img src="images/banner.jpg" style="border-radius: 50px; width: 100%; margin: auto; padding: 20px">
	<div id="app">
		<div class="headerr">
			<h1>Corona Virus 2019 Statistics</h1>
		</div>
		<div class="wrapperr">
			<div class="leftt textarea radius-md">
				<div>
				    <h6>Select Country</h6>
			        <form id="searchCountry" class="dropdown">
			            <select @change="onCountryChange" v-model="selectedCountrySlug" data-max-options="1" name="countryName" id="countryId" class="dropdown-toggle  button">
			                <option class="dropdown-item" v-for="country in countries" v-bind:value="country.Slug">{{ country.Country }}</option>
			            </select>
			        </form>
				</div>
				
				<div class="card card-lg radius-md">
					<header class="card-header"></header>
			        <div class="card-content">
			            <div id="chartContainer" v-model="chart"></div>
			        </div>
	        		<div class="card-footer"></div>
				</div>


				<div class="innerLeftt">
					<div class="rate">
						<div>
							<div class="circle">
								<h4>{{ countryDeathRate }}</h4>
								<hr>
								<h6>Death rate</h6>
							</div>
						</div>
						<div>
							<div class="circle">
								<h4>{{ countryRecoveryRate }}</h4>
								<hr>
								<h6>Recovery rate</h6>
							</div>
						</div>
					</div>
					<div>
						<div class="card card-lg radius-md">
				        <header class="card-header">
				          <p class="card-header-title" id="header-title" >Cases in {{ selectedCountry }}</p>
				        </header>
				        <div class="card-content">
				          <div>
				            <div class="oneLine">
				              <i class="caseLabel fas fa-hashtag p-1">&nbsp&nbsp Total</i> <p class="textarea caseText ">{{ countryConfirmed }}</p>
				            </div>
				            <hr>
				            <div class="oneLine">
				              <i class="caseLabel fas fa-hashtag p-1">&nbsp&nbsp Active</i> <p class="textarea caseText ">{{ countryActive }}</p>
				            </div>
				            <hr>
				            <div class="oneLine">
				              <i class="caseLabel fas fa-heartbeat p-1">&nbsp&nbsp Recovered</i>  <p class="textarea caseText">{{ countryRecovered }}</p>
				            </div>
				            <hr>
				            <div class="oneLine">
				              <i class="caseLabel fas fa-heart-broken p-1">&nbsp&nbsp Deaths</i> <p class="textarea caseText">{{ countryDeaths }}</p>
				            </div>
				          </div>
				        </div>   
				        <div class="card-footer">
				        </div>
				      </div>
					</div>
				</div>
			</div>

			<div class="rightt">
				<div>Global Report</div>
				<div class="globalCases">
					<div class="textarea">
						<h4>{{ globalConfirmed }}</h4>
						<hr>
						<h6>Total Confirmed</h6>
					</div>
					<div class="textarea">
						<h4>{{ globalDeaths }}</h4>
						<hr>
						<h6>Total Deaths</h6>
					</div>
					<div class="textarea">
						<h4>{{ globalRecovered }}</h4>
						<hr>
						<h6>Total Recoveries</h6>
					</div>
				</div>
				<div>
					<div class="top10">
						<div class="titlee">Country-wise Comparison</div>
						
					</div>

			        <div>
					  <paginated-list :list-data="countries"/>  
					</div>

				</div>
				
			</div>

			
		</div>
		<div class="footerr" style="text-align: center; font-weight: bold">
			<hr>
			In Partial Fulfillment of the requirements for the subject Application Development and Emerging Technologies
			<br>
			Jobelle F. Lagonoy
		</div>
	</div>
	<script src="js/myVue.js"></script>
</body>
</html>