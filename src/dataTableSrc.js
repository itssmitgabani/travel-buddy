export const bookingColumns = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "custname",
      headerName: "Customer name",
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
    { field: "seats", headerName: "Seats", width: 150 },
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
      field:'createdAt',
      headerName: 'Booking Date',
      width: 150,
      renderCell: (params) => {
        return (
          <div >
          {params.row.createdAt.split("T")[0]}
          </div>
        );
      },
    }
  ];
  
  export const bookingRows = [
    {
      id: 1,
      userName: "smit",
      userEmail: "smit@gmail.com",
      totalRooms: "2",
      amount: "10000",
      img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
      bookingDate: "10-02-2023",
    },
    {
        id: 2,
        userName: "gabani",
        userEmail: "smit@gmail.com",
        totalRooms: "2",
        amount: "10000",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
        bookingDate: "10-02-2023",
      },{
        id: 3,
        userName: "vatsal",
        userEmail: "smit@gmail.com",
        totalRooms: "2",
        amount: "10000",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
        bookingDate: "10-02-2023",
      },{
        id: 4,
        userName: "smit",
        userEmail: "smit@gmail.com",
        totalRooms: "2",
        amount: "10000",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
        bookingDate: "10-02-2023",
      },{
        id: 5,
        userName: "smit",
        userEmail: "smit@gmail.com",
        totalRooms: "2",
        amount: "10000",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
        bookingDate: "10-02-2023",
      },{
        id: 6,
        userName: "smit",
        userEmail: "smit@gmail.com",
        totalRooms: "2",
        amount: "10000",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
        bookingDate: "10-02-2023",
      },{
        id: 7,
        userName: "smit",
        userEmail: "smit@gmail.com",
        totalRooms: "2",
        amount: "10000",
        img: "https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg",
        bookingDate: "10-02-2023",
      },
  ];
  
  export const feedbackColumns = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "username",
      headerName: "User name",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
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
      username: "gabani",
      feedback: "amazing site",
      date: "10-12-2021",
    },
    {
      id: 3,
      username: "vatsal",
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
  
  export const flightsColumns = [
    { field: "_id", headerName: "ID", width: 50 },
    { field: "planename", headerName: "Plane Name", width: 100 },
    { field: "sourcecity", headerName: "Source City", width: 140 },
    { field: "destinationcity", headerName: "Destination City", width: 140 },
    { field: "departureDate", headerName: "Departure Date & Time (UTC)", width: 170,
      renderCell : (params) => (
        <div className="abc">
          <span >
          {params.row.departure.slice(0,10)}
        </span><br/>
          <span >
          {params.row.departure.slice(11,16)}
        </span>
        </div>
        
      )
    },
    { field: "arrivalDate", headerName: "Arrival Date & Time", width: 170,
      renderCell : (params) => (
        <div className="abc">
          <span >
          {params.row.arrival.slice(0,10)}
        </span><br/>
          <span >
          {params.row.arrival.slice(11,16)}
        </span>
        </div>
      )
    },
    { field: "rate", headerName: "Rate", width: 100 },
    { field: "seats", headerName: "Capacity", width: 100 },
  ];
  export const flightsRows = [
    {
      id: 1,
      planeName:'smit',
      sourceCity:'surat',
      destinationCity:'dubai',
      departureDate:'15-02-2023',
      departureTime:'10:00 AM',
      arrivalDate:'15-02-2023',
      arrivalime:'06:00 PM',
      rate:'10000',
      capacity:'100',
    },
    {
      id: 2,
      planeName:'smit',
      sourceCity:'surat',
      destinationCity:'dubai',
      departureDate:'15-02-2023',
      departureTime:'10:00 AM',
      arrivalDate:'15-02-2023',
      arrivalime:'06:00 PM',
      rate:'10000',
      capacity:'100',
    },
    {
      id: 3,
      planeName:'smit',
      sourceCity:'surat',
      destinationCity:'dubai',
      departureDate:'15-02-2023',
      departureTime:'10:00 AM',
      arrivalDate:'15-02-2023',
      arrivalime:'06:00 PM',
      rate:'10000',
      capacity:'100',
    },
    {
      id: 4,
      planeName:'smit',
      sourceCity:'surat',
      destinationCity:'dubai',
      departureDate:'15-02-2023',
      departureTime:'10:00 AM',
      arrivalDate:'15-02-2023',
      arrivalime:'06:00 PM',
      rate:'10000',
      capacity:'100',
    },
    {
      id: 5,
      planeName:'smit',
      sourceCity:'surat',
      destinationCity:'dubai',
      departureDate:'15-02-2023',
      departureTime:'10:00 AM',
      arrivalDate:'15-02-2023',
      arrivalime:'06:00 PM',
      rate:'10000',
      capacity:'100',
    },
    {
      id: 6,
      planeName:'smit',
      sourceCity:'surat',
      destinationCity:'dubai',
      departureDate:'15-02-2023',
      departureTime:'10:00 AM',
      arrivalDate:'15-02-2023',
      arrivalime:'06:00 PM',
      rate:'10000',
      capacity:'100',
    },
    {
      id: 7,
      planeName:'smit',
      sourceCity:'surat',
      destinationCity:'dubai',
      departureDate:'15-02-2023',
      departureTime:'10:00 AM',
      arrivalDate:'15-02-2023',
      arrivalime:'06:00 PM',
      rate:'10000',
      capacity:'100',
    },
    
  ];
  