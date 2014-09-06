/* global FORBANNAD */
(function () {
	'use strict';

	var YEARS = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013'];

	var HEADERS = ['År', 'Sysselsättningsgrad'];
	var dataArray = [
		// Sysselsatta / Totalt
		/* 2006 */ [4429.4 / 6731.9 * 100],
		/* 2007 */ [4540.7 / 6803.1 * 100],
		/* 2008 */ [4593.0 / 6879.5 * 100],
		/* 2009 */ [4498.7 / 6955.0 * 100],
		/* 2010 */ [4523.7 / 7021.6 * 100],
		/* 2011 */ [4625.9 / 7073.6 * 100],
		/* 2012 */ [4657.1 / 7114.9 * 100],
		/* 2013 */ [4704.7 / 7156.3 * 100]
	];

	FORBANNAD.loadChart(drawChart);

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
}());
