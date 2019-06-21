var expect  = require('chai').expect;
var request = require('request');
// var root_dir = "http://codingexercise.fusionbombsderp.com/";
var root_dir = "http://localhost:3006/";

it('Main page content to meet hellow world business requirement', function(done) {
    request(root_dir , function(error, response, body) {
        expect(body).to.include('hello world');
        done();
    });
});

it('Main page status to ensure site loads correctly', function(done) {
    request(root_dir , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('About page content testing loading of nonexistant site', function(done) {
    request(root_dir+'about' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});

var new_message = "goodbye moon";
it('Send in new message as per future feature request', function(done) {
    request(root_dir+'world/?text='+new_message , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body).to.include(new_message);
        done();
    });
});

it('Remove all non hello-world values from db and check for original hello world', function(done) {
    request(root_dir+"wipe" , function(error, response, body) {
        expect(body).to.include('hello world');
        done();
    });
});