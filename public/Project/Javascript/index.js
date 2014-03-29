var palette = ['#B5BBBE', '#4A6571', '#47BCF3', '#5A5D5E', '#3AF36A','#004971'];

function chartjsTest(requestTargets){
    var dataSource = [];


    $('#id').dxPieChart({
        palette: palette,
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