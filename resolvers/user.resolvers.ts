import { gql } from "apollo-server-express";
import md5 from "md5";
import User from "../models/user.model";
import * as generate from "../helpers/generate";

export const resolversUser = {
  Mutation: {
    registerUser: async (_: unknown, args: any) => {
      const { user } = args;
      const exitsEmail = await User.findOne({
        email: user.email,
        deleted: false,
      });
      if (exitsEmail) {
        return {
          code: 400,
          message: "Email đã tồn tại",
        };
      } else {
        user.password = md5(user.password);
        user.token = generate.generateRandomString(30);
        const newUser = new User(user);
        const data = await newUser.save();

        return {
          code: 200,
          message: "Đăng ký thành công!",
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          token: data.token,
        };
      }
    },

    loginUser: async (_: unknown, args: any) => {
      const { user } = args;
      const exitsEmail = await User.findOne({
        email: user.email,
        deleted: false,
      });
      if (!exitsEmail) {
        return {
          code: 400,
          message: "Email không tồn tại!",
        };
      }
      if (md5(user.password) !== exitsEmail.password) {
        return {
          code: 400,
          message: "Mật khẩu không đúng!",
        };
      }
      return {
        code: 200,
        message: "Đăng nhập thành công!",
        id: exitsEmail.id,
        fullName: exitsEmail.fullName,
        email: exitsEmail.email,
        token: exitsEmail.token,
      };
    },
  },
};
