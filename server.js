/**
 * Created by sergey on 17.10.15.
 */
'use strict';
var express = require('express');
var app = express();

app.use(express.static('www'));


app.listen(8088, '0.0.0.0', function(){
  console.info('Express server start at 8088 port');
});
