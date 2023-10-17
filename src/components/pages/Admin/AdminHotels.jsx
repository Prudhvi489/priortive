import React from 'react';
import { adminAddCoupoun } from "./AdminStyles";

const AdminHotels = () => {
  const adminAddCoupounStyles = adminAddCoupoun();
  return(
    <>
      <h4 className={adminAddCoupounStyles.headingstyle}>Admin Hotels</h4>
    </>
  )
}

export default AdminHotels;