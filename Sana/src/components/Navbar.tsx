import "../styles/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Navbar({ setShowAddModal }: { setShowAddModal: (show: boolean) => void }) {

  return <>
    <div className="navbar">
      <h1 className="navbar-header">Marketplace</h1>

      <button className="navbar-button"
        
        onClick={() => setShowAddModal(true)}><FontAwesomeIcon icon="plus" /> Add Product</button>
    </div>
  </>
}