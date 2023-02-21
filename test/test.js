const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

chai.should();
chai.use(chaiHttp);

describe("API Test", () => {
  /**
   * Test the GET all messages route
   */

  describe("GET /api/contacts", () => {
    it("it should GET all the messages", (done) => {
      chai
        .request(server)
        .get("/api/contacts")
        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
    it("it should NOT GET all the messages", (done) => {
      chai
        .request(server)
        .get("/api/contact")
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });
  /**
   * Test the GET message  (by id) route
   */
  describe("GET /api/contacts/:id", () => {
    it("it should GET a message", (done) => {
      chai
        .request(server)
        .get("/api/contacts/:id")
        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
  });
  /**
   * Test the POST a message route
   */
  describe("POST /api/contacts", () => {
    it("it should POST a new messages", (done) => {
      const contact = {
        name: "kalex",
        email: "kalex@gmail.com",
        message: "Hello to you",
      };
      chai
        .request(server)
        .post("/api/contacts")
        .send(contact)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.have.property("name");
          response.body.should.have.property("email");
          response.body.should.have.property("message");
        });
      done();
    });

    it("it should NOT POST a new messages without the name", (done) => {
      const contact = {
        email: "kal1@gmail.com",
        message: "Hello to you",
      };
      chai
        .request(server)
        .post("/api/contacts")
        .send(contact)
        .end((err, response) => {
          response.should.have.status(400);
        });
      done();
    });
  });
  /**
   * Test the  DELETE a message
   */

  /**
   * Test the GET All blogs route
   */
  describe("GET /api/blogs", () => {
    it("it should GET all blogs", (done) => {
      chai
        .request(server)
        .get("/api/blogs")
        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
    it("it should NOT GET all the blogs", (done) => {
      chai
        .request(server)
        .get("/api/blog")
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });
  /**
   * Test GET single  blog
   */
  describe("GET /api/blogs/:id", () => {
    it("it should GET a single blog with ID", (done) => {
      chai
        .request(server)
        .get("/api/blogs/:id")
        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
  });
  /**
   * Test to add a blog
   */
  describe("POST /api/blogs", () => {
    it("it should POST a new blog", (done) => {
      const blogs = {
        image: "https://unsplash.com/photos/2V7KKhNwQTk",
        title: "mocha testing blog",
        description: "Hello to you",
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGV4QGdtYWlsLmNvbSIsImlkIjoiNjNlYzkxN2VmMjYxYjY2Y2ZjYzA4ZGYwIiwiaWF0IjoxNjc2NjE4ODM1fQ.Yd8uuTPC8n4Vc0AEDrkyV8KetXv-mqt2TUXqaHDaN5I";
      chai
        .request(server)
        .post("/api/blogs")
        .send(blogs)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.have.property("image");
          response.body.should.have.property("title");
          response.body.should.have.property("description");
        });
      done();
    });
    it("it should NOT POST a new blog without image", (done) => {
      const blogs = {
        title: "mocha testing blog",
        description: "Hello to you",
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGV4QGdtYWlsLmNvbSIsImlkIjoiNjNlYzkxN2VmMjYxYjY2Y2ZjYzA4ZGYwIiwiaWF0IjoxNjc2NjE4ODM1fQ.Yd8uuTPC8n4Vc0AEDrkyV8KetXv-mqt2TUXqaHDaN5I";
      chai
        .request(server)
        .post("/api/blogs")
        .send(blogs)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(201);
        });
      done();
    });
  });
  /**
   * Test the Delete a blog
   */

  describe("DELETE /api/blogs/63f48af0c7ddc50268210437", function () {
    this.timeout(15000);
    // let blogId = "63f2712cfc7964f9d1407ce6";
    it("It should DELETE an existing blog", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGV4QGdtYWlsLmNvbSIsImlkIjoiNjNlYzkxN2VmMjYxYjY2Y2ZjYzA4ZGYwIiwiaWF0IjoxNjc2NjE4ODM1fQ.Yd8uuTPC8n4Vc0AEDrkyV8KetXv-mqt2TUXqaHDaN5I";
      chai
        .request(server)
        .delete("/api/blogs/63f48af0c7ddc50268210437")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          expect(response).to.have.status(200);
          done();
        });
    });
  });

  /**
   * Test Editing a blog route
   */
  describe("PATCH /api/blogs", () => {
    it("it should UPDATE an existing blog", (done) => {
      const blogs = {
        image: "https://unsplash.com/photos/2V7KKhNwQTk",
        title: "mocha testing blog",
        description: "Hello to you",
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGV4QGdtYWlsLmNvbSIsImlkIjoiNjNlYzkxN2VmMjYxYjY2Y2ZjYzA4ZGYwIiwiaWF0IjoxNjc2NjE4ODM1fQ.Yd8uuTPC8n4Vc0AEDrkyV8KetXv-mqt2TUXqaHDaN5I";
      chai
        .request(server)
        .patch("/api/blogs/63f36ecd8bc78b8565d153f8")
        .send(blogs)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("image");
          response.body.should.have.property("title");
          response.body.should.have.property("description");
        });
      done();
    });
    it("it should NOT POST a new blog without image", (done) => {
      const blogs = {
        title: "mocha testing blog",
        description: "Hello to you",
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGV4QGdtYWlsLmNvbSIsImlkIjoiNjNlYzkxN2VmMjYxYjY2Y2ZjYzA4ZGYwIiwiaWF0IjoxNjc2NjE4ODM1fQ.Yd8uuTPC8n4Vc0AEDrkyV8KetXv-mqt2TUXqaHDaN5I";
      chai
        .request(server)
        .patch("/api/blogs")
        .send(blogs)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });
  /**
   * Test the GET all users after registration
   */
  describe("GET /api/signup", () => {
    it("it should GET all the users", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGV4QGdtYWlsLmNvbSIsImlkIjoiNjNlYzkxN2VmMjYxYjY2Y2ZjYzA4ZGYwIiwiaWF0IjoxNjc2NjE4ODM1fQ.Yd8uuTPC8n4Vc0AEDrkyV8KetXv-mqt2TUXqaHDaN5I";
      chai
        .request(server)
        .get("/api/signup")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
    it("it should NOT GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/signups")
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });
  /**
   * Test the GET single user after registration
   */
  describe("GET /api/signup/:id", () => {
    it("it should GET a user", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGV4QGdtYWlsLmNvbSIsImlkIjoiNjNlYzkxN2VmMjYxYjY2Y2ZjYzA4ZGYwIiwiaWF0IjoxNjc2NjE4ODM1fQ.Yd8uuTPC8n4Vc0AEDrkyV8KetXv-mqt2TUXqaHDaN5I";
      chai
        .request(server)
        .get("/api/signup/:id")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });
  /**
   * Test To register a new user
   */
  describe("POST /api/signup", () => {
    it("should create a new user", (done) => {
      const user = {
        firstName: "Manzi",
        lastName: "Chris",
        email: "manzi13@gmail.com",
        password: "00000000",
      };

      chai
        .request(server)
        .post("/api/signup")
        .send(user)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.have.property("firstName");
          response.body.should.have.property("lastName");
          response.body.should.have.property("email");
          response.body.should.have.property("password");
        });
      done();
    });
    it("should NOT create a new user", (done) => {
      const user = {
        lastName: "Chris",
        email: "manzi@gmail.com",
        password: "00000000",
      };

      chai
        .request(server)
        .post("/api/signup")
        .send(user)
        .end((err, response) => {
          response.should.have.status(400);
        });
      done();
    });
  });

  /**
   * Add a comment
   */
  describe("POST /api/blogs/comments", () => {
    it("it should POST a new comment", (done) => {
      const commentUser = {
        name: "Manzi",
        message: "Chris",
      };
      chai
        .request(server)
        .post("/api/blogs/comments/63f36ecd8bc78b8565d153f8")
        .send(commentUser)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.have.property("name");
          response.body.should.have.property("message");
        });
      done();
    });
    it("it should NOT POST a new comment", (done) => {
      const commentUser = {
        name: "Manzi",
      };
      chai
        .request(server)
        .post("/api/blogs/comments")
        .send(commentUser)
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });

  /**
   * Get a comment by it's blog id
   */
  describe("GET /api/blogs/comment/63f36ecd8bc78b8565d153f8", () => {
    it("it should GET a comment by blog id ", (done) => {
      chai
        .request(server)
        .get("/api/blogs/comments/63f2712cfc7964f9d1407ce6")
        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
    it("it should NOT GET a comment", (done) => {
      chai
        .request(server)
        .get("/api/blog/comment")
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });
  /**
   * Add like by it's id
   */
  describe("POST /api/blogs/likes", () => {
    it("it should POST a new like", (done) => {
      chai
        .request(server)
        .post("/api/blogs/likes/63f36ecd8bc78b8565d153f8")
        .send()
        .end((err, response) => {
          response.should.have.status(201);
        });
      done();
    });
    it("it should NOT POST a new like", (done) => {
      chai
        .request(server)
        .post("/api/blogs/likes")
        .send()
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });
  /**
   * Get like by it's blog id
   */
  describe("GET /api/blogs/likes", () => {
    it("it should GET a like by blog id", (done) => {
      chai
        .request(server)
        .get("/api/blogs/likes/63f36ecd8bc78b8565d153f8")
        .send()
        .end((err, response) => {
          response.should.have.status(201);
        });
      done();
    });
    it("it should NOT POST a new like", (done) => {
      chai
        .request(server)
        .get("/api/blogs/like")
        .send()
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });
});
