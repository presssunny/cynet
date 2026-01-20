//Example.js
const Joi = require("joi");
const sunnyPressApiClient = require("./sunnyPress.apiClient.js");

function validateInput(schema, data) {
  const { error } = schema.validate(data, { allowUnknown: true });
  if (error) {
    throw new Error(`Invalid input: ${error.details[0].message}`);
  }
}

async function login(username, password) {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    validateInput(schema, { username, password });

    const response = await sunnyPressApiClient.post("/auth/login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    const schema = Joi.object({
      userId: Joi.string().required(),
    });

    validateInput(schema, { userId });

    const response = await sunnyPressApiClient.post("/delete-user", {
      userId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

async function addUser(username, fullName, password, email, age) {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      fullName: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      age: Joi.number().integer().min(0).optional(),
    });

    validateInput(schema, {
      username,
      fullName,
      password,
      email,
      age,
    });

    const response = await sunnyPressApiClient.post("/add-user", {
      username,
      fullName,
      password,
      email,
      age,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

// post update-user {userId, fullName, email, age(optional)}
async function updateUser(userId, fullName, email, age) {
  try {
    const schema = Joi.object({
      userId: Joi.string().required(),
      fullName: Joi.string().required(),
      email: Joi.string().email().required(),
      age: Joi.number().integer().min(0).optional(),
    });

    validateInput(schema, {
      userId,
      fullName,
      email,
      age,
    });
    const response = await sunnyPressApiClient.post("/update-user", {
      userId,
      fullName,
      email,
      age,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

// get users
async function getUsers(limit, offset) {
  try {
    const schema = Joi.object({
      limit: Joi.number().integer().min(1).required(),
      offset: Joi.number().integer().min(0).required(),
    });

    validateInput(schema, { limit, offset });

    const response = await sunnyPressApiClient.get(
      `/users?limit=${limit}&offset=${offset}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get user by id {userId}
async function getUserById(userId) {
  try {
    const schema = Joi.object({
      userId: Joi.string().required(),
    });

    validateInput(schema, { userId });

    const response = await sunnyPressApiClient.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  login,
  getUsers,
  getUserById,
  deleteUser,
  addUser,
  updateUser,
};
