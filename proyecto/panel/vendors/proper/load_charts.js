$(document).ready(function(){

    var ctx = document.getElementById('myChart').getContext('2d');
    
    $.post("../php/grafico_registros.php", {id_user: $("#idx").text()}, function(data){

        let parsed = JSON.parse(data);

        console.log(parsed);

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [
                    {
                        label: 'Cantidad de Logs',
                        data: [parsed[0], parsed[1], parsed[2], parsed[3], parsed[4], parsed[5], parsed[6], parsed[7], parsed[8], parsed[9], parsed[10], parsed[11]],
                        backgroundColor: [
                            'rgba(83, 51, 237, 0.2)',
                        ],
                        borderColor: [
                            'rgba(83, 51, 237, 1)',
                        ],
                        borderWidth: 3
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    });

    var ctxw = document.getElementById('myChartx').getContext('2d');
    
    $.post("../php/grafico_archivos.php", {id_user: $("#idx").text()}, function(data){

        let parsed = JSON.parse(data);

        console.log(parsed);

        var myChart = new Chart(ctxw, {
            type: 'line',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [
                    {
                        label: 'Cantidad de Archivos',
                        data: [parsed[0], parsed[1], parsed[2], parsed[3], parsed[4], parsed[5], parsed[6], parsed[7], parsed[8], parsed[9], parsed[10], parsed[11]],
                        backgroundColor: [
                            'rgba(255, 83, 71, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 83, 71, 1)',
                        ],
                        borderWidth: 3
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    });

});