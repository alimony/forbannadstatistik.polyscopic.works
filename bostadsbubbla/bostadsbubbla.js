/* global FORBANNAD */
(function () {
	'use strict';

	// These are percentual changes from year to year, which we will then
	// recalculate to an index series starting at index 100.
	var dataArray = [
		['År', 'Belgien', 'Danmark', 'Frankrike', 'Holland', 'Irland', 'Italien', 'Norge', 'Portugal', 'Schweiz', 'Spanien', 'Storbritannien', 'Sverige', 'Tyskland'],
		['1996', 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
		['1997', 0.8, 9.4, -1.3, 9.3, 11.8, -6.7, 9.2, 0.6, -4.3, 1.5, 7.2, 5.2, -3.0],
		['1998', 5.3, 7.5, 1.6, 8.7, 19.3, 0.2, 8.4, 2.0, -0.7, 2.9, 9.4, 9.0, -2.4],
		['1999', 6.4, 4.8, 7.4, 14.5, 20.7, 3.6, 9.0, 6.3, -0.5, 4.8, 9.9, 7.8, -0.3],
		['2000', 2.2, 3.6, 6.3, 14.3, 15.1, 4.7, 12.5, 3.9, -0.5, 3.3, 14.0, 10.1, -0.3],
		['2001', 2.8, 3.4, 5.8, 7.6, 7.5, 5.4, 4.8, 1.6, 1.3, 5.8, 7.6, 5.6, -1.7],
		['2002', 5.1, 1.7, 7.7, 3.0, 1.6, 6.5, 3.5, -2.8, 5.0, 13.8, 15.0, 4.8, -1.9],
		['2003', 5.3, 1.9, 10.0, 1.6, 9.8, 7.2, -1.1, -2.4, 2.1, 16.3, 14.1, 4.9, -3.2],
		['2004', 6.3, 7.7, 12.7, 2.4, 9.3, 7.3, 8.8, -1.6, 1.6, 14.2, 9.5, 8.5, -2.3],
		['2005', 9.8, 15.6, 13.3, 2.5, 6.4, 5.3, 7.0, -1.5, 0.0, 10.9, 3.0, 7.8, -2.5],
		['2006', 8.5, 19.0, 9.7, 2.0, 11.7, 3.7, 11.6, -1.4, 1.2, 6.2, 3.6, 10.9, -1.0],
		['2007', 6.1, 2.8, 4.3, 2.0, 5.4, 2.8, 11.2, -2.8, 0.7, 2.1, 7.9, 8.8, -0.7],
		['2008', 1.6, -7.2, -1.8, 0.8, -7.4, -1.4, -4.4, -8.9, 0.7, -3.2, -4.6, 0.2, -1.0],
		['2009', 0.2, -13.1, -5.8, -2.4, -12.7, -3.3, -0.6, 0.5, 5.6, -6.8, -9.3, -0.7, 1.0],
		['2010', 3.6, 0.3, 4.0, -3.2, -11.2, -2.4, 6.0, -1.5, 4.2, -5.5, 2.7, 6.3, 0.7],
		['2011', 0.0, -5.0, 4.1, -4.4, -15.1, -2.1, 6.8, -6.7, 4.1, -8.6, -4.2, -0.9, 3.8],
		['2012', 0.3, -5.7, -1.9, -7.7, -13.8, -5.3, 5.6, -7.8, 4.7, -11.0, -0.4, -1.9, 4.7],
		['2013', 0.5, 1.6, -3.0, -8.3, 0.0, -6.8, 1.2, -4.4, 5.1, -7.3, 1.6, 2.4, 4.9],
		['2014', -0.2, 2.7, -1.8, -0.4, 10.5, -4.3, 0.4, 0.5, 1.4, -2.4, 8.3, 6.4, 4.1],
	];

	// Recalculate the base index to be 100 at year "zero" and then increased
	// each year by the corresponding percentual amount.
	var numberOfColumns = dataArray[0].length;
	var numberOfRows = dataArray.length;
	for (var currentColumn = 1; currentColumn < numberOfColumns; currentColumn++) {
		for (var currentRow = 2; currentRow < numberOfRows; currentRow++) {
			var percentage = dataArray[currentRow][currentColumn];
			if (percentage !== null) {
				var previousValue = dataArray[currentRow - 1][currentColumn];
				dataArray[currentRow][currentColumn] = previousValue + (previousValue * (percentage / 100.0));
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
				11: { // Sverige
					lineWidth: FORBANNAD.lineWidths.thick,
					color: FORBANNAD.defaultColors[0]
				}
			}
		};

		var chart = new google.visualization.LineChart(document.getElementById('chart'));

		chart.draw(chartData, $.extend({}, FORBANNAD.defaultChartOptions, additionalChartOptions));

		$('.first-year').html(dataArray[1][0]);
		$('#increase').html(Math.round(dataArray[dataArray.length - 1][12]) - 100);
		$('#number-of-years').html(dataArray.length - 1);
		$('.info').show();
	}
}());
