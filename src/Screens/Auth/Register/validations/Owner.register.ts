import { LIMITS } from "@/constants";
import type { IOwner } from "../types/types";

const validateOwnerData = (formData: IOwner):Partial<Record<keyof IOwner,string>>|null => {
    const errors: Partial<Record<keyof IOwner, string>> = {};

    // Safe string helper
    const getString = (value: unknown): string =>
        typeof value === "string" ? value.trim() : "";

    const name = getString(formData.name);
    const mobile = getString(formData.mobile);
    const address = getString(formData.address);
    const email = getString(formData.email);
    const password = getString(formData.password);
    const gender = getString(formData.gender);

    // Name Validation
    if (!name) {
        errors.name = "Name is required";
    } else if (name.length < 3) {
        errors.name = "Name must be at least 3 characters";
    } else if (name.length > LIMITS.MaxNameLength) {
        errors.name = "Name is too long";
    }

    // Mobile Validation
    const mobileRegex = /^[0-9]+$/;

    if (!mobile) {
        errors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(mobile)) {
        errors.mobile = "Mobile number must contain only numbers";
    } else if (mobile.length !== 10) {
        errors.mobile = "Mobile number must be exactly 10 digits";
    }

    // Address Validation
    if (!address) {
        errors.address = "Address is required";
    } else if (address.length < 3) {
        errors.address = "Address must be at least 3 characters";
    } else if (address.length > LIMITS.MaxAddressLength) {
        errors.address = `Address must be less than ${LIMITS.MaxAddressLength} chars`;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";
    }

    // Password Validation
    // Min 8 chars, uppercase, lowercase, number, special character
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    } else if (!passwordRegex.test(password)) {
        errors.password =
            "Password must include uppercase, lowercase, number, and special character";
    }

    // Gender Validation
    if (!gender) {
        errors.gender = "Gender is required";
    }

    if (!Object.keys(errors).length) {
        return null
    }

    return errors;
};

export default validateOwnerData;