import Joi from "joi";

export const validateUser = (req: any, res: any, next: any) => {
    const validateUserSchema = Joi.object({
        FirstName: Joi.string().max(100).required(),
        LastName: Joi.string().max(100).required(),
        CompanyName: Joi.string().max(255).required(),
        Email: Joi.string().email().required(),
        // Password: Joi.string().required(),
        PhoneNumber: Joi.string().max(15).pattern(/^[0-9]+$/).required(),
        Address: Joi.string().max(255).required(),
        CompanyLogoPath: Joi.string().allow(null, ''),
        ProfilePicturePath: Joi.string().allow(null, '')
    });

    const { FirstName, LastName, CompanyName, Email, PhoneNumber, Address, CompanyLogoPath, ProfilePicturePath } = req.body;
    const { error } = validateUserSchema.validate({ FirstName, LastName, CompanyName, Email, PhoneNumber, Address, CompanyLogoPath, ProfilePicturePath });

    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        return res.status(409).json({ message: msg });
    }
    next();
};
