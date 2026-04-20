import { LIMITS, MIN } from "@/constants";

type UserForm = {
    name: string;
    mobile: string;
    address: string;
    password: string;
    email: string;
};

type Errors = Record<keyof UserForm, string>;

export function ValidateUserRegistration(form: UserForm): Errors|null {
    const errors: Errors = {
        name: "",
        mobile: "",
        address: "",
        password: "",
        email: ""
    };


    // Name
    if (!form.name.trim()) {
        errors.name = "Name is required";
    } else if (form.name.length < 2) {
        errors.name = "Name must be at least 2 characters";
    } else if (form.name.length > LIMITS.name) {
        errors.name = "Name is too long";
    }

    // Mobile
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!form.mobile.trim()) {
        errors.mobile = "Mobile number is required";
    } else if (form.mobile.length > LIMITS.mobile) {
        errors.mobile = "Mobile number is too long";
    } else if (!mobileRegex.test(form.mobile)) {
        errors.mobile = "Enter a valid 10-digit mobile number";
    }

    // Address
    if (!form.address.trim()) {
        errors.address = "Address is required";
    } else if (form.address.length < 5) {
        errors.address = "Address is too short";
    } else if (form.address.length > LIMITS.address) {
        errors.address = "Address is too long";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
        errors.email = "Email is required";
    } else if (form.email.length > LIMITS.email) {
        errors.email = "Email is too long";
    } else if (!emailRegex.test(form.email)) {
        errors.email = "Enter a valid email";
    }

    // Password
    //   const passwordRegex =
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!form.password) {
        errors.password = "Password is required";
    } else if (form.password.length > LIMITS.password) {
        errors.password = "Password is too long";
    }else if (form.password.length<MIN.password){
        errors.password="Min Password should be 8 digits"
    }else if(!form.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
        errors.password="Password must be mix of alphabets,digits,and symbols"
    }

    ///now check here if errors is empty return null else return errors
    let errorsFound = false
    for (let key in errors) {
        if (errors[key as keyof Errors] != "") {
            errorsFound = true
        }
    }
    if (!errorsFound) {
        return null
    }
    return errors;
}