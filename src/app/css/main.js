var React = require('react');
var ReactDOM = require('react');
var Foo = require('./foo.jsx');
// import ReactDOM from 'react-dom';
// import { Foo } from './foo.jsx';
console.log('loaded');
ReactDOM.render(<Foo/>, document.getElementById('container'));

// const render() => {
//   console.log('loaded');
//   ReactDOM.render(<Foo/>, document.getElementById('container'));
// }

// render();
