##mamb koa app
####Requirements
- `node.js` & `npm`
- `apache` or other webserver/proxy

####Install build pre-requisites; in project folder, run:
- `npm install -g gnode`
- `npm install -g gulp`
- `npm install -g bower`
- `npm install`
- `bower install`

####Build
- `gulp build`, or
- `gulp watch`

This will start an app listening on `30002`. Use a a webserver like `apache` or `nginx` to proxy connections.

####Todo
- Setup proper dist build with almondjs
- file-nomenclature/architecture
- proper menu controller/content page handling
- contact form