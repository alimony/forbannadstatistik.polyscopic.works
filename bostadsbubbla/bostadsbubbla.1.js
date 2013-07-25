(function () {
	'use strict';

	// This is data from Eurostat:
	// http://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-304232_QID_-3F6A8394_UID_-3F171EB0&layout=TIME,C,X,0;GEO,L,Y,0;TYPPURCH,L,Z,0;INFOTYPE,L,Z,1;INDICATORS,C,Z,2;&zSelection=DS-304232TYPPURCH,TOTAL;DS-304232INDICATORS,OBS_FLAG;DS-304232INFOTYPE,AVX;&rankName1=TIME_1_0_0_0&rankName2=INFOTYPE_1_2_-1_2&rankName3=TYPPURCH_1_2_-1_2&rankName4=INDICATORS_1_2_-1_2&rankName5=GEO_1_2_0_1&sortC=ASC_-1_FIRST&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=ROLLING&time_most_recent=true&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23
	// Some values are unused until we have more data.
	var dataArray = [
		['År', 'EU', 'Euroområdet', 'Belgien', /*'Bulgarien', 'Tjeckien',*/ 'Danmark', 'Tyskland', 'Estland', 'Irland', 'Grekland', 'Spanien', /*'Frankrike', 'Italien',*/ 'Cypern', 'Lettland', 'Litauen', /*'Luxemburg', 'Ungern',*/ 'Malta', 'Holland', /*'Österrike', 'Portugal', 'Rumänien', 'Slovenien',*/ 'Slovakien', 'Finland', 'Sverige', 'Storbritannien', 'Island', 'Norge'],
		//['2005', 86.5, 90.7, 78.9, null, null, 91.5, 99.4, 92.4, 122.7, null, null, null, null, 86, null, null, null, null, 64.2, 95.2, null, null, null, null, null, 81.2, 69.9, 86.6, 84.1, 71.6],
		['2006', 93.9,  96.7,  86.6,  /*null,  null,*/  113.5, 99,    138.1, 140.8, 92.6,  100.7, /*null,  null,*/  96.2,  130,   111.9, /*null,  null,*/  76.9,  99.2,  /*null, null,  null,  null,*/  78.5,  86.9,  78.8,  92.1,  98.3,  81.4],
		['2007', 102.1, 100.7, 93.3,  /*null,  null,*/  116.5, 96.9,  166.7, 151.1, 97.3,  110.6, /*100.8, null,*/  107.5, 177.2, 141.4, /*95.1,  105.6,*/ 93.1,  104.1, /*null, null,  null,  103.1,*/ 101.3, 92.0,  88.8,  102.1, 107.5, 91.6],
		['2008', 103.1, 101.9, 97.4,  /*null,  105.9,*/ 110.5, 98.2,  150.7, 140.5, 101.7, 109,   /*101.7, null,*/  113.5, 179.2, 154.1, /*97.8,  108.1,*/ 103.4, 106.2, /*null, 100.3, null,  110.3,*/ 119.4, 92.7,  89.9,  101.2, 114.2, 90.7],
		['2009', 98.7,  99.2,  97,    /*111.3, 101.8,*/ 97.3,  99,    94.6,  114.1, 102.7, 101.8, /*95.4,  null,*/  106.1, 112.3, 108,   /*95.9,  102.5,*/ 98.9,  101.5, /*99.4, 99.4,  108.5, 99.9,*/  104.2, 94.1,  92.4,  93.3,  103.1, 92.4],
		['2010', 100,   100,   100,   /*100,   100,*/   100,   100,   100,   100,   100,   100,   /*100,   100,*/   100,   100,   100,   /*100,   100,*/   100,   100,   /*100,  100,   100,   100,*/   100,   100,   100,   100,   100,   100],
		['2011', 100.2, 100.9, 104,   /*94.5,  100,*/   98.3,  103.5, 108.5, 86.1,  null,  92.4,  /*105.8, 100.7,*/ 93.4,  109.9, 106.6, /*104.1, 96.6,*/  98.6,  98.1,  /*95.5, 98.3,  85.8,  102.7,*/ 98.5,  103.1, 102.3, 99,    104.6, 108],
		['2012', 98.9,  99.1,  106.4, /*92.7,  98.6,*/  95.6,  null,  116.4, 76.3,  null,  78.7,  /*105.3, 97.9,*/  93.5,  112.6, 106.4, /*109.5, 93.1,*/  100.7, 91.6,  /*null, 91.1,  80.2,  95.6,*/  95.8,  105.5, 103.3, 100.7, 111.9, 116.6]
	];

	// Recalculate the base index to be 100 at year "zero".
	var numberOfColumns = dataArray[0].length;
	var numberOfRows = dataArray.length;
	for (var currentColumn = 1; currentColumn < numberOfColumns; currentColumn++) {
		var initialValue = dataArray[1][currentColumn];
		for (var currentRow = 1; currentRow < numberOfRows; currentRow++) {
			var currentValue = dataArray[currentRow][currentColumn];
			if (currentValue !== null) {
				dataArray[currentRow][currentColumn] = (currentValue / initialValue) * 100.0;
			}
		}
	}

	FORBANNAD.loadChart(drawChart);

	function drawChart() {
		var chartData = google.visualization.arrayToDataTable(dataArray);

		var formatter = new google.visualization.NumberFormat(FORBANNAD.numberFormats.twoDigitPercentage);

		FORBANNAD.formatChartDataInColumnRange(formatter, chartData, 1, dataArray[0].length - 1);

		var additionalChartOptions = {
			vAxis: { format: FORBANNAD.vAxisFormats.roundedPercentage },
			lineWidth: FORBANNAD.lineWidths.thin,
			series: {
				16: { // Sverige
					lineWidth: FORBANNAD.lineWidths.thick,
					color: FORBANNAD.defaultColors[0]
				}
			}
		};

		var chart = new google.visualization.LineChart(document.getElementById('chart'));

		chart.draw(chartData, $.extend({}, FORBANNAD.defaultChartOptions, additionalChartOptions));

		$('#first-year').html(dataArray[1][0]);
		$('#increase').html(Math.round(dataArray[dataArray.length - 1][17]));
		$('#info').show();
	}
}());
