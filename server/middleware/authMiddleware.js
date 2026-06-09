import User from "../models/user.js";
import { clerkClient } from "@clerk/express";

export const protect = async (req, res, next) => {
    const { userId } = req.auth;
    if (!userId) {
        return res.status(401).json({ success: false, message: "Not Authorized" });
    }
    console.log("Mongo Ready State:", User.db.readyState);
    console.log("User ID:", userId);
    let user = await User.findById(userId);

    if (!user) {
        // 👇 Fetch from Clerk and insert into Mongo
        const clerkUser = await clerkClient.users.getUser(userId);

        user = await User.create({
            _id: clerkUser.id,
            username: clerkUser.firstName + " " + clerkUser.lastName,
            email: clerkUser.emailAddresses[0].emailAddress,
            image: clerkUser.imageUrl,
            recentSearchedCities: [],
        });
    }

    req.user = user;
    next();
};
