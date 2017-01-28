(function () {
	'use strict';

	// This exports a global object with some functions and attributes that can
	// be reused between all the pages in their own JavaScript.
	window.FORBANNAD = {
		millionStringForValue: function (value) {
			return (value / 1000000).toFixed(2).replace('.', ',') + ' milj.';
		},
		percentStringForValue: function (value) {
			return (value * 100).toFixed(2).replace('.', ',') + '%';
		},
		formatChartDataInColumnRange: function (formatter, chartData, firstColumnIndex, lastColumnIndex) {
			for (var i = firstColumnIndex; i < lastColumnIndex + 1; i++) {
				formatter.format(chartData, i);
			}
		},
		loadChart: function (callback) {
			google.load('visualization', '1.0', {
				'packages': ['corechart'],
				'callback': callback
			});
		},
		setChartMessage: function (message) {
			// This will replace the chart contents with a simple message string.
			$('#chart').html('<p>' + message + '</p>');
		},
		defaultChartOptions: {
			backgroundColor: '#efefef',
			fontName: 'Playfair Display, Georgia, Times, Times New Roman, serif',
			fontSize: 15,
			legend: { position: 'none' },
			theme: 'maximized'
		},
		defaultColors: [
			'#993300', // From red...
			'#8e330b',
			'#7e331b',
			'#6c332d',
			'#573342',
			'#423357',
			'#2d336c',
			'#1a337e',
			'#0b338e',
			'#003399', // ...to blue.

			'#339900', // And a couple...
			'#ccaa00'  // ...of others.
		],
		texts: {
			fetchingData: 'Hämtar data från SCB…',
			couldNotFetchData: 'Kunde inte hämta data från SCB.<br>Pröva att <a href="." target="_self">ladda om</a> sidan.<br>Om det ändå inte fungerar, <a href="mailto:info@forbannadstatistik.se" target="_self">skriv gärna</a> och berätta det.'
		},
		lineWidths: {
			thin: 1,
			medium: 4,
			thick: 10
		},
		numberFormats: {
			sek: {
				fractionDigits: 0,
				groupingSymbol: ' ',
				suffix: ' SEK'
			},
			threeDigitDecimal: {
				fractionDigits: 3,
			},
			twoDigitPercentage: {
				fractionDigits: 2,
				suffix: '%'
			}
		},
		vAxisFormats: {
			roundedPercentage: '#\'%\'',
			sek: '#,###\' SEK\''
		}
	};
}());
