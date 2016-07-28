javascript:(function(){
  var text = window.getSelection().toString();
  var body = {
    type: 'translate',
    prompt: text,
    lang: 'english'
  };
  var $el = document.createElement('div');
  var text = document.createTextNode('Save to Lingua Franca');
  $el.appendChild(text);
  $el.setAttribute("style", "z-index:2147483647");

  document.body.insertBefore($el, document.body.firstChild);
  fetch('http://localhost:3000/api/create_prompt?prompt=' + text, {
    mode: 'no-cors',
    body: JSON.stringify(body),
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  });
}());
