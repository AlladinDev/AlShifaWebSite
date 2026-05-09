import { LIMITS } from "../../../../constants";
import type { IDoctor } from "../types/types";



const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const mobileRegex = /^[0-9]{10}$/;

export function validateDoctor(doc: IDoctor): Record<keyof IDoctor, string> | null {
    const errors: Record<string, string> = {};

    // Trim all inputs
    const name = doc.name.trim();
    const email = doc.email.trim();
    const password = doc.password.trim();
    const mobile = doc.mobile.trim();
    const address = doc.address.trim();
    const qualifications = doc.qualifications.trim();
    const experience = doc.experience.trim();
    const post = doc.post.trim();
    const gender=doc.gender.trim()
    const workingAt=doc.workingAt.trim()

    // 👤 Name
    if (name === "") {
        errors["name"] = "Name is required";
    } else if (name.length > LIMITS.MaxNameLength) {
        errors["name"] = "Name too long";
    }
    

    //working at
    if(workingAt==""){
        errors["workingAt"]="WorkingAt is required"
    }else if(workingAt.length<3){
        errors["workingAt"]="WorkingAt is too short"
    }else if(workingAt.length>LIMITS.MaxNameLength){
        errors["workingAt"]="WorkingAt is too long"
    }

    // 📧 Email
    if (email === "") {
        errors["email"] = "Email is required";
    } else if (email.length > LIMITS.MaxEmailLength) {
        errors["email"] = "Email too long";
    } else if (!emailRegex.test(email)) {
        errors["email"] = "Invalid email format";
    }

    // 📱 Mobile
    if (mobile === "") {
        errors["mobile"] = "Mobile is required";
    } else if (!mobileRegex.test(mobile)) {
        errors["mobile"] = "Mobile must be 10 digits";
    }

    // 🔐 Password
    if (password === "") {
        errors["password"] = "Password is required";
    } else if (password.length < LIMITS.MinPasswordLength) {
        errors["password"] = "Password too short";
    } else if (password.length > LIMITS.MaxPasswordLength) {
        errors["password"] = "Password too long";
    } else {
        let hasUpper = false;
        let hasLower = false;
        let hasNumber = false;
        let hasSpecial = false;

        for (const ch of password) {
            if (/[A-Z]/.test(ch)) {
                hasUpper = true;
            } else if (/[a-z]/.test(ch)) {
                hasLower = true;
            } else if (/[0-9]/.test(ch)) {
                hasNumber = true;
            } else if (/[@$!%*?&]/.test(ch)) {
                hasSpecial = true;
            }
        }

        if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
            errors["password"] =
                "Weak password (must include upper, lower, number, special char)";
        }
    }

    // 📍 Address
    if(address==""){
        errors["address"]="address is required"
    }
    else if (
        address !== "" &&
        address.length > LIMITS.MaxAddressLength
    ) {
        errors["address"] = "Address too long";
    }else if(address.length<5){
        errors["address"]="Address is too short"
    }

    // 🎓 Qualifications
    if (qualifications == "") {
        errors["qualifications"] = "Qualification is required"
    } else if (qualifications.length < 1) {
        errors["qualifications"] = "Qualification is required"
    }
    else if (
        qualifications.length > LIMITS.MaxQualificationsLength
    ) {
        errors["qualifications"] = "Qualifications too long";
    }

    // 💼 Post
    if (post === "") {
        errors["post"] = "Post is required";
    }

    // 🧠 Experience
    if (experience === "") {
        errors["experience"] = "Experience is required";
    } else if (!/^\d+$/.test(experience)) {
        errors["experience"] = "Experience must be a valid number";
    } else {
        const experienceNumeric = parseInt(experience, 10);

        if (experienceNumeric < 1) {
            errors["experience"] = "experience cannot be 0";
        } else if (experienceNumeric > 80) {
            errors["experience"] = "experience cannot be more than 80";
        }
    }

    //gender 
    if(gender==""){
        errors["gender"]="gender is required"
    }

    if (Object.keys(errors).length === 0) {
        return null;
    }

    return errors;
}