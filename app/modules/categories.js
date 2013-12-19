function recursive_categories(categories, input, edit) {
  var string = '';
  categories.forEach(function(category) {
    string += '<li>';
    if(input) string += '<input type="radio" name="' + input + '" value="' + category.name + '"> ';
    string += category.name;
    if(edit) string += ' <a href="#">Edit</a>';
    string += '</li>';  
    if (category.categories.length) {
      string += recursive_categories(category.categories, input, edit);
    }
  });
  return string;
}

exports.make_list = function (categories, input, edit) {
  if (categories.length) {
    var string = '<ul>';
    categories.forEach(function(category) {
      string += '<li>';
      if(input) string += '<input type="radio" name="' + input + '" value="' + category.name + '"> ' + category.name;
      if(edit) string += ' <a href="#">Edit</a>';
      if(category.categories.length) {
        string += recursive_categories(category, input, edit);
      }
    }); 
    string += '</ul>';
  } return '';
}

