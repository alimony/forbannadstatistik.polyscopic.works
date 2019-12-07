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
		'2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'
	];

	var HEADERS = ['År', 'Gini-koefficient'];
	var dataArray = [
		/* 1991 */ [0.226],
		/* 1995 */ [0.227],
		/* 1996 */ [0.237],
		/* 1997 */ [0.253],
		/* 1998 */ [0.245],
		/* 1999 */ [0.261],
		/* 2000 */ [0.294],
		/* 2001 */ [0.266],
		/* 2002 */ [0.258],
		/* 2003 */ [0.253],
		/* 2004 */ [0.258],
		/* 2005 */ [0.271],
		/* 2006 */ [0.288],
		/* 2007 */ [0.307],
		/* 2008 */ [0.289],
		/* 2009 */ [0.291],
		/* 2010 */ [0.297],
		/* 2011 */ [0.298],
		/* 2012 */ [0.291],
		/* 2013 */ [0.301],
		/* 2014 */ [0.304],
		/* 2015 */ [0.317],
		/* 2016 */ [0.320],
		/* 2017 */ [0.322]
	];

	if (FETCH_LIVE_RESULTS) {
		var API_URL = '//api.scb.se/OV0104/v1/doris/sv/ssd/HE/HE0103/HE0103A/DispInk8';
		var POST_DATA = {
			'query': [
				{
					'code': 'Hushallsdef',
					'selection': {
						'filter': 'item',
						'values': ['FAME']
					}
				},
				{
					'code': 'InkomstTyp',
					'selection': {
						'filter': 'item',
						'values': ['DispInk']
					}
				},
				{
					'code': 'ContentsCode',
					'selection': {
						'filter': 'item',
						'values': ['HE0103AD']
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
				$.each(data.data, function (index, valueObject) {
					dataArray[index] = [parseFloat(valueObject.values[0], 10)];
				});
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
		// Find the highest coefficient and save its value and year for
		// insertion in the last explanatory paragraph.
		var yearsArray = $.map(dataArray, function (item) {
			return item[0];
		});
		var largestValue = Math.max.apply(Math, yearsArray);
		var highestYear = YEARS[yearsArray.indexOf(largestValue)];

		$('#highest-year').html(highestYear);

		// Insert first year.
		$('#first-year').html(YEARS[0]);

		// Add year header to each row.
		$.each(dataArray, function (index, element) {
			element.unshift(YEARS[index]);
		});

		// Add header row to data table.
		dataArray.unshift(HEADERS);

		var chartData = google.visualization.arrayToDataTable(dataArray);

		var formatter = new google.visualization.NumberFormat(FORBANNAD.numberFormats.threeDigitDecimal);

		formatter.format(chartData, 1);

		var additionalChartOptions = {
			colors: FORBANNAD.defaultColors,
			lineWidth: FORBANNAD.lineWidths.medium,
			hAxis: {
				viewWindow: {
					max: dataArray.length
				}
			}
		};

		var chart = new google.visualization.LineChart(document.getElementById('chart'));

		chart.draw(chartData, $.extend({}, FORBANNAD.defaultChartOptions, additionalChartOptions));
	}
}());
