export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 80 },
  {
    field: "hotelname",
    headerName: "Hotel name",
    width: 270,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.hotelname}
        </div>
      );
    },
  },
  { field: "email", headerName: "Email", width: 270 },
  { field: "city", headerName: "City", width: 150 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell:(params)=>{
        return(
            <div className={params.row.status?"cellWithStatus activated" :"cellWithStatus deactivated"}>{params.row.status?"Activated":"Deactivated"}</div>
        )
    }
  },
];

export const hotelRows = [
  {
    id: 1,
    hotelName: "OYO",
    hotelEmail: "oyo@gmail.com",
    city: "surat",
    status: "activated",
    img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
  },
  {
    id: 2,
    hotelName: "OYO",
    hotelEmail: "oyo@gmail.com",
    city: "surat",
    status: "activated",
    img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
  },
  {
    id: 3,
    hotelName: "OYO",
    hotelEmail: "oyo@gmail.com",
    city: "surat",
    status: "deactivated",
    img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
  },
  {
    id: 4,
    hotelName: "OYO",
    hotelEmail: "oyo@gmail.com",
    city: "surat",
    status: "deactivated",
    img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
  },
  {
    id: 5,
    hotelName: "OYO",
    hotelEmail: "oyo@gmail.com",
    city: "surat",
    status: "activated",
    img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
  },
  {
    id: 6,
    hotelName: "OYO",
    hotelEmail: "oyo@gmail.com",
    city: "surat",
    status: "activated",
    img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
  },
  {
    id: 7,
    hotelName: "OYO",
    hotelEmail: "oyo@gmail.com",
    city: "surat",
    status: "activated",
    img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
  },
];

  export const airlineColumns = [
      { field: "_id", headerName: "ID", width: 80 },
      {
        field: "airlineName",
        headerName: "Airline name",
        width: 270,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img} alt="avatar" />
              {params.row.airlinename}
            </div>
          );
        },
      },
      { field: "email", headerName: "Email", width: 270 },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        renderCell:(params)=>{
          return(
            <div className={params.row.status?"cellWithStatus activated" :"cellWithStatus deactivated"}>{params.row.status?"Activated":"Deactivated"}</div>
        )
        }
      },
    ];
    
    export const airlineRows = [
      {
        id: 1,
        airlineName: "OYO",
        airlineEmail: "oyo@gmail.com",
        status: "deactivated",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
      },
      {
        id: 2,
        airlineName: "OYO",
        airlineEmail: "oyo@gmail.com",
        status: "activated",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
      },
      {
        id: 3,
        airlineName: "OYO",
        airlineEmail: "oyo@gmail.com",
        status: "deactivated",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
      },
      {
        id: 4,
        airlineName: "OYO",
        airlineEmail: "oyo@gmail.com",
        status: "deactivated",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
      },
      {
        id: 5,
        airlineName: "OYO",
        airlineEmail: "oyo@gmail.com",
        status: "activated",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
      },
      {
        id: 6,
        airlineName: "OYO",
        airlineEmail: "oyo@gmail.com",
        status: "activated",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
      },
      {
        id: 7,
        airlineName: "OYO",
        airlineEmail: "oyo@gmail.com",
        status: "activated",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
      },
    ];
    
    
    
  export const userColumns = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "username",
      headerName: "User name",
      width: 270,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 270 },
    {
        field: 'mobileno',
        headerName: 'Mobile No.',
        width: 150,
      },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell:(params)=>{
        return(
          <div className={params.row.status?"cellWithStatus activated" :"cellWithStatus deactivated"}>{params.row.status?"Activated":"Deactivated"}</div>
      )
      }
    },
  ];
  
  export const userRows = [
    {
      id: 1,
      userName: "OYO",
      userEmail: "oyo@gmail.com",
      mobileNo: 9054284148,
      status: "deactivated",
      img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
    },
    {
      id: 2,
      userName: "OYO",
      userEmail: "oyo@gmail.com",
      mobileNo: 9054284148,
      status: "activated",
      img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
    },
    {
      id: 3,
      userName: "OYO",
      userEmail: "oyo@gmail.com",
      mobileNo: 9054284148,
      status: "deactivated",
      img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
    },
    {
      id: 4,
      userName: "OYO",
      userEmail: "oyo@gmail.com",
      mobileNo: 9054284148,
      status: "deactivated",
      img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
    },
    {
      id: 5,
      userName: "OYO",
      userEmail: "oyo@gmail.com",
      mobileNo: 9054284148,
      status: "activated",
      img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
    },
    {
      id: 6,
      userName: "OYO",
      hotelEmuserEmailail: "oyo@gmail.com",
      mobileNo: 9054284148,
      status: "activated",
      img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
    },
    {
      id: 7,
      userName: "OYO",
      userEmail: "oyo@gmail.com",
      mobileNo: 9054284148,
      status: "activated",
      img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
    },
  ];
  
  
    
  export const hotelBookingColumns = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "username",
      headerName: "Customer name",
      width: 270,
    },
    { field: "rooms", headerName: "Total Rooms", width: 120 },
    { field: "children", headerName: "Total Children", width: 120 },
    { field: "adult", headerName: "Total Adult", width: 120 },
    {
        field: 'totalAmt',
        headerName: 'Total Amount',
        width: 150,
      },
    {
        field: 'discountAmt',
        headerName: 'Discount Amount',
        width: 150,
      },
    {
      field: "hotelname",
      headerName: "Hotel Name",
      width: 240,
    },
  ];
  
  export const hotelBookingRows = [
    {
      id: 1,
      custName: "smit",
      rooms: 2,
      children: 1,
      adult: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    {
      id: 2,
      custName: "smit",
      rooms: 2,
      children: 1,
      adult: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    {
      id: 3,
      custName: "smit",
      rooms: 2,
      children: 1,
      adult: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    {
      id: 4,
      custName: "smit",
      rooms: 2,
      children: 1,
      adult: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    {
      id: 5,
      custName: "smit",
      rooms: 2,
      children: 1,
      adult: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    {
      id: 6,
      custName: "smit",
      rooms: 2,
      children: 1,
      adult: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    {
      id: 7,
      custName: "smit",
      rooms: 2,
      children: 1,
      adult: 2,
      amt: 1500,
      hotelName: "OYO",
    },

  ];
  
  
    
  export const flightBookingColumns = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "custname",
      headerName: "Customer name",
      width: 270,
    },
    { field: "seats", headerName: "Total Seats", width: 150 },
    {
        field: 'totalAmt',
        headerName: 'Total Amount',
        width: 150,
      },
    {
        field: 'discountAmt',
        headerName: 'Discount Amount',
        width: 150,
      },
    {
      field: "airlinename",
      headerName: "Airline Name",
      width: 150,
    },
  ];
  
  export const flightBookingRows = [
    {
      id: 1,
      custName: "smit",
      seats: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    
    {
      id: 2,
      custName: "smit",
      seats: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    
    {
      id: 3,
      custName: "smit",
      seats: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    
    {
      id: 4,
      custName: "smit",
      seats: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    
    {
      id: 5,
      custName: "smit",
      seats: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    
    {
      id: 6,
      custName: "smit",
      seats: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    
    {
      id: 7,
      custName: "smit",
      seats: 2,
      amt: 1500,
      hotelName: "OYO",
    },
    
  ];
  
    
  export const couponColumns = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "couponname",
      headerName: "Coupon name",
      width: 270,
    },
    { field: "discount", headerName: "Discount(%)", width: 150 },
    {
        field: 'createdAt',
        headerName: 'Create At',
        width: 150,
      },
    {
      field: "expireat",
      headerName: "Expire At",
      width: 150,
    },
  ];
  
  export const couponRows = [
    {
      id: 1,
      couponName: "smit",
      discount: 10,
      createAt: "10-12-2021",
      expireAt: "10-12-2022",
    },
    {
      id: 2,
      couponName: "smit",
      discount: 10,
      createAt: "10-12-2021",
      expireAt: "10-12-2022",
    },
    {
      id: 3,
      couponName: "smit",
      discount: 10,
      createAt: "10-12-2021",
      expireAt: "10-12-2022",
    },
    {
      id: 4,
      couponName: "smit",
      discount: 10,
      createAt: "10-12-2021",
      expireAt: "10-12-2022",
    },
    {
      id: 5,
      couponName: "smit",
      discount: 10,
      createAt: "10-12-2021",
      expireAt: "10-12-2022",
    },
    {
      id: 6,
      couponName: "smit",
      discount: 10,
      createAt: "10-12-2021",
      expireAt: "10-12-2022",
    },
    {
      id: 7,
      couponName: "smit",
      discount: 10,
      createAt: "10-12-2021",
      expireAt: "10-12-2022",
    },
    
  ];
  
    
  export const feedbackColumns = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "username",
      headerName: "User name",
      width: 140,
    },
    { field: "feedback", headerName: "feedback", width: 1000,
      renderCell : (params) => (
        <div className="abc">
          <span style={{height:"38px"}}>
          {params.row.feedback}
        </span>
        </div>
        
      )
    },
  ];
  export const feedbackRows = [
    {
      id: 1,
      username: "smit",
      feedback: "amazing siteamazing siteamazing siteamazing siteamazing siteamazing sng sngsngsng s siteamazing siteamazing siteamazing siteamazing siteamazing siteamazing siteamazing siteamazing siteamazing siteamazing siteamazing siteamazing siteamazing siteamazing siteamazing siteamazing site",
      date: "10-12-2021",
    },
    {
      id: 2,
      username: "smit",
      feedback: "amazing site",
      date: "10-12-2021",
    },
    {
      id: 3,
      username: "smit",
      feedback: "amazing site",
      date: "10-12-2021",
    },
    {
      id: 4,
      username: "smit",
      feedback: "amazing site",
      date: "10-12-2021",
    },
    {
      id: 5,
      username: "smit",
      feedback: "amazing site",
      date: "10-12-2021",
    },
    {
      id: 6,
      username: "smit",
      feedback: "amazing site",
      date: "10-12-2021",
    },
    {
      id: 7,
      username: "smit",
      feedback: "amazing site",
      date: "10-12-2021",
    },
    
  ];
  