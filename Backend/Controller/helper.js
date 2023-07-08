const db = require("../DB");

const getUSerId = (user_email) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM user_data WHERE user_email = ?";
      db.query(query, [user_email], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result[0].user_id);
        }
      });
    });
  };


module.exports = getUSerId;