import { LIMITS } from "../../../../../constants";
import type { IDoctor } from "../types/Doctor.types";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const mobileRegex = /^[0-9]{10}$/;
const aadhaarRegex = /^[2-9][0-9]{11}$/;
const nmrRegex = /^[A-Za-z0-9/-]{5,50}$/;

export function validateDoctor(
    doc: IDoctor
): Record<keyof IDoctor, string> | null {
    const errors: Partial<Record<keyof IDoctor, string>> = {};

    // Trim inputs
    const name = doc.name.trim();
    const email = doc.email.trim();
    const password = doc.password.trim();
    const mobile = doc.mobile.trim();
    const address = doc.address.trim();
    const qualifications = doc.qualifications.trim();
    const experience = doc.experience.trim();
    const post = doc.post.trim();
    const gender = doc.gender.trim();
    const workingAt = doc.workingAt.trim();
    const age = doc.age.trim()
    const aadhaarNumber = doc.aadhaarNumber.trim();
    const nmrNumber =doc.nmrNumber.trim();

    // 👤 Name
    if (name === "") {
        errors.name = "Name is required";
    } else if (name.length > LIMITS.MaxNameLength) {
        errors.name = "Name too long";
    }


    //age validation
    if (age === "") {
        errors.age = "age is required";
    }else if(Number(age)<=0){
        errors.age= "age cannot be negative";
    }else if(Number(age)>90){
         errors.age= "age cannot be more than 90";
    }


    // 🏥 Working At
    if (workingAt === "") {
        errors.workingAt = "Hospital / Clinic is required";
    } else if (workingAt.length < 3) {
        errors.workingAt = "Hospital / Clinic name is too short";
    } else if (workingAt.length > LIMITS.MaxNameLength) {
        errors.workingAt = "Hospital / Clinic name is too long";
    }

    // 📧 Email
    if (email === "") {
        errors.email = "Email is required";
    } else if (email.length > LIMITS.MaxEmailLength) {
        errors.email = "Email too long";
    } else if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";
    }

    // 📱 Mobile
    if (mobile === "") {
        errors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(mobile)) {
        errors.mobile = "Mobile number must be 10 digits";
    }

    // 🔐 Password
    if (password === "") {
        errors.password = "Password is required";
    } else if (password.length < LIMITS.MinPasswordLength) {
        errors.password = "Password too short";
    } else if (password.length > LIMITS.MaxPasswordLength) {
        errors.password = "Password too long";
    } else {
        let hasUpper = false;
        let hasLower = false;
        let hasNumber = false;
        let hasSpecial = false;

        for (const ch of password) {
            if (/[A-Z]/.test(ch)) hasUpper = true;
            else if (/[a-z]/.test(ch)) hasLower = true;
            else if (/[0-9]/.test(ch)) hasNumber = true;
            else if (/[@$!%*?&]/.test(ch)) hasSpecial = true;
        }

        if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
            errors.password =
                "Password must contain uppercase, lowercase, number and special character";
        }
    }

    // 📍 Address
    if (address === "") {
        errors.address = "Address is required";
    } else if (address.length < 5) {
        errors.address = "Address is too short";
    } else if (address.length > LIMITS.MaxAddressLength) {
        errors.address = "Address too long";
    }

    // 🪪 Aadhaar Number
    if (aadhaarNumber === "") {
        errors.aadhaarNumber = "Aadhaar number is required";
    } else if (!aadhaarRegex.test(aadhaarNumber)) {
        errors.aadhaarNumber = "Enter a valid 12-digit Aadhaar number";
    }

    // 🩺 National Medical Registration Number
    if (nmrNumber === "") {
        errors.nmrNumber =
            "National Medical Registration Number is required";
    } else if (
        !nmrRegex.test(nmrNumber)
    ) {
        errors.nmrNumber =
            "Invalid registration number";
    }

    // 🎓 Qualifications
    if (qualifications === "") {
        errors.qualifications = "Qualifications are required";
    } else if (
        qualifications.length > LIMITS.MaxQualificationsLength
    ) {
        errors.qualifications = "Qualifications too long";
    }

    // 👨‍⚕️ Post
    if (post === "") {
        errors.post = "Post is required";
    }

    // 💼 Experience
    if (experience === "") {
        errors.experience = "Experience is required";
    } else if (!/^\d+$/.test(experience)) {
        errors.experience = "Experience must be a number";
    } else {
        const exp = Number(experience);

        if (exp < 0) {
            errors.experience = "Experience cannot be negative";
        } else if (exp > 80) {
            errors.experience =
                "Experience cannot exceed 80 years";
        }
    }

    // 🚻 Gender
    if (gender === "") {
        errors.gender = "Gender is required";
    }



    // 📜 Specialization Certificates
    if (
        !doc.specializationCertificates ||
        doc.specializationCertificates.length === 0
    ) {
        errors.specializationCertificates =
            "At least one specialization certificate is required";
    }

    // 🖼️ Profile Photo
    if (!doc.profilePhoto) {
        errors.profilePhoto = "Profile photo is required";
    }

    return Object.keys(errors).length
        ? (errors as Record<keyof IDoctor, string>)
        : null;
}