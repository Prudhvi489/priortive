import {
    Container,
    Paper,
    Grid,
    Typography,
    TextField,
    Stack,
    IconButton,
    Divider,
    Checkbox,
    FormHelperText,
    FormControlLabel,
    FormGroup,
    FormControl,
    FormLabel,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { adminPackagesStyle } from "./AdminStyles";
import { enqueueSnackbar } from "notistack";
import { adminAddCoupoun } from "./AdminStyles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";
import deleteicon from "../../../assets/Subadminassets/deleteicon.svg";
import plusicon from "../../../assets/Subadminassets/plusicon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import gomytripclient from "../../../GomytripClient";
import BusesPageBackDrop from '../Buses/BusesPageBackDrop'
const AdminEditTourForm = () => {
    const addTours = adminPackagesStyle();
    const adminCoupoun = adminAddCoupoun();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false)


    const [viewPackDetails, setViewPackDetails] = useState([]);


    const [mainCatList, setMainCatList] = useState([]);

    const [selectedCat, setSelectedCat] = useState([]);

    //DAYS VARIABLE
    const [daysData, setDaysData] = useState({
        days: null,
        night: null,
        isFlight: null,
        isHotel: null,
        isActivities: null,
    });


    useEffect(() => {
        toursData();
        categoryList()
    }, []);

    const toursData = () => {
        let payloadToSend = {
            action: 1,
            id: location.state.packId,
        };
        gomytripclient
            .post("/modifyTourPackages", payloadToSend)
            .then((res) => {
                if (res.status === 200 && res.data.status === 1) {
                    setViewPackDetails(res.data.data.results[0]);
                    setValue('packageName', res.data.data.results[0].package_name)
                    setValue('termsForPackage', res.data.data.results[0].terms_condition)
                    setValue('descriptionText', res.data.data.results[0].package_description)

                    setpackageImage({ file: "", imagePreview: res.data.data.results[0].cover_picture });

                    setSelectedCat(res.data.data.results[0].sub_category)

                    setDaysData({
                        ...daysData,
                        days: res.data.data.results[0].days,
                        night: Number(res.data.data.results[0].nights),
                        isFlight: res.data.data.results[0].flights ? 1 : 2,
                        isHotel: res.data.data.results[0].hotels ? 1 : 2,
                        isActivities: res.data.data.results[0].activities ? 1 : 2,
                    })

                    setEachDayData(
                        Array.from({ length: res.data.data.results[0].days }, (_, index) => ({
                            "day": `day${index + 1}`, "content": res?.data.data?.results[0]?.description[index]?.content || "",
                        }))
                    );

                } else {
                    enqueueSnackbar(res.data.message, { variant: "error" });
                }
            })
            .catch((Err) => {
                console.log(Err);
            });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control,
    } = useForm();

    const [singleImageError, setSingleImageError] = useState("");

    const [multipleImagesError, setMultipleImagesError] = useState("");
    // ------------------------------------ IMAGE------------------------------------//
    const [packageImage, setpackageImage] = useState({
        file: "",
        imagePreview: "",
    });
    const allowedTypes = ["image/jpeg", "image/png"];

    const handlepackageImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (allowedTypes.includes(file.type)) {
                let urlObj = URL.createObjectURL(file);
                setpackageImage(file);
                setpackageImage({ file: file, imagePreview: urlObj });
                setSingleImageError("");
            } else {
                enqueueSnackbar(
                    "Invalid file type. Please select a JPEG or PNG image.",
                    { variant: "error" }
                );
                setpackageImage({ file: "", imagePreview: "" });
                setSingleImageError(
                    "Invalid file type. Please select a JPEG or PNG image."
                );
            }
        }
    };
    // ------------------------------------ IMAGE------------------------------------//

    const [images, setImages] = useState([]);

    const [removedImages, setRemovedImages] = useState([])
    const handleImageDelete = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };
    const handleImageUpload = (event) => {
        const selectedImages = event.target.files;
        let validImages = [];
        console.log(selectedImages, "selectedImages");
        for (let upimages of selectedImages) {
            if (allowedTypes.includes(upimages.type)) {
                validImages.push(upimages);
                setMultipleImagesError("");
            } else {
                enqueueSnackbar(
                    "Invalid file type for selected Images. Please select a JPEG or PNG image.",
                    { variant: "error" }
                );
                setMultipleImagesError(
                    "Invalid file type for selected images. Please select a JPEG or PNG image."
                );
            }
        }
        const remainingSlots = Math.max(0, 12 - images.length);
        const newImages = Array.from(validImages).slice(0, remainingSlots);
        setImages((prevImages) => [...prevImages, ...newImages]);
    };


    // ------------------

    const [eachDayData, setEachDayData] = useState([]);
    const handleDaysChange = (event) => {
        const dayNumber = parseInt(event.target.value);
        setDaysData({ ...daysData, days: dayNumber, night: dayNumber }); //, night: dayNumber
        // setEachDayData(Array.from({ length: dayNumber }, () => ({ dayContent: '' })));

        setEachDayData(
            Array.from({ length: dayNumber }, (_, index) => ({
                "day": `day${index + 1}`, "content": viewPackDetails?.description[index]?.content || "",
            }))
        );

        // setEachDayData(
        //     Array.from({ length: dayNumber }, (_, index) => ({
        //         "day": `day${index + 1}`, "content": "",
        //     }))
        // );

    };

    const handleDayDataChange = (index, field, value) => {
        const updatedTasks = [...eachDayData];
        updatedTasks[index][field] = value;
        setEachDayData(updatedTasks);
    };

    const handleCatChange = (e) => {
        let eValue = Number(e.target.value);
        if (e.target.checked) {
            setSelectedCat(eValue);
        } else {
            setSelectedCat("");
        }
        // setSelectedCat(selectedCat.includes(eValue) ? selectedCat.filter((filterD) => eValue != filterD) : [...selectedCat, eValue])
    };

    // 1 -> Main Category
    // 2 -> Sub Category
    const categoryList = () => {
        let payloadToSend = {
            pageNumber: "",
            pageSize: "",
            category_type: 2,
        };
        gomytripclient
            .post("/categoryList", payloadToSend)
            .then((res) => {
                if (res.status === 200 && res.data.status === 1) {
                    setMainCatList(res.data.data.rows);
                } else {
                    enqueueSnackbar(res.data.message, { variant: "error" });
                    setMainCatList([]);
                }
            })
            .catch((Err) => {
                console.log(Err);
            });
    };

    const savePackage = (formData) => {
        if (packageImage.imagePreview === "") {
            setSingleImageError("Package cover Image cannot be left empty");
            document
                .getElementById("coverPicId")
                .scrollIntoView({ behavior: "smooth" });
            return;
        }
        if (images.length === 0 && removedImages.length === viewPackDetails.package_images.length) {
            setMultipleImagesError("Package Inner Images cannot be left empty");
            document
                .getElementById("multipleImages")
                .scrollIntoView({ behavior: "smooth" });
            return;
        }
        if (daysData.days) {
            for (let i = 0; i < eachDayData.length; i++) {
                const dayKey = `day${i + 1}`;
                if (eachDayData[i]['content']?.trim() === "") {
                    // Scroll to the TextField using the index
                    document
                        .getElementById(dayKey)
                        .scrollIntoView({ behavior: "smooth" });
                    return; // Stop checking if an empty field is found
                }
            }
            // All fields have values, submit or perform your action
        }

        let packagePayload = new FormData();
        packagePayload.append("id", location.state.packId);
        packagePayload.append("packageplace", viewPackDetails.packageplace);
        packagePayload.append("package_name", formData.packageName);
        packagePayload.append("sub_category", selectedCat);
        packagePayload.append("days", daysData.days);
        packagePayload.append("nights", daysData.night);
        packagePayload.append("flights", daysData.isFlight === 1);
        packagePayload.append("hotels", daysData.isHotel === 1);
        packagePayload.append("activities", daysData.isActivities === 1);
        packagePayload.append("terms_condition", formData.termsForPackage);
        packagePayload.append("description", JSON.stringify(eachDayData));
        packagePayload.append("package_description", formData.descriptionText);

        packagePayload.append("action", 2);//edit

        packagePayload.append("deletedPackageImages",JSON.stringify(removedImages));

        for (let im = 0; im < images.length; im++) {
            packagePayload.append("package_images", images[im]);
        }
        if (packageImage.file) {
            packagePayload.append("cover_pic", packageImage.file);
        }
        setIsLoading(true)
        gomytripclient
            .post("/modifyTourPackages", packagePayload)
            .then((res) => {
                if (res.status === 200 && res.data.status === 1) {
                    enqueueSnackbar(res.data.message, { variant: "success" });
                    reset();
                    setImages([]);
                    setpackageImage({ file: "", imagePreview: "" });
                    navigate("/admin/AdminTourManagement");
                } else {
                    enqueueSnackbar(res.data.message, { variant: "error" });
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                setIsLoading(false)
                enqueueSnackbar(err.message);
                console.log(err);
            });
    };
    const adminAddCoupounStyles = adminAddCoupoun;

    const handleUploadedImageDelete = (image, index) => {
        if (window.confirm('Are you sure want to remove this image')) {
            setRemovedImages((pre) => ([...pre, image]))
            document.getElementById(`uploadedImg${index}`).remove()
        }

    }
    return (
        <>
            <h4 className={adminAddCoupounStyles.headingstyle}>
                Tour Packages &gt; Management Tour &gt; Edit Tourpackage
            </h4>
            <BusesPageBackDrop open={isLoading} />
            <Container>
                <Paper sx={{ padding: "25px" }}>
                    <Typography
                        textAlign={"center"}
                        color={"tomato"}
                    >
                        {/* {`Adding package to ${location.state.placeData.place_name}`} */}
                    </Typography>
                    <Divider />
                    <form>
                        {/* Four */}
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={5}>
                                <Typography className={addTours.inputLabelStyle}>
                                    Package Name
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField
                                    {...register("packageName", {
                                        required: { value: true, message: "Enter Package Name" },
                                    })}
                                    InputLabelProps={{ shrink: true }}
                                    label="Place Name"
                                    size="small"
                                    fullWidth
                                    // value={animity.hotelName}
                                    // onChange={handleInputChange}
                                    error={errors?.packageName}
                                    helperText={errors?.packageName?.message}
                                // inputRef={hotelNameRef}
                                />
                            </Grid>
                        </Grid>
                        {/* Four */}

                        {/* FIVE */}
                        <Grid container spacing={2} mt={2} id="coverPicId">
                            <Grid item xs={5}>
                                <Typography className={addTours.inputLabelStyle}>
                                    Cover Picture
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Grid container>
                                    <Grid item md={5}>
                                        {!packageImage.imagePreview && (
                                            <label htmlFor="fileInput">
                                                <input
                                                    accept="image/*"
                                                    onChange={(e) => handlepackageImage(e)}
                                                    type="file"
                                                    id="fileInput"
                                                    style={{ display: "none" }}
                                                />
                                                <Stack
                                                    className={adminCoupoun.inputFile}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                >
                                                    <FileUploadOutlinedIcon
                                                        fontSize="large"
                                                        className="c-p"
                                                    />
                                                    <p className="c-p">Upload File</p>
                                                </Stack>
                                            </label>
                                        )}
                                        {packageImage.imagePreview && (
                                            <span style={{ margin: "10px 0" }}>
                                                <img
                                                    className={addTours.previewImageStyle}
                                                    width={"320px"}
                                                    height={"150px"}
                                                    src={packageImage.imagePreview}
                                                    alt="Preview"
                                                />
                                            </span>
                                        )}
                                        {packageImage?.imagePreview && (
                                            <Stack
                                                flexDirection={"row"}
                                                justifyContent={"space-around"}
                                                alignItems={"center"}
                                                className={adminCoupoun.uploadedImgDetails}
                                            >
                                                <span>{packageImage?.file.name || viewPackDetails.package_name}</span>
                                                <IconButton
                                                    onClick={() =>
                                                        setpackageImage({ file: "", imagePreview: "" })
                                                    }
                                                >
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </Stack>
                                        )}
                                        <Divider />
                                        {singleImageError && (
                                            <span className="goAdminErrorMessages">
                                                {singleImageError}
                                            </span>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* FIVE */}

                        {/* SIX */}
                        <Grid
                            container
                            spacing={2}
                            mt={2}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Grid item xs={5}>
                                <Typography className={addTours.inputLabelStyle}>
                                    Sub Category
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <FormControl
                                    sx={{ m: 0 }}
                                    component="fieldset"
                                    variant="standard"
                                >
                                    <FormLabel component="legend"></FormLabel>
                                    <FormGroup
                                        sx={{ flexDirection: "initial" }}
                                        {...register("categoryTypes", {
                                            required: {
                                                value: selectedCat.length === 0,
                                                message: "Select Sub Category Types",
                                            },
                                        })}
                                    >
                                        {mainCatList.map((data, i) => (
                                            <FormControlLabel
                                                key={i}
                                                control={
                                                    <Checkbox
                                                        checked={selectedCat === data.id} //selectedCat.includes(data.id)
                                                        onChange={handleCatChange}
                                                        value={data.id}
                                                    // name={data}
                                                    // disabled={i != 0 && coupounType.includes(0)}
                                                    />
                                                }
                                                label={data.category_name}
                                            />
                                        ))}
                                    </FormGroup>
                                    {errors.categoryTypes && (
                                        <span className="goAdminErrorMessages">
                                            {errors?.categoryTypes?.message}
                                        </span>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* SIX */}

                        {/* seven */}
                        <Grid container spacing={2} mt={2} mb={2}>
                            <Grid item xs={5}>
                                <Typography className={addTours.inputLabelStyle}>
                                    Days & Nights
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Grid container spacing={2}>
                                    <Grid item md={6}>
                                        <FormControl size="small" fullWidth>
                                            <p id="demo-simple-select-label">
                                                Days
                                            </p>
                                            <Select
                                                {...register("daysCount", {
                                                    required: {
                                                        value: !daysData.days,
                                                        message: "Select No.of Days for this Package",
                                                    },
                                                })}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // label="Days"
                                                value={daysData.days}
                                                onChange={handleDaysChange}
                                            >
                                                {Array.from({ length: 9 }, (_, index) => (
                                                    <MenuItem key={index + 1} value={index + 1}>
                                                        {index + 1} days
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {errors.daysCount && (
                                            <span className="goAdminErrorMessages">
                                                {errors?.daysCount?.message}
                                            </span>
                                        )}
                                    </Grid>
                                    <Grid item md={6}>
                                        <FormControl size="small" fullWidth>
                                            <p id="demo-simple-select-label">
                                                Nights
                                            </p>
                                            <Select
                                                {...register("packNight", {
                                                    required: {
                                                        value: null, /*!daysData.night,*/
                                                        message: "Select No.of Nights for this Package",
                                                    },
                                                })}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={discountType}
                                                // label="Nights"
                                                inputProps={{ shrink: true }}
                                                value={daysData.night}
                                                disabled={!daysData.days}
                                                onChange={(e) =>
                                                    setDaysData({
                                                        ...daysData,
                                                        night: Number(e.target.value),
                                                    })
                                                }
                                            >
                                                {/* {Array.from({ length: 9 }, (_, index) => (
                          <MenuItem key={index + 1} value={index + 1}>{index + 1} days</MenuItem>
                        ))} */}
                                                <MenuItem value={daysData.days - 1}>
                                                    {daysData.days - 1} Night(s)
                                                </MenuItem>
                                                <MenuItem value={daysData.days}>
                                                    {daysData.days} Night(s)
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                        {errors.packNight && (
                                            <span className="goAdminErrorMessages">
                                                {errors?.packNight?.message}
                                            </span>
                                        )}
                                    </Grid>
                                    <Grid item md={6}>
                                        <FormControl size="small" fullWidth>
                                            <p id="demo-simple-select-label">
                                                Flight
                                            </p>
                                            <Select
                                                {...register("packFlight", {
                                                    required: {
                                                        value: !daysData.isFlight,
                                                        message:
                                                            "Select Is flight Available for this Package",
                                                    },
                                                })}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={daysData.isFlight}
                                                // label="Flight"
                                                onChange={(e) =>
                                                    setDaysData({
                                                        ...daysData,
                                                        isFlight: Number(e.target.value),
                                                    })
                                                }
                                            >
                                                <MenuItem value={1}>Yes</MenuItem>
                                                <MenuItem value={2}>No</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {errors.packFlight && (
                                            <span className="goAdminErrorMessages">
                                                {errors?.packFlight?.message}
                                            </span>
                                        )}
                                    </Grid>
                                    <Grid item md={6}>
                                        <FormControl size="small" fullWidth>
                                            <p id="demo-simple-select-label">
                                                Hotels
                                            </p>
                                            <Select
                                                {...register("packHotel", {
                                                    required: {
                                                        value: !daysData.isHotel,
                                                        message:
                                                            "Select Is Hotel Available for this Package",
                                                    },
                                                })}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={daysData.isHotel}
                                                // label="Hotels"
                                                onChange={(e) =>
                                                    setDaysData({
                                                        ...daysData,
                                                        isHotel: Number(e.target.value),
                                                    })
                                                }
                                            >
                                                <MenuItem value={1}>Yes</MenuItem>
                                                <MenuItem value={2}>No</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {errors.packHotel && (
                                            <span className="goAdminErrorMessages">
                                                {errors?.packHotel?.message}
                                            </span>
                                        )}
                                    </Grid>
                                    <Grid item md={6}>
                                        <FormControl size="small" fullWidth>
                                            <p id="demo-simple-select-label">
                                                Activities
                                            </p>
                                            <Select
                                                {...register("packActivities", {
                                                    required: {
                                                        value: !daysData.isActivities,
                                                        message:
                                                            "Select Is Activities Available for this Package",
                                                    },
                                                })}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={daysData.isActivities}
                                                // label="Activities"
                                                onChange={(e) =>
                                                    setDaysData({
                                                        ...daysData,
                                                        isActivities: Number(e.target.value),
                                                    })
                                                }
                                            >
                                                <MenuItem value={1}>Yes</MenuItem>
                                                <MenuItem value={2}>No</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {errors.packActivities && (
                                            <span className="goAdminErrorMessages">
                                                {errors?.packActivities?.message}
                                            </span>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* seven */}
                        {/* TEN */}
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={5}>
                                <Typography className={addTours.inputLabelStyle}>
                                    Package Description
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField
                                    {...register("descriptionText", {
                                        required: {
                                            value: true,
                                            message: "Enter Package Description",
                                        },
                                    })}
                                    InputLabelProps={{ shrink: true }}
                                    multiline
                                    rows={7}
                                    label="Package Description"
                                    size="small"
                                    placeholder="Enter Package Description"
                                    fullWidth
                                    error={errors?.descriptionText}
                                    helperText={errors?.descriptionText?.message}
                                />
                            </Grid>
                        </Grid>
                        {/* TEN */}

                        <span className={addTours.toursDivider}></span>
                        {/* Eight */}
                        {eachDayData.map((task, index) => {
                            const dayKey = `day${index + 1}`;
                            return (
                                <Grid container spacing={2} mt={2}>
                                    <Grid item xs={5}>
                                        <Typography className={addTours.inputLabelStyle}>
                                            Day - {index + 1}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Grid container spacing={3}>
                                            <Grid item md={12}>
                                                <span
                                                    id={`day${index + 1}`}
                                                    className={`goAdminErrorMessages`}
                                                ></span>
                                                <TextField
                                                    // {...register(`day${index+1}`,{required:{value:true,message:`day${index+1} Content be empty`}})}
                                                    id={dayKey}
                                                    InputLabelProps={{ shrink: true }}
                                                    type="text"
                                                    value={task['content']}
                                                    onChange={(e) =>
                                                        handleDayDataChange(
                                                            index,
                                                            "content",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`Day ${index + 1} Description`}
                                                    multiline
                                                    rows={4}
                                                    label={`${index + 1} day`}
                                                    size="small"
                                                    fullWidth
                                                    error={task['content']?.trim() === ""}
                                                    helperText={
                                                        task['content']?.trim() === ""
                                                            ? `${dayKey} Description cannot be empty`
                                                            : ""
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            );
                        })}
                        {/* Eight */}

                        <span className={addTours.toursDivider}></span>
                        {/* NINE */}
                        <Grid container spacing={2} marginTop={2} flexDirection={'row'}>
                            {viewPackDetails?.package_images && viewPackDetails?.package_images?.length > 0 && viewPackDetails?.package_images?.map((image, index) => (
                                <Grid item id={`uploadedImg${index}`}>
                                    <div key={index} style={{ position: "relative" }}>
                                        <img
                                            src={image}
                                            alt="images"
                                            style={{
                                                width: "200px",
                                                height: "200px",
                                                objectFit: "contain",
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleUploadedImageDelete(image, index)}
                                            className={`delete-button ${addTours.deletedstyle}`}
                                        >
                                            <img src={deleteicon} alt="Delete Icon" />{" "}
                                        </button>
                                    </div>
                                </Grid>))}
                        </Grid>


                        <Grid
                            container
                            flexDirection={"column"}
                            spacing={2}
                            mt={2}
                            id="multipleImages"
                        >
                            <Grid item>
                                <Typography className={addTours.inputLabelStyle}>
                                    Add Images & videos{" "}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {/* <form onSubmit={handleSubmit}> */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(4, 1fr)",
                                        gridGap: "20px",
                                    }}
                                >
                                    {images.map((image, index) => (
                                        <div key={index} style={{ position: "relative" }}>
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt="images"
                                                style={{
                                                    width: "100%",
                                                    height: "25vh",
                                                    objectFit: "contain",
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleImageDelete(index)}
                                                className={`delete-button ${addTours.deletedstyle}`}
                                            >
                                                <img src={deleteicon} alt="Delete Icon" />{" "}
                                            </button>
                                        </div>
                                    ))}
                                    {images.length < 12 && (
                                        <>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                onChange={handleImageUpload}
                                                multiple
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <img
                                                    id="img-upload"
                                                    src={plusicon}
                                                    alt="plusicon"
                                                    style={{
                                                        border: "1px dashed rgb(0, 53, 86, 1)",
                                                        width: "100%",
                                                        height: "25vh",
                                                    }}
                                                />
                                            </label>
                                        </>
                                    )}
                                </div>
                                {multipleImagesError && (
                                    <span className="goAdminErrorMessages">
                                        {multipleImagesError}
                                    </span>
                                )}

                                {/* </form> */}
                            </Grid>
                        </Grid>
                        {/* NINE */}

                        <span className={addTours.toursDivider}></span>

                        {/* TEN */}
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={5}>
                                <Typography className={addTours.inputLabelStyle}>
                                    Terms & Conditions
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField
                                    {...register("termsForPackage", {
                                        required: {
                                            value: true,
                                            message: "Enter Terms & Conditions",
                                        },
                                    })}
                                    InputLabelProps={{ shrink: true }}
                                    multiline
                                    rows={7}
                                    label="Terms & Conditions"
                                    size="small"
                                    placeholder="Enter Terms & Conditions"
                                    fullWidth
                                    error={errors?.termsForPackage}
                                    helperText={errors?.termsForPackage?.message}
                                />
                            </Grid>
                        </Grid>
                        {/* TEN */}

                        <Grid container justifyContent={"flex-end"} mt={2}>
                            <Grid item>
                                <Button
                                    onClick={handleSubmit(savePackage)}
                                    className="bg-p"
                                    variant="contained"
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default AdminEditTourForm;
