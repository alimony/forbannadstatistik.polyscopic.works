/* global FORBANNAD */
(function () {
	'use strict';

	// These are percentual changes from year to year, which we will then
	// recalculate to an index series starting at index 100.
	var dataArray = [
		['År', 'Belgien', 'Danmark', 'Frankrike', 'Holland', 'Irland', 'Italien', 'Norge', 'Portugal', 'Schweiz', 'Spanien', 'Storbritannien', 'Sverige', 'Tyskland'],
		['1996', 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
		['1997', 0.9, 9.5, -1.2, 9.4, 13.0, -6.7, 9.2, 0.6, -4.4, 1.4, 6.9, 5.1, -3.0],
		['1998', 5.1, 7.4, 1.7, 8.8, 19.2, 0.2, 8.4, 2.0, -1.1, 3.2, 9.8, 9.0, -1.4],
		['1999', 6.4, 4.8, 7.4, 14.5, 18.1, 3.6, 9.0, 6.3, -0.5, 4.8, 10.1, 7.8, -0.3],
		['2000', 2.1, 3.6, 6.3, 14.5, 15.1, 4.7, 12.5, 3.9, -0.5, 3.3, 14.2, 10.1, -0.3],
		['2001', 2.7, 3.4, 5.8, 7.4, 7.6, 5.4, 4.8, 1.6, 1.3, 5.8, 7.7, 5.6, -1.8],
		['2002', 4.9, 1.7, 7.7, 3.2, 1.6, 6.5, 3.5, -2.8, 5.0, 13.8, 15.5, 4.8, -1.9],
		['2003', 5.2, 1.9, 10.0, 1.6, 9.9, 7.2, -1.1, -2.4, 2.2, 16.3, 14.2, 4.9, -3.1],
		['2004', 6.1, 7.7, 12.7, 2.7, 8.8, 7.3, 8.8, -1.6, 1.6, 14.2, 10.1, 8.5, -2.3],
		['2005', 8.7, 16.6, 13.3, 2.3, 7.5, 5.3, 7.0, -1.5, 0.0, 10.9, 4.8, 7.8, -2.4],
		['2006', 6.5, 21.4, 9.7, 1.6, 12.0, 3.7, 11.6, -1.4, 1.2, 9.6, 5.0, 11.1, -1.0],
		['2007', 4.8, 0.9, 4.3, 2.5, 4.2, 2.8, 11.2, -2.8, 0.7, 6.3, 7.7, 10.9, -0.7],
		['2008', 1.2, -7.8, -1.8, 0.0, -8.7, -1.4, -4.4, -7.7, 0.7, -4.8, -8.0, -2.0, -1.0],
		['2009', -0.1, -13.1, -5.8, -3.5, -13.4, -3.3, -0.6, 1.0, 5.6, -5.8, -9.8, 0.7, 1.0],
		['2010', 1.4, 0.3, 4.0, -2.7, -11.6, -2.5, 6.0, -1.0, 4.2, -3.6, 3.6, 6.4, 0.8],
		['2011', 1.0, -4.0, 4.1, -4.0, -17.1, -2.1, 6.8, -6.5, 4.1, -9.8, -4.8, 0.8, 3.7],
		['2012', 0.2, -5.0, -1.9, -8.0, -15.0, -5.4, 5.6, -8.8, 4.9, -16.8, -1.5, 0.7, 4.7],
		['2013', 0.3, 3.1, -2.8, -8.2, 1.2, -6.8, 2.0, -2.7, 5.3, -10.1, 0.2, 4.7, 5.1],
		['2014', -1.3, 2.9, -1.9, 0.1, 15.2, -4.6, 0.5, 3.9, 1.5, 0.2, 6.2, 8.2, 4.1],
		['2015', 1.3, 6.4, -1.7, 3.6, 8.3, -2.6, 3.7, 2.3, 3.1, 3.8, 5.7, 12.0, 4.1]
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
