const Student = require("../app/student");
const assert = require("assert");
const { findOne } = require("../app/student");

describe("create records", () => {
  it("create a user in db", () => {
    // assert(true);
    const sam = new Student({ name: "Sam" });
    sam
      .save()
      .then(() => {
        assert(!sam.isNew); //whenever it saves it turn into false so that we are using !sam.isNew
        // read docs from mongoosejs.com/docs
      })
      .catch(() => {
        console.log("error");
      });
  });
});

//read test

describe("Read test", () => {
  let reader;
  beforeEach((done) => {
    reader = new Student({ name: "Reader" });
    reader.save().then(() => {
      done();
    });
  });
  it("test user: Reader", (done) => {
    Student.find({ name: "Reader" }).then((student) => {
      assert(reader._id.toString() === student[0]._id.toString());
      done();
    });
  });
});

//delete test
describe("delete tests", () => {
  let deleter;
  beforeEach((done) => {
    deleter =new Student({ name: "Deleter" });
    deleter.save().then(() => {
      done();
    });
  });
  it("delete test for deleter", (done) => {
    Student.findByIdAndDelete(deleter._id)
      .then(() => Student.findOne({ name: "Deleter" }))
      .then((student) => {
        assert(student === null);
        done();
      });
  });
});


//update test
describe("Update test",()=>{
    let updater;
    beforeEach((done)=>{
        updater = new Student({name:"Updater"});
        updater.save().then(()=>{
            done();
        })
        
    });
    it("simple update",(done)=>{
        Student.findByIdAndUpdate(updater._id)
        .then(()=>Student.findOne({name:"Updater"}))
        .then((student)=>{
            assert(student!=null);
            done();
        })
    });

    it("set and save",(done)=>{
        updater.set("name","UPUPdater");
        updater.save()
        .then(()=>Student.find({}))
        .then((students)=>{
            assert(students[0].name !== "Updater");
            assert(students[0].name === "UPUPdater");
            done();
        });
    });
});
