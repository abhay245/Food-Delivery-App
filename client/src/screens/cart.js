import { useCart, useDispatchCart } from '../components/ContextReducer.js';
import { BsFillTrashFill } from 'react-icons/bs';
import EmptyCart from './emptyCart.svg'
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div className='container d-flex justify-content-center'>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
        <img src={EmptyCart} alt="emptyCart" style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString() 
      })
    });
    console.log("Order Response:",response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  
  let totalPrice = data.reduce((total, food) => total + parseInt(food.price), 0);
  return (
    <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Size</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0" onClick={() => { dispatch({ type: 'REMOVE', index: index }); }}>
                    <BsFillTrashFill />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
      <div>
        <button className='btn mt-5' style={{background:'#6C63FF',color:'#fff'}} onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  );
}
