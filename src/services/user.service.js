
import { UserModel } from "../models/index.js";
import { StreamModel } from "../models/index.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import passwordHash from 'password-hash';
import mongoose from "mongoose";
export const UserService = {
	getAll: async () => {
		return UserModel.find();
	},

	get: async (id) => {

		const users = await UserModel.find()

		console.log(users);
		for (const user of users) {

			if (user.id === id) {
				return await UserModel.findById(id);
			}

		}

	},

	add: async (body) => {
		let data;
		data = await UserModel.find({ email: body.email });

		console.log(data.length);
		if (data.length == 0) {
			console.log('condition is true');

			const data = await UserModel.create(body);
			// const token = jwt.sign(body, config.env.jwtSecret);

			const hashedPassword = passwordHash.generate(body.password);
			delete body.password;
			data.password = hashedPassword;

			UserModel.create(data);
			console.log(data);
			return data;
		}

	},

	delete: async (id) => {
		const users = await UserModel.find()
		for (const user of users) {

			if (user.id === id) {
				return await UserModel.findByIdAndDelete(id);
			}

		}

	},
	deleteStream: async (id, streamId) => {
		const streams = await StreamModel.find()

		for (const stream of streams) {

			if (stream.id === streamId) {
				return await StreamModel.findByIdAndDelete(stream.id);
			}
		}

	},
	update: async (id, body) => {

		const users = await UserModel.find()

		// console.log(users);
		for (const user of users) {

			if (user.id === id) {


				const user = await UserModel.findById(id);

				console.log(user);
				if (user) {
					if (body.first_name) {
						console.log(body.first_name);
						user.first_name = body.first_name;
					}
					if (body.last_name) {
						console.log(body.last_name);
						user.last_name = body.last_name;
					}
					if (body.password) {
						console.log(body.password);
						const hashedPassword = passwordHash.generate(body.password);
						delete user.password;
						user.password = hashedPassword;
					}
					if (body.email) {
						user.email = body.email;
					}
					await user.save();
					return user;

				}



			}

		}



	},
	getUser: async (body) => {

		const users = await UserModel.find()

		for (const user of users) {
			if (user.email === body.email) {
				console.log(user);
				console.log(body.password);
				console.log(user.password);
				if (passwordHash.verify(body.password, user.password)) {

					const token = jwt.sign(body, config.env.jwtSecret);
					// const token = jwt.sign(body, config.env.jwtSecret, { expiresIn: '300s' });

					return { user, token }

				}

			}

		}
	},
	getStreams: async (id) => {


		const data = await UserModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$lookup: {
					from: "streams",
					localField: "_id",
					foreignField: "user_id",
					as: "stream_record",
				},
			},
		]);

		return data;

	},
	getStream: async (id, streamId) => {

		const data = await StreamModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(streamId),
					user_id: mongoose.Types.ObjectId(id)
				},
			},

		]);

		return data


	}


};
