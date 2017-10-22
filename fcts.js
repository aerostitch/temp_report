$(function() {
  $.get('index.json', function(datas) {
    parseChildren(datas);
    console.log(datas)
    $.get('template-body.html', function(template){
      var rendered = Mustache.render(template, datas);
      $('#categories').html(rendered);
    })
    $.get('template-toc.html', function(template){
      var rendered = Mustache.render(template, datas);
      $('#top-toc').html(rendered);
    })
  })
});

function parseChildren(datas){
  $.each(datas.categories, function(idx, cat){
    $.get(cat['index_path']+'/index.json', function(children) {
      cat['reports'] = children;
    });
  });
}
