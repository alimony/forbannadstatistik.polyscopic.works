/* global FORBANNAD */
(function () {
	'use strict';

	// Set to true to replace the static HTML with live data from the SCB
	// database through their API. For more information, see:
	// http://www.scb.se/Pages/List____354082.aspx
	var FETCH_LIVE_RESULTS = false;

	var YEARS = [
		'1991', '1995',
		'2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
		'2010', '2011'
	];

	var HEADERS = ['År', 'Andel barn i hushåll med låg inkomst'];

	// This is data from SCB:
	// http://www.scb.se/Pages/TableAndChart____302020.aspx
	var dataArray = [
		/* 1991 */ [8.4],
		/* 1995 */ [9.9],
		/* 2000 */ [11.7],
		/* 2001 */ [11.4],
		/* 2002 */ [12.5],
		/* 2003 */ [11.7],
		/* 2004 */ [12.0],
		/* 2005 */ [13.5],
		/* 2006 */ [13.4],
		/* 2007 */ [15.2],
		/* 2008 */ [16.2],
		/* 2009 */ [16.4],
		/* 2010 */ [17.3],
		/* 2011 */ [17.3]
	];

	if (FETCH_LIVE_RESULTS) {
		var API_URL = '//api.scb.se/OV0104/v1/doris/sv/ssd/HE/HE0103/HE0103A/AndiHtyp27';
		var POST_DATA = {
			'query': [
				{
					'code': 'Region',
					'selection': {
						'filter': 'item',
						'values': ['10']
					}
				},
				{
					'code': 'Alder',
					'selection': {
						'filter': 'item',
						'values': ['0-19']
					}
				},
				{
					'code': 'ContentsCode',
					'selection': {
						'filter': 'item',
						'values': ['HE0103DV']
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
		// Add year header to each row.
		$.each(dataArray, function (index, element) {
			element.unshift(YEARS[index]);
		});

		// Add header row to data table.
		dataArray.unshift(HEADERS);

		var chartData = google.visualization.arrayToDataTable(dataArray);

		var formatter = new google.visualization.NumberFormat(FORBANNAD.numberFormats.twoDigitPercentage);

		formatter.format(chartData, 1);

		var additionalChartOptions = {
			colors: FORBANNAD.defaultColors,
			lineWidth: FORBANNAD.lineWidths.medium,
			vAxis: { format: FORBANNAD.vAxisFormats.roundedPercentage }
		};

		var chart = new google.visualization.LineChart(document.getElementById('chart'));

		chart.draw(chartData, $.extend({}, FORBANNAD.defaultChartOptions, additionalChartOptions));
	}

	$('#first-year').html(YEARS[0]);
	$('#second-year').html(YEARS[YEARS.length - 1]);
	$('#first-percentage').html(Math.round(dataArray[0][0]));
	$('#second-percentage').html(Math.round(dataArray[dataArray.length - 1][0]));
	$('#info').show();
}());
