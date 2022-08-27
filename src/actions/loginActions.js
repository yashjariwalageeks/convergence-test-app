/**
 * @param {{email:string,password:string}} userCredential
 * @returns {promise}
 */
export function loginUser(userCredential) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                //fetch all users
                let users = localStorage.getItem("user");
                users = !!users ? JSON.parse(users) : [];
                // find user with entered email address and password
                const userFound = users.findIndex((value) => {
                    return value.email === userCredential.email && value.password === userCredential.password
                })
                // If user is not found then throw error
                if (userFound === -1) {
                    reject({
                        statusCode: 401,
                        error: true,
                        message: "Invalid Email or Password!!"
                    })
                } else {
                    // If user is found then save user as current user in local storage
                    localStorage.setItem("currentUser", userCredential.email)
                    resolve({
                        statusCode: 200,
                        message: "Logged in successfully!!"
                    })
                }
            } catch (e) {
                //handle any unhandled error
                reject({
                    statusCod: 500,
                    error: true,
                    message: e.message
                })
            }

        }, 2000)
    }).then((response) => {
        return response;
    }).catch((error) => {
        return error
    })
}

/**
 * @returns {promise}
 */
export function logoutUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                localStorage.removeItem("currentUser");
                resolve({
                    statusCode: 200,
                    message: "Logged out successfully!!"
                })

            } catch (e) {
                reject({
                    statusCod: 500,
                    error: true,
                    message: e.message
                })
            }

        }, 2000)
    }).then((response) => {
        return response;
    }).catch((error) => {
        return error
    })

}
