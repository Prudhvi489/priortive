const Hotelhelpers={
    // type->1 low-high sorting
    // type->2 high-low sorting
    sorting_tbo_gmt:(all_hotels,type)=>{
        // loserst price sorting
       if(type===1){
        all_hotels.sort((a, b) => a?.price?.PublishedPriceRoundedOff - b?.price?.PublishedPriceRoundedOff);
        return all_hotels;
       }
    //    highest price sorting
       else{
        all_hotels.sort((a, b) => b?.price?.PublishedPriceRoundedOff - a?.price?.PublishedPriceRoundedOff);
        return all_hotels;
       }
    },
    open_room_price:(all_rooms,selected)=>{
        // console.log(all_rooms)
        // console.log(selected,"selected rooms ")
        let totalprice=0;
        for(let sel=0;sel<selected.length;sel++){
            let room=all_rooms.find((item)=>item?.RoomIndex===selected[sel]);
            totalprice+=room?.Price?.PublishedPriceRoundedOff
        }
        return totalprice
    },
    open_room_cancellation_percent:(chargetype,amount,data,roomsarray)=>{
        console.log(data,"ljfhotelhelpers")
        if(chargetype===2){
            return amount;
        }
        else{
            let totalamount=Hotelhelpers.open_room_price(roomsarray,data);
            return Math.ceil((amount/totalamount)*100)
            

        }
    },
    open_room_cancellation_rs:(chargetype,amount,data,roomsarray)=>{
        if(chargetype!==2){
            return amount;
        }
        else{
            let total_price=Hotelhelpers.open_room_price(roomsarray,data);
            return Math.ceil((amount*total_price)/100)
        }
    },
    getshortdate:(val)=>{
        const currentDate = new Date(val);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(',', '');
        const form=formattedDate.split(" ");
        return `${form[1]},${form[0]} ${form[2]}`;
    }
}
export default Hotelhelpers;
