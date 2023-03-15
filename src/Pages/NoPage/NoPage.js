import './NoPage.scss'

const NoPage = () => {
  return (
    <div>
      <div style={{'display':'flex' , 'flexDirection':'column','alignItems':'center','height':'200px','justifyContent':'center','padding':'120px 0px'}}>
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
