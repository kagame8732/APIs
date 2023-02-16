const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

chai.should();
chai.use(chaiHttp);

describe("Contact API", () => {
  /**
   * Test the GET route
   */
  describe("GET /api/contacts", () => {
    it("it should GET all the messages", (done) => {
      chai
        .request(server)
        .get("/api/contacts")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
        });
      done();
    });
  });
  /**
   * Test the GET  (by id) route
   */
  /**
   * Test the POST route
   */
  /**
   * Test the PATCH route
   */
  /**
   * Test the DELETE route
   */
});
