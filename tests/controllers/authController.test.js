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

})