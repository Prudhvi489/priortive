export  const regex_data={
    string_pattern: /[0-9~`!@#$%^&*()\-_=+\[\]{}\\|;:'",.<>\/?]/,
    generic_passport:/^[A-Za-z0-9]{6,10}$/,
    pan_Regex:/^[A-Z]{5}\d{4}[A-Z]$/,
    email_Regex:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mobile_regex:/^\d+$/,
    string_regex:/^[a-zA-Z]+$/,
    passwordStrength :/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    pwd_regex : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

    // contact_regex:/^[0-9]{10}$/
}   