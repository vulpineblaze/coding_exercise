
module.exports = function(app, db) {

  // Main page, pull latest 'hello world' or creates one
  app.get('/', (req, res, next) => {
    db.collection('hello').find().sort( { datetime: -1 } ).toArray((err, hello) => {
      if (err) return console.log(err);

      var hello_text = "hello world";
      if(hello[0]){
        hello_text = hello[0].text;
      }
      res.render('index.ejs', {hello: hello_text});
    })
  })

  // send user input to db to replace 'hello world'
  app.get('/world', (req, res) => {
    req.query.datetime =  Date.now();
    db.collection('hello').save(req.query, (err, result) => {
      if (err) return console.log(err);
      console.log('saved to database', req.query);
      res.redirect('/');
    })
  })

  // for test, removes all values that are not 'hello world'
  app.get('/wipe', (req, res) => {
    db.collection('hello').deleteMany({ "text" : {$ne: "hello world"} }, function(err, obj) {
      if (err) return console.log(err);
      console.log(obj.result.n + " hello(s) deleted");
      res.redirect('/');
    });
  })

};




