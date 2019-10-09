import React from 'react';

import FilesizeDemo from '../FilesizeDemo';


const App = () => (
  <>
    <h1 className="title">
      Filesize beautifier
    </h1>
    <div className="intro">
      Demonstration of the <a href="https://github.com/dessert-wasm/dessert-filesize">Dessert counterpart</a> of <a href="https://github.com/avoidwork/filesize.js">filesize.js</a>
    </div>
    <FilesizeDemo />
  </>
);

export default App;
