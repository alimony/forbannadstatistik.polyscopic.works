(function () {
	'use strict';

	// This is data from Eurostat:
	// http://epp.eurostat.ec.europa.eu/tgm/table.do?tab=table&amp;init=1&amp;plugin=1&amp;language=en&amp;pcode=tipspd20
	var dataArray = [
		['Year', 'Belgien', 'Bulgarien', 'Tjeckien', 'Danmark', 'Tyskland', 'Estland', 'Irland', 'Grekland', 'Spanien', 'Frankrike', 'Kroatien', 'Italien', 'Cypern', 'Lettland', 'Litauen', 'Luxemburg', 'Ungern', 'Malta', 'Holland', 'Österrike', 'Polen', 'Portugal', 'Rumänien', 'Slovenien', 'Slovakien', 'Finland', 'Sverige', 'Storbritannien'],
		['1995', 92.3, null, 67, 144, 108.4, 29.3, null, 41.6, 76.6, 94.2, null, 71.5, 126.3, 12.3, 20.9, null, 39.7, null, 142.8, 102.3, 20.4, 76.7, null, null, 68.4, 96.7, 121.4, 123.7],
		['1996', 98.3, null, 67.5, 147.2, 113.1, 35.7, null, 42.5, 77.1, 93.1, null, 69.2, 136.4, 12, 20.8, null, 41.7, null, 148.6, 104.6, 23.5, 81.9, null, null, 62.6, 94.2, 122.3, 119],
		['1997', 101.6, null, 76, 152.6, 116.1, 52.3, null, 43.8, 80.6, 92.7, null, 68.8, 145, 18, 23.3, null, 43.7, null, 151.9, 110.9, 24.4, 122.5, null, null, 61, 87.6, 130.4, 119.4],
		['1998', 104.4, null, 64.8, 152.8, 119.8, 56.7, null, 48.1, 87.2, 91.1, null, 69.5, 150.8, 24.9, 25.4, null, 43.9, null, 161.6, 111.4, 30.3, 134.2, 35.8, null, 64.3, 84.7, 134.1, 125.7],
		['1999', 108.9, null, 66.9, 157.2, 124, 54.4, null, 55.2, 96.7, 95.8, null, 74.8, 158.6, 27.5, 29.8, null, 49.9, null, 175.1, 117.8, 32.8, 144.3, 28.4, null, 60.3, 91.3, 136.7, 135.5],
		['2000', 111.4, 27.3, 63.2, 163.6, 127.4, 54.2, null, 58, 106.4, 101.2, null, 79.3, 164.1, 38.9, 30.2, null, 64.4, null, 186.5, 124.9, 35.2, 154.7, 26.7, null, 48.6, 97.6, 142, 141.6],
		['2001', 109.3, 29.3, 53.4, 176.8, 128, 61.8, 154.5, 64.8, 114.2, 106.5, 54.9, 83.9, 163.9, 47.4, 29.4, null, 63.1, null, 188, 127, 37.4, 165.9, 26.5, 58.5, 49, 96.7, 152.1, 149.7],
		['2002', 109, 32.8, 55, 175.8, 127.2, 68, 151.6, 68.1, 121.3, 106.2, 64.2, 86.6, 171, 51.2, 29.9, null, 65.9, null, 192.2, 126.6, 44.8, 169.4, 30.9, 60.1, 53.1, 104.9, 164, 157.8],
		['2003', 110.7, 42, 49.2, 177.9, 127.2, 75.1, 154.5, 71.8, 131.6, 105.8, 69.6, 90.5, 165.2, 60.1, 35.1, null, 77.5, null, 200, 128.6, 46.8, 176.1, 33, 64.2, 48.8, 110.2, 166.9, 158],
		['2004', 111.8, 58.7, 49.9, 185.8, 123.2, 85.6, 163.8, 78.3, 143.2, 107.4, 74.4, 94.2, 163.5, 71.1, 40.4, null, 77.7, 138, 202.2, 127.9, 41.3, 175.8, 33.3, 68.4, 48.8, 113, 165.4, 163.9],
		['2005', 109.3, 74.5, 50.9, 201.9, 121, 96.7, 187.1, 89.9, 160.9, 111.9, 81.6, 100.5, 200.4, 91.1, 50.3, null, 91.2, 139.6, 208.7, 132.1, 42.9, 184.4, 39.3, 77.7, 51.4, 122.8, 173.3, 174.7],
		['2006', 109.2, 93.8, 56, 215, 117.7, 115.7, 214.2, 97.8, 185, 115.7, 93.8, 107, 199.1, 114.5, 62.3, 134.7, 98.2, 146.8, 210.8, 132, 49.3, 192.3, 44.8, 83.9, 55.1, 125.1, 174.6, 181.1],
		['2007', 116.1, 130.2, 60.8, 224, 114.1, 127.6, 219.7, 107.1, 200.4, 120.2, 103.7, 114.7, 219.6, 119.5, 75.6, 163.9, 111.5, 147.2, 209.2, 133.9, 55.5, 202.7, 58.1, 98.1, 64.3, 128.6, 193, 182.3],
		['2008', 134.2, 147.2, 68.2, 237.3, 113.2, 144.1, 258.5, 118.8, 206.5, 126.9, 117.3, 119.1, 236.6, 123, 78, 191.8, 140.7, 154.3, 209.4, 139.2, 69.2, 216.3, 66.7, 108.2, 69.4, 144.4, 219.8, 193.2],
		['2009', 135, 153.1, 69.9, 250.9, 116.5, 157.2, 282.5, 122.7, 213.6, 134.8, 127.7, 125.6, 256.2, 142.9, 85, 312.9, 149.6, 164.1, 223.6, 147.4, 69.2, 225, 73.1, 115.7, 73.9, 155.5, 230.7, 197.9],
		['2010', 133, 152.2, 70.7, 243.2, 110.6, 144.6, 284.9, 128.1, 213.6, 137.2, 136.8, 126.5, 273, 135.3, 76.4, 281.4, 133.6, 162.6, 224.1, 150, 71, 222.8, 75.4, 117.8, 72.8, 156.4, 216.8, 185.7],
		['2011', 144, 135.9, 72.4, 237.2, 107.8, 132.3, 280.7, 130, 204, 139.4, 134.1, 126.2, 283.4, 117.6, 66.6, 266.7, 147.5, 169.1, 223.7, 146.2, 76.6, 223.2, 71.1, 115.8, 76.3, 153.1, 214.9, 183],
		['2012', 149.2, null, null, 238.9, 107.6, null, null, 130.3, null, null, null, null, null, null, null, null, 131.1, null, null, null, null, 224.7, null, 113.5, null, null, 215.1, 181.8]
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
