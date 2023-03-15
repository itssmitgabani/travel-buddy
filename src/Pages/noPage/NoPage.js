import React from 'react'

const NoPage = () => {
  return (
    <div>
      <div style={{'display':'flex' , 'flexDirection':'column','alignItems':'center','height':'250px','justifyContent':'center','marginTop':'150px'}}>
        <div className="top">
          <h1 style={{'fontSize':'50px','color':'gray'}}>Error 404</h1> 
        </div>
        <div className="bottom">
          <h4 style={{'fontSize':'20px','color':'#5a5a5a'}}>Page Not Found</h4>
        </div>
      </div>
    </div>
  )
}

export default NoPage
