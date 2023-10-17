import {
  Breadcrumbs,
  Dialog,
  Grid,
  Typography,
  Tab,
  Divider,
  Stack,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { mybookingstyles, ticketbooking } from "../../../../assets/styles/Flights";
import confirmed from "../../../../assets/images/confirmed.svg";
// import Flight from "../../../../assets/images/Flight.svg";
// import plane from "../../../assets/images/plane.svg";
import information from "../../../../assets/images/information.svg";
// import direct from "../../../assets/images/direct.svg";
// import burger from "../../../assets/images/burger.svg";
// import nonveg from "../../../assets/images/nonveg.svg";
// import baggage from "../../../assets/images/baggage.svg";
// import vistara from "../../../assets/images/vistara.svg";
// import trujet from "../../../assets/images/trujet.svg";
// import indigo from "../../../assets/images/indigo.svg";
import Refundpolicy from "../../../../assets/images/Refundpolicy.svg";
import downarrow from "../../../../assets/images/downarrow.svg";
import uparrow from "../../../../assets/images/uparrow.svg";
import personblue from '../../../../assets/images/personblue.svg'
import correctprimary from '../../../../assets/images/correctprimary.svg'
import travelinsurance from '../../../../assets/images/travelinsurance.svg'
import correct from '../../../../assets/images/correct.svg'
import faredetails from '../../../../assets/images/faredetails.svg'
import whitecancelicon from '../../../../assets/images/whitecancelicon.svg'
import jsPDF from 'jspdf';
import done from '../../../../assets/images/done.svg'
import html2canvas from 'html2canvas';
import Invoice from "../../../pages/Flights/Invoice";
import { useSelector } from "react-redux";
import Hotel_confirmation from '../../../../assets/Hotelimages/Hotel_confirmation.png';
import selected_room from '../../../../assets/Hotelimages/selected_room.png';
import { room_booking } from '../../../../assets/styles/Hotelstyles'
import Ratingstar from '../../../../assets/Hotelimages/Ratingstar.svg'
import important from '../../../../assets/Hotelimages/important.svg';
import helperFunctions from "../../../../helpers/helperFunctions";
import MySnackbar from "../../../modals/Signupmodals/Snackbar";
import { useNavigate } from "react-router-dom";
import Importantinfo from "../../../OffersCarousel/Importantinfo";
import CancelIcon from '@mui/icons-material/Cancel';
import { StatusStepper } from "../../Buses/StatusStepper";
import Queriesdialog from "../Queriesdialog";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import {styles} from '../../../../assets/styles/Styles_export'
const Cancelledhoteldetails = (props) => {
  const { data, dataobj } = props;
  console.log(dataobj, "cancelled data")
  const mybooking = mybookingstyles();
  const room_style = room_booking();
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const navigate = useNavigate();
  const guests_details = useSelector(
    (state) => state.hotel_guestcount.guests
  );
  const hotel_details = useSelector(state => state.hotel_room.hotelinfo);
  const hotel_info = hotel_details.HotelDetails;
  let total_adult = guests_details.reduce((sum, item) => sum + item.NoOfAdults, 0);
  let total_child = guests_details.reduce((sum, item) => sum + item.NoOfChild, 0);
  const [gmt_fee, setGmt_fee] = useState(0);
  const [discount, setDiscount] = useState(0)
  const [userQuerySubmitForm, setUserQuerySubmitForm] = useState(false)
  const handleUserQueriesDialog = (param) => {
    setUserQuerySubmitForm(param)
  }
  //    let data= {
  //     "VoucherStatus": true,
  //     "ResponseStatus": 1,
  //     "TraceId": "890d4b7a-ca83-48bb-a04a-e5bec708dcb8",
  //     "Status": 1,
  //     "HotelBookingStatus": "Confirmed",
  //     "ConfirmationNo": "7224477992438",
  //     "BookingRefNo": "129965422956642",
  //     "BookingId": 1829150,
  //     "IsPriceChanged": false,
  //     "IsCancellationPolicyChanged": false,
  //     "HotelRoomsDetails": [
  //         {
  //             "AdultCount": 1,
  //             "AvailabilityType": "NotAvailable",
  //             "ChildCount": 0,
  //             "HotelPassenger": [
  //                 {
  //                     "Age": 0,
  //                     "Email": "ganesh@krify.com",
  //                     "FileDocument": null,
  //                     "FirstName": "ganesh",
  //                     "GSTCompanyAddress": null,
  //                     "GSTCompanyContactNumber": null,
  //                     "GSTCompanyEmail": null,
  //                     "GSTCompanyName": null,
  //                     "GSTNumber": null,
  //                     "GuardianDetail": null,
  //                     "LastName": "krify",
  //                     "LeadPassenger": true,
  //                     "MiddleName": null,
  //                     "PAN": "ABCTY1234D",
  //                     "PassportExpDate": null,
  //                     "PassportIssueDate": null,
  //                     "PassportNo": null,
  //                     "PaxId": 184411,
  //                     "PaxType": 1,
  //                     "Phoneno": "9874563210",
  //                     "Title": "Mr"
  //                 }
  //             ],
  //             "RequireAllPaxDetails": false,
  //             "RoomId": 141311,
  //             "RoomStatus": 0,
  //             "RoomIndex": 1,
  //             "RoomTypeCode": "322037529|",
  //             "RoomDescription": "<p></p><p>118 sq feet </p><br/><p><b>Relax</b> - Fireplace</p><p><b>Internet</b> - Free WiFi </p><p><b>Entertainment</b> - Flat-screen TV with cable channels</p><p><b>Food and Drink</b> - 24-hour room service</p><p><b>Sleep</b> - Memory foam bed and a pillow menu </p><p><b>Bathroom</b> - Private bathroom, shower, soap, and toilet paper</p><p><b>Practical</b> - Safe, free newspaper, and iron/ironing board</p><p><b>Comfort</b> - Daily housekeeping and ceiling fan</p><p><b>Accessibility</b> - Phone accessibility kit</p><p><b>Need to Know</b> - No rollaway/extra beds available, toothbrush and toothpaste not available</p><p>Smoking And Non-Smoking</p>",
  //             "RoomTypeName": "Economy Room, 1 Twin Bed",
  //             "RatePlanCode": "322037529|390188505|37336|23",
  //             "RatePlan": 0,
  //             "DayRates": [
  //                 {
  //                     "Amount": 551.43,
  //                     "Date": "2023-07-26T00:00:00"
  //                 }
  //             ],
  //             "IsPerStay": false,
  //             "SupplierPrice": null,
  //             "Price": {
  //                 "CurrencyCode": "INR",
  //                 "RoomPrice": 551.43,
  //                 "Tax": 65.82,
  //                 "ExtraGuestCharge": 0,
  //                 "ChildCharge": 0,
  //                 "OtherCharges": 0,
  //                 "Discount": 0,
  //                 "PublishedPrice": 617.25,
  //                 "PublishedPriceRoundedOff": 617,
  //                 "OfferedPrice": 617.25,
  //                 "OfferedPriceRoundedOff": 617,
  //                 "AgentCommission": 0,
  //                 "AgentMarkUp": 0,
  //                 "ServiceTax": 0,
  //                 "TCS": 0,
  //                 "TDS": 0,
  //                 "ServiceCharge": 0,
  //                 "TotalGSTAmount": 0,
  //                 "GST": {
  //                     "CGSTAmount": 0,
  //                     "CGSTRate": 0,
  //                     "CessAmount": 0,
  //                     "CessRate": 0,
  //                     "IGSTAmount": 0,
  //                     "IGSTRate": 18,
  //                     "SGSTAmount": 0,
  //                     "SGSTRate": 0,
  //                     "TaxableAmount": 0
  //                 }
  //             },
  //             "RoomPromotion": "Member’s exclusive price",
  //             "Amenities": [
  //                 "Free WiFi"
  //             ],
  //             "Amenity": [
  //                 "Telephone accessibility kit",
  //                 "Television",
  //                 "Smoking and Non-Smoking",
  //                 "Tile flooring in room",
  //                 "Pillow menu",
  //                 "Laptop-friendly workspace",
  //                 "Daily housekeeping",
  //                 "Ceiling fan",
  //                 "Memory foam mattress",
  //                 "Free WiFi",
  //                 "Phone",
  //                 "Desk",
  //                 "No rollaway/extra beds",
  //                 "Soap",
  //                 "Shower only",
  //                 "Toilet paper",
  //                 "Doorbell/telephone notification",
  //                 "Lever door handles",
  //                 "Toothbrush and toothpaste not available",
  //                 "TV size measurement: inch",
  //                 "Private bathroom",
  //                 "Iron/ironing board",
  //                 "In-room safe",
  //                 "Fireplace",
  //                 "Room service (24 hours)",
  //                 "Flat-panel TV",
  //                 "Free newspaper",
  //                 "Cable TV service"
  //             ],
  //             "SmokingPreference": "NoPreference",
  //             "BedTypes": [],
  //             "HotelSupplements": null,
  //             "LastCancellationDate": "2023-07-25T23:59:59",
  //             "CancellationPolicies": [
  //                 {
  //                     "Charge": 100,
  //                     "ChargeType": 2,
  //                     "Currency": "INR",
  //                     "FromDate": "2023-07-26T00:00:00",
  //                     "ToDate": "2023-07-27T23:59:59"
  //                 }
  //             ],
  //             "LastVoucherDate": "2023-07-26T00:00:00",
  //             "CancellationPolicy": "Economy Room, 1 Twin Bed#^#100.00% of total amount will be charged, If cancelled between 26-Jul-2023 00:00:00 and 27-Jul-2023 23:59:59.|#!#",
  //             "Inclusion": [
  //                 "Free WiFi"
  //             ]
  //         }
  //     ],
  //     "AgentRemarks": "",
  //     "BookingSource": "EANPackage",
  //     "CreditNoteGSTIN": null,
  //     "GSTIN": null,
  //     "GuestNationality": "IN",
  //     "HotelPolicyDetail": "india - land of mystries \"//\" \"  /// \"  |<b>Economy Room, 1 Twin Bed</b><br/><ul></ul>|CheckIn Time-Begin: 12:00 PM|CheckOut Time: 12:00 PM|CheckIn Instructions: <ul>  <li>Extra-person charges may apply and vary depending on property policy</li><li>Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges</li><li>Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed</li><li>This property accepts credit cards</li><li>Please note that cultural norms and guest policies may differ by country and by property; the policies listed are provided by the property</li>  </ul> | Special Instructions : Front desk staff will greet guests on arrival. For more details, please contact the property using the information on the booking confirmation.  Please note that PAN cards are not accepted as identification at this property. To register at this property, guests who are Indian citizens must provide a valid photo identity card issued by the Government of India; travelers who are not citizens of India must present a valid passport and visa.|Minimum CheckIn Age : 18| Optional Fees: <ul> <li>Fee for local cuisine breakfast: approximately INR 100.00 per person</li>     <li>Airport shuttle fee: INR 500 per vehicle (one way)</li> <li>Airport shuttle fee per child: INR 0 (one-way), (from 1 to 5 years old)</li>                         </ul> <p>The above list may not be comprehensive. Fees and deposits may not include tax and are subject to change. </p>|Cards Accepted: Carte Blanche,Visa,Diners Club,Discover,American Express,JCB International,Mastercard|<ul>  <li>Couples wishing to share a room must provide proof of marriage. </li><li>Up to 7 children 1 year old and younger stay free when occupying the parent or guardian's room, using existing bedding. </li><li>Only registered guests are allowed in the guestrooms. </li> <li>This property advises that enhanced cleaning and guest safety measures are currently in place.</li><li>Disinfectant is used to clean the property; commonly-touched surfaces are cleaned with disinfectant between stays; bed sheets and towels are laundered at a temperature of at least 60°C/140°F; guestroom doors are sealed after cleaning.</li><li>Personal protective equipment, including masks, will be available to guests.</li><li>Social distancing measures are in place; staff at the property wear personal protective equipment; a shield is in place between staff and guests in main contact areas; periodic temperature checks are conducted on staff; temperature checks are available to guests; guests are provided with hand sanitizer; cashless payment methods are available for all transactions; contactless room service is available; masks are required in public areas.</li><li>Enhanced food service safety measures are in place.</li><li>This property affirms that it adheres to the cleaning and disinfection practices of Operational Recommendations for Hotels (FHRAI - India).</li>\n </ul>,Pets not allowed,Shield between guests and staff in main contact areas,Property follows sanitization practices of Operational Recommendations for Hotels (FHRAI - India),Property confirms they are implementing guest safety measures,Temperature checks are available to guests,Contactless food service / room service is available,Social distancing measures are in place,Guest accommodation is sealed after cleaning,Staff temperature checks are conducted regularly,Property is cleaned with disinfectant,Guests are provided with free hand sanitizer,Property confirms they are implementing enhanced cleaning measures,Staff wears personal protective equipment,Cashless transactions are available,Masks are available to guests,Bed sheets and towels are washed at a temperature of at least 60°C/140°F,Food service has been amended for enhanced safety,Protective clothing is available to guests,Masks are compulsory at the property,No cribs (infant beds) available,Commonly-touched surfaces are cleaned with disinfectant|<strong>City tax and Resort fee are to be paid directly at hotel if applicable. Most hotels do not allow unmarried / unrelated couples to check-in. This is at full discretion of the hotel management. No refund would be applicable in case the hotel denies check-in under such circumstances.</strong>",
  //     "IntHotelPassportDetails": null,
  //     "InvoiceAmount": 617,
  //     "InvoiceCreatedOn": "2023-07-26T08:57:45",
  //     "InvoiceNo": "MW/2324/1848",
  //     "IsCorporate": false,
  //     "HotelConfirmationNo": null,
  //     "HotelCode": "22728114",
  //     "HotelId": 123212,
  //     "HotelName": "Hotel Delhi Regency",
  //     "TBOHotelCode": "1218141",
  //     "StarRating": 3,
  //     "AddressLine1": "8184 Arakashan Road,Paharganj,Near New Delhi Railway Station,New Delhi,IN",
  //     "AddressLine2": "",
  //     "CountryCode": "IN",
  //     "Latitude": "28.6468",
  //     "Longitude": "77.21309",
  //     "City": "Delhi",
  //     "CityId": 130443,
  //     "CheckInDate": "2023-07-26T00:00:00",
  //     "InitialCheckInDate": "2023-07-26T00:00:00",
  //     "CheckOutDate": "2023-07-27T00:00:00",
  //     "InitialCheckOutDate": "2023-07-27T00:00:00",
  //     "LastCancellationDate": "2023-07-25T23:59:59",
  //     "LastVoucherDate": "2023-07-26T00:00:00",
  //     "NoOfRooms": 1,
  //     "BookingDate": "2023-07-26T08:57:45",
  //     "SpecialRequest": "",
  //     "IsDomestic": true,
  //     "BookingAllowedForRoamer": true,
  //     "id": "7d6191f0-2b92-11ee-863c-99add846b96f",
  //     "booked_by": "17f80c70-2aea-11ee-89dc-635b45729c7f",
  //     "hotel_code": 1218141,
  //     "hotel_name": "Hotel Delhi Regency",
  //     "number_of_rooms": 1,
  //     "room_type_name": "xyz",
  //     "total_staying_persons": 1,
  //     "rating": 0,
  //     "review": "checking",
  //     "platform": 0,
  //     "payment_status": 1,
  //     "payment_unique_number": "123lkj",
  //     "booking_status": 0,
  //     "invoice_number": "MW/2324/1848",
  //     "total_price": 679,
  //     "published_price": 617,
  //     "admin_commission": 62,
  //     "discount": 0,
  //     "from_date": "2023-07-26T00:00:00.000Z",
  //     "to_date": "2023-07-27T00:00:00.000Z",
  //     "coupon_id": null,
  //     "admin_commission_type": 2,
  //     "ticket_sent_ph_num": "9874563210",
  //     "ticket_sent_mail": "ganesh@krify.com",
  //     "hotel_picture": "https://i.travelapi.com/lodging/23000000/22730000/22728200/22728114/9b988241_z.jpg"
  // }
  useEffect(() => {
    setGmt_fee(data.admin_commission);
    setDiscount(data.discount)
  }, [props.data])


  const handlebookingclose = () => {
    navigate("/hotels")
  }
  // pdf download
  const downloadPdf = async () => {
    // Get the content of the hidden div
    const element = document.getElementById('hiddenDiv');
    const content = element.innerHTML;
    // Create a new div element with the same content as the hidden div
    const newElement = document.createElement('div');
    newElement.style.width = "100%"
    newElement.innerHTML = content;

    // Set the style properties to position the new element off-screen
    newElement.style.position = 'absolute';
    newElement.style.top = '-9999px';
    newElement.style.left = '-9999px';

    // Create a new jsPDF instance
    const pdf = new jsPDF(
      'p', 'in',
      [200, 297]
    );
    // Add the new element to the DOM
    document.body.appendChild(newElement);
    // Calculate the number of pages required to display the entire component
    const componentHeight = newElement.clientHeight;
    console.log(componentHeight)
    const pageHeight = pdf.internal.pageSize.getHeight();
    console.log(pageHeight)
    const totalPages = Math.ceil(componentHeight / 1000);
    // Loop through each page and add the component image to the PDF
    for (let i = 0; i < totalPages; i++) {
      // Use html2canvas to create an image of the component for the current page
      const scrollY = i * 740;
      const canvas = await html2canvas(newElement, {
        x: 0,
        y: scrollY,
        height: 740,
        width: 780,
      });
      const imgData = canvas.toDataURL('image/png', 1.0);
      // Add the image to the PDF and create a new page if necessary
      if (i > 0) {
        setSnackopen(true);
        setSnackmessage(i);
        // alert(i)
        pdf.addPage();
      }
      pdf.addImage(imgData, 'PNG', 0, i * 10, 200, 0, null, 'FAST');
      // if (i < totalPages - 1) {
      //   pdf.addPage();
      // }

    }
    // document.body.removeChild(newElement);

    pdf.save("json.pdf")


  }

  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Queriesdialog open={userQuerySubmitForm} close={() => setUserQuerySubmitForm(false)} module_type={2} bookingid={dataobj.booking_id} />
      {<div className="profileDialog" style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: '1rem' }}>
        <div id="hiddenDiv" style={{ display: 'none' }}>
          <Invoice />

        </div>
        {Object.keys(data).length > 0 && <Grid container direction={"column"} spacing={2} >
          <Grid
            item
            sx={{
              background: "linear-gradient(116.32deg, #AD250A -5.88%, #E22500 111.84%)",
              borderTopLeftRadius: "1rem!important",
              borderTopRightRadius: "1rem!important",
              padding: '1.5rem',
              paddingTop: '2rem!important'
            }}
          >
            <Grid container direction="column" textAlign="center" spacing={3}>
              {/* <Grid item  spacing={1} > */}
              <Grid item>
                <span className={mybooking.bookingfont}>Your Booking is Cancelled</span>{" "}
              </Grid>
              <Grid item>
                <CancelIcon sx={{ color: '#fff', fontSize: '5rem' }} />
              </Grid>
              <Grid item mb={2}>
                <span className={mybooking.ticketfont}>
                  BOOKING ID: {data.BookingId}
                </span>
              </Grid>
              {/* </Grid> */}

            </Grid>
          </Grid >
          <Grid item>
            <StatusStepper />
          </Grid>
          {/* <Grid sx={{backgroundColor:'rgba(0, 53, 86, 1.2)',color:'#ffff',fontSize:'14px'}} p={2}>
                  <Grid container direction={'column'} rowSpacing={0.5} textAlign={'center'}>
                      <Grid item>Ticket has been emailed to </Grid>
                      <Grid item>{data.HotelRoomsDetails[0].HotelPassenger[0].Email}</Grid>
                      <Grid item>and SMS sent to {data.HotelRoomsDetails[0].HotelPassenger[0].Phoneno}</Grid>
                  </Grid>
  
                </Grid> */}
          {/* Hotel details */}
          <Grid item>
            {/* <Container> */}
            {/* <Paper sx={{borderRadius:'1rem'}} elevation={3}> */}
            <Grid item>
              <Stack p={1} spacing={1}>
                <Grid container spacing={1}>
                  <Grid item md={3.5} sx={{ padding: '1rem', height: '14rem' }} textAlign={'center'}>
                    <img src={data.hotel_picture} alt="selected_room" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  </Grid>
                  <Grid item container direction="column" md={8.5} spacing={0.5}>
                    <Grid item><span className={room_style.hotelname}>{data?.HotelName}</span></Grid>
                    <Grid item>
                      <Stack direction="row">
                        {
                          Array.from({ length: data?.StarRating }, (_, index) => {
                            return (
                              <img src={Ratingstar} alt="ratingstar" />
                            )
                          })
                        }

                      </Stack>
                    </Grid>
                    <Grid item><span className={room_style.hotel_loc}>{data?.AddressLine1}</span></Grid>
                    <Grid item >
                      <Breadcrumbs separator="|" className={room_style.guests_count}><span >{`${helperFunctions.nights_calc(data.CheckInDate, data.CheckOutDate)} ${helperFunctions.nights_calc(data.CheckInDate, data.CheckOutDate) > 1 ? "Nights" : "Night"}`}</span><span>{`${total_adult + total_child} ${total_adult + total_child > 1 ? "Guests" : "Guest"}`}</span><span>{`${guests_details.length} ${guests_details.length > 1 ? "Rooms" : "Room"}`}</span></Breadcrumbs>
                    </Grid>
                    <Grid item container>
                      <Grid item md={4}>
                        <Stack spacing={0.5}>
                          <span className={room_style.hotel_loc}>Check-In </span>
                          <span className={room_style.hotel_checked_dates}>{helperFunctions.get_numeric_date(data.CheckInDate)}</span>
                          <span className={room_style.hotel_loc}>Saturday 3PM </span>
                        </Stack>
                      </Grid>
                      <Grid item md={4} alignSelf={'center'}>
                        <button className={room_style.days_stay}>{`${helperFunctions.nights_calc(data.CheckInDate, data.CheckOutDate)} ${helperFunctions.nights_calc(data.CheckInDate, data.CheckOutDate) > 1 ? "Nights" : "Night"}`}</button>
                      </Grid>
                      <Grid item md={4}>
                        <Stack spacing={0.5}>
                          <span className={room_style.hotel_loc}>Check-Out</span>
                          <span className={room_style.hotel_checked_dates}>{helperFunctions.get_numeric_date(data.CheckOutDate)}</span>
                          <span className={room_style.hotel_loc}>Tuesday 12PM</span>
                        </Stack>
                      </Grid>

                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ borderBottom: `1px dashed ${styles.app_color}` }}></Grid>
                <Grid item><span className={room_style.room_name}>{data.HotelRoomsDetails[0].RoomTypeName}</span></Grid>
                {/* <ul style={{fontSize:'14px',fontWeight:400,color:"#000000"}}>
                  <li>Free Breakfast and Lunch/Dinner</li>
                  <li>Includes Breakfast, One major meal, Two Way airport Transfer, Beach Transfers At Designated Time Intervals *Minibar First Fill on us *Kids Special Amenities, Kids Below 12 Yrs. Stay Free</li>
                </ul> */}
                <span>{data.HotelRoomsDetails[0].Amenities.join(",")}</span>
              </Stack>
            </Grid>
            {/* <Grid
              item
              sx={{
                backgroundColor: styles.app_color,
                borderBottomLeftRadius: "1rem",
                borderBottomRightRadius: "1rem",
                padding: "0.8rem 0rem",
                color: "#fff",
              }}
              textAlign="center"
            >
              <Typography  onClick={() => {
          setTimeout(() => {
            downloadPdf();
          }, 1000);
        }}>Download invoice</Typography>
                  </Grid> */}

          </Grid>
          <Grid item>
            <Paper
              sx={{ borderRadius: "1rem", padding: ".5rem" }}
              elevation={3}
            >
              <Grid flexDirection={'row'} container direction={"column"} rowSpacing={1.5}>
                <Grid item>
                  <span className="makeFlex">
                    <SupportAgentIcon /> <span style={{ fontWeight: '500', color: '#000' }}>Got Queries?</span> &nbsp;<span onClick={() => setUserQuerySubmitForm(true)} className="c-p f-w-700 cursor-p">Contact Support</span>
                  </span>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item sx={{ height: "12rem" }}>
            <Paper sx={{ borderRadius: "1rem", padding: "1rem" }}>
              <Stack direction="row" spacing={1}>
                <img src={faredetails} alt="faredetails" />
                <span className={mybooking.bookingfontprimary}>
                  Fare Details
                </span>
              </Stack>
              <Stack spacing={1.5} mt={2}>
                <Grid item>
                  <Grid container>
                    <Grid item md={4} className={mybooking.cancellationhead}>
                      Base Price
                    </Grid>
                    <Grid
                      item
                      md={4}
                      textAlign="center"
                      className={mybooking.faredata}
                    >
                      {`${guests_details.length} ${guests_details.length > 1 ? "Rooms" : "Room"} * ${`${helperFunctions.nights_calc(data.CheckInDate, data.CheckOutDate)} ${helperFunctions.nights_calc(data.CheckInDate, data.CheckOutDate) > 1 ? "Nights" : "Night"}`}`}
                    </Grid>
                    <Grid
                      item
                      md={4}
                      textAlign="right"
                      className={mybooking.faredata}
                    >
                      {`${data.HotelRoomsDetails[0].CancellationPolicies[0].Currency} ${helperFunctions.Updated_room_price(data.HotelRoomsDetails)}`}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container>
                    <Grid item md={6} className={mybooking.cancellationhead}>
                      Fee & Surcharges
                    </Grid>
                    <Grid
                      item
                      md={6}
                      textAlign="right"
                      className={mybooking.faredata}
                    >
                      {`${data.HotelRoomsDetails[0].CancellationPolicies[0].Currency} ${gmt_fee}`}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container>
                    <Grid item md={6} className={mybooking.cancellationhead}>
                      Total Discount
                    </Grid>
                    <Grid
                      item
                      md={6}
                      textAlign="right"
                      className={mybooking.faredata}
                    >
                      {`${data.HotelRoomsDetails[0].CancellationPolicies[0].Currency} ${discount}`}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
                <Grid item>
                  <Grid container>
                    <Grid item className={mybooking.bookingfontprimary} md={6}>
                      Grand Total
                    </Grid>
                    <Grid
                      item
                      md={6}
                      textAlign={"right"}
                      className={mybooking.travelinsurancedata}
                    >
                      {`${data.HotelRoomsDetails[0].CancellationPolicies[0].Currency} ${helperFunctions.Updated_room_price(data.HotelRoomsDetails) + gmt_fee - discount}`}
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
          </Grid>

        </Grid>}
      </div>}

    </div>
  );
};

export default Cancelledhoteldetails;
