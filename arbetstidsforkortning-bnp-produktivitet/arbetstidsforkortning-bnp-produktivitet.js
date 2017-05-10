/* global FORBANNAD */
/* jshint -W100 */
(function () {
	'use strict';

	// This piece will not fetch any live data from SCB, since many of the
	// numbers are from sources not (yet) available through their API.

	var YEARS = [
		'1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959',
		'1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969',
		'1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979',
		'1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989',
		'1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
		'2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
		'2010', '2011', '2012', '2013', '2014', '2015', '2016'
	];

	var HEADERS_1 = ['År', 'Antal timmar på en arbetsvecka'];
	var dataArray1 = [
		/* 1950 */ [48],
		/* 1951 */ [48],
		/* 1952 */ [48],
		/* 1953 */ [48],
		/* 1954 */ [48],
		/* 1955 */ [48],
		/* 1956 */ [48],
		/* 1957 */ [48],
		/* 1958 */ [45],
		/* 1959 */ [45],
		/* 1960 */ [45],
		/* 1961 */ [45],
		/* 1962 */ [45],
		/* 1963 */ [45],
		/* 1964 */ [45],
		/* 1965 */ [45],
		/* 1966 */ [45],
		/* 1967 */ [42.5],
		/* 1968 */ [42.5],
		/* 1969 */ [42.5],
		/* 1970 */ [40],
		/* 1971 */ [40],
		/* 1972 */ [40],
		/* 1973 */ [40],
		/* 1974 */ [40],
		/* 1975 */ [40],
		/* 1976 */ [40],
		/* 1977 */ [40],
		/* 1978 */ [40],
		/* 1979 */ [40],
		/* 1980 */ [40],
		/* 1981 */ [40],
		/* 1982 */ [40],
		/* 1983 */ [40],
		/* 1984 */ [40],
		/* 1985 */ [40],
		/* 1986 */ [40],
		/* 1987 */ [40],
		/* 1988 */ [40],
		/* 1989 */ [40],
		/* 1990 */ [40],
		/* 1991 */ [40],
		/* 1992 */ [40],
		/* 1993 */ [40],
		/* 1994 */ [40],
		/* 1995 */ [40],
		/* 1996 */ [40],
		/* 1997 */ [40],
		/* 1998 */ [40],
		/* 1999 */ [40],
		/* 2000 */ [40],
		/* 2001 */ [40],
		/* 2002 */ [40],
		/* 2003 */ [40],
		/* 2004 */ [40],
		/* 2005 */ [40],
		/* 2006 */ [40],
		/* 2007 */ [40],
		/* 2008 */ [40],
		/* 2009 */ [40],
		/* 2010 */ [40],
		/* 2011 */ [40],
		/* 2012 */ [40],
		/* 2013 */ [40],
		/* 2014 */ [40],
		/* 2015 */ [40],
		/* 2016 */ [40]
	];

	var HEADERS_2 = ['År', 'BNP per capita'];
	var dataArray2 = [
		/* 1950 */ [5000],
		/* 1951 */ [6000],
		/* 1952 */ [7000],
		/* 1953 */ [7000],
		/* 1954 */ [7000],
		/* 1955 */ [8000],
		/* 1956 */ [8000],
		/* 1957 */ [9000],
		/* 1958 */ [9000],
		/* 1959 */ [10000],
		/* 1960 */ [11000],
		/* 1961 */ [12000],
		/* 1962 */ [13000],
		/* 1963 */ [13000],
		/* 1964 */ [15000],
		/* 1965 */ [16000],
		/* 1966 */ [18000],
		/* 1967 */ [19000],
		/* 1968 */ [20000],
		/* 1969 */ [21000],
		/* 1970 */ [24000],
		/* 1971 */ [26000],
		/* 1972 */ [28000],
		/* 1973 */ [31000],
		/* 1974 */ [35000],
		/* 1975 */ [41000],
		/* 1976 */ [46000],
		/* 1977 */ [50000],
		/* 1978 */ [56000],
		/* 1979 */ [62000],
		/* 1980 */ [70000],
		/* 1981 */ [77000],
		/* 1982 */ [84000],
		/* 1983 */ [94000],
		/* 1984 */ [106000],
		/* 1985 */ [115000],
		/* 1986 */ [125000],
		/* 1987 */ [135000],
		/* 1988 */ [147000],
		/* 1989 */ [162000],
		/* 1990 */ [177000],
		/* 1991 */ [189000],
		/* 1992 */ [188000],
		/* 1993 */ [187000],
		/* 1994 */ [199000],
		/* 1995 */ [213000],
		/* 1996 */ [219000],
		/* 1997 */ [228000],
		/* 1998 */ [240000],
		/* 1999 */ [253000],
		/* 2000 */ [268000],
		/* 2001 */ [279000],
		/* 2002 */ [288000],
		/* 2003 */ [299000],
		/* 2004 */ [312000],
		/* 2005 */ [322000],
		/* 2006 */ [341000],
		/* 2007 */ [360000],
		/* 2008 */ [367000],
		/* 2009 */ [354000],
		/* 2010 */ [375000],
		/* 2011 */ [387000],
		/* 2012 */ [387000],
		/* 2013 */ [393000],
		/* 2014 */ [406000],
		/* 2015 */ [427000],
		/* 2016 */ [441000]
	];

	var HEADERS_3 = ['År', 'Produktivitet'];
	var dataArray3 = [
		//          GDP           / Hours worked

		// Worked hours 1950–1959 from:
		// http://www.historia.se/tablesAtoX.xls
		/* 1950 */ [36093000000   / 6505975295],
		/* 1951 */ [44396000000   / 6491645283],
		/* 1952 */ [48284000000   / 6435878835],
		/* 1953 */ [49920000000   / 6365440595],
		/* 1954 */ [52992000000   / 6437879515],
		/* 1955 */ [56848000000   / 6492900200],
		/* 1956 */ [61748000000   / 6494137798],
		/* 1957 */ [65875000000   / 6517809156],
		/* 1958 */ [69547000000   / 6468060876],
		/* 1959 */ [73990000000   / 6461809093],

		// Worked hours 1960–1962 is from Appendix 5:
		// http://www.scb.se/sv_/Hitta-statistik/Publiceringskalender/Visa-detaljerad-information/?publobjid=8995
		/* 1960 */ [80384000000   / 6589630000],
		/* 1961 */ [87280000000   / 6650830000],
		/* 1962 */ [94614000000   / 6645430000],

		// Worked hours 1963–1980 is from Appendix 5:
		// http://www.scb.se/sv_/Hitta-statistik/Publiceringskalender/Visa-detaljerad-information/?publobjid=9000
		/* 1963 */ [102388000000  / 6616030000],
		/* 1964 */ [114124000000  / 6601360000],
		/* 1965 */ [125643000000  / 6605450000],
		/* 1966 */ [136782000000  / 6562730000],
		/* 1967 */ [148542000000  / 6379530000],
		/* 1968 */ [157554000000  / 6296600000],
		/* 1969 */ [170927000000  / 6330170000],
		/* 1970 */ [191198000000  / 6418160000],
		/* 1971 */ [206888000000  / 6288960000],
		/* 1972 */ [226497000000  / 6158220000],
		/* 1973 */ [252263000000  / 6123980000],
		/* 1974 */ [285446000000  / 6173170000],
		/* 1975 */ [334900000000  / 6200750000],
		/* 1976 */ [379127000000  / 6258650000],
		/* 1977 */ [412739000000  / 6165740000],
		/* 1978 */ [459717000000  / 6031890000],
		/* 1979 */ [515302000000  / 6077050000],
		/* 1980 */ [584413000000  / 6090490000],

		// Worked hours 1981–2016 is from:
		// http://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__NR__NR0103__NR0103B/NR0103ENS2010T11Kv/table/tableViewLayout1/?rxid=f53465d2-0369-4f08-93bf-5d12aa0f1783
		/* 1981 */ [638634000000  / 6566000000],
		/* 1982 */ [699524000000  / 6578000000],
		/* 1983 */ [784825000000  / 6617000000],
		/* 1984 */ [881974000000  / 6730000000],
		/* 1985 */ [959717000000  / 6821000000],
		/* 1986 */ [1049286000000 / 6870000000],
		/* 1987 */ [1135409000000 / 6952000000],
		/* 1988 */ [1241401000000 / 7084000000],
		/* 1989 */ [1373535000000 / 7215000000],
		/* 1990 */ [1514857000000 / 7286000000],
		/* 1991 */ [1624458000000 / 7113000000],
		/* 1992 */ [1627077000000 / 6858000000],
		/* 1993 */ [1634131000000 / 6538000000],
		/* 1994 */ [1744433000000 / 6610000000],
		/* 1995 */ [1883562000000 / 6775000000],
		/* 1996 */ [1932025000000 / 6772000000],
		/* 1997 */ [2019261000000 / 6775000000],
		/* 1998 */ [2121037000000 / 6832000000],
		/* 1999 */ [2237854000000 / 6972000000],
		/* 2000 */ [2380358000000 / 7063000000],
		/* 2001 */ [2478130000000 / 7127000000],
		/* 2002 */ [2569876000000 / 7030000000],
		/* 2003 */ [2677446000000 / 6951000000],
		/* 2004 */ [2805115000000 / 6925000000],
		/* 2005 */ [2907352000000 / 6938000000],
		/* 2006 */ [3099081000000 / 7072000000],
		/* 2007 */ [3297053000000 / 7312000000],
		/* 2008 */ [3387599000000 / 7359000000],
		/* 2009 */ [3288509000000 / 7172000000],
		/* 2010 */ [3519994000000 / 7315000000],
		/* 2011 */ [3656577000000 / 7459000000],
		/* 2012 */ [3684800000000 / 7508000000],
		/* 2013 */ [3769909000000 / 7540000000],
		/* 2014 */ [3936840000000 / 7676000000],
		/* 2015 */ [4181103000000 / 7752000000],
		/* 2016 */ [4378578000000 / 7884000000]
	];

	FORBANNAD.loadChart(drawChart);

	// This will draw the chart based on the static JavaScript objects above.
	function drawChart() {
		// Add year header to each row of each array.
		$.each([dataArray1, dataArray2, dataArray3], function (index, array) {
			$.each(array, function (index, element) {
				element.unshift(YEARS[index]);
			});
		});

		// Add header row to data tables.
		dataArray1.unshift(HEADERS_1);
		dataArray2.unshift(HEADERS_2);
		dataArray3.unshift(HEADERS_3);

		var chartData1 = google.visualization.arrayToDataTable(dataArray1);
		var chartData2 = google.visualization.arrayToDataTable(dataArray2);
		var chartData3 = google.visualization.arrayToDataTable(dataArray3);

		var additionalChartOptions = {
			colors: FORBANNAD.defaultColors,
			lineWidth: FORBANNAD.lineWidths.medium
		};

		var chartOptions1 = $.extend({}, additionalChartOptions, {
			vAxis: { viewWindow: { min: 30, max: 50 }}
		});

		var chartOptions2 = $.extend({}, additionalChartOptions, {
			vAxis: { format: FORBANNAD.vAxisFormats.sek }
		});

		var chartOptions3 = $.extend({}, additionalChartOptions, {
			vAxis: { format: FORBANNAD.vAxisFormats.sek }
		});

		var formatter = new google.visualization.NumberFormat(FORBANNAD.numberFormats.sek);

		formatter.format(chartData2, 1);
		formatter.format(chartData3, 1);

		var chart1 = new google.visualization.LineChart(document.getElementById('chart1'));
		chart1.draw(chartData1, $.extend({}, FORBANNAD.defaultChartOptions, chartOptions1));

		var chart2 = new google.visualization.LineChart(document.getElementById('chart2'));
		chart2.draw(chartData2, $.extend({}, FORBANNAD.defaultChartOptions, chartOptions2));

		var chart3 = new google.visualization.LineChart(document.getElementById('chart3'));
		chart3.draw(chartData3, $.extend({}, FORBANNAD.defaultChartOptions, chartOptions3));
	}
}());
