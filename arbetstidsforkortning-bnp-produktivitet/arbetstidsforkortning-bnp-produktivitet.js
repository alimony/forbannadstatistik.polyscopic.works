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
		'2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'
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
		/* 2016 */ [40],
		/* 2017 */ [40]
	];

	var HEADERS_2 = ['År', 'BNP per capita'];
	var dataArray2 = [
		/* 1950 */ [107000],
		/* 1951 */ [109000],
		/* 1952 */ [110000],
		/* 1953 */ [113000],
		/* 1954 */ [119000],
		/* 1955 */ [121000],
		/* 1956 */ [124000],
		/* 1957 */ [126000],
		/* 1958 */ [129000],
		/* 1959 */ [135000],
		/* 1960 */ [139000],
		/* 1961 */ [146000],
		/* 1962 */ [151000],
		/* 1963 */ [158000],
		/* 1964 */ [167000],
		/* 1965 */ [172000],
		/* 1966 */ [174000],
		/* 1967 */ [179000],
		/* 1968 */ [184000],
		/* 1969 */ [192000],
		/* 1970 */ [203000],
		/* 1971 */ [203000],
		/* 1972 */ [207000],
		/* 1973 */ [215000],
		/* 1974 */ [222000],
		/* 1975 */ [226000],
		/* 1976 */ [228000],
		/* 1977 */ [224000],
		/* 1978 */ [227000],
		/* 1979 */ [235000],
		/* 1980 */ [238000],
		/* 1981 */ [238000],
		/* 1982 */ [241000],
		/* 1983 */ [246000],
		/* 1984 */ [256000],
		/* 1985 */ [262000],
		/* 1986 */ [269000],
		/* 1987 */ [277000],
		/* 1988 */ [282000],
		/* 1989 */ [288000],
		/* 1990 */ [288000],
		/* 1991 */ [282000],
		/* 1992 */ [278000],
		/* 1993 */ [272000],
		/* 1994 */ [281000],
		/* 1995 */ [290000],
		/* 1996 */ [295000],
		/* 1997 */ [303000],
		/* 1998 */ [316000],
		/* 1999 */ [330000],
		/* 2000 */ [345000],
		/* 2001 */ [349000],
		/* 2002 */ [356000],
		/* 2003 */ [362000],
		/* 2004 */ [377000],
		/* 2005 */ [386000],
		/* 2006 */ [401000],
		/* 2007 */ [412000],
		/* 2008 */ [408000],
		/* 2009 */ [387000],
		/* 2010 */ [408000],
		/* 2011 */ [417000],
		/* 2012 */ [411000],
		/* 2013 */ [412000],
		/* 2014 */ [420000],
		/* 2015 */ [434000],
		/* 2016 */ [438000],
		/* 2017 */ [443000]
	];

	var HEADERS_3 = ['År', 'Produktivitet'];
	var dataArray3 = [
		//          GDP           / Hours worked

		// Worked hours 1950–1959 from:
		// http://www.historia.se/tablesAtoX.xls
		/* 1950 */ [750843000000  / 6505975295],
		/* 1951 */ [770298000000  / 6491645283],
		/* 1952 */ [781796000000  / 6435878835],
		/* 1953 */ [809240000000  / 6365440595],
		/* 1954 */ [857528000000  / 6437879515],
		/* 1955 */ [881312000000  / 6492900200],
		/* 1956 */ [910044000000  / 6494137798],
		/* 1957 */ [930529000000  / 6517809156],
		/* 1958 */ [952971000000  / 6468060876],
		/* 1959 */ [1003513000000 / 6461809093],

		// Worked hours 1960–1962 is from Appendix 5:
		// http://share.scb.se/ov9993/data/publikationer/statistik/nr/nr0101/1974a01/nr0101_1974a01_sm_05_n197598.pdf
		/* 1960 */ [1038063000000 / 6589630000],
		/* 1961 */ [1095405000000 / 6650830000],
		/* 1962 */ [1140928000000 / 6645430000],

		// Worked hours 1963–1980 is from Appendix 5:
		// http://share.scb.se/ov9993/data/publikationer/statistik/nr/nr0101/1980a01/nr0101_1980a01_sm_05_n198125.pdf
		/* 1963 */ [1201126000000 / 6616030000],
		/* 1964 */ [1282777000000 / 6601360000],
		/* 1965 */ [1332585000000 / 6605450000],
		/* 1966 */ [1361419000000 / 6562730000],
		/* 1967 */ [1407187000000 / 6379530000],
		/* 1968 */ [1457096000000 / 6296600000],
		/* 1969 */ [1528397000000 / 6330170000],
		/* 1970 */ [1632351000000 / 6418160000],
		/* 1971 */ [1645993000000 / 6288960000],
		/* 1972 */ [1683906000000 / 6158220000],
		/* 1973 */ [1751054000000 / 6123980000],
		/* 1974 */ [1808297000000 / 6173170000],
		/* 1975 */ [1852301000000 / 6200750000],
		/* 1976 */ [1874082000000 / 6258650000],
		/* 1977 */ [1846550000000 / 6165740000],
		/* 1978 */ [1876222000000 / 6031890000],
		/* 1979 */ [1947540000000 / 6077050000],
		/* 1980 */ [1981539000000 / 6090490000],

		// Worked hours 1981–2016 is from:
		// http://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__NR__NR0103__NR0103B/NR0103ENS2010T11Kv
		/* 1981 */ [1977197000000 / 6535000000],
		/* 1982 */ [2003343000000 / 6545000000],
		/* 1983 */ [2044916000000 / 6583000000],
		/* 1984 */ [2134949000000 / 6700000000],
		/* 1985 */ [2184200000000 / 6791000000],
		/* 1986 */ [2249352000000 / 6842000000],
		/* 1987 */ [2322817000000 / 6922000000],
		/* 1988 */ [2379835000000 / 7047000000],
		/* 1989 */ [2444194000000 / 7180000000],
		/* 1990 */ [2461193000000 / 7252000000],
		/* 1991 */ [2433914000000 / 7083000000],
		/* 1992 */ [2412229000000 / 6825000000],
		/* 1993 */ [2370005000000 / 6528000000],
		/* 1994 */ [2464142000000 / 6601000000],
		/* 1995 */ [2562669000000 / 6769000000],
		/* 1996 */ [2604053000000 / 6767000000],
		/* 1997 */ [2684756000000 / 6740000000],
		/* 1998 */ [2799154000000 / 6830000000],
		/* 1999 */ [2919832000000 / 6970000000],
		/* 2000 */ [3062161000000 / 7069000000],
		/* 2001 */ [3107110000000 / 7137000000],
		/* 2002 */ [3175344000000 / 7040000000],
		/* 2003 */ [3246618000000 / 6961000000],
		/* 2004 */ [3387072000000 / 6929000000],
		/* 2005 */ [3485158000000 / 6927000000],
		/* 2006 */ [3645562000000 / 7091000000],
		/* 2007 */ [3770636000000 / 7337000000],
		/* 2008 */ [3761500000000 / 7388000000],
		/* 2009 */ [3602148000000 / 7200000000],
		/* 2010 */ [3825086000000 / 7323000000],
		/* 2011 */ [3941840000000 / 7494000000],
		/* 2012 */ [3916967000000 / 7551000000],
		/* 2013 */ [3959577000000 / 7584000000],
		/* 2014 */ [4068358000000 / 7725000000],
		/* 2015 */ [4248213000000 / 7795000000],
		/* 2016 */ [4350724000000 / 7949000000],
		/* 2017 */ [4455658000000 / 8131000000]
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
