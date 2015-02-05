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
            
        },
        error: function(){
            
        }
    });
})