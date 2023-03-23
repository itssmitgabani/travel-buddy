import './Wishlist.scss'
import SearchItem from '../../Components/SearchItem/SearchItem'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import WishlistItem from '../../Components/WishlistItem/WishlistItem'

const Wishlist = () => {
  const {user} = useContext(AuthContext)
  console.log(user)
  return (
    <div>
      <h1 style={{color:'gray',padding:'20px',marginTop:'20px',textAlign:'center'}}>Wishlist </h1>
    <div className='wishlist'>
      {
        user.wishlist.length === 0 && 
        <div>Wishlist Empty!</div>
      }
      {user.wishlist.map((item) => (
            <WishlistItem item={item} key={item} />
      ))}
    </div>
    
</div>
  )
}

export default Wishlist
