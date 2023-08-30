module.exports = {
  User: {
    type: "object",
    properties: {
      id_user: {
        type: "number",
      },
      username: {
        type: "string",
      },
      fullname: {
        type: "string",
      },
      email: {
        type: "string",
      },
      password: {
        type: "string",
        format: "password",
      },
      profile_image: {
        type: "string",
      },
      url_image: {
        type: "string"
      },
      nomor_telp: {
        type: "string",
      },
      tggl_lahir: {
        type: "date",
      },
      negara: {
        type: "string",
      },
      domisili: {
        type: "string",
      },
      refresh_token: {
        type: "string",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
};
