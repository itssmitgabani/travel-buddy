export const bookingColumns = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "custname",
      headerName: "Customer name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
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
        field:'bookingdate',
        headerName: 'Booking Date',
        width: 150,
        renderCell: (params) => {
          return (
            <div >
            {params.row.bookingdate.split("T")[0]}
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
  