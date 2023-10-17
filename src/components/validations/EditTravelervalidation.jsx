import * as yup from 'yup';
// Edit profile
export const schema = yup.object().shape({
    Fname:yup.string().required("Enter Firstname"),
    Lname:yup.string().required("Enter Lastname"),
    countrycode:yup.string().required(),
    Pnum:yup.string().required("Enter your mobile number").matches(/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/,"Enter valid Phone number"),
    DOB:yup.string().required("Enter your date of birth"),
    email:yup.string().email("Enter valid email").required("Enter your email"),
    passportnumber:yup.string().required("Enter your passport number"),//.matches(/^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\ d{4}[1-9]$/,"Enter valid passport number"),
    passportExpiry:yup.string().required("Enter expiry date")
    // maritalstatus:yup.string().required("please select one"),
   
  });
export const signupvalidation =yup.object().shape({
    Fname:yup.string().required("Enter Firstname"),
    Lname:yup.string().required("Enter Lastname"),
    Pnum:yup.string().required("Enter your mobile number").matches(/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/,"Enter valid Phone number"),
    email:yup.string().email("Enter valid email").required("Enter your email"),
   pwd:yup.string().required("enter password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,"password must 6 characters long with atlest one special,capital,number"),
   cnfmpwd:yup.string().required("enter pwd").oneOf([yup.ref("pwd"),null],"password should be same")
})

// Edit and add traveller validation
export const edittraveller =yup.object().shape({
  Fname:yup.string().required("Enter Firstname"),
  Lname:yup.string().required("Enter Lastname"),
  DOB:yup.string().required("Enter your date of birth"),
  passportnumber:yup.string().required("Enter your passport number"),//.matches(/^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\ d{4}[1-9]$/,"Enter valid passport number"),
  passportExpiry:yup.string().required("Enter your expiry date")
})