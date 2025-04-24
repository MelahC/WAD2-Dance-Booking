const adminController = require("../../controllers/adminController")
const { usersDB } = require("../../data/db")
const bcrypt = require("bcrypt")

// mock request/response
const mockRequest = (sessionData = {}, bodyData = {}) => ({
  session: sessionData,
  body: bodyData,
})
const mockResponse = () => {
  const res = {}
  res.render = jest.fn().mockReturnValue(res)
  res.redirect = jest.fn().mockReturnValue(res)
  res.status = jest.fn().mockReturnValue(res)
  res.send = jest.fn().mockReturnValue(res)
  return res
}

// mock the modules
jest.mock("../../data/db", () => ({
  usersDB: {
    find: jest.fn(),
    insert: jest.fn(),
    remove: jest.fn(),
  },
}))
jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("mockHashedPW"),
}))

describe("adminController", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("showDashboard", () => {
    it("should render adminDashboard with list of users", (done) => {
      const req = mockRequest({ user: { role: "admin" } })
      const res = mockResponse()
      const mockUsers = [
        { _id: "1", name: "User1" },
        { _id: "2", name: "User2" },
      ]

      usersDB.find.mockImplementation((query, cb) => {
        cb(null, mockUsers)
      })

      adminController.showDashboard(req, res)

      setTimeout(() => {
        expect(usersDB.find).toHaveBeenCalledWith({}, expect.any(Function))
        expect(res.render).toHaveBeenCalledWith("adminDashboard", {
          users: mockUsers,
        })
        done()
      }, 0)
    })
  })

  describe("addOrganiser", () => {
    it("should add a new organiser and redirect to /admin", async () => {
      const req = mockRequest({}, {
        name: "New Org",
        email: "org@example.com",
        password: "test123",
      })
      const res = mockResponse()
  
      usersDB.insert.mockImplementation((doc, cb) => cb(null))
  
      await adminController.addOrganiser(req, res)
  
      expect(bcrypt.hash).toHaveBeenCalledWith("test123", 10)
      expect(usersDB.insert).toHaveBeenCalledWith(
        {
          name: "New Org",
          email: "org@example.com",
          password: "mockHashedPW",
          role: "organiser",
        },
        expect.any(Function)
      )
      expect(res.redirect).toHaveBeenCalledWith("/admin")
    })
  
    it("should still redirect to /admin on insertion error", async () => {
      const req = mockRequest({}, {
        name: "Fail Org",
        email: "fail@example.com",
        password: "123",
      })
      const res = mockResponse()
  
      usersDB.insert.mockImplementation((doc, cb) => {
        cb(new Error("Insertion error"))
      })
  
      await adminController.addOrganiser(req, res)
  
      expect(res.redirect).toHaveBeenCalledWith("/admin")
    })

  })
   
  describe("deleteUser", () => {
    it("removes user by _id and redirects to /admin", (done) => {
      const req = mockRequest({}, { userId: "someUserId" })
      const res = mockResponse()

      usersDB.remove.mockImplementation((query, opts, callback) => {
        callback(null)
      })

      adminController.deleteUser(req, res)

      setTimeout(() => {
        expect(usersDB.remove).toHaveBeenCalledWith(
          { _id: "someUserId" },
          {},
          expect.any(Function)
        )
        expect(res.redirect).toHaveBeenCalledWith("/admin")
        done()
      }, 0)
    })

    it("redirects to /admin if an error occurs during removal", (done) => {
      const req = mockRequest({}, { userId: "brokenId" })
      const res = mockResponse()

      usersDB.remove.mockImplementation((q, o, callback) => {
        callback(new Error("Removal error"))
      })

      adminController.deleteUser(req, res)

      setTimeout(() => {
        expect(res.redirect).toHaveBeenCalledWith("/admin")
        done()
      }, 0)
    })
  })
}) 
