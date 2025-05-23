const authController = require("../../controllers/authController")
const bcrypt = require("bcrypt")
const userModel = require("../../models/userModel")

// Helpers 
const mockRequest = (sessionData = {}, bodyData = {}) => ({
  session: sessionData,
  body: bodyData,
})

const mockResponse = () => {
  const res = {}
  res.render = jest.fn().mockReturnValue(res)
  res.redirect = jest.fn().mockReturnValue(res)
  res.locals = {}
  return res
}

// mocks
jest.mock("bcrypt")
jest.mock("../../models/userModel", () => ({
  findUserByEmail: jest.fn(),
}))

describe("authController", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // describe blocks & tests 
  describe("loginPage", () => {
    it("should render the login template", () => {
      const req = mockRequest()
      const res = mockResponse()
      authController.loginPage(req, res)
      expect(res.render).toHaveBeenCalledWith("user/login")
    })
  })

  describe("userLogin", () => {
    it("should render login with error if user not found", () => {
      const req = mockRequest({}, { email: "noexist@example.com", password: "pass" })
      const res = mockResponse()
      userModel.findUserByEmail.mockImplementation((email, cb) => {
        cb(null, null)
      })
  
      authController.userLogin(req, res)
  
      expect(res.render).toHaveBeenCalledWith("user/login", {
        error: "Invalid email",
      })
    })
  })

  it("should render err if password mismatch", () => {
    const req = mockRequest({}, { email: "some@example.com", password: "wrong" })
    const res = mockResponse()
  
    userModel.findUserByEmail.mockImplementation((email, cb) =>
      cb(null, {
        _id: "123",
        email: "some@example.com",
        password: "hashedPW",
        role: "organiser",
      })
    )

    bcrypt.compare.mockImplementation((plain, hashed, done) => {
      done(null, false)
    })
  
    authController.userLogin(req, res)
    expect(res.render).toHaveBeenCalledWith("user/login", {
      error: "Invalid password",
    })
  })

  it("should store user in session & redirect to /admin if user is admin", () => {
    const req = mockRequest({}, { email: "admin@example.com", password: "secret" })
    const res = mockResponse()
  
    userModel.findUserByEmail.mockImplementation((email, cb) =>
      cb(null, {
        _id: "999",
        email: "admin@example.com",
        password: "hashedPW",
        role: "admin",
      })
    )
    bcrypt.compare.mockImplementation((plain, hashed, done) => {
      done(null, true)
    })
  
    authController.userLogin(req, res)
    expect(req.session.user).toEqual({
      _id: "999",
      email: "admin@example.com",
      role: "admin",
    })
    expect(res.redirect).toHaveBeenCalledWith("/admin")
  })
  
  it("should store user in session & redirect to /organiser/dashboard if user is organiser", () => {
    const req = mockRequest({}, { email: "org@example.com", password: "pw" })
    const res = mockResponse()
  
    userModel.findUserByEmail.mockImplementation((email, cb) => {
      cb(null, {
        _id: "abc",
        email: "org@example.com",
        password: "hashedPW",
        role: "organiser",
      })
    })
    bcrypt.compare.mockImplementation((plain, hashed, done) => {
      done(null, true)
    })
  
    authController.userLogin(req, res)
    expect(req.session.user).toEqual({
      _id: "abc",
      email: "org@example.com",
      role: "organiser",
    })
    expect(res.redirect).toHaveBeenCalledWith("/organiser/dashboard")
  })
  
  describe("logoutUser", () => {
    it("should destroy session and redirect /", () => {
      const req = {
        session: {
          destroy: jest.fn((cb) => cb()),
        },
      }
      const res = mockResponse()
  
      authController.logoutUser(req, res)
      expect(req.session.destroy).toHaveBeenCalled()
      expect(res.redirect).toHaveBeenCalledWith("/")
    })
  })

})