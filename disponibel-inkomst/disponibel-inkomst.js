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
		'2010', '2011', '2012', '2013'
	];

	var HEADERS = ['År', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Medelvärde', 'Median'];

	var dataArray = [
		//         Decile 1, Decile 2, Decile 3, Decile 4, Decile 5, Decile 6, Decile 7, Decile 8, Decile 9, Decile 10, Average, Median
		/* 1991 */ [73400,   105600,   119500,   132300,   144400,   158000,   174000,   194100,   222200,   331000,   165400,   150600],
		/* 1995 */ [59400,   96700,    109800,   120400,   131200,   143200,   157200,   175500,   201900,   293100,   148800,   137000],
		/* 1996 */ [62000,   95000,    108800,   119900,   131700,   144700,   159000,   178500,   206400,   311700,   151800,   138200],
		/* 1997 */ [66000,   97300,    110800,   122300,   134300,   147800,   163900,   183900,   212900,   354400,   159400,   140900],
		/* 1998 */ [60400,   100100,   113900,   125500,   138100,   151400,   167600,   187900,   217900,   335800,   159800,   144800],
		/* 1999 */ [65400,   104200,   118000,   130400,   143800,   158000,   174900,   198000,   231600,   387700,   171200,   150600],
		/* 2000 */ [69900,   107600,   122700,   136600,   151000,   166900,   186100,   210500,   248400,   488000,   188800,   158400],
		/* 2001 */ [66000,   109600,   125700,   140600,   155700,   171100,   189300,   213200,   249200,   417500,   183800,   162900],
		/* 2002 */ [72900,   111500,   128200,   143800,   159700,   176100,   195900,   220700,   256600,   412400,   187800,   167500],
		/* 2003 */ [74500,   113900,   130200,   145200,   160500,   177000,   196700,   222400,   257300,   407600,   188500,   168500],
		/* 2004 */ [76800,   117100,   134100,   149600,   165000,   181800,   200900,   226000,   263700,   436500,   195200,   172900],
		/* 2005 */ [79400,   118100,   136000,   152500,   169300,   186700,   206900,   232800,   270800,   480600,   203300,   177700],
		/* 2006 */ [82800,   121600,   140500,   158400,   176000,   194700,   216500,   244800,   288500,   542800,   216700,   184600],
		/* 2007 */ [84000,   125300,   146800,   167500,   188100,   208900,   233500,   266600,   316100,   621900,   235900,   197700],
		/* 2008 */ [75900,   123700,   146400,   168700,   189000,   210000,   234200,   265600,   310100,   548200,   227200,   199000],
		/* 2009 */ [77100,   125300,   148200,   170900,   192100,   214600,   240700,   273700,   324000,   556500,   232300,   203000],
		/* 2010 */ [78300,   125200,   148700,   172600,   194900,   217600,   243100,   276800,   324200,   582000,   236300,   206000],
		/* 2011 */ [79300,   128200,   153000,   177400,   200200,   223600,   249900,   284300,   335000,   599500,   243000,   212000],
		/* 2012 */ [82800,   130300,   154600,   178800,   202300,   225500,   253300,   288000,   338900,   585500,   244000,   213600],
		/* 2013 */ [83800,   132400,   156700,   181100,   205400,   229900,   257400,   292800,   346200,   627500,   251300,   217200]
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
