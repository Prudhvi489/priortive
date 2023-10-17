import React from 'react';
import { adminAddCoupoun } from '../components/pages/Admin/AdminStyles';

const PageNotFound = () => {

  const adminAddCoupounStyles = adminAddCoupoun();

  return (
    <h1 className={adminAddCoupounStyles.pagenotfound}>Page Not Found</h1>
  )
  
}

export default PageNotFound;