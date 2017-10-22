$(function() {
  $.get('index.json', function(datas) {
    parseChildren(datas);
    $.get('template-body.html', function(template){
      var rendered = Mustache.render(template, datas);
      $('#categories').html(rendered);
      // This one removes the optional buttons that don't have href
      $('#categories').find('.optional-btn').each(function() {
        if($(this).find('a').attr('href') == ""){
          $(this).remove();
        }});
    });
    $.get('template-toc.html', function(template){
      var rendered = Mustache.render(template, datas);
      $('#top-toc').html(rendered);
    });
  });
});

function parseChildren(datas){
  $.each(datas.categories, function(idx, cat){
    $.get(cat['index_path']+'/index.json', function(children) {
      cat['reports'] = children;
    });
  });
}
