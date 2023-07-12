import { useState,useRef,useEffect } from 'react';
import { useDispatchCart,useCart } from './ContextReducer';

export const Card = (props) => {
  let dispatch = useDispatchCart();
  let data=useCart();
  const priceRef=useRef();
  let options = props.foodItem.options[0];
  let priceOptions = Object.keys(options);
  const  [qty,setQty]=useState(1);
  const [size,setSize]=useState("")
  const handleAddToCart = async()=>{
    let food=[]
    for(const item of data){
      if(item.id===props.foodItem._id){
        food=item;
        break;
      }
    }
    if(food!==[]){
      if(food.size===size){
        await dispatch({type:"UPDATE",id:props.foodItem._id, price: finalPrice, qty:qty, img:props.foodItem.img})
        return
      }
    }
    else if(food.size!==size){
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img:props.foodItem.img});
    }
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img:props.foodItem.img});
  }
  let finalPrice = qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <div className="card m-3" style={{ width: '18rem', height:"500px" }}>
      <div className="text-center">
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{"height":"200px"}} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
      <p className="card-text">{props.foodItem.description}</p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <select className="form-select me-2" onChange={(e)=> setQty(e.target.value)}>
          {Array.from(Array(6), (e, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select className="form-select me-2" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
          {priceOptions.map((data) =>{
            return <option key={data} value={data} style={{ textTransform: 'capitalize' }}>{data}</option>
          }         
          )}
        </select>
        <span className="total price d-inline h-100 fs-5">{finalPrice}/-</span>
      </div>
      <div className='card-footer'>
  <button className={'btn w-100 justify-center ms-2'} style={{background:'#6C63FF',color:'#fff'}} onClick={handleAddToCart}>Add To Cart</button>
</div>

    </div>
  );
};
