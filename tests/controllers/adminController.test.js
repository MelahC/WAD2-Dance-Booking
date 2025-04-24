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

  
 
}) 
