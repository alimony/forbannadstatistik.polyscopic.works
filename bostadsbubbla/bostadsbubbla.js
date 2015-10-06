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
		['1999', 6.4, 4.8, 7.4, -0.3, 20.7, 3.6, 14.5, 9.0, 6.3, 4.8, 7.8, -0.5, 9.9],
		['2000', 2.2, 3.6, 6.3, -0.3, 15.1, 4.7, 14.3, 12.5, 3.9, 3.3, 10.1, -0.5, 14.0],
		['2001', 2.8, 3.4, 5.8, -1.7, 7.5, 5.4, 7.6, 4.8, 1.6, 5.8, 5.6, 1.3, 7.6],
		['2002', 5.1, 1.7, 7.7, -1.9, 1.6, 6.5, 3.0, 3.5, -2.8, 13.8, 4.8, 5.0, 15.0],
		['2003', 5.3, 1.9, 10.0, -3.2, 9.8, 7.2, 1.6, -1.1, -2.4, 16.3, 4.9, 2.1, 14.1],
		['2004', 6.3, 7.7, 12.7, -2.3, 9.3, 7.3, 2.4, 8.8, -1.6, 14.2, 8.5, 1.6, 9.5],
		['2005', 9.8, 15.6, 13.3, -2.5, 6.4, 5.3, 2.5, 7.0, -1.5, 10.9, 7.8, 0.0, 3.0],
		['2006', 8.5, 19.0, 9.7, -1.0, 11.7, 3.7, 2.0, 11.6, -1.4, 6.2, 10.9, 1.2, 3.6],
		['2007', 6.1, 2.8, 4.3, -0.7, 5.4, 2.8, 2.0, 11.2, -2.8, 2.1, 8.8, 0.7, 7.9],
		['2008', 1.6, -7.2, -1.8, -1.0, -7.4, -1.4, 0.8, -4.4, -8.9, -3.2, 0.2, 0.7, -4.6],
		['2009', 0.2, -13.1, -5.8, 1.0, -12.7, -3.3, -2.4, -0.6, 0.5, -6.8, -0.7, 5.6, -9.3],
		['2010', 3.6, 0.3, 4.0, 0.7, -11.2, -2.4, -3.2, 6.0, -1.5, -5.5, 6.3, 4.2, 2.7],
		['2011', 0.0, -5.0, 4.1, 3.8, -15.1, -2.1, -4.4, 6.8, -6.7, -8.6, -0.9, 4.1, -4.2],
		['2012', 0.3, -5.7, -1.9, 4.7, -13.8, -5.3, -7.7, 5.6, -7.8, -11.0, -1.9, 4.7, -0.4],
		['2013', 0.5, 1.6, -3.0, 4.9, 0.0, -6.8, -8.3, 1.2, -4.4, -7.3, 2.4, 5.1, 1.6],
		['2014', -0.2, 2.7, -1.8, 4.1, 10.5, -4.3, -0.4, 0.4, 0.5, -2.4, 6.4, 1.4, 8.3]
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
