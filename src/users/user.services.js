
const responses = require("../utils/handleResponses");
const usersControllers = require("./users.controllers");

const getAllUsers = async (req, res) => {
    usersControllers
        .getAllUsers()
        .then((data) => {
            responses.success({
                res,
                data,
                status: 200,
                message: "All users retrieved successfully",
            });
        })
        .catch((err) => {
            responses.error({
                status: 400,
                data: err,
                message: "Bad request",
                res,
            });
        });
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    usersControllers
        .getUserById(id)
        .then((data) => {
            if (data) {
                responses.success({
                    res,
                    data,
                    status: 200,
                    message: "User found",
                });
            } else {
                responses.error({
                    res,
                    status: 404,
                    message: "User not found",
                });
            }
        })
        .catch((err) => {
            responses.error({
                res,
                status: 400,
                message: "Bad request",
            });
        });
};

const createUser = async (req, res) => {
    const user = req.body;
    try {
        const data = await usersControllers.createUser(user);
        responses.success({
            res,
            data,
            status: 201,
            message: "User created successfully",
        });
    } catch (err) {
        responses.error({
            res,
            data: err,
            status: 400,
            message: "Bad request",
        });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedUser = await usersControllers.updateUser(id, updateData);
        responses.success({
            res,
            data: updatedUser,
            status: 200,
            message: "User updated successfully",
        });
    } catch (err) {
        responses.error({
            res,
            error: err,
            status: 400,
            message: "Bad request",
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    usersControllers
        .deleteUser(id)
        .then((data) => {
            if (data) {
                responses.success({
                    res,
                    data,
                    status: 200,
                    message: "User deleted successfully",
                });
                return;
            }
            responses.error({
                res,
                status: 404,
                message: "User not found",
            });
        })
        .catch((err) => {
            responses.error({
                res,
                data: err,
                status: 400,
                message: "Bad request",
            });
        });
};

const getMyUser = (req, res) => {

    const id = req.user.id

    usersControllers.getUserById(id)
        .then(data => {
            responses.success({
                res,
                status: 200,
                message: 'This is youre current user',
                data
            })
        })
        .catch(err => {
            responses.error({
                res,
                status: 400,
                message: 'Something bad getting the current user',
                data: err
            })
        })
}

const delteMyUser = (req, res) => {
    const id = req.user.id
    usersControllers.deleteUser(id)
        .then(data => {
            responses.success({
                res,
                status: 200,
                message: `User with id ${id} has been deleted`,
            })
        })
        .catch(err => {
            responses.error({
                res,
                status: 400,
                message: 'Something went wrong',
            })
        })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getMyUser,
    delteMyUser
};