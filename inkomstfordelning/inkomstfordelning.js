/* global FORBANNAD */
(function () {
	'use strict';

	// Set to true to replace the static HTML with live data from the SCB
	// database through their API. For more information, see:
	// http://www.scb.se/Pages/List____354082.aspx
	var FETCH_LIVE_RESULTS = false;

	var YEARS = [
		'1975', '1978',
		'1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989',
		'1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
		'2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
		'2010', '2011'
	];

	var HEADERS = ['År', 'Gini-koefficient'];
	var dataArray = [
		/* 1975 */ [0.217],
		/* 1978 */ [0.205],
		/* 1980 */ [0.201],
		/* 1981 */ [0.199],
		/* 1982 */ [0.203],
		/* 1983 */ [0.201],
		/* 1984 */ [0.210],
		/* 1985 */ [0.211],
		/* 1986 */ [0.220],
		/* 1987 */ [0.209],
		/* 1988 */ [0.209],
		/* 1989 */ [0.234],
		/* 1990 */ [0.237],
		/* 1991 */ [0.249],
		/* 1992 */ [0.241],
		/* 1993 */ [0.243],
		/* 1994 */ [0.271],
		/* 1995 */ [0.244],
		/* 1996 */ [0.253],
		/* 1997 */ [0.277],
		/* 1998 */ [0.263],
		/* 1999 */ [0.281],
		/* 2000 */ [0.313],
		/* 2001 */ [0.282],
		/* 2002 */ [0.280],
		/* 2003 */ [0.276],
		/* 2004 */ [0.281],
		/* 2005 */ [0.296],
		/* 2006 */ [0.311],
		/* 2007 */ [0.332],
		/* 2008 */ [0.314],
		/* 2009 */ [0.320],
		/* 2010 */ [0.325],
		/* 2011 */ [0.326]
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
		// Add year header to each row.
		$.each(dataArray, function (index, element) {
			element.unshift(YEARS[index]);
		});

		// Add header row to data table.
		dataArray.unshift(HEADERS);

		var chartData = google.visualization.arrayToDataTable(dataArray);

		var additionalChartOptions = {
			colors: FORBANNAD.defaultColors,
			lineWidth: FORBANNAD.lineWidths.medium
		};

		var chart = new google.visualization.LineChart(document.getElementById('chart'));

		chart.draw(chartData, $.extend({}, FORBANNAD.defaultChartOptions, additionalChartOptions));
	}
}());
