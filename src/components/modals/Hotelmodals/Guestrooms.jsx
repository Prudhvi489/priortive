import { Dialog, Grid, Modal, Popover, Select, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { guest_rooms } from '../../../assets/styles/Hotelstyles'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch, useSelector } from 'react-redux';
import MySnackbar from '../Signupmodals/Snackbar';
import { GuestsActions } from '../../../store/Hotelslices.jsx/GuestsSlice';
import {styles} from '../../../assets/styles/Styles_export'
const Guestrooms = (props) => {
  
  const { open, close, guestsdata } = props;
  // console.log(guestsdata,"guests data")
  const g_room_style = guest_rooms();
  const dispatch = useDispatch()
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const total_rooms = 5;
  const max_adult_allowed = 8;
  const max_child_allowed = 2;
  const min_adult_allowed = 1;
  const min_child_allowed = 0;
  const [rooms, setRooms] = useState(1)
  const [guests_count, setGuests_count] = useState([{ NoOfAdults: 1, NoOfChild: 0, ChildAge: [1, 1] }])
  let guests = useSelector(state => state.hotel_guestcount.guests);
  const initialRenderRef = useRef(true);
  useEffect(() => {
    setGuests_count(guestsdata)
    setRooms(guestsdata.length)
  }, [open])

  const handleclose = async () => {
    // const total_adults= await guests_count.reduce((sum,item)=>sum+item.adults,0);
    // const total_child = await guests_count.reduce((sum,item)=>sum+item.child,0) 
    dispatch(GuestsActions.Guest_count([guests_count]))
    close()
  }
  // child age change
  const handleagechange = (event, index, arr_index) => {
    const name = event.target.name;
    const value = event.target.value;
    setGuests_count((prev) => {
      const guests = [...prev];
      guests[index] = {
        ...guests[index],
        ChildAge: guests[index].ChildAge.map((age, i) => (i === arr_index ? parseInt(value, 10) : age))
      }
      return guests;
    })
  }
  // adding rooms
  const addroom = () => {
    if (rooms < total_rooms) {
      setRooms((prev => prev + 1))
      setGuests_count((prev) => ([...prev, { NoOfAdults: 1, NoOfChild: 0, ChildAge: [1, 1] }]));
      // setChildage((prev)=>([...prev,{child1:1,child2:1}]))
    }
    else {
      setSnackopen(true);
      setSnackmessage("you are not allowed to add more than 5 rooms");
      // alert("you are not allowed to add more than 5 rooms")
    }
  }
  // removing rooms
  const remove_room = (index) => {
    // console.log(guests_count)
    if (rooms > 1) {
      setRooms((prev => prev - 1));
      setGuests_count((prev) => prev.filter((_, i) => i !== index));
    }
  }
  // adding guests adults,child
  const addguests = (index, guest) => {
    // console.log("added guests")
    try {
      let mem_count;
      if (guest === "NoOfAdults") {
        mem_count = max_adult_allowed;
      }
      else if (guest === "NoOfChild") {
        mem_count = max_child_allowed
      }
      if (guests_count[index][guest] < mem_count) {
        setGuests_count(prevdata => {
          const newdata = [...prevdata];
          newdata[index] = {
            ...newdata[index],
            [guest]: newdata[index][guest] + 1
          }
          return newdata;
        })
      }
    }
    catch (error) {
      setSnackopen(true);
      setSnackmessage(error);
      // alert(error)
    }

  }
  // removing guests adults,child
  const removeguests = (index, guest) => {
    let mem_count;
    if (guest === "NoOfAdults") {
      mem_count = min_adult_allowed
    }
    else if (guest === "NoOfChild") {
      mem_count = min_child_allowed
    }
    if (guests_count[index][guest] > mem_count) {
      setGuests_count(prevdata => {
        const newdata = [...prevdata];
        newdata[index] = {
          ...newdata[index],
          [guest]: newdata[index][guest] - 1
        }
        return newdata;
      })
    }

  }
  const room =
    Array.from(Array(rooms), (item, index) => {
      return (
        <Stack spacing={1}>
          <span style={{ fontSize: '16px', fontFamily: 'Poppins', fontWeight: 500 }}>Room{index + 1}</span>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={g_room_style.guest_text}>Number of Adults</span>
            <Stack direction="row" spacing={1}>
              <button
                style={{
                  fontSize: "16px",
                  border: "none",
                  backgroundColor: "#DFF3FF",
                  borderRadius: "0.3rem",
                }}
                onClick={() => removeguests(index, "NoOfAdults")}
              >
                &#8722;
              </button>
              {/* {console.log(guests_count[index].NoOfAdults)} */}
              <span>{guests_count[index].NoOfAdults.toString().length === 1 ? guests_count[index]?.NoOfAdults.toString().padStart(2, "0") : guests_count[index].NoOfAdults}</span>
              <button
                style={{
                  fontSize: "16px",
                  border: "none",
                  color: "#fff",
                  backgroundColor: styles.app_color,
                  borderRadius: "0.3rem",
                }}
                onClick={() => addguests(index, "NoOfAdults")}
              >
                &#43;
              </button>
            </Stack>
          </div>
          <span className={g_room_style.guest_age_text}>Ages &gt;12</span>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={g_room_style.guest_text}>Number of Children</span>
            <Stack direction="row" spacing={1}>
              <button
                style={{
                  fontSize: "16px",
                  border: "none",
                  backgroundColor: "#DFF3FF",
                  borderRadius: "0.3rem",
                }}
                onClick={() => removeguests(index, "NoOfChild")}

              >
                &#8722;
              </button>
              <span>{guests_count[index].NoOfChild.toString().length === 1 ? guests_count[index].NoOfChild.toString().padStart(2, "0") : guests_count[index].NoOfChild}</span>
              <button
                style={{
                  fontSize: "16px",
                  border: "none",
                  color: "#fff",
                  backgroundColor: styles.app_color,
                  borderRadius: "0.3rem",
                }}
                onClick={() => addguests(index, "NoOfChild")}
              >
                &#43;
              </button>
            </Stack>
          </div>
          <span className={g_room_style.guest_age_text}>Ages below &lt;=12</span>
          {guests_count[index].NoOfChild > 0 && <span className={g_room_style.guest_text}>Age(s) of Children</span>}
          <Stack direction={'row'} spacing={1}>
            {guests_count[index].NoOfChild > 0 && <span><select value={guests_count[index].ChildAge[0]} onChange={(event) => handleagechange(event, index, 0)} name="child1" className={g_room_style.childage}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                return (
                  <option value={item}>{item}</option>
                )
              })}
            </select></span>}
            {guests_count[index].NoOfChild > 1 && <span><select value={guests_count[index].ChildAge[1]} onChange={(event) => handleagechange(event, index, 1)} name="child2" className={g_room_style.childage}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                return (
                  <option value={item}>{item}</option>
                )
              })}
            </select></span>}
          </Stack>
          <Grid item sx={{ borderBottom: `1px dashed ${styles.app_color}` }}></Grid>
          <Grid container>
            <Grid item md={8} textAlign={'right'}>
              {(index === rooms - 1 && rooms < total_rooms) && <button className={g_room_style.add_room} onClick={() => addroom()}>
                <Stack direction="row" spacing={1} alignItems={'center'}>
                  <AddCircleIcon sx={{ color: styles.app_color, fontSize: '1.3rem' }} />
                  <span>Add Room</span>
                </Stack>
              </button>}
            </Grid>
            <Grid item md={4} textAlign={'right'}>
              <button className={g_room_style.remove_room} disabled={rooms === 1 && index === 0 ? true : false} onClick={() => remove_room(index)}>
                <Stack direction="row" spacing={1} alignItems={'center'}>
                  <RemoveCircleIcon sx={{ color: rooms === 1 && index === 0 ? '#FC7373' : '#D02626', fontSize: '1.3rem' }} />
                  <span style={{ color: rooms === 1 && index === 0 ? '#FC7373' : '#D02626' }}>Remove</span>
                </Stack>
              </button>
            </Grid>
          </Grid>
        </Stack>
      )
    })




  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "300px",
            //   mixHeight: 580,
            //   maxWidth: "420px",
            borderRadius: "15px",
            padding: "1rem",
            "&::-webkit-scrollbar":{
              display:'none',
            }
          },
        }}
        PaperProps={{
          sx: {
            position: "fixed",
            top: "20%",
            right: "10%",
            m: 0,
            //   minHeight: 400,
            maxHeight: 400,
            width: 300,
          },
        }}
        open={open} onClose={() => handleclose()}>
        <Stack spacing={1}>
          {room}
          <Grid item textAlign={'center'}>
            <button style={{ border: 'none', background: 'none', fontSize: '16px', fontWeight: 600, color: '#fff', background: styles.app_color, width: '300px', height: '44px', borderRadius: '0.5rem' }} onClick={() => handleclose()}>Done</button>
          </Grid>
        </Stack>
      </Dialog>
    </div>
  )
}

export default Guestrooms