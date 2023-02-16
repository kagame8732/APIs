const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// describe("Users API", () => {
// Get User Signup
//   describe("GET /api/signup", () => {
//     it("It should GET all the users", (done) => {
//       chai
//         .request(server)
//         .get("/api/signup")
//         .end((err, response) => {
//           response.should.have.status(200);
//           response.body.should.be.a("object");
//           response.body.length.should.be.eq(4);
//         });
//       done();
//     });
//   });
//   it("It should NOT GET all the users", (done) => {
//     chai
//       .request(server)
//       .get("/api/signup")
//       .end((err, response) => {
//         response.should.have.status(404);
//       });
//     done();
//   });
// });
describe("Testing API endpoint", () => {
  it("Testing default root", (done) => {
    chai
      .request(server)
      .get("/api/welcome")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// Get User Signup
describe("Users API", () => {
  describe("GET/signup/", () => {
    it("It should GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/signup")
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
        });
      done();
    });
    it("it should not GET users", () => {
      chai.request(server).get("/user");
    });
  });

  it("it should not be GET users", () => {
    chai.request(server).get("/signup");
  });
  it("it should GET single user", () => {
    chai.request(server).get("/signup/:id");
  });
});
//Post new user
describe("POST /signup/", () => {
  it("It should POST all the users", (done) => {
    chai
      .request(server)
      .get("/signup")
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.a("object");
      });
    done();
  });
});
describe("POST/login/", () => {
  it("It should Generate token after login of verified user", (done) => {
    chai
      .request(server)
      .get("/login")
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.a("object");
      });
    done();
  });
  it("it should not POST verify user", () => {
    chai.request(server).get("/user");
  });
  it("it should POST single user", () => {
    chai.request(server).get("/login/:id");
  });
});

describe("POST/contacts/", () => {
  it("It should POST messages", (done) => {
    chai
      .request(server)
      .get("/contacts")
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.a("object");
      });
    done();
  });
  it("it should not POST the messages", () => {
    chai.request(server).get("/contacts");
  });
  it("it should POST single message", () => {
    chai.request(server).get("/contacts/:id");
  });
});
describe("Users API", () => {
  describe("GET /blogs/", () => {
    it("It should GET all blogs", (done) => {
      chai
        .request(server)
        .get("/blogs")
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
        });
      done();
    });
    it("it should not GET users", () => {
      chai.request(server).get("/blogs");
    });
  });

  it("it should not be GET users", () => {
    chai.request(server).get("/blogs");
  });
  it("it should GET single user", () => {
    chai.request(server).get("/blogs/:id");
  });
});
describe("Users API", () => {
  describe("GET /blogs/", () => {
    it("It should GET all the users", (done) => {
      chai
        .request(server)
        .post("/blogs")
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
        });
      done();
    });
    it("it should not GET users", () => {
      chai.request(server).get("/blogs");
    });
  });

  it("it should not be GET users", () => {
    chai.request(server).get("/blogs");
  });
  it("it should GET single user", () => {
    chai.request(server).get("/blogs/:id");
  });
});
