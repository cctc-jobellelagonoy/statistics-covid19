<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  
  <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
    <script src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js"></script>
    <script src="https://statistics-covid19.herokuapp.com/js/graph.js"></script>
    <link rel="stylesheet" type="text/css" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css">
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/neomorphism">
    <link rel="stylesheet" type="text/css" href="https://statistics-covid19.herokuapp.com/css/style.css">
  <title>COVID 19 Statistics</title>
</head>
<body class=" theme-light">
  <div class="container">
    <h1 class="pageTitle">COVID 19 Statistics</h1>
    <hr>
    <section style="width: 100%">
      <h6>Select Country</h6>

      <form id="searchCountry" class="dropdown">
          <select data-max-options="1" name="countryName" id="countryId" class="dropdown-toggle  button" style="width: 100%">
              <?php
                  $link = "https://api.covid19api.com/summary";                       
                  $data = file_get_contents($link);
                  $covid = json_decode($data, true);

                  $countries = array();
                  foreach ($covid['Countries'] as $country){
                    $countries[] = $country;
                  }
                      
                  foreach ($countries as $country) {
                      echo "<option class='dropdown-item' value='" . $country['Slug'] . "'>" . $country['Country'] . "</option>";
                  }
              ?>
          </select>
      </form>
    </section>

    <section>
      <div class="card card-lg radius-md">
        <header class="card-header"></header>
          <div class="card-content">
            <div id="chartContainer"></div>
          </div>
        <div class="card-footer"></div>
      </div>
    </section>

    <section>
      <div class="card card-lg radius-md">
        <header class="card-header">
          <p class="card-header-title" id="header-title">Cases</p>
        </header>
        <div class="card-content">
          <div>
            <div class="oneLine">
              <i class="caseLabel fas fa-hashtag p-1">&nbsp&nbsp Total</i> <p class="textarea caseText " id="totalCases">0</p>
            </div>
            <hr>
            <div class="oneLine">
              <i class="caseLabel fas fa-hashtag p-1">&nbsp&nbsp Active</i> <p class="textarea caseText " id="activeCases">0</p>
            </div>
            <hr>
            <div class="oneLine">
              <i class="caseLabel fas fa-heartbeat p-1">&nbsp&nbsp Recovered</i>  <p class="textarea caseText" id="recovered">0</p>
            </div>
            <hr>
            <div class="oneLine">
              <i class="caseLabel fas fa-heart-broken p-1">&nbsp&nbsp Deaths</i> <p class="textarea caseText" id="deaths">0</p>
            </div>
          </div>
        </div>   
        <div class="card-footer">
        </div>
      </div>
    </section>

  </div>
</body>
</html>