var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:6000/api/v1");

// UNIT test begin

describe("Ledger unit test",function(){

  it("Should return array of json containg the ledgers",function(done){   
    server
    .get("/ledgers")
    .query({
        start_date: "2021-12-01 15:00:00.000",
        end_date: "2021-12-18 15:00:00.000",
        frequency: "WEEKLY",
        weekly_rent: 550,
        timezone: "CST"
        })
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.should.containEql({
    "isError": false,
    "result": [
        {
            "start_date": "December 1st, 2021",
            "end_date": "December 7th, 2021",
            "amount": 550
        },
        {
            "start_date": "December 8th, 2021",
            "end_date": "December 14th, 2021",
            "amount": 550
        },
        {
            "start_date": "December 15th, 2021",
            "end_date": "December 18th, 2021",
            "amount": 314.29
        }
    ]
});
      done();
    });
  });


   it("Should return array of json containg the ledgers",function(done){
    server
    .get("/ledgers")
    .query({
        start_date: "2021-12-01 15:00:00.000",
        end_date: "2021-12-18 15:00:00.000",
        frequency: "FORTNIGHTLY",
        weekly_rent: 550,
        timezone: "CST"
        })
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.should.containEql({
    "isError": false,
    "result": [
        {
            "start_date": "December 1st, 2021",
            "end_date": "December 14th, 2021",
            "amount": 1100
        },
        {
            "start_date": "December 15th, 2021",
            "end_date": "December 18th, 2021",
            "amount": 314.29
        }
    ]
    });
      done();
    });
  });

  it("Should return array of json containg the ledgers",function(done){

    
    server
    .get("/ledgers")
    .query({
        start_date: "2021-12-01 15:00:00.000",
        end_date: "2022-03-01 15:00:00.000",
        frequency: "MONTHLY",
        weekly_rent: 550,
        timezone: "CST"
        })
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.should.containEql({
    "isError": false,
    "result": [
        {
            "start_date": "December 1st, 2021",
            "end_date": "January 1st, 2022",
            "amount": 2389.88
        },
        {
            "start_date": "January 1st, 2022",
            "end_date": "February 1st, 2022",
            "amount": 2389.88
        },
        {
            "start_date": "February 1st, 2022",
            "end_date": "March 1st, 2022",
            "amount": 2389.88
        }
    ]
    });
      done();
    });
  });


  it("Should return array of json containg the ledgers",function(done){

    
    server
    .get("/ledgers")
    .query({
        start_date: "2021-12-31 15:00:00.000",
        end_date: "2022-05-01 15:00:00.000",
        frequency: "MONTHLY",
        weekly_rent: 550,
        timezone: "CST"
        })
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.should.containEql({
    "isError": false,
    "result": [
        {
            "start_date": "December 31st, 2021",
            "end_date": "January 31st, 2022",
            "amount": 2389.88
        },
        {
            "start_date": "January 31st, 2022",
            "end_date": "February 28th, 2022",
            "amount": 2389.88
        },
        {
            "start_date": "February 28th, 2022",
            "end_date": "March 31st, 2022",
            "amount": 2389.88
        },
        {
            "start_date": "March 31st, 2022",
            "end_date": "April 30th, 2022",
            "amount": 2389.88
        },
        {
            "start_date": "April 30th, 2022",
            "end_date": "May 1st, 2022",
            "amount": 78.57
        }
    ]
    });
      done();
    });
  });


  it("Should return array of json containg the ledgers",function(done){

    
    server
    .get("/ledgers")
    .query({
        start_date: "2021-12-31 15:00:00.000",
        end_date: "2022-05-01 15:00:00.000",
        frequency: "WEEKLY",
        weekly_rent: 550,
        timezone: "CST"
        })
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.should.containEql({
    "isError": false,
    "result": [
        {
            "start_date": "December 31st, 2021",
            "end_date": "January 6th, 2022",
            "amount": 550
        },
        {
            "start_date": "January 7th, 2022",
            "end_date": "January 13rd, 2022",
            "amount": 550
        },
        {
            "start_date": "January 14th, 2022",
            "end_date": "January 20th, 2022",
            "amount": 550
        },
        {
            "start_date": "January 21st, 2022",
            "end_date": "January 27th, 2022",
            "amount": 550
        },
        {
            "start_date": "January 28th, 2022",
            "end_date": "February 3rd, 2022",
            "amount": 550
        },
        {
            "start_date": "February 4th, 2022",
            "end_date": "February 10th, 2022",
            "amount": 550
        },
        {
            "start_date": "February 11st, 2022",
            "end_date": "February 17th, 2022",
            "amount": 550
        },
        {
            "start_date": "February 18th, 2022",
            "end_date": "February 24th, 2022",
            "amount": 550
        },
        {
            "start_date": "February 25th, 2022",
            "end_date": "March 3rd, 2022",
            "amount": 550
        },
        {
            "start_date": "March 4th, 2022",
            "end_date": "March 10th, 2022",
            "amount": 550
        },
        {
            "start_date": "March 11st, 2022",
            "end_date": "March 17th, 2022",
            "amount": 550
        },
        {
            "start_date": "March 18th, 2022",
            "end_date": "March 24th, 2022",
            "amount": 550
        },
        {
            "start_date": "March 25th, 2022",
            "end_date": "March 31st, 2022",
            "amount": 550
        },
        {
            "start_date": "April 1st, 2022",
            "end_date": "April 7th, 2022",
            "amount": 550
        },
        {
            "start_date": "April 8th, 2022",
            "end_date": "April 14th, 2022",
            "amount": 550
        },
        {
            "start_date": "April 15th, 2022",
            "end_date": "April 21st, 2022",
            "amount": 550
        },
        {
            "start_date": "April 22nd, 2022",
            "end_date": "April 28th, 2022",
            "amount": 550
        },
        {
            "start_date": "April 29th, 2022",
            "end_date": "May 1st, 2022",
            "amount": 235.71
        }
    ]
    });
      done();
    });
  });
 it("Should return 400 Due to start date greater than end date",function(done){

    
    server
    .get("/ledgers")
    .query({
        start_date: "2021-12-31 15:00:00.000",
        end_date: "2010-05-01 15:00:00.000",
        frequency: "WEEKLY",
        weekly_rent: 550,
        timezone: "CST"
        })
    .expect("Content-type",/json/)
    .expect(400) 
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
});


 it("Should return 400 due to wrong frequency value",function(done){

    
    server
    .get("/ledgers")
    .query({
        start_date: "2021-12-31 15:00:00.000",
        end_date: "2022-05-01 15:00:00.000",
        frequency: "WEEKLYW",
        weekly_rent: 550,
        timezone: "CST"
        })
    .expect("Content-type",/json/)
    .expect(400) 
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
});

 it("Should return 400 Due to wrong date ISO format",function(done){

    
    server
    .get("/ledgers")
    .query({
        start_date: "2021-12-31 15:00:00",
        end_date: "2010-05-01 15:00:00.000",
        frequency: "WEEKLY",
        weekly_rent: 550,
        timezone: "CST"
        })
    .expect("Content-type",/json/)
    .expect(400) 
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
});

 it("Should return array of json containg the ledgers",function(done){

    
    server
    .get("/ledgers")
    .query({
        start_date: "2021-12-31 15:00:00.000",
        end_date: "2022-01-03 15:00:00.000",
        frequency: "WEEKLY",
        weekly_rent: 550,
        timezone: "CST"
        })
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.should.containEql( {
        "isError": false,
        "result": [
            {
                "start_date": "December 31st, 2021",
                "end_date": "January 3rd, 2022",
                "amount": 314.29
            }
        ]
    });
     
      done();
    });
});


});