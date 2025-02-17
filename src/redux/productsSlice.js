import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllProducts=createAsyncThunk("products/getAllProducts", async()=>{
   const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
   return (data.data)
})


const initialState ={
  products: []
  , isLoading: true
}


const ProductsSlice=createSlice({

name:"products"
,initialState,
extraReducers: (builders)=>{
builders.addCase(getAllProducts.fulfilled,(state,action)=>{
    state.products= action.payload
    state.isLoading=false
})

builders.addCase(getAllProducts.pending,(state)=>{
  if(state.products.length==0){
    state.isLoading= true

  }
})
builders.addCase(getAllProducts.rejected,(state)=>{
 state.isLoading= false
})


}


})


export const productsReducer = ProductsSlice.reducer 