import {
    Button, Dialog, DialogContent, DialogTitle, Divider, Grid, TextField, Typography,
    Container, Paper, DialogActions
} from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from 'react'
import { AntSwitchReverse, adminAddCoupoun } from '../../pages/Admin/AdminStyles';
import addcouponimg from '../../../assets/AdminAssets/addcoupon.svg'
import UserAvatar from '../../../assets/images/User.png'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useForm, Controller } from "react-hook-form";
import { adminPackagesStyle } from '../../pages/Admin/AdminStyles'
import {
    Stack, IconButton, Checkbox,
    FormHelperText, FormControlLabel, FormGroup, InputLabel, Select, MenuItem
} from '@mui/material'
//   import { adminPackagesStyle } from './AdminStyles'
import { enqueueSnackbar } from 'notistack';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import gomytripclient from '../../../GomytripClient';
import BusesPageBackDrop from '../../pages/Buses/BusesPageBackDrop';
const AdminAddPlace = (props) => {
    const { open, close, successCallBack } = props
    const editData = props.editData
    console.log(editData, "editdata")
    const addTours = adminPackagesStyle()
    const adminCoupoun = adminAddCoupoun()
    const adminRefund = adminAddCoupoun()
    const [isLoading, setIsLoading] = useState(false)
    const handleclose = () => {
        close()
    }

    const [placeStatus, setPlaceStatus] = useState(editData?.status)
    const {
        register,
        handleSubmit,
        formState: { errors }, reset, setValue, control
    } = useForm();

    const [imageError, setImageError] = useState('')
    // ------------------------------------ IMAGE------------------------------------//
    const [coupounImage, setCoupounImage] = useState({ file: '', imagePreview: "" })

    const handleCoupounImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (allowedTypes.includes(file.type)) {
                let urlObj = URL.createObjectURL(file);
                setCoupounImage({ file: file, imagePreview: urlObj })
                setImageError('');
            } else {
                enqueueSnackbar('Invalid file type. Please select a JPEG or PNG image.', { variant: 'error' })
                setCoupounImage({ file: "", imagePreview: "" })
                setImageError('Invalid file type. Please select a JPEG or PNG image.');
            }
        }
    }

    const [mainCatList, setMainCatList] = useState([])

    const [selectedCat, setSelectedCat] = useState([])
    useEffect(() => {
        toursData()
    }, [])

    //     1 -> Main Category
    // 2 -> Sub Category

    const toursData = () => {
        let payloadToSend = {
            "pageNumber": '',
            "pageSize": '',
            "category_type": 1,
        }
        gomytripclient.post('/categoryList', payloadToSend
        ).then(res => {
            if (res.status === 200 && res.data.status === 1) {
                setMainCatList(res.data.data.rows)
            } else {
                enqueueSnackbar(res.data.message, { variant: 'error' })
                setMainCatList([])
            }
        }).catch((Err) => {
            console.log(Err)
        })
    }

    const handleCatChange = (e) => {
        let eValue = Number(e.target.value)
        setSelectedCat(eValue)
        // setSelectedCat(selectedCat.includes(eValue) ? selectedCat.filter((filterD) => eValue != filterD) : [...selectedCat, eValue])
    }

    const EditPlacehandler = (editForm) => {

        if (coupounImage.imagePreview == '') {
            setImageError('Upload place image to continue')
            return
        } else {
            setImageError('')
        }
        setIsLoading(true)
        let placeFormdata = new FormData()
        placeFormdata.append('id', editData.id)
        placeFormdata.append('place_name', editForm.placeName)
        placeFormdata.append('category', JSON.stringify(selectedCat))
        placeFormdata.append('action', 1)
        placeFormdata.append('status', placeStatus)

        if (coupounImage.file) {
            placeFormdata.append('place_image', coupounImage.file)
        }

        gomytripclient.post('/modifyTourPackagePlace', placeFormdata
        ).then(res => {
            if (res.data.status === 1) {
                enqueueSnackbar(res.data.message, { variant: 'success' })
                successCallBack()
                handleclose()

            } else {
                enqueueSnackbar(res.data.message, { variant: 'error' })
                setIsLoading(false)

            }
            console.log(res)
        }).catch(err => {
            setIsLoading(false)

            console.log(err)
        })
    }

    const addPlacehandler = (formD) => {
        if (coupounImage.file == '') {
            setImageError('Upload place image to continue')
            return
        } else {
            setImageError('')
        }
        setIsLoading(true)

        let placeFormdata = new FormData()
        placeFormdata.append('place_name', formD.placeName)
        placeFormdata.append('place_image', coupounImage.file)
        placeFormdata.append('category', JSON.stringify(selectedCat))

        gomytripclient.post('/addTourPackagePlace', placeFormdata
        ).then(res => {
            if (res.data.status === 1) {
                enqueueSnackbar(res.data.message, { variant: 'success' })
                successCallBack()
                handleclose()
                setIsLoading(false)
            } else {
                enqueueSnackbar(res.data.message, { variant: 'error' })
                setIsLoading(false)
            }
        }).catch(err => {
            setIsLoading(false)

            console.log(err)
        })
    }

    const handlePlaceStatus = (e) => {
        if (e.target.checked) {
            setPlaceStatus(0)
        } else {
            setPlaceStatus(1)
        }
    }
    useEffect(() => {
        if (Object.keys(editData).length > 0) {
            setPlaceStatus(editData?.status)
            setValue('placeName', editData.place_name)
            setSelectedCat(editData.main_category)
            setCoupounImage({ file: "", imagePreview: editData.place_image })
        }

    }, [])

    return (
        <>
            <BusesPageBackDrop open={isLoading} />
            <form>
                <Dialog open={open} onClose={handleclose} className={adminRefund.dialogradius}
                    // sx={{ "& .MuiDialog-paper": { width: "400px", }, }}
                    maxWidth='md'
                    fullWidth
                >
                    <DialogTitle>
                        <Grid container justifyContent={"space-between"} sx={{ borderRadius: "10%" }}>
                            <Grid item md={10}>
                                <Typography textAlign={'center'} className={adminRefund.refundbus}>{Object.keys(editData).length > 0 ? "Edit" : "Add"} Place</Typography>
                            </Grid>
                            <Grid item md={1}>
                                <CloseIcon sx={{ borderRadius: "50%", color: "white", background: "#003556", }}
                                    onClick={() => handleclose()}
                                />
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        {/* ONE */}
                        <Grid container spacing={1} mt={0} justifyContent={'center'} alignItems={'center'}>
                            <Grid item xs={4}>
                                <Typography className={addTours.inputLabelStyle}>Place Name</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    {...register('placeName', { required: { value: true, message: "Enter Place Name" } })}
                                    label="Place Name"
                                    size="small"
                                    fullWidth
                                    placeholder='Enter Place Name'
                                    // value={animity.hotelName}
                                    // onChange={handleInputChange}
                                    error={errors?.placeName}
                                    helperText={errors?.placeName?.message}
                                // inputRef={hotelNameRef}
                                />
                            </Grid>
                        </Grid>
                        {/* ONE */}

                        {/* TWO */}
                        <Grid container spacing={1} mt={0} justifyContent={'center'} alignItems={'center'}>
                            <Grid item md={4}>
                                <Typography className={addTours.inputLabelStyle}>Image of Place</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <Grid container>
                                    <Grid item md={5}>
                                        {!coupounImage.imagePreview && <label htmlFor='fileInput'>
                                            <input accept='image/*' onChange={(e) => handleCoupounImage(e)} type='file' id='fileInput' style={{ display: 'none' }} />
                                            <Stack className={adminCoupoun.inputFile} justifyContent={'center'} alignItems={'center'}>
                                                <FileUploadOutlinedIcon fontSize='large' className='c-p' />
                                                <p className='c-p'>Upload File</p>
                                            </Stack>
                                        </label>}
                                        {coupounImage.imagePreview && <span style={{ margin: "10px 0" }}>
                                            <img className={addTours.previewImageStyle} width={'320px'} height={'150px'} src={coupounImage.imagePreview} alt="Preview" />
                                        </span>}
                                        {coupounImage?.file.name || coupounImage.imagePreview ?
                                            <Stack flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} className={adminCoupoun.uploadedImgDetails}>
                                                <span >
                                                    {coupounImage?.file.name || editData?.place_name}
                                                </span>
                                                <IconButton onClick={() => setCoupounImage({ file: "", imagePreview: "" })}>
                                                    <DeleteIcon color='error' />
                                                </IconButton>
                                            </Stack> : ""}
                                        <Divider />
                                        <span className='goAdminErrorMessages'>{imageError}</span>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                        {/* TWO */}

                        {/* Three */}
                        <Grid container spacing={1} mt={0} justifyContent={'center'} alignItems={'center'}>
                            <Grid item xs={4}>
                                <Typography className={addTours.inputLabelStyle}>Main Category </Typography>
                            </Grid>
                            <Grid item xs={8}>

                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        row
                                        {...register('categoryTypes', { required: { value: selectedCat.length === 0, message: "Select Category Types" } })}
                                    >
                                        {mainCatList && mainCatList?.length > 0 && mainCatList?.filter(filData => filData?.status === 0).map((data, i) => (
                                            <FormControlLabel
                                                checked={selectedCat === data.id}//selectedCat.includes(data.id)
                                                onChange={handleCatChange}
                                                value={data.id} control={<Radio />} label={data.category_name} />))}
                                    </RadioGroup>
                                </FormControl>

                                {/* <FormControl
                                    sx={{ m: 0 }}
                                    component="fieldset"
                                    variant="standard"
                                >
                                    <FormGroup
                                        sx={{ flexDirection: "initial" }}
                                        {...register('categoryTypes', { required: { value: selectedCat.length === 0, message: "Select Category Types" } })}
                                    >
                                        {mainCatList && mainCatList?.length > 0 && mainCatList?.filter(filData => filData?.status === 0).map((data, i) => (
                                            <FormControlLabel
                                                key={i}
                                                control={
                                                    <Checkbox
                                                        checked={selectedCat === data.id}//selectedCat.includes(data.id)
                                                        onChange={handleCatChange}
                                                        value={data.id}
                                                    />
                                                }
                                                label={data.category_name}
                                            />
                                        ))}
                                    </FormGroup>
                                </FormControl> */}
                            </Grid>
                            {errors.categoryTypes && <span className='goAdminErrorMessages'>{errors?.categoryTypes?.message}</span>}

                        </Grid>
                        {/* Three */}

                        {/* {editData && <Grid container spacing={1} mt={0} justifyContent={'center'} alignItems={'center'}>
                            <Grid item xs={4}>
                                <Typography className={addTours.inputLabelStyle}>Status </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <FormControlLabel
                                    value="end"
                                    control={
                                        <AntSwitchReverse
                                            onChange={(e) =>
                                                handlePlaceStatus(e)
                                            }
                                            size="small"
                                        // color={`${!editData.status ? "error" : "success"
                                        //     }`}
                                        />
                                    }
                                    labelPlacement="end"
                                    checked={placeStatus == 0}
                                />
                                {placeStatus ? "In-Active" : "Active"}
                                {errors.categoryTypes && <span className='goAdminErrorMessages'>{errors?.categoryTypes?.message}</span>}
                            </Grid>
                        </Grid>} */}

                    </DialogContent>
                    <DialogActions>
                        <Grid container justifyContent={'flex-end'} mt={2}>
                            <Grid item>
                                {Object.keys(editData).length > 0 ? <Button onClick={handleSubmit(EditPlacehandler)} className='bg-p' variant='contained'>Save</Button> : <Button onClick={handleSubmit(addPlacehandler)} className='bg-p' variant='contained'>Submit</Button>}
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </form>
        </>
    )
}

export default AdminAddPlace