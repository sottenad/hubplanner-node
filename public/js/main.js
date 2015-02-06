$(function(){
    console.log('on');
    $.ajax({
        url: '/projects',
        dataType: 'JSON',
        type: 'GET',
        success: function(d){
            console.log(d);
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
                        console.log(data);
                    }
                });
            }
        },
        error: function(){
            
        }
    });
})