import { Container, Dialog, Divider, Grid, Stack } from "@mui/material";
import React from "react";
import { invoicestyles } from "../../../assets/styles/Flights";
import iphone13 from "../../../assets/images/iphone13.svg";
import invoiceplane from "../../../assets/images/invoiceplane.svg";
import invoicecar from "../../../assets/images/invoicecar.svg";
import invoicebus from "../../../assets/images/invoicebus.svg";
import invoicehotel from "../../../assets/images/invoicehotel.svg";
import invoicebag from "../../../assets/images/invoicebag.svg";

const Invoice = () => {
  const invoicecss = invoicestyles();
  return (
    <div sx={{ width: "100%" }}>
      <Container maxWidth="xl">
        <Grid container direction="column" rowSpacing={2.5}>
          <Grid item height="5vh"></Grid>
          <Grid item className={invoicecss.invoiceheading}>
            TAX INVOICE
          </Grid>
          <Grid item>
            <Grid container>
              <Grid container item md={4} direction="column" rowSpacing={1.5}>
                <Grid item>
                  <Stack>
                    <span className={invoicecss.invoicesubheadings}>
                      BOOKING ID
                    </span>
                    <span className={invoicecss.invoicetext}>
                      NU90284994884290
                    </span>
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack>
                    <span className={invoicecss.invoicesubheadings}>DATE</span>
                    <span className={invoicecss.invoicetext}>12/03/2023</span>
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack>
                    <span className={invoicecss.invoicesubheadings}>
                      DOCUMENT TYPE
                    </span>
                    <span className={invoicecss.invoicetext}>INVOICE</span>
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack>
                    <span className={invoicecss.invoicesubheadings}>
                      PLACE OF SUPPLY
                    </span>
                    <span className={invoicecss.invoicetext}>HYDERABAD</span>
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack>
                    <span className={invoicecss.invoicesubheadings}>
                      INVOICE NO.
                    </span>
                    <span className={invoicecss.invoicetext}>
                      M09887737474829
                    </span>
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack>
                    <span className={invoicecss.invoicesubheadings}>
                      TRANSACTION DETAILS
                    </span>
                    <span className={invoicecss.invoicetext}>REG/B2C</span>
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack>
                    <span className={invoicecss.invoicesubheadings}>
                      TRANSACTION DETAIL:
                    </span>
                    <span className={invoicecss.invoicetext}>UPI</span>
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack>
                    <span className={invoicecss.invoicesubheadings}>
                      ADVANCED RECEIPT VOUCHER NO:
                    </span>
                    <span className={invoicecss.invoicetext}>
                      M09887737474829, M09887460857222
                    </span>
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                container
                item
                md={6}
                direction="column"
                rowSpacing={1.5}
                mt={2}
              >
                <Container>
                  <Grid container item>
                    <Grid item md={0.8}>
                      <img src={invoiceplane} alt="plane" />
                    </Grid>
                    <Grid item md={0.8}>
                      <img src={invoicehotel} alt="hotel" />
                    </Grid>
                    <Grid item md={0.8}>
                      <img src={invoicecar} alt="car" />
                    </Grid>
                    <Grid item md={0.8}>
                      <img src={invoicebus} alt="bus" />
                    </Grid>
                    <Grid item md={0.8}>
                      <img src={invoicebag} alt="bag" />
                    </Grid>
                  </Grid>
                </Container>
                <Grid item mt={2.8}>
                  <img src={iphone13} alt="iphone" height="100%" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider
            sx={{ background: "#003556", height: "0.1rem", width: "51vw" }}
          />
        </Grid>
        <Grid container mt={2}>
          <Grid container item md={6}>
            <Grid container item md={6} direction="column" rowSpacing={2}>
              <Grid item>
                <Stack>
                  <span className={invoicecss.invoicesubheadings}>
                    {" "}
                    VENDOR NAME
                  </span>
                  <span className={invoicecss.invoicetext}>
                    {" "}
                    ORANGE TRAVELS
                  </span>
                </Stack>
              </Grid>
              <Grid item>
                <Stack>
                  <span className={invoicecss.invoicesubheadings}>
                    FROM CITY
                  </span>
                  <span className={invoicecss.invoicetext}>NEW DELHI</span>
                </Stack>
              </Grid>
              <Grid item>
                <Stack>
                  <span className={invoicecss.invoicesubheadings}>
                    CUSTOMER NAME
                  </span>
                  <span className={invoicecss.invoicetext}>HARSHA VARDHAN</span>
                </Stack>
              </Grid>
            </Grid>
            <Grid container item md={6} direction="column" rowSpacing={2}>
              <Grid item>
                <Stack>
                  <span className={invoicecss.invoicesubheadings}>
                    TRAVEL DATE
                  </span>
                  <span className={invoicecss.invoicetext}>13/03/2023</span>
                </Stack>
              </Grid>
              <Grid item>
                <Stack>
                  <span className={invoicecss.invoicesubheadings}>TO CITY</span>
                  <span className={invoicecss.invoicetext}>CHENNAI</span>
                </Stack>
              </Grid>
              <Grid item>
                <Stack>
                  <span className={invoicecss.invoicesubheadings}>
                    CUSTOMER GSTIN
                  </span>
                  <span className={invoicecss.invoicetext}>UNREGISTERED</span>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container mt={2}>
          <Grid
            item
            sx={{ border: "1px solid #003556" }}
            md={6.5}
            direction={"column"}
          >
            <Grid
              item
              sx={{
                backgroundColor: "#003556",
                padding: "0.5rem 1.5rem",
                color: "#fff",
              }}
              alignItems={"center"}
            >
              PAYMENT BREAKUP
            </Grid>
            <Container>
              <Grid item container mt={1}>
                <Grid item md={9}>
                  Base fare
                </Grid>
                <Grid item md={3} textAlign="right">
                  INR 2,800.15
                </Grid>
              </Grid>
              <Grid item container mt={1}>
                <Grid item md={9}>
                  Insurance is collected on behalf of insurance provider
                </Grid>
                <Grid item md={3} textAlign="right">
                  INR 0.0
                </Grid>
              </Grid>
              <Grid item container mt={1}>
                <Grid item md={9}>
                  gomytrip Service Fees
                </Grid>
                <Grid item md={3} textAlign="right">
                  INR 0.0
                </Grid>
              </Grid>
              <Grid item container mt={1}>
                <Grid item md={9}>
                  CGST @ 9%
                </Grid>
                <Grid item md={3} textAlign="right">
                  INR 0.0
                </Grid>
              </Grid>
              <Grid item container mt={1}>
                <Grid item md={9}>
                  SGST @ 9%
                </Grid>
                <Grid item md={3} textAlign="right">
                  INR 0.0
                </Grid>
              </Grid>
              <Grid item container mt={1}>
                <Grid item md={9}>
                  IGST @ 18%
                </Grid>
                <Grid item md={3} textAlign="right">
                  INR 0.0
                </Grid>
              </Grid>
              <Grid item mt={1} sx={{ backgroundColor: "#003556" }}>
                <Divider />
              </Grid>
              <Grid container item mt={1}>
                <Grid item md={9}>
                  Grand Total
                </Grid>
                <Grid item md={3} textAlign="right">
                  INR 2,800.15
                </Grid>
              </Grid>
            </Container>
            <Divider sx={{ backgroundColor: "#003556" }} />
            <Container>
              <Grid item mt={1}>
                This is a computer generated Invoice and does not require
                Signature/Stamp
              </Grid>
            </Container>
          </Grid>
        </Grid>
        <Stack mt={2} spacing={1}>
          <span>This is not a valid travel document</span>
          <span>Invoice issued by gomytrip India Pvt. Ltd. </span>
        </Stack>
        <Grid container mt={2}>
          <Grid container item md={6.5}>
            <Grid item md={4}>
              <Stack>
                <span className={invoicecss.invoicesubheadings}>PAN</span>
                <span className={invoicecss.invoicetext}>AADCM192H</span>
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack>
                <span className={invoicecss.invoicesubheadings}>HSN/SAC</span>
                <span className={invoicecss.invoicetext}>9876423</span>
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack>
                <span className={invoicecss.invoicesubheadings}>
                  SERVICE DESCRIPITION
                </span>
                <span className={invoicecss.invoicetext}>
                  Reservation service for transportation
                </span>
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack>
                <span className={invoicecss.invoicesubheadings}>GSTN</span>
                <span className={invoicecss.invoicetext}>
                  098877662H621Y21CC
                </span>
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack>
                <span className={invoicecss.invoicesubheadings}>CIN</span>
                <span className={invoicecss.invoicetext}>
                  U092838991201HT9PT90987
                </span>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Stack mt={2}>
          <span className={invoicecss.invoicesubheadings}>
            REGISTERED OFFICE
          </span>
          <span className={invoicecss.invoicetext}>
            3rd Floor , Building No. 5, Jai Singh Marg , Maharajah of Jaipur
            State,West Delhi 110018
          </span>
        </Stack>
        <Stack mt={2} spacing={0.3}>
          <span> gomytrip (India) Privated Limited</span>
          <span> Ashok Nagar West Delhi,</span>
          <span> New Delhi, West Delhi,</span>
          <span>DELHI 110018</span>
        </Stack>
      </Container>
      {/* //////////////////// */}
    </div>
  );
};

export default Invoice;
