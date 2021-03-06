/* global FORBANNAD */
(function () {
	'use strict';

	var dataArray = [
		['År', 'Belgien', 'Bulgarien', 'Tjeckien', 'Danmark', 'Tyskland', 'Estland', 'Irland', 'Grekland', 'Spanien', 'Frankrike', 'Kroatien', 'Italien', 'Cypern', 'Lettland', 'Litauen', 'Luxemburg', 'Ungern', 'Malta', 'Holland', 'Österrike', 'Polen', 'Portugal', 'Rumänien', 'Slovenien', 'Slovakien', 'Finland', 'Sverige', 'Storbritannien',],
		['1995', 92.9, 30.6, 64.5, 138.1, 105.9, 28.1, null, 35.7, 74.8, 93.5, null, 68.2, 317.6, 11.4, 21, null, 40.6, 108.2, 189, 102.9, 20, 84.2, 77, 33.4, 66.3, 95.3, 115.7, 114.4],
		['1996', 98.1, 51.3, 65.1, 142.8, 110.6, 35.1, null, 36.3, 75.1, 93.1, null, 66.2, 314.7, 18.7, 20.9, null, 42.6, 117.8, 191.8, 104.2, 23.1, 90.2, 60.5, 33.8, 60.6, 92.3, 115.4, 112.9],
		['1997', 102.1, 9.9, 72.8, 144.1, 113.8, 51.2, null, 37, 78.6, 92.7, null, 65.8, 315.2, 23.9, 23.3, null, 44.2, 122.3, 190, 108.6, 24.1, 96.2, 36.1, 35.8, 59, 84.2, 122.7, 118.3],
		['1998', 105.8, 10.4, 62.1, 146.1, 116.9, 56, null, 41, 84.5, 91.3, null, 66.4, 310, 31.6, 25.4, null, 44.4, 123.3, 195.3, 109.1, 30.1, 112.1, 36.1, 41.1, 62.6, 82.1, 126.4, 121.2],
		['1999', 112.2, 16.3, 60.7, 147.9, 120, 53.8, null, 44.4, 94.4, 95.2, null, 71.6, 303.6, 35.6, 29.8, 120, 48.7, 128, 204.3, 114.9, 32.4, 126.7, 28.4, 48.5, 58.8, 87, 132.3, 133.4],
		['2000', 114.9, 23.6, 56.8, 158.1, 123.5, 53.9, null, 53.4, 103.3, 99.5, null, 75.7, 304.6, 46.6, 30.1, 118.3, 55.8, 130.3, 210.5, 121.4, 35.1, 138.8, 26.7, 53.3, 47.5, 91.9, 135.8, 138.6],
		['2001', 113.4, 27, 50.6, 169.1, 123.6, 61.5, 139.3, 60.6, 109.9, 103.8, 54.5, 79.4, 274, 47.6, 29.3, 145.1, 57.2, 137, 210.6, 122.8, 37.5, 152.1, 26.7, 57.4, 47.9, 91.7, 143.3, 146.1],
		['2002', 112.6, 31.8, 51.9, 167.1, 122.8, 67.5, 137.4, 64.3, 116.5, 103.8, 63.6, 82.4, 277.1, 50.5, 29.7, 154.7, 56.2, 124.3, 211.4, 122.2, 44.8, 155.4, 30.8, 59.1, 51.5, 100.2, 146.7, 152.9],
		['2003', 117.6, 41.2, 46.3, 173.3, 123.5, 74.5, 141.3, 68.4, 126.9, 103.8, 68.6, 86, 258, 53.3, 35.7, 217.8, 67.2, 119.3, 226.7, 124.8, 46.3, 161.6, 34, 63.1, 46.9, 103.7, 144.4, 154.5],
		['2004', 121.4, 57, 46.9, 173, 119.5, 84.5, 149.5, 73.5, 138.9, 105.2, 73.3, 89.5, 219, 68.7, 40.6, 195, 70.2, 131.1, 226.8, 122.9, 41.4, 164.1, 33.6, 67.2, 46.8, 106.1, 144, 160.1],
		['2005', 121.3, 74.2, 47.9, 187.7, 117.9, 96.9, 170.1, 85.6, 155.6, 109.6, 80.5, 95.7, 245.9, 85.3, 50, 182.2, 78.9, 136.4, 231.4, 127.4, 42, 169.9, 39.6, 76.6, 48.7, 114.3, 151.6, 171.4],
		['2006', 123.2, 93.2, 52.9, 200, 114.4, 114.9, 190.6, 92.5, 178.5, 112.9, 92.1, 102, 249.2, 104.7, 62.3, 187.5, 83, 145.8, 228.3, 122.3, 47.6, 175.7, 45, 82.7, 51.7, 117.5, 154.2, 177.3],
		['2007', 134.9, 122.3, 57.4, 208.5, 111.2, 121.3, 198.1, 101.5, 193.1, 115.9, 101, 109.3, 263.7, 109.6, 74.4, 316.5, 93.4, 150.7, 228, 123.9, 54.4, 184.8, 56.8, 96.7, 60.3, 121.7, 168.1, 181.7],
		['2008', 167.2, 140.4, 63.8, 222.3, 110.5, 130.9, 236.4, 113, 197.4, 122.4, 110.9, 113.5, 286.5, 113.1, 76.8, 302.7, 104.7, 158.8, 230.7, 126.7, 67.3, 195.9, 63.7, 105.9, 64, 130.7, 188.8, 188.4],
		['2009', 173.7, 140.4, 65.9, 232.2, 113.7, 145.8, 256.1, 116.5, 204.2, 130.6, 118.9, 122.2, 301.5, 137.4, 83.4, 332.2, 115.9, 174.5, 245.6, 131.9, 67.1, 204.3, 69.2, 113.5, 68.4, 140.5, 199.2, 189.5],
		['2010', 168.7, 137.3, 67.9, 220.6, 106.4, 136.7, 257, 128.1, 203.2, 132, 123.6, 122.8, 309.5, 134, 74.8, 284.2, 114.4, 169.9, 244.4, 132.3, 69.7, 201.7, 74.7, 115.2, 66, 146.2, 186.7, 182.2],
		['2011', 180.5, 129.1, 68.3, 221, 102.4, 118.9, 274.5, 130.2, 198.2, 135.3, 121, 121.8, 319.8, 115.2, 68.8, 284.3, 113.6, 168.4, 247.2, 129.4, 73.9, 204.6, 73.7, 112.9, 69.5, 144.6, 189.1, 176.6],
		['2012', 191, 128.3, 70.7, 224, 101.9, 117.2, 279.1, 132.6, 188.5, 138.3, 118.4, 124.2, 326, 96.8, 61.1, 303.7, 101.1, 162.4, 252.1, 128.2, 73.4, 210.6, 72.1, 112.2, 71.1, 147.7, 191, 176.1],
		['2013', 163, 130.6, 73.7, 216.1, 103, 115.2, 267.5, 132.3, 178.1, 137.4, 117.2, 121.2, 341.2, 91, 56.7, 313.3, 94.6, 153, 257.7, 127.1, 75.4, 201.6, 66.8, 107.2, 75.2, 147, 194.3, 170.2],
		['2014', 162.2, 125.6, 71.5, 214, 98.4, 115.4, 278.4, 130.8, 168.2, 141.5, 117.2, 118.9, 352.8, 82.2, 54.2, 324.9, 90.7, 143.9, 267.2, 124.8, 78.1, 190.1, 62.1, 97.9, 79, 148.8, 193.3, 163.6],
		['2015', 176.1, 109.3, 68.1, 211.4, 97.8, 112.8, 305.1, 128, 155.8, 142.8, 111.9, 115.1, 347.8, 80.4, 55.3, 335.8, 83.2, 134.8, 262.8, 124, 78.9, 179.3, 58, 87.4, 80.6, 151.5, 191.5, 161.7],
		['2016', 194.8, 104.5, 68.7, 209, 98.2, 112.4, 284.4, 125.1, 147.5, 143.7, 104.1, 111.7, 329.5, 80.5, 56.5, 309, 76.6, 136.1, 259.3, 123.5, 81.6, 169.1, 53.7, 81.1, 88.6, 148, 192, 166.4],
		['2017', 185, 99, 67.3, 202.7, 100, 107.6, 250.5, 118.1, 139.7, 145.5, 97.8, 108.8, 304, 76.9, 56.1, 322.9, 70, 132, 249.1, 121.8, 76.5, 162.2, 50.9, 76.3, 94.5, 145.3, 197.9, 167.7],
		['2018', 178.5, 95, 70.7, 198.3, 102.1, 101.5, 223.2, 115.3, 133.5, 148.9, 93.9, 107, 282.6, 70.3, 56.4, 306.5, 69.3, 129.2, 241.6, 121, 76.1, 155.4, 47.8, 72.8, 90.9, 142.1, 200, 163.6],
	];

	FORBANNAD.loadChart(drawChart);

	function drawChart() {
		var chartData = google.visualization.arrayToDataTable(dataArray);

		var formatter = new google.visualization.NumberFormat(FORBANNAD.numberFormats.twoDigitPercentage);

		FORBANNAD.formatChartDataInColumnRange(formatter, chartData, 1, dataArray[0].length - 1);

		// Find the largest value in our data, so we can set a proper ceiling
		// in the chart, better than the automatic one at least.
		var largestValue = Math.max.apply(Math, $.map(dataArray.slice(1), function (row) {
			return Math.max.apply(Math, row.slice(1));
		}));

		var additionalChartOptions = {
			vAxis: {
				format: FORBANNAD.vAxisFormats.roundedPercentage,
				viewWindow: { max: Math.round(largestValue) + 10 }
			},
			lineWidth: FORBANNAD.lineWidths.thin,
			series: {
				26: { // Sverige
					lineWidth: FORBANNAD.lineWidths.thick
				}
			}
		};

		var chart = new google.visualization.LineChart(document.getElementById('chart'));

		chart.draw(chartData, $.extend({}, FORBANNAD.defaultChartOptions, additionalChartOptions));
	}
}());
