import User from "../models/user.model.js";
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id || req.admin.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" })
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.mobile = req.body.mobile || user.mobile;
        if (req.files?.profilePic?.[0]) {
            user.profilePic = req.files.profilePic[0].path;
        }
        if (user.role === "user") {
            user.location = req.body.location || user.location;
            user.experience = req.body.experience || user.experience;
            user.education = req.body.education || user.education;
            user.currentCompany = req.body.currentCompany || user.currentCompany;
            user.currentCTC = req.body.currentCTC || user.currentCTC;
            user.expectedCTC = req.body.expectedCTC || user.expectedCTC;
            user.noticePeriod = req.body.noticePeriod || user.noticePeriod;

            if (req.body.skills) {
                user.skills = Array.isArray(req.body.skills)
                    ? req.body.skills
                    : req.body.skills.split(",").map(skill => skill.trim());
            }

            if (req.body.language) {
                user.language = Array.isArray(req.body.language)
                    ? req.body.language
                    : req.body.language.split(",").map(lang => lang.trim());
            }

            if (req.files?.resume?.[0]) {
                user.resume = req.files.resume[0].path;
            }
        }
        await user.save();

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        let profile = {
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,

            profilePic: user.profilePic
                ? `${baseUrl}/${user.profilePic}`
                : null,
        };
        if (user.role === "user") {
            profile = {
                ...profile,

                location: user.location,
                experience: user.experience,
                education: user.education,
                currentCompany: user.currentCompany,
                currentCTC: user.currentCTC,
                expectedCTC: user.expectedCTC,
                noticePeriod: user.noticePeriod,
                skills: user.skills,
                language: user.language,

                resume: user.resume
                    ? `${baseUrl}/${user.resume}`
                    : null,
            };
        }
        res.status(200).json({
            message: "Profile updated successfully",
            profile
        });

    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id || req.admin.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        let profile = {
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,

            profilePic: user.profilePic
                ? `${baseUrl}/${user.profilePic}`
                : null,
        };

        if (user.role === "user") {
            profile = {
                ...profile,

                currentCTC: user.currentCTC,
                expectedCTC: user.expectedCTC,
                noticePeriod: user.noticePeriod,
                location: user.location,
                experience: user.experience,
                skills: user.skills,
                language: user.language,
                education: user.education,
                currentCompany: user.currentCompany,

                resume: user.resume
                    ? `${baseUrl}/${user.resume}`
                    : null,
            };
        }
        res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}