var palette = ['#B5BBBE', '#4A6571', '#47BCF3', '#5A5D5E', '#3AF36A','#004971'];

function databaseTargetsChart(requestTargets){
    var dataSource = [];

    for (var requestCount = requestTargets.length - 1; requestCount >= 0; requestCount--) {
        var databaseExists = false;
        for (var databaseCount = dataSource.length - 1; databaseCount >= 0; databaseCount--) {
            if (requestTargets[requestCount].Database === dataSource[databaseCount].Name ) {
                dataSource[databaseCount].val++;
                databaseExists = true;
                break;
            }
        }
        if (!databaseExists) dataSource.push({ Name: requestTargets[requestCount].Database, val: 1 });
    }

    $('#id').dxPieChart({
        palette: instaApiPalette,
        dataSource: dataSource,
        title: '',
        tooltip: {
            enabled: true,
            percentPrecision: 1,
            customizeText: function() { 
                return this.valueText + ' - ' + this.percentText;
            }
        },
        legend: {
            horizontalAlignment: 'right',
            verticalAlignment: 'top',
            margin: 0
        },
        series: [{
            type: 'doughnut',
            argumentField: 'Name',
            label: {
                visible: true,
                connector: {
                    visible: true
                }
            }
        }]
    });
}