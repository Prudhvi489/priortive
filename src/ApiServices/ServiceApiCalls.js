import gomytripclient from "../GomytripClient";

export const userOverallCouponsApi = (moduleType) => {
  // locationPath=='buses'?3:locationPath=='Hotels'||locationPath=='hotels'?2:1
  let payloadToSend = {
    "user_id": localStorage.getItem('userid') ?? '',
    "module": moduleType
  }
  return gomytripclient.post('userOverallCoupons', payloadToSend
  ).then((res => {
    // console.log(res)
    if (res.data.status === 1) {
      return res.data.data
      //   setCoupondData(res.data.data.coupons)
    } else {
      //   setCoupondData([])
    }
  })).catch(err => {
    console.log(err)
  })
}

export const getTermsAdminApi = () => {
  return gomytripclient.post('/getTc'
  ).then(res => {
    if (res.status === 200 & res.data.status === 1) {
      return res.data.data[0].tc
    } else {
      return 0
    }
  }).catch(Err => {
    console.log(Err)
  })
}

export const getPrivacyPolicyAdminApi = () => {
  return gomytripclient.post('/getPrivacyPolicy'
  ).then(res => {
    if (res.status === 200 & res.data.status === 1) {
      return res.data.data[0].policy
    } else {
      return 0
    }
  }).catch(Err => {
    console.log(Err)
  })
}
//------------------------
export const getTourPlaces = (searchkey = '', pageNo = 1) => {
  let tourpayload = { "search": searchkey, "pageNumber": pageNo, "pageSize": 21 }
  return gomytripclient.post('/getTourPlaces', tourpayload
  ).then(res => {
    return res.data.data
  }).catch(err => {
    console.log(err)
  })
}
//-----------------------
export const getPackagesApi = (dataId) => {
  let tourpayload = { "placeId": dataId }
  return gomytripclient.post('/getPackages', tourpayload
  ).then(res => {
    if (res.status === 200 && res.data.status === 1) {
      return { response: res.data.data, status: 1 }
    } else {
      return { response: res, status: 0 }
    }
  }).catch(err => {
    console.log(err)
  })
}
//---------------
export const getPackageDetailsApi = (packId) => {
  return gomytripclient.post('/getPackageDetails', { 'id': packId }
  ).then(res => {
    return { response: res, status: 1 }
  }).catch(err => {
    console.log(err)
  })
}



// TOURS HOME PAGE API
export const getHomeTourPlacesApi = () => {
  return gomytripclient.post('/getHomeTourPlaces'
  ).then(res => {
    if (res.status === 200 && res.data.status === 1) {
      return { response: res.data.data, status: 1 }
    } else {
      return { response: res.data.data, status: 0 }
    }
  }).catch(err => {
    console.log(err)
  })
}

export const makeAdminLogin = (pay) => {
  return gomytripclient.post('/adminLogin', pay
  ).then(res => {
    return { status: 1, data: res.data }
  }).catch(err => {
    return { status: 1, data: err.data }
  })

}