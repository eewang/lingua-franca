javascript:(function(){
  var text = window.getSelection().toString();
  var body = {
    type: 'translate',
    prompt: text,
    lang: 'english'
  };
  console.log(body);
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
