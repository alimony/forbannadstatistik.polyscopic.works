/* global FORBANNAD */
(function () {
	'use strict';

	// Set to true to replace the static HTML with live data from the SCB
	// database through their API. For more information, see:
	// http://www.scb.se/Pages/List____354082.aspx
	var FETCH_LIVE_RESULTS = false;

	var YEARS = [
		'1991', '1995', '1996', '1997', '1998', '1999',
		'2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
		'2010', '2011'
	];

	var HEADERS = ['År', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Medelvärde', 'Median'];

	var dataArray = [
		//         Decile 1, Decile 2, Decile 3, Decile 4, Decile 5, Decile 6, Decile 7, Decile 8, Decile 9, Decile 10, Average, Median
		/* 1991 */ [73400,   105600,   119500,   132400,   144400,   158000,   174000,   194200,   222200,   331100,    165500,  150700],
		/* 1995 */ [59400,   96800,    109800,   120500,   131300,   143200,   157300,   175500,   202000,   293200,    148900,  137100],
		/*         Some years are no longer listed at SCB, for some reason:
		/* 1996 */ // [61500,   94200,    107800,   118800,   130500,   143500,   157600,   177000,   204600,   309000,    150400,  137000],
		/* 1997 */ // [65400,   96500,    109800,   121200,   133200,   146600,   162500,   182300,   211100,   351400,    158000,  139700],
		/* 1998 */ // [59900,   99200,    112900,   124400,   136900,   150100,   166200,   186200,   216000,   332900,    158500,  143500],
		/* 1999 */ [65400,   104200,   118000,   130500,   143800,   158000,   175000,   198100,   231700,   387800,   171300,  150700],
		/* 2000 */ [70000,   107600,   122800,   136700,   151100,   167000,   186200,   210500,   248500,   488200,   188800,  158500],
		/* 2001 */ // [65400,   108600,   124600,   139400,   154400,   169600,   187700,   211300,   247100,   414000,    182200,  161500],
		/* 2002 */ // [72300,   110600,   127100,   142600,   158300,   174600,   194200,   218800,   254400,   408800,    186200,  166100],
		/* 2003 */ // [73800,   112900,   129100,   144000,   159200,   175500,   195000,   220500,   255100,   404100,    186900,  167100],
		/* 2004 */ // [76100,   116100,   133000,   148300,   163600,   180200,   199200,   224100,   261500,   432800,    193500,  171400],
		/* 2005 */ [79400,   118200,   136100,   152500,   169400,   186700,   206900,   232900,   270900,   480700,    203400,  177700],
		/* 2006 */ [82800,   121700,   140600,   158500,   176100,   194800,   216600,   244900,   288600,   543000,    216700,  184600],
		/* 2007 */ [84000,   125400,   146900,   167500,   188200,   209000,   233600,   266700,   316200,   622100,    235900,  197800],
		/* 2008 */ [76000,   123800,   146400,   168700,   189100,   210100,   234300,   265700,   310200,   548400,    227200,  199100],
		/* 2009 */ [77200,   125300,   148200,   170900,   192200,   214700,   240800,   273800,   324100,   556700,    232400,  203000],
		/* 2010 */ [78300,   125300,   148700,   172700,   195000,   217700,   243200,   276900,   324300,   582200,    236400,  206100],
		/* 2011 */ [79300,   128200,   153000,   177500,   200300,   223700,   250000,   284400,   335100,   599700,    243100,  212000],
		/* 2012 */ [82800,   130300,   154600,   178900,   202400,   225600,   253400,   288100,   339000,   585700,    244100,  213700]
	];

	if (FETCH_LIVE_RESULTS) {
		var API_URL = '//api.scb.se/OV0104/v1/doris/sv/ssd/HE/HE0103/HE0103A/DispInkKe2';
		var POST_DATA = {
			'query': [
				{
					'code': 'Kapitalvinst',
					'selection': {
						'filter': 'item',
						'values': ['10']
					}
				},
				{
					'code': 'Inkomstsum',
					'selection': {
						'filter': 'item',
						'values': ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'MED', 'M']
					}
				},
				{
					'code': 'ContentsCode',
					'selection': {
						'filter': 'item',
						'values': ['HE0103B9']
					}
				},
				{
					'code': 'Tid',
					'selection': {
						'filter': 'item',
						'values': YEARS
					}
				}
			],
			'response': { 'format': 'json' }
		};

		FORBANNAD.setChartMessage(FORBANNAD.texts.fetchingData);

		$.when(
			$.post(API_URL, JSON.stringify(POST_DATA), function (data) {
				var rowCount = dataArray.length;
				var yearCount = YEARS.length;
				var rowIndex;
				var getIntValue = function (element) {
					return parseInt(element.values[0].replace('.', ''), 10);
				};
				var setDataValue = function (index, value) {
					dataArray[index][rowIndex] = value;
				};
				for (rowIndex = 0; rowIndex < rowCount; rowIndex++) {
					var startIndex = rowIndex * yearCount;
					var endIndex = startIndex + yearCount;
					var valueObjects = data.data.slice(startIndex, endIndex);
					var values = $.map(valueObjects, getIntValue);
					$.each(values, setDataValue);
				}
			})
		)
		.done(function () {
			FORBANNAD.loadChart(drawChart);
		})
		.fail(function () {
			FORBANNAD.setChartMessage(FORBANNAD.texts.couldNotFetchData);
		});
	}
	else {
		FORBANNAD.loadChart(drawChart);
	}

	// This will draw the chart based on either the static JavaScript object on
	// top of this file, or an updated copy of the same object, if live data was
	// fetched from SCB.
	function drawChart() {
		// Add year header to each row.
		$.each(dataArray, function (index, element) {
			element.unshift(YEARS[index]);
		});

		// Add header row to data table.
		dataArray.unshift(HEADERS);

		var chartData = google.visualization.arrayToDataTable(dataArray);

		var formatter = new google.visualization.NumberFormat(FORBANNAD.numberFormats.sek);

		FORBANNAD.formatChartDataInColumnRange(formatter, chartData, 1, HEADERS.length - 1);

		var additionalChartOptions = {
			colors: FORBANNAD.defaultColors,
			legend: {
				position: 'in',
				textStyle: {
					color: 'black',
					fontSize: 13
				}
			},
			lineWidth: FORBANNAD.lineWidths.medium,
			vAxis: { format: FORBANNAD.vAxisFormats.sek },
			series: {
				10: { // Medelvärde
					lineWidth: FORBANNAD.lineWidths.thick
				},
				11: { // Median
					lineWidth: FORBANNAD.lineWidths.thick
				}
			}
		};

		var chart = new google.visualization.LineChart(document.getElementById('chart'));

		chart.draw(chartData, $.extend({}, FORBANNAD.defaultChartOptions, additionalChartOptions));
	}

	$('#first-year').html(YEARS[0]);
	$('#info').show();
}());
