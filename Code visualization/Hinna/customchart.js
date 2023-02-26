fetch("http://127.0.0.1:5000/getRecord").then((response) => response.json())
  .then((data) => JSON.parse(data.data)).then( (data) => {
    let foggy = 0
    let clear = 0
    let partlyCloudy = 0
    let overcast = 0
    let mostlyCloudy = 0
    let labels = ["Foggy","Mostly Cloudy","Clear","Overcast","Partly Cloudy"]
    for (let i=0;i<data.length;i++) {
      if (data[i][11] == "Foggy") {
        foggy = foggy + 1
      }
      else if(data[i][11] == "MostlyCloudy") {
        mostlyCloudy = mostlyCloudy + 1
      }
      else if(data[i][11] == "Clear") {
        clear = clear + 1
      }
      else if(data[i][11] == "Overcast") {
        overcast = overcast + 1
      }
      else if(data[i][11] == "PartlyCloudy") {
        partlyCloudy = partlyCloudy + 1
      }
    }
    console.log(foggy)
    let ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Weather and Pokemon',
          data: [foggy, mostlyCloudy, clear, overcast, partlyCloudy],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)'
              
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)'
              
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })

    let asia = 0
    let pacific = 0
    let europe = 0
    let americas = 0
    let americasInd = 0
    let australia = 0
    let regions = ["Asia","Pacific","Europe","America","America/Indiana", "Australia"]

    console.log(data)
    for (let i=0;i<data.length;i++) {
      if (data[i][10] == regions[0]) {
        asia = asia + 1
      }
      else if(data[i][10] == regions[1]) {
        pacific = pacific + 1
      }
      else if(data[i][10] == regions[2]) {
        europe = europe + 1
      }
      else if(data[i][10] == regions[3]) {
        americas = americas + 1
      }
      else if(data[i][10] == regions[4]) {
        americasInd = americasInd + 1
      }
      else if(data[i][10] == regions[5]) {
        australia = australia + 1
      }
    }


    ctx = document.getElementById('myChart2');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: regions,
        datasets: [{
          label: 'Appearing in which Continent',
          data: [asia, pacific, europe, americas, americasInd, australia],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
      }
    })
  
  }
  );

    