var express = require('express');
var path=require('path');
var app = express();
var request = require('request');
app.get('/', function (req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname+ '/index.html'));

});
app.get('/getPlaces',function(req,res){
  let latitude=req.query.latitude;
  let longitude=req.query.longitude;
  placePromise(latitude,longitude).then((data)=>{
    console.log(typeof(data))
    //console.log(data.results.items);
    items=data.results.items;
    stackPlaces=[];
    for(item of items){
      console.log(item);
      stackPlaces.push({place:item.title,distance:item.distance});
    }
    res.json(stackPlaces); 
  })
})
placePromise=(latitude,longitude)=>{
  return new Promise((resolve,reject)=>{
    let url = 'https://places.demo.api.here.com/places/v1/discover/here?at='+latitude+'%2C'+longitude+'&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg';
    request(url,(err,response,body)=>{
      if(!err && response.statusCode==200){
        
        return resolve(JSON.parse(body));
      }
      else return reject;
    })
    
  })
  
}
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});