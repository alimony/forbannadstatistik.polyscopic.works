(function () {
	'use strict';

	// These are percentual changes from year to year, which we will then
	// recalculate to an index series starting at index 100.
	var dataArray = [
		['År', 'Belgien', 'Danmark', 'Frankrike', 'Holland', 'Irland', 'Italien', 'Norge', 'Portugal', 'Schweiz', 'Spanien', 'Storbritannien', 'Sverige', 'Tyskland'],
		['1996', 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
		['1997', 0.8, 9.4, -1.3, 9.3, 11.8, -6.7, 9.2, 0.6, -4.3, 1.5, 7.2, 5.2, -3.0],
		['1998', 5.3, 7.5, 1.6, 8.7, 19.3, 0.2, 8.4, 2.0, -0.7, 2.9, 9.4, 9.0, -2.4],
		['1999', 6.8, 4.8, 7.4, 14.2, 20.9, 3.7, 9.0, 6.6, -0.4, 4.6, 9.6, 7.7, 1.5],
		['2000', 1.9, 3.7, 6.2, 13.9, 14.9, 4.7, 12.5, 4.1, 0.0, 3.6, 14.5, 10.3, -0.8],
		['2001', 2.9, 3.4, 5.8, 6.4, 7.9, 5.5, 4.7, 1.9, 1.4, 5.9, 7.1, 5.7, -1.8],
		['2002', 5.2, 1.9, 7.5, 3.3, 1.5, 6.6, 3.5, -2.1, 4.0, 13.6, 15.2, 4.7, -3.9],
		['2003', 5.4, 1.9, 9.8, 1.2, 10.0, 7.3, -1.1, -1.8, 2.7, 16.3, 13.8, 5.0, -2.5],
		['2004', 6.2, 7.6, 12.7, 3.3, 9.4, 7.1, 8.8, -1.9, 1.4, 14.2, 9.8, 8.2, -3.0],
		['2005', 9.8, 15.8, 13.4, 1.8, 6.3, 5.2, 7.0, -0.5, 0.7, 10.7, 3.0, 7.9, -3.6],
		['2006', 8.6, 19.3, 9.8, 2.4, 11.9, 3.8, 11.6, -0.9, 1.0, 6.2, 3.5, 11.0, -1.0],
		['2007', 6.2, 3.3, 4.4, 2.3, 5.3, 2.9, 11.2, -1.6, 0.4, 2.2, 8.1, 9.0, -0.4],
		['2008', 1.6, -7.0, -1.9, 1.8, -7.4, -1.4, -4.4, 1.3, -0.5, -3.2, -4.2, 0.2, -1.0],
		['2009', 0.4, -13.3, -6.6, -2.9, -12.4, -3.6, -0.5, 2.7, 5.8, -6.6, -9.2, -0.5, 0.6],
		['2000', 3.3, 0.2, 4.0, -3.2, -11.3, -2.5, 5.9, 0.5, 3.8, -5.5, 3.5, 6.2, 0.5],
		['2011', 0.0, -5.1, 3.8, -4.5, -14.4, -2.1, 6.6, -3.8, 4.0, -8.8, -5.2, -0.5, 3.3],
		['2012', null, -5.6, -2.2, -8.4, -14.3, -5.3, 5.8, -4.1, 4.2, -11.2, -1.0, -2.5, 3.6]
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
