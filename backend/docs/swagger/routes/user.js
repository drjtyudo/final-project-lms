module.exports = {
  "/users/regist": {
    post: {
      tags: ["User"],
      summary: "Create new user",
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              properties: {
                fullname: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                confirmPassword: {
                  type: "string",
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
              },
              required: [
                "fullname",
                "email",
                "password",
                "confirmPassword",
                "nomor_telp",
                "tggl_lahir",
                "negara",
                "domisili",
              ],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Ok",
        },
        400: {
          description: "Bad Request",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
  "/users/me": {
    get: {
      tags: ["User"],
      summary: "Get user by token",
      security: [{ accessToken: [] }],
      produces: ["application/json"],
      responses: {
        200: {
          description: "OK",
        },
      },
    },
  },
  "/users/login": {
    post: {
      tags: ["User"],
      summary: "User login",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  description: "Email address of the user",
                },
                password: {
                  type: "string",
                  description: "User password",
                },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successful login",
          content: {
            "application/json": {
              example: {
                accessToken: "your_access_token_here",
              },
            },
          },
        },
        400: {
          description: "Bad request",
          content: {
            "application/json": {
              example: {
                msg: "Password salah!",
              },
            },
          },
        },
        404: {
          description: "Email not found",
          content: {
            "application/json": {
              example: {
                msg: "Email tidak ditemukan",
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              example: {
                msg: "Internal server error message",
              },
            },
          },
        },
      },
    },
  },
  "/users": {
    get: {
      tags: ["User"],
      summary: "Get all users",
      security: [],
      produces: ["application/json"],
      responses: {
        200: {
          description: "OK",
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                error: "Unauthorized",
                message: "Missing or invalid token",
              },
            },
          },
        },
      },
    },
  },
  "/token": {
    get: {
      tags: ["User"],
      summary: "Refresh access token",
      produces: ["application/json"],
      responses: {
        200: {
          description: "OK",
        },
        400: {
          description: "Bad Request",
          content: {
            "application/json": {
              example: {
                error: "Bad Request",
                message: "Login First",
              },
            },
          },
        },
      },
    },
  },
  "/users/logout": {
    delete: {
      tags: ["User"],
      summary: "User logout",
      security: [{ accessToken: [] }],
      produces: ["application/json"],
      responses: {
        204: {
          description: "No Content",
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                error: "Unauthorized",
                message: "Missing or invalid token",
              },
            },
          },
        },
      },
    },
  },
  "/users/{userId}": {
    get: {
      tags: ["User"],
      summary: "Get user by ID",
      security: [],
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          description: "ID of the user to retrieve",
          schema: {
            type: "string",
          },
        },
      ],
      produces: ["application/json"],
      responses: {
        200: {
          description: "OK",
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                error: "Unauthorized",
                message: "Missing or invalid token",
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              example: {
                error: "User not found",
                message: "The requested user ID was not found",
              },
            },
          },
        },
      },
    },
  },
  "/users/update/{userId}": {
    patch: {
      tags: ["User"],
      summary: "Update user by ID",
      security: [],
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID of the user to update",
        },
      ],
      requestBody: {
        // required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              properties: {
                fullname: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
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
                profile_image: {
                  type: "file",
                },
              },
              required: [
                "fullname",
                "email",
                "nomor_telp",
                "tggl_lahir",
                "negara",
                "domisili",
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: "OK",
        },
        400: {
          description: "Bad Request",
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              example: {
                msg: "User tidak ditemukan.",
              },
            },
          },
        },
        422: {
          description: "Unprocessable Entity",
          content: {
            "application/json": {
              example: {
                msg: "Jenis file gambar tidak valid. Harap unggah file gambar dengan ekstensi PNG, JPG, atau JPEG",
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              example: {
                msg: "Terjadi kesalahan saat mengunggah gambar",
              },
            },
          },
        },
      },
    },
  },
};
