$(function(){
    console.log('on');
    $.ajax({
        url: '/projects',
        dataType: 'json',
        type: 'GET',
        success: function(d){
            //console.log(d);
            var source = $('#hbRows').html();
            var template = Handlebars.compile(source);
            var context = d;
            var htmlOutput = template(context);
            $('#output').html(htmlOutput);
            var proj = d.projects;
            
            for(var i=0; i<1; i++){
                $.ajax({
                    url: '/timesheets/'+proj[i]._id,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function(data){
                        var total = 0;
                        var timesheets = data.timesheets;
                        $(timesheets).each(function(){
                             total += this.minutes;
                        });
                        console.log('TotalMinutes: '+total);
                        console.log('Total Hours: '+Math.round(total/60));
                    }
                });
            }
        },
        error: function(){
            
        }
    });
})